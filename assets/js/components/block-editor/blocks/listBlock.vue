<template>
    <component :is="el" class="listBlock">
        <template v-for="(item, list_index) in content">
            <li class="contentEditable" ref="list_item" :id="list_index" contenteditable placeholder="Start Typing Here" @keydown.enter.prevent="newItem(list_index)" @keydown.delete="backSpaceDownList(list_index)" @keyup.delete="backSpaceList(list_index)" @blur="updateContentItem(list_index)" @keydown="keyDownEvent($event, list_index)" v-html="item.content"></li>
        </template>
    </component>
</template>

<script>

    import block from './block.vue';

    export default {
        extends: block,
        props: ['content', 'el', 'index'],
        data: function () {
            return {
                lastCharDel: false
            }
        },
        mounted() {

        },
        methods: {
            newItem(list_index) {
                if (this.getCaretPosition(this.$refs.list_item[list_index]) < 1) {
                    this.content.splice(list_index, 1);
                    this.newLine();
                } else {
                    this.$emit('addContentItem', {
                        index: this.index,
                        item_index: list_index,
                        content: {
                            type: "list_item",
                            text: ""
                        }
                    });
                    //this.content.splice(list_index+1, 0, this.newListItem);

                    var references = this.$refs;
                    var thisListIndex = list_index;
                    var that = this;

                    Vue.nextTick(function () {
                        that.$refs.list_item[thisListIndex + 1].focus();
                    });
                }
            },
            backSpaceList(list_index) {
                if (this.getCaretPosition(this.$refs.list_item[list_index]) < 1 && this.lastCharDel) {
                    if (typeof this.$refs.list_item[list_index - 1] !== 'undefined') {
                        this.$refs.list_item[list_index - 1].focus();
                        this.setCaretAtEnd(this.$refs.list_item[list_index - 1]);
                    }
                    this.content.splice(list_index, 1);
                }
                if (this.lastCharDel) {
                    if (this.content.length == 0) {
                        this.$emit('backSpace');
                    }
                    this.lastCharDel = false;
                }
            },
            backSpaceDownList(list_index) {
                if (this.getCaretPosition(this.$refs.list_item[list_index]) < 1) {
                    this.lastCharDel = true;
                }
            },
            updateContentItem(list_index) {
                this.$emit('contentUpdatedItem', {
                    type: "list_item",
                    index: this.index,
                    item_index: list_index,
                    content: this.$refs.list_item[list_index].innerText
                });
            },
            keyDownEvent(e, list_index) {
                this.arrowKeyUp(e, list_index);

                if (e.keyCode == 40 && list_index == (this.content.length - 1)) {
                    list_index = undefined;
                }
                this.arrowKeyDown(e, list_index);
                this.arrowKeyRight(e, list_index);
                // lastLeftKeyContentEditable = false;
                this.arrowKeyLeft(e, list_index);
            }
        },
        computed: {
            listBlockClass() {
                return 'listBlock listBlock-' + (this.index);
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'listBlock.scss';
</style>