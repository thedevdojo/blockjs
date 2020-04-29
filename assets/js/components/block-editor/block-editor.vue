<template>
    <div id="blockjs">
        <draggable v-model="blocks" :options="{ handle: '.reorder' }" @end="updatedOrder">
            <div v-for="(block, index) in blocks" :class="blockClass(block, index)" ref="block"
                @mouseover="hoverBlock(block)" :data-type="block.type" @click="setActive(index)">

                <div :class="actionClass(block)">
                    <div class="delete" @click="deleteBlock(index)"><svg width="46px" height="46px" viewBox="0 0 46 46"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="close-btn" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path
                                    d="M44.3099412,7.1900588 C45.7956196,5.7043804 45.7930017,3.2930017 44.3144479,1.8144479 L44.1855521,1.6855521 C42.7023626,0.2023626 40.3004177,0.1995823 38.8099412,1.6900588 L23.7026315,16.7973685 C23.3145788,17.1854212 22.6788979,17.1788979 22.2973685,16.7973685 L7.1900588,1.6900588 C5.7043804,0.2043804 3.2930017,0.2069983 1.8144479,1.6855521 L1.6855521,1.8144479 C0.2023626,3.2976374 0.1995823,5.6995823 1.6900588,7.1900588 L16.7973685,22.2973685 C17.1854212,22.6854212 17.1788979,23.3211021 16.7973685,23.7026315 L1.6900588,38.8099412 C0.2043804,40.2956196 0.2069983,42.7069983 1.6855521,44.1855521 L1.8144479,44.3144479 C3.2976374,45.7976374 5.6995823,45.8004177 7.1900588,44.3099412 L22.2973685,29.2026315 C22.6854212,28.8145788 23.3211021,28.8211021 23.7026315,29.2026315 L38.8099412,44.3099412 C40.2956196,45.7956196 42.7069983,45.7930017 44.1855521,44.3144479 L44.3144479,44.1855521 C45.7976374,42.7023626 45.8004177,40.3004177 44.3099412,38.8099412 L29.2026315,23.7026315 C28.8145788,23.3145788 28.8211021,22.6788979 29.2026315,22.2973685 L44.3099412,7.1900588 Z"
                                    id="delete" fill="#000000"></path>
                            </g>
                        </svg></div>
                    <div class="reorder"><svg width="58px" height="90px" viewBox="0 0 58 90" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path
                                    d="M29,3.55271368e-15 C21.5403794,-4.71689405e-07 14.3864315,2.96400655 9.11262094,8.23969253 C3.83881043,13.5153785 0.877347219,20.6703798 0.88,28.13 L0.88,61.88 C1.16900869,77.2063192 13.6759561,89.4796463 29.005,89.4796463 C44.3340439,89.4796463 56.8409913,77.2063192 57.13,61.88 L57.13,28.13 C57.1326539,20.6686469 54.1698182,13.5121293 48.8938445,8.23615553 C43.6178707,2.96018181 36.4613531,-0.0026538694 29,3.55271368e-15 Z M6.5,28.13 C6.5,15.7035931 16.5735931,5.63 29,5.63 C41.4264069,5.63 51.5,15.7035931 51.5,28.13 L51.5,42.19 L6.5,42.19 L6.5,28.13 Z M37.85,59 L39.84,61 C40.1062537,61.2646648 40.2559678,61.6245822 40.2559678,62 C40.2559678,62.3754178 40.1062537,62.7353352 39.84,63 L29,73.83 L18.14,63 C17.8737463,62.7353352 17.7240322,62.3754178 17.7240322,62 C17.7240322,61.6245822 17.8737463,61.2646648 18.14,61 L20.14,59 C20.4046648,58.7337463 20.7645822,58.5840322 21.14,58.5840322 C21.5154178,58.5840322 21.8753352,58.7337463 22.14,59 L29,65.87 L35.85,59 C36.1146648,58.7337463 36.4745822,58.5840322 36.85,58.5840322 C37.2254178,58.5840322 37.5853352,58.7337463 37.85,59 Z M29,84.38 C16.580445,84.3634736 6.51652638,74.299555 6.5,61.88 L6.5,47.81 L51.5,47.81 L51.5,61.88 C51.4834736,74.299555 41.419555,84.3634736 29,84.38 Z M29,16.41 L39.86,27.23 C40.1262537,27.4946648 40.2759678,27.8545822 40.2759678,28.23 C40.2759678,28.6054178 40.1262537,28.9653352 39.86,29.23 L37.86,31.23 C37.5953352,31.4962537 37.2354178,31.6459678 36.86,31.6459678 C36.4845822,31.6459678 36.1246648,31.4962537 35.86,31.23 L29,24.37 L22.16,31.25 C21.8953352,31.5162537 21.5354178,31.6659678 21.16,31.6659678 C20.7845822,31.6659678 20.4246648,31.5162537 20.16,31.25 L18.16,29.25 C17.8937463,28.9853352 17.7440322,28.6254178 17.7440322,28.25 C17.7440322,27.8745822 17.8937463,27.5146648 18.16,27.25 L29,16.41 Z"
                                    id="Shape" fill="#000000" fill-rule="nonzero"></path>
                            </g>
                        </svg></div>
                </div>

                <component ref="blockComponent" v-bind:is="block.type" v-bind:blocks="blocks" :content="block.content"
                    :el="block.el" :type="block.type" :index="index" @contentUpdated="block.content = $event.content"
                    :data-index="index"
                    @addContentItem="addContentItem($event)" @contentUpdatedItem="contentUpdatedItem($event)"
                    @upArrowKey="upArrowKey($event)" @downArrowKey="downArrowKey($event)"
                    @leftArrowKey="leftArrowKey($event)" @rightArrowKey="rightArrowKey($event)"
                    @contentFocused="contentFocused($event)" keep-alive></component>
                <template v-if="blocks.length == 1 && firstBlockEmpty"><span class="placeholder">Begin writing your post...</span></template>

                <template v-show="block.changeBlock">
                    <addButton :totalblocks="blocks.length-1" ref="button" :data-index="index" class="addButton" :index="index"
                        :menuVisible="block.changeBlockMenu"></addButton>
                </template>

            </div>
        </draggable>
    </div>
</template>

<script>
    
    import draggable from 'vuedraggable'
    import textBlock from './blocks/textBlock.vue';
    import imageBlock from './blocks/imageBlock.vue';
    import listBlock from './blocks/listBlock.vue';
    import codeBlock from './blocks/codeBlock.vue';
    import dividerBlock from './blocks/dividerBlock.vue';
    import addButton from './utilities/addButton.vue';
    import axios from 'axios';
    import definitions from './utilities/definitions.js';
    import methods from './utilities/methods.js';
    import {
        EventBus
    } from './events/event-bus.js';
    import eventListeners from './events/event-listeners.js';

    const data = {
        blocks: [],
        firstBlockEmpty: true,
        activeBlockIndex: 0,
        disableKeys: false,
        metaKeyDown: false
    };

    export default {
        data: function () {
            return data;
        },
        mounted() {
            if (typeof (postContent) !== 'undefined' && postContent && postContent.length > 0) {
                this.blocks = postContent;
            } else {
                this.blocks.push(definitions.text());
                this.blocks[0].lastHovered = true;
                var that = this;
                Vue.nextTick(function(){
                    that.getBlockWithIndex(0).setFocus();
                });
            }
            eventListeners.listen(EventBus, this);

            window.addEventListener('keydown', function (event) {
                EventBus.$emit('globalKeyDown', {
                    event: event
                });
            });

            window.addEventListener('keyup', function (event) {
                EventBus.$emit('globalKeyUp', {
                    event: event
                });
            });
        },
        components: {
            textBlock,
            draggable,
            addButton,
            imageBlock,
            listBlock,
            codeBlock,
            dividerBlock
        },
        methods: {
            createNewBlock: function () {
                var that = this;
                var nextIndex = parseInt(this.activeBlockIndex) + 1;
                this.blocks.splice(nextIndex, 0, definitions.text());
                
                Vue.nextTick(function () {
                    that.getBlockWithIndex(nextIndex).setFocus();
                });
            },
            deleteBlock: function (index) {
                EventBus.$emit('deleteBlock', { index: index });
            },
            buttonClick: function (eventData) {
                switch (eventData.type) {
                    case 'imageSearch':
                        this.imageSearch = true;
                        this.imageSearchIndex = eventData.index;
                        var that = this;
                        Vue.nextTick(function () {
                            that.$refs.imageSearchInput.focus();
                        });
                        break;
                    default:
                        break;
                }
            },
            getBlockWithIndex(index){
                var block = this.$refs.blockComponent[0];
                for(var i = 0; i < this.$refs.blockComponent.length; i++){
                    if(this.$refs.blockComponent[i].$el.dataset.index == index){
                        block = this.$refs.blockComponent[i];
                    }
                }
                return block;
            },
            getActiveBlock(){
                return this.getBlockWithIndex( this.activeBlockIndex );
            },
            getBlockButtonWithIndex(index){
                var button = this.$refs.button[0];
                for(var i = 0; i < this.$refs.button.length; i++){
                    if(this.$refs.button[i].$el.dataset.index == index){
                        button = this.$refs.button[i];
                    }
                }
                return button;
            },
            getActiveBlockButton(){
                return this.getBlockButtonWithIndex( this.activeBlockIndex );
            },
            setActive(index) {
                this.activeBlockIndex = index;
            },
            addContentItem(event) {
                console.log(event.index + ' : ' + this.blocks[event.index]);
                this.blocks[event.index].content.splice(event.item_index + 1, 0, event.content);
            },
            contentUpdated(e) {
                if (this.blocks[e.index].content) {
                    this.blocks[e.index].content = e.content;
                }
            },
            contentUpdatedItem(e) {
                if (this.blocks[e.index].content[e.item_index]) {
                    this.blocks[e.index].content[e.item_index].content = e.content;
                }
            },
            changeToQuote(index) {
                this.blocks[index].el = 'blockquote';
            },
            changeToParagraph(index) {
                this.blocks[index].el = 'p';
            },
            changeToHeadline(index) {
                this.blocks[index].el = 'h2';
            },
            changeToSubHeadline(index) {
                this.blocks[index].el = 'h3';
            },
            boldSelection(index) {
                this.getBlockWithIndex(index).boldSelection();
            },
            updatedOrder() {

            },
            upArrowKey(e) {
                this.setCursorInPreviousBlock(e);
            },
            downArrowKey(e) {
                this.setCursorInNextBlock(e);
            },
            rightArrowKey(e) {
                this.setCursorInNextBlock(e, true);
            },
            leftArrowKey(e) {
                this.setCursorInPreviousBlock(e);

            },
            actionClass(block) {
                return 'actions ' + block.type;
            },
            blockClass(block, index) {
                var className = 'block ' + block.type + ' index-' + index + ' ';
                if (block.lastHovered) {
                    className += 'last-hovered ';
                }
                if (this.activeBlockIndex == index) {
                    className += 'activeBlock';
                }
                return className;
            },
            hoverBlock(block) {

                if (!this.isMenuOpened() && block.type == 'textBlock' && block.isEmpty) {
                    this.setBlockLastHovered(block);
                }
            },
            setBlockLastHovered(block) {
                for (var i = 0; i < this.blocks.length; i++) {
                    this.blocks[i].lastHovered = false;
                }
                block.lastHovered = true;
            },
            isMenuOpened() {
                for (var i = 0; i < this.blocks.length; i++) {
                    if (this.blocks[i].changeBlockMenu) {
                        return true;
                    }
                }
                return false;
            },
            changeBlockClass(index) {
                if (this.getBlockWithIndex(index).changeBlock) {
                    return 'addButton showButton';
                }
                return 'addButton showButton';
            }
        },
        computed: {
            setImageExpandImg() {
                return 'background-image:url(' + this.imageExpandSrc + ')';
            }
        },
        watch: {
            blocks: {
                handler(val) {
                    this.$emit('update', this.blocks);
                },
                deep: true
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'block-editor.scss';
</style>
