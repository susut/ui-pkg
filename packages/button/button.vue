<template>
    <button class="fd-button" :class="[type]">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "fd-button",
    props: {
        type: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
    .fd-button {
        color: gray;
        &.primary {
            color: lightblue;
        }
        &.danger {
            color: palevioletred;
        }
    }
</style>

