<template>
    <div class="docs-demo-wrapper">
        <!-- source插槽，放置md格式文件解析出的html字符串，渲染组件的显示效果 -->
        <slot name="source"></slot>
        <div :style="{height: isExpand ? 'auto' : '0'}" class="demo-container">
            <div span="14">
                <div class="docs-demo docs-demo--expand">
                    <div class="highlight-wrapper">
                        <div class="description" v-if="$slots.default">
                            <!-- 默认插槽，放置描述文字，例md文件中：:::demo 后面的描述文字 -->
                            <slot></slot>
                        </div>
                        <!-- highlight插槽，放置md文件中的示例代码 -->
                        <slot name="highlight"></slot>
                    </div>
                </div>
            </div>
        </div>
        <span class="docs-trans docs-demo__triangle" @click="toggle">{{isExpand ? '隐藏代码' : '显示代码'}}</span>
    </div>
</template>

<script>
    export default {
        name: "demo-block",
        data() {
            return {
                isExpand: false
            }
        },
        methods: {
            toogle() {
                this.isExpand = !this.isExpand;
            }
        }
    }
</script>

<style scoped>

</style>
