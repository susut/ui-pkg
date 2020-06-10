<template>
    <div class="contentWrapper">
        <div class="componentsMessage">
            <slot></slot>
            <transition>
                <pre v-if="showCode"><code><slot name="codeText"></slot></code></pre>
            </transition>
        </div>
        <div class="displayCode" @click="showCode=!showCode">▼ <span>显示代码</span></div>
    </div>
</template>

<script>
    export default {
        name: "common-block",
        data() {
            return {
                showCode: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contentWrapper{
        &:hover{
            box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.2);
            .dispalyCode{
                background-color: #f9fafc;
                color: rgb(194, 194, 194);
            }
        }
        .componentsMessage{
            border:1px solid #ebebeb;
            padding: 20px 20px 20px;
            overflow: hidden;
        }
        .displayCode{
            margin-top: -1px;
            height: 30px;
            background-color: #fff;
            border:1px solid #ebebeb;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            margin-bottom: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color:#ebebeb;
            font-size: 12px;
            > span{
                font-size: 12px;
                padding-left: 6px;
            }
        }
    }
</style>
