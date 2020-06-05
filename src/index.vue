<template>
    <div>
        <Nav />
        <router-view></router-view>
    </div>
</template>

<script>
    import Nav from '@/layout/nav';
export default {
    name: 'index',
    components: {
        Nav
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    color: gray;
    .img {
        width: 100%;
    }
}
</style>
