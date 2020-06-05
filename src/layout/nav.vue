<template>
    <div class="side-nav">
        <div v-for="(title, index1) in Object.keys(data)" class="group-container" :key="index1">
            <p class="side-nav-title">{{title}}</p>
            <div class="side-nav-items" v-for="(nav, index2) in data[title]" :key="index2">
                <router-link :to="{name: nav.name}" v-if="nav.name" :class="$route.name===nav.name ? 'active' : ''">{{nav.desc}}</router-link>
                <p v-else class="side-nav-group">{{nav.desc}}</p>
                <div v-for="(item, index3) in nav.items" :key="index3">
                    <router-link :to="{name: item.name}" :class="$route.name===item.name? 'active': ''" class="side-nav-component">{{item.desc}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navConf from '../menu.config.json'
    export default {
        data () {
            return {
                data: navConf
            }
        },
    }
</script>
