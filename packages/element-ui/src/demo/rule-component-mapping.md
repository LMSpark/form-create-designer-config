# form-create Rule 与组件配对关系总结

## 核心映射规则

### 1. type → 组件名称
```javascript
{
  type: 'el-menu'        // 对应 <el-menu>
  type: 'el-sub-menu'    // 对应 <el-sub-menu>
  type: 'el-menu-item'   // 对应 <el-menu-item>
  type: 'template'       // 对应 <template>
}
```

### 2. props → 组件属性
```javascript
{
  type: 'el-menu',
  props: {
    mode: 'horizontal',   // 对应 <el-menu mode="horizontal">
    class: 'simple-nav',  // 对应 class="simple-nav"
    ellipsis: false       // 对应 :ellipsis="false"
  }
}
```

### 3. children → 子内容/子组件
```javascript
{
  type: 'el-menu',
  children: [
    // 方式1: 嵌套组件对象
    {
      type: 'el-menu-item',
      children: ['首页']  // 方式2: 纯文本数组
    }
  ]
}
```

### 4. on → 事件监听
```javascript
{
  type: 'el-menu-item',
  on: {
    click: () => onNavClick(nav)  // 对应 @click="onNavClick"
  }
}
```

### 5. slot → 插槽
```javascript
{
  type: 'template',
  slot: 'title',        // 对应 <template #title>
  children: ['文档']
}
```

### 6. field → 表单字段名
```javascript
{
  type: 'el-menu',
  field: '__nav__'      // 在表单模式下的字段标识
}
```

---

## 完整示例对照

### DSL 配置 (Rule)
```javascript
{
  type: 'el-sub-menu',
  props: { index: 'doc' },
  children: [
    {
      type: 'template',
      slot: 'title',
      children: ['文档']
    },
    {
      type: 'el-menu-item',
      props: { index: 'doc-api' },
      on: {
        click: () => console.log('clicked')
      },
      children: ['API 文档']
    }
  ]
}
```

### 等价的 Vue 模板
```vue
<el-sub-menu index="doc">
  <template #title>文档</template>
  <el-menu-item index="doc-api" @click="console.log('clicked')">
    API 文档
  </el-menu-item>
</el-sub-menu>
```

---

## 关键点

1. **type 必须匹配组件注册名**（Element Plus 使用 `el-` 前缀）
2. **props 对象内的属性会直接传递给组件**
3. **children 支持多种格式**：
   - 字符串数组：`['文本']`
   - 对象数组：嵌套组件配置
   - 混合数组
4. **on 对象的 key 是事件名**（不需要 `@` 前缀）
5. **slot 用于具名插槽**，配合 `type: 'template'` 使用

---

## 递归渲染模式

```javascript
const renderMenuItem = (nav) => {
  if (nav.children?.length > 0) {
    return {
      type: 'el-sub-menu',
      props: { index: nav.id },
      children: [
        { type: 'template', slot: 'title', children: [nav.name] },
        ...nav.children.map(child => renderMenuItem(child)) // 递归
      ]
    }
  }
  return {
    type: 'el-menu-item',
    props: { index: nav.id },
    children: [nav.name]
  }
}
```

这种模式可以处理任意深度的树形结构。
