<template>
    <button class="ui-button" :class="[type]">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "ui-button",
    props: {
        type: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
    .ui-button {
        color: gray;
        &.primary {
            color: lightblue;
        }
        &.danger {
            color: palevioletred;
        }
    }
</style>

