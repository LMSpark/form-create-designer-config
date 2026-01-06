<template>
    <el-menu-item v-bind="$attrs">
        <slot name="default"></slot>
    </el-menu-item>
</template>

<script>
import {defineComponent, inject, provide, reactive} from 'vue';

export default defineComponent({
    name: 'fcMenuItem',
    setup() {
        // 尝试获取 menu 上下文，如果不存在则提供一个默认的
        const rootMenu = inject('rootMenu', null);
        
        if (!rootMenu) {
            // 提供一个模拟的 rootMenu 上下文以避免错误
            const mockRootMenu = reactive({
                props: {
                    mode: 'horizontal',
                    defaultActive: '1'
                },
                register: () => {},
                unregister: () => {},
                activeIndex: '1'
            });
            provide('rootMenu', mockRootMenu);
        }
        
        return {};
    }
});
</script>
