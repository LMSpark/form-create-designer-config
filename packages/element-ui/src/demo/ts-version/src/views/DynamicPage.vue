<template>
  <div v-if="loading" class="loading">加载中...</div>
  <div v-else-if="error" class="error">
    <h3>❌ 页面加载失败</h3>
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <!-- 动态注入页面样式 -->
    <component :is="'style'" v-if="pageStyle">{{ pageStyle }}</component>
    
    <!-- 渲染页面内容 -->
    <form-create
      :rule="pageRules"
      :option="{ form: false, submitBtn: false, resetBtn: false }"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import {useRoute} from 'vue-router'
import {getPageConfig} from '../api'
import type {PageRule} from '../types'

const route = useRoute()
const pageRules = ref<PageRule[]>([])
const pageStyle = ref<string>('')
const loading = ref(true)
const error = ref<string>('')

// 递归替换 rule 中的数据占位符和事件处理器
const bindDataToRules = (rules: PageRule[], data: Record<string, any>): PageRule[] => {
    return rules.map(rule => {
        const newRule = {...rule}
    
        // 处理事件处理器：将字符串转换为函数
        if (newRule.on && typeof newRule.on === 'object') {
            const newOn: Record<string, Function> = {}
            for (const [eventName, handler] of Object.entries(newRule.on)) {
                if (typeof handler === 'string') {
                    // 从 window 对象获取函数
                    newOn[eventName] = () => {
                        const fn = (window as any)[handler]
                        if (typeof fn === 'function') {
                            fn()
                        } else {
                            console.warn(`函数 ${handler} 未定义`)
                        }
                    }
                } else {
                    newOn[eventName] = handler as Function
                }
            }
            newRule.on = newOn
        }
    
        if (newRule.dataKey) {
            const keys = newRule.dataKey.split('.')
            let value: any = data
            for (const key of keys) {
                value = value?.[key]
            }
      
            if (newRule.type === 'el-table' && newRule.props) {
                newRule.props.data = value
            } else if (newRule.children && Array.isArray(newRule.children)) {
                // 确保值被转换为字符串
                newRule.children = [String(value)]
            } else if (newRule.options !== undefined) {
                newRule.options = value
            } else if (newRule.value !== undefined) {
                newRule.value = value
            }
        }
    
        if (newRule.children && Array.isArray(newRule.children)) {
            newRule.children = newRule.children.map(child => {
                if (typeof child === 'string' || typeof child === 'number') {
                    return String(child)
                }
                return bindDataToRules([child], data)[0]
            })
        }
    
        return newRule
    })
}

// 加载页面配置
const loadPageConfig = async () => {
    loading.value = true
    error.value = ''
    
    try {
        // 优先从 meta.pageId 获取，其次从路由参数，最后从路由名称
        const pageId = (route.meta.pageId as string) || 
                      (route.params.id as string) || 
                      route.name as string
        
        if (!pageId) {
            throw new Error('无法确定页面ID')
        }
        
        const config = await getPageConfig(pageId)
    
        console.log(`✅ 加载页面配置 [${pageId}]:`, config)
    
        // 先执行脚本（注入全局函数）
        if (config.script) {
            try {
                const scriptFn = new Function(config.script)
                scriptFn()
                console.log('✅ 页面脚本执行成功')
            } catch (err) {
                console.error('❌ 页面脚本执行失败:', err)
            }
        }
    
        // 绑定数据到 rules
        pageRules.value = bindDataToRules(config.rule, config.data)
    
        // 加载页面样式
        pageStyle.value = config.style || ''
    } catch (err: any) {
        error.value = err.message || '加载页面配置失败'
        console.error('❌ 获取页面配置失败:', err)
    } finally {
        loading.value = false
    }
}

// 监听路由变化，重新加载配置
watch(() => route.path, () => {
    loadPageConfig()
})

onMounted(() => {
    loadPageConfig()
})
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
  color: #409eff;
}

.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #f56c6c;
}

.error h3 {
  margin-bottom: 10px;
}
</style>
