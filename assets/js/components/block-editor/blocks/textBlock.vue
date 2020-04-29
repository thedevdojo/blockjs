<template>
	<medium-editor :text="fullContent()" :reuse-medium-editor-instance="false" ref="editor" autofocus :options="{ disableReturn:true, placeholder: false }" @editorCreated="handleEditorCreated"></medium-editor>
</template>

<script>

    import block from './block.vue';
    import editor from 'vue2-medium-editor';
    import helpers from '../utilities/helpers.js';
    import {
        EventBus
    } from '../events/event-bus.js';

    export default {
        extends: block,
        props: ['content', 'index'],
        data: function () {
            return {
                lastCharDel: false,
                editor: null,
                focused: false,
                editorVisible: false,
                api: null,
            }
        },
        components: {
            'medium-editor': editor
        },
        mounted() {
            
        },
        created() {

        },
        methods: {
            fullContent() {
                return htmlToJson.stringify(this.content);
            },
            handleEditorCreated(editor) {
                var that = this;

                editor.subscribe('focus', function () {
                    EventBus.$emit('textBlockFocused', {
                        index: that.index,
                        html: htmlToJson.parse(that.$refs.editor.api.getContent()),
                        text: helpers.strip_tags(that.$refs.editor.api.getContent())
                    });
                    console.log(that.$refs.editor.api.getContent());
                });

                editor.subscribe('blur', function () {
                    that.$emit('contentUpdated', {
                        index: that.index,
                        content: htmlToJson.parse(that.$el.innerHTML)
                    });
                });

                editor.subscribe('editableKeyup', function (evt) {
                    
                    
                    var editorContents = helpers.strip_tags(that.$refs.editor.api.getContent());
                    EventBus.$emit('keyUp', {
                        event: evt,
                        index: that.index,
                        content: editorContents
                    });

                    // if the editor has empty tags we will remove them
                    if (editorContents == "") {
                        that.$refs.editor.api.setContent("", 0);
                    }

                });

                editor.subscribe('editableKeydown', function (evt) {
                    
                    if (evt.key != "Enter") {
                        var editorContents = helpers.strip_tags(that.$refs.editor.api.getContent());
                        EventBus.$emit('keyDown', {
                            event: evt,
                            index: that.index,
                            content: editorContents
                        });
                    }

                    var editorContents = helpers.strip_tags(that.$refs.editor.api.getContent());
                    if (editorContents == "") {
                        that.$refs.editor.api.setContent("", 0);
                    }

                });

            },
            setFocus() {
                this.$refs.editor.$el.focus();
            },
            setBlur(){
                this.$refs.editor.$el.blur();
            }
        }
    }

</script>

<style lang="scss">
    @import 'textBlock.scss';
</style>