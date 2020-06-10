<template>
    <common-block>
        <ui-button type="primary">primary</ui-button>
        <ui-button type="danger">danger</ui-button>
        <template slot="codeText"><div v-html="html"></div></template>
    </common-block>
</template>

<script>
    import UiButton from '../../../packages/button';
    import CommonBlock from "./common-block";

    export default {
        name: "button-demo",
        components: {
            CommonBlock,
            UiButton
        },
        data() {
            return {
                codeText:
`<ui-button type="primary">primary</ui-button>
<ui-button type="danger">danger</ui-button>`
            }
        },
        computed: {
            html() {
                return `${this.prism(this.codeText, 'html')}`;
            }
        }
    }
</script>

<style scoped>

</style>
