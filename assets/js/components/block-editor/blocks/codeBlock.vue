<template>
    <div>
        <div class="codeBlockEditor">
            <select v-model="content[0].lang">
                <template v-for="lang in langs">
                    <option :value="lang">{{ lang }}</option>
                </template>
            </select>
            <editor v-model="content[0].content" @init="editorInit" :lang="content[0].lang" theme="monokai" width="100%" height="100"></editor>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['content', 'el', 'index'],
        data: function () {
            return {
                editor: null,
                langs: ['html', 'css', 'javascript', 'php', 'python', 'ruby', 'golang', 'sql', 'markdown', 'text'],
                selected_lang: 'html',
            }
        },
        components: {
            editor: require('vue2-ace-editor'),
        },
        mounted() {
            //hljs.highlightBlock(this.$refs.codeBlockResult);
        },
        methods: {
            newLine(e) {
                this.$emit('newBlock', {
                    type: "textBlock",
                    content: [{
                        type: "text",
                        text: ""
                    }]
                });
            },
            changeLang(e) {
                console.log(e);
            },
            editorInit(editor) {
                require('brace/ext/language_tools') //language extension prerequsite...
                require(['emmet/emmet'], function (data) { // this is huge. so require it async is better
                    window.emmet = data.emmet;
                });

                require('brace/mode/html')
                require('brace/mode/css')
                require('brace/mode/javascript')
                require('brace/mode/php')
                require('brace/mode/python')
                require('brace/mode/ruby')
                require('brace/mode/golang')
                require('brace/mode/sql')
                require('brace/mode/markdown')
                require('brace/mode/text')
                require('brace/theme/monokai')

                editor.renderer.setShowGutter(false);
                editor.setShowPrintMargin(false);
                editor.renderer.setHighlightGutterLine(false);
                editor.setOption("highlightActiveLine", false);
                editor.setOption("fontSize", '15px');
                editor.setOption('maxLines', 'Infinity');
                editor.focus();
                this.editor = editor;

            }
        }
    }

</script>

<style lang="scss">
    @import 'codeBlock.scss';
</style>