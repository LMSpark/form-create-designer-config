// 页面初始化逻辑
export default {
    onMounted() {
        console.log('工作台页面已加载')
    },
  
    methods: {
        handleSubmit(formData) {
            console.log('表单提交:', formData)
            // 可以在这里添加自定义逻辑
        }
    }
}
