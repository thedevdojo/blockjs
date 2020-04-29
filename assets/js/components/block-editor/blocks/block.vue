<template>
	<p class="textBlock contentEditable" ref="textBlock" contenteditable placeholder="Start Typing Here" @blur="updateContent" v-html="fullContent()" @keydown.delete="backSpaceDown" @keyup.delete="backSpace" @keydown.tab.prevent="tabPress"></p>
</template>

<script>

    export default {
        props: ['content', 'type', 'index'],
        data: function () {
            return {
                lastCharDel: false
            }
        },
        mounted() {},
        methods: {
            fullContent() {
                var returnContent = '';
                this.content.forEach(function (cont) {
                    returnContent += cont.content;
                });
                return returnContent;
            },
            updateContent(evt) {
                this.$emit('contentUpdated', {
                    index: this.index,
                    content: this.$el.innerText
                });
            },
            newLine(e) {
                var textNextLine = "";
                if (this.type == 'textBlock') {
                    if (typeof e !== 'undefined' && typeof e.target !== 'undefined' && e.target.innerText) {
                        textNextLine = e.target.innerText.substring(this.getCaretPosition(), e.target.innerText.length);
                        e.target.innerText = e.target.innerText.substring(0, this.getCaretPosition());
                    }
                }
                this.$emit('newBlock', {
                    type: "textBlock",
                    content: [{
                        type: "text",
                        text: textNextLine
                    }]
                });
            },
            backSpaceDown(e) {
                // check if content has new line
                var contentEmpty = false;
                if (e.target.textContent === "") {
                    contentEmpty = true;
                }
                if (this.getCaretPosition() < 1) {
                    this.lastCharDel = true;
                }
            },
            backSpace(e) {
                if (this.getCaretPosition() < 1 && this.lastCharDel) {
                    this.$emit('backSpace');
                }
                if (this.lastCharDel) {
                    this.lastCharDel = false;
                }
            },
            boldSelection: function () {
                this.restoreSelection();
                document.execCommand('bold');
                this.generateJSONfromHTML();

            },
            stringToDocumentFragment(html) {
                var frag = document.createDocumentFragment();
                var div = document.createElement('div');
                div.innerHTML = html;
                while (div.firstChild) {
                    frag.appendChild(div.firstChild);
                }
                return frag;
            },
            getCaretPosition(el) {
                if (typeof el === 'undefined') {
                    var editableDiv = this.$el;
                } else {
                    var editableDiv = el;
                }

                var caretPos = 0,
                    sel, range;
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        if (range.commonAncestorContainer.parentNode == editableDiv) {
                            caretPos = range.endOffset;
                        }
                    }
                } else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange();
                    if (range.parentElement() == editableDiv) {
                        var tempEl = document.createElement("span");
                        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
                        var tempRange = range.duplicate();
                        tempRange.moveToElementText(tempEl);
                        tempRange.setEndPoint("EndToEnd", range);
                        caretPos = tempRange.text.length;
                    }
                }
                return caretPos;
            },
            setCaretAtEnd(el) {
                if (typeof el === 'undefined') {
                    var el = this.$el;
                }
                el.focus();
                if (typeof window.getSelection != "undefined" &&
                    typeof document.createRange != "undefined") {
                    var range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    sel.modify("move", "backward", "character");
                    sel.modify("move", "forward", "character");

                } else if (typeof document.body.createTextRange != "undefined") {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(el);
                    textRange.collapse(false);
                    textRange.select();
                }
            },
            setCaretPos(elem, pos) {
                var range = document.createRange();
                range.setStart(elem.firstChild, pos);
                range.setEnd(elem.firstChild, pos);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            },
            selectAll(el) {
                if (typeof el === 'undefined') {
                    var el = this.$el;
                }
                var range = document.createRange();
                range.selectNodeContents(el);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            },
            restoreSelection(el) {

                if (typeof el === 'undefined') {
                    var el = this.$el;
                }
                var range = document.createRange();

                if (lastSelectedRange != null) {
                    var startIndex = lastSelectedRange.start;
                    var endIndex = lastSelectedRange.end;
                    if (lastSelectedRange.start > lastSelectedRange.end) {
                        startIndex = lastSelectedRange.end;
                        endIndex = lastSelectedRange.start;
                    }

                    var startNode = el.firstChild;
                    var endNode = el.firstChild;

                    range.setStart(startNode, startIndex); // 6 is the offset of "world" within "Hello world"
                    range.setEnd(endNode, endIndex); // 7 is the length of "this is"
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            },
            tabPress(e) {
                var editor = e.target;
                var doc = editor.ownerDocument.defaultView;
                var sel = doc.getSelection();
                var range = sel.getRangeAt(0);

                var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
                range.insertNode(tabNode);

                range.setStartAfter(tabNode);
                range.setEndAfter(tabNode);
                sel.removeAllRanges();
                sel.addRange(range);
            },
            keyDownEvent(e) {
                if ((e.shiftKey && e.keyCode == 188) || (e.shiftKey && e.keyCode == 190)) {
                    e.preventDefault();
                }

                this.arrowKeyUp(e);
                this.arrowKeyDown(e);
                this.arrowKeyRight(e);
                this.arrowKeyLeft(e);
            },
            arrowKeyUp(e, item_index) {
                if (e.keyCode == 38) {
                    var that = this;
                    var thatItemIndex = item_index;
                    Vue.nextTick(function () {
                        if (window.getSelection().anchorOffset == 0) {
                            e.preventDefault();
                            if (typeof thatItemIndex != 'undefined') {
                                that.$emit('upArrowKey', {
                                    index: that.index,
                                    item_index: thatItemIndex
                                });
                            } else {
                                that.$emit('upArrowKey', {
                                    index: that.index
                                });
                            }
                        }
                    });
                }
            },
            arrowKeyDown(e, item_index) {
                if (e.keyCode == 40) {
                    var that = this;
                    var thatItemIndex = item_index;
                    Vue.nextTick(function () {
                        var curSelection = window.getSelection();
                        if (curSelection.anchorOffset == curSelection.baseNode.length) {
                            e.preventDefault();
                            if (typeof thatItemIndex != 'undefined') {
                                that.$emit('downArrowKey', {
                                    index: that.index,
                                    item_index: thatItemIndex
                                });
                            } else {
                                that.$emit('downArrowKey', {
                                    index: that.index
                                });
                            }
                        }
                    });
                }
            },
            arrowKeyRight(e, item_index) {
                if (e.keyCode == 39) {
                    var curSelection = window.getSelection();
                    if (curSelection.anchorOffset == (curSelection.baseNode.length)) {
                        e.preventDefault();
                        if (typeof item_index != 'undefined') {
                            this.$emit('rightArrowKey', {
                                index: this.index,
                                item_index: item_index
                            });
                        } else {
                            this.$emit('rightArrowKey', {
                                index: this.index
                            });
                        }
                    }
                }
            },
            arrowKeyLeft(e, item_index) {
                if (e.keyCode == 37) {
                    if (window.getSelection().anchorOffset == 0) {
                        e.preventDefault();
                        if (typeof item_index != 'undefined') {
                            this.$emit('leftArrowKey', {
                                index: this.index,
                                item_index: item_index
                            });
                        } else {
                            this.$emit('leftArrowKey', {
                                index: this.index
                            });
                        }
                    }
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'textBlock.scss';
</style>