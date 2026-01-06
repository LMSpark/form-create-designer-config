import { MockMethod } from 'vite-plugin-mock'
import routes from './routes.json'

// 动态导入页面配置
const loadPageConfig = (pageId: string, type: 'rule' | 'data' | 'script' | 'style') => {
  try {
    // JSON 文件使用 require
    if (type === 'rule' || type === 'data') {
      const config = require(`./pages/${pageId}/${type}.json`)
      return config
    }
    
    // script 和 style 从 config.json 读取
    if (type === 'script' || type === 'style') {
      try {
        const config = require(`./pages/${pageId}/config.json`)
        return config[type] || null
      } catch {
        return null
      }
    }
    
    return null
  } catch (error) {
    console.warn(`⚠️ 未找到页面配置: pages/${pageId}/${type}`)
    return type === 'rule' ? [] : type === 'data' ? {} : null
  }
}

export default [
  {
    url: '/api/getPageConfig/:pageId',
    method: 'get',
    response: ({ query }: any) => {
      const pageId = query.pageId || 'home'
      
      return {
        code: 200,
        message: 'success',
        data: {
          rule: loadPageConfig(pageId, 'rule'),
          data: loadPageConfig(pageId, 'data'),
          script: loadPageConfig(pageId, 'script'),
          style: loadPageConfig(pageId, 'style')
        }
      }
    }
  },
  {
    url: '/api/getRoutes',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: routes
      }
    }
  }
] as MockMethod[];
