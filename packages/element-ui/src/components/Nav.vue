<template>
    <el-menu class="_fd-nav" :class="{'_fc-child-empty' : !$slots.default}" v-bind="$attrs">
        <slot name="default"></slot>
    </el-menu>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'fcNav',
});
</script>

<style>
._fd-nav {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    min-height: 40px;
}
._fd-nav._fc-child-empty {
    border: 1px dashed #dcdfe6;
    min-height: 60px;
}
._fd-nav :deep(.el-menu-item) {
    position: relative !important;
}
</style>
