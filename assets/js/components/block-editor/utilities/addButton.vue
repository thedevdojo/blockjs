<template>
	<div id="container" :class="buttonClass">
		<button @click="buttonClicked()">
	        <div>
	        	<ul>
                    <template v-if="visibleBlocks.image">
                        <li :class="blockClass('image')" @click="changeBlock('image')" @mouseover="setActiveBlock('image')">
                            <!--input type="file" ref="fileInput" name="imageUploadInput" class="imageUploadInput" @change="fileInputChange('')"-->	        			                        
                            <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="picture">
                                        <path d="M4.5968254,0 L27.4539683,0 C29.9428571,0 31.9746032,1.9922179 31.9746032,4.43268482 L31.9746032,27.492607 C31.9746032,29.9330739 29.9428571,31.9252918 27.4539683,31.9252918 L4.5968254,31.9252918 C2.10793651,31.9252918 0.0761904762,29.9330739 0.0761904762,27.492607 L0.0761904762,4.38287938 C0.0761904762,1.9922179 2.10793651,0 4.5968254,0 Z" id="Path" fill="#3EB0EF"></path>
                                        <path d="M14.8063492,20.8684825 L8.15238095,14.2941634 L0.0761904762,22.2132296 L0.0761904762,23.9066148 L0.0761904762,27.492607 C0.0761904762,29.9330739 2.10793651,31.9252918 4.5968254,31.9252918 L27.4539683,31.9252918 C29.9428571,31.9252918 31.9746032,29.9330739 31.9746032,27.492607 L31.9746032,23.9066148 L31.9746032,18.9758755 L24.4063492,11.5050584 L14.8063492,20.8684825 Z" id="Path" fill="#00B594"></path>
                                        <ellipse id="Oval" fill="#FFCC03" cx="14.6539683" cy="10.5587549" rx="2.84444444" ry="2.78910506"></ellipse>
                                    </g>
                                </g>
                            </svg>
                            <span>Image</span>
                        </li>
                    </template>
                    <template v-if="visibleBlocks.code">
                        <li :class="blockClass('code')" @click="changeBlock('code')" @mouseover="setActiveBlock('code')">	        			
                            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="code">
                                        <path d="M32,2.667 C32,0.889 31.111,0 29.333,0 L2.667,0 C1.93,0 1.302,0.26 0.78,0.781 C0.261,1.301 0,1.931 0,2.667 L0,29.333 C0,31.111 0.889,32 2.667,32 L29.333,32 C31.111,32 32,31.111 32,29.333 L32,2.667 Z" id="Path" fill="#363F4C"></path>
                                        <path d="M23.5796073,15.6588289 L18.6266054,20.6118308 C18.240319,20.9981171 18.2393355,21.6322656 18.6298598,22.0227899 C19.0231067,22.4160369 19.652092,22.4147713 20.0408189,22.0260443 L25.704182,16.3626813 C25.8967887,16.1700746 25.993604,15.9158462 25.9938589,15.6609213 C25.9955057,15.4023666 25.89801,15.1488045 25.704182,14.9549765 L20.0408189,9.29161349 C19.6545326,8.90532714 19.0203841,8.90434359 18.6298598,9.29486789 C18.2366128,9.68811484 18.2378784,10.3171001 18.6266054,10.705827 L23.5796073,15.6588289 Z M8.41427217,15.6588289 L13.367274,10.705827 C13.7535604,10.3195407 13.7545439,9.68539219 13.3640196,9.29486789 C12.9707727,8.90162094 12.3417874,8.90288654 11.9530605,9.29161349 L6.28969741,14.9549765 C6.09709076,15.1475832 6.0002754,15.4018116 6.00002052,15.6567365 C5.99837374,15.9152911 6.0958694,16.1688532 6.28969741,16.3626813 L11.9530605,22.0260443 C12.3393468,22.4123307 12.9734953,22.4133142 13.3640196,22.0227899 C13.7572666,21.629543 13.756001,21.0005577 13.367274,20.6118308 L8.41427217,15.6588289 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path>
                                    </g>
                                </g>
                            </svg>
                            <span>Code</span>
                        </li>
                    </template>
                    <template v-if="visibleBlocks.divider">
                        <li :class="blockClass('divider')" @click="changeBlock('divider')" @mouseover="setActiveBlock('divider')">
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="w8 h8"><g fill="none" fill-rule="evenodd"><rect fill="#0069ff" width="32" height="32" rx="2.5"></rect><rect fill="#FFF" x="3" y="15" width="26" height="2" rx="1"></rect><rect fill="#FFF" x="3" y="3" width="26" height="7" rx="1.5"></rect><rect fill="#FFF" x="3" y="22" width="26" height="7" rx="1.5"></rect></g></svg>
                            <span>Divider</span>
                        </li>
                    </template>
                    <template v-if="visibleBlocks.bullets">
                        <li :class="blockClass('bullets')" @click="changeBlock('bullets')" @mouseover="setActiveBlock('bullets')">	        			
                            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="bullet-list">
                                        <path d="M26,32 L6,32 C2.68603513,32 0,29.3139649 0,26 L0,6 C0,2.68603513 2.68603513,0 6,0 L26,0 C29.3139649,0 32,2.68603513 32,6 L32,26 C32,29.3139649 29.3139649,32 26,32 Z" id="Path" fill="#F5E6FE"></path>
                                        <g id="Group" transform="translate(8.000000, 9.312500)" fill="#D9A4FC">
                                            <path d="M2.66601562,1.35449219 C2.66601562,2.09057619 2.06909181,2.6875 1.33300781,2.6875 C0.596923813,2.6875 0,2.09057619 0,1.35449219 C0,0.618408188 0.596923813,0.021484375 1.33300781,0.021484375 C2.06909181,0.021484375 2.66601562,0.618408188 2.66601562,1.35449219 Z" id="Path"></path>
                                            <path d="M2.66601562,6.6875 C2.66601562,7.423584 2.06909181,8.02050781 1.33300781,8.02050781 C0.596923813,8.02050781 0,7.423584 0,6.6875 C0,5.951416 0.596923813,5.35449219 1.33300781,5.35449219 C2.06909181,5.35449219 2.66601562,5.951416 2.66601562,6.6875 Z" id="Path"></path>
                                            <path d="M2.66601562,12.0205078 C2.66601562,12.7565918 2.06909181,13.3535156 1.33300781,13.3535156 C0.596923813,13.3535156 0,12.7565918 0,12.0205078 C0,11.2844238 0.596923813,10.6875 1.33300781,10.6875 C2.06909181,10.6875 2.66601562,11.2844238 2.66601562,12.0205078 Z" id="Path"></path>
                                        </g>
                                        <path d="M23.3330078,11.3330078 L13.3330078,11.3330078 C12.9650879,11.3330078 12.6660156,11.0349121 12.6660156,10.6660156 C12.6660156,10.2971191 12.9641113,10 13.3330078,10 L23.3330078,10 C23.7009278,10 24,10.2980957 24,10.6669922 C24,11.0358887 23.7009278,11.3330078 23.3330078,11.3330078 Z" id="Path" fill="#BE63F9"></path>
                                        <path d="M23.3330078,16.6669922 L13.3330078,16.6669922 C12.9650879,16.6669922 12.6660156,16.3688965 12.6660156,16 C12.6660156,15.6320801 12.9641113,15.3330078 13.3330078,15.3330078 L23.3330078,15.3330078 C23.7009278,15.3330078 24,15.6311035 24,16 C24,16.3679199 23.7009278,16.6669922 23.3330078,16.6669922 Z" id="Path" fill="#BE63F9"></path>
                                        <path d="M23.3330078,22 L13.3330078,22 C12.9650879,22 12.6660156,21.7019043 12.6660156,21.3330078 C12.6660156,20.9650879 12.9641113,20.6660156 13.3330078,20.6660156 L23.3330078,20.6660156 C23.7009278,20.6660156 24,20.9641113 24,21.3330078 C24,21.7019043 23.7009278,22 23.3330078,22 Z" id="Path" fill="#BE63F9"></path>
                                    </g>
                                </g>
                            </svg>
                            <span>Bullets</span>
                        </li>
                    </template>
                    <template v-if="visibleBlocks.list">
                        <li :class="blockClass('list')" @click="changeBlock('list')" @mouseover="setActiveBlock('list')">                        
                            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="number">
                                        <path d="M26,32 L6,32 C2.68603513,32 0,29.3139649 0,26 L0,6 C0,2.68603513 2.68603513,0 6,0 L26,0 C29.3139649,0 32,2.68603513 32,6 L32,26 C32,29.3139649 29.3139649,32 26,32 Z" id="Path" fill="#E3F8FA"></path>
                                        <g id="Group" transform="translate(8.812500, 8.625000)" fill="#8CE1EB">
                                            <path d="M2.1875,9.375 L0.521484375,9.375 C0.2456055,9.375 0.021484375,9.15087888 0.021484375,8.875 L0.021484375,8.04199219 C0.021484375,7.39892575 0.544433625,6.875 1.18847656,6.875 L1.52148438,6.875 C1.61352538,6.875 1.68847656,6.80004881 1.68847656,6.70800781 L1.68847656,6.54101562 C1.68847656,6.44897462 1.61352538,6.37402344 1.52148438,6.37402344 L0.521484375,6.37402344 C0.2456055,6.37402344 0.021484375,6.14990237 0.021484375,5.87402344 C0.021484375,5.59790038 0.2456055,5.37402344 0.521484375,5.37402344 L1.52148438,5.37402344 C2.16455075,5.37402344 2.68847656,5.89697263 2.68847656,6.54101562 L2.68847656,6.70800781 C2.68847656,7.35107425 2.16552737,7.875 1.52148438,7.875 L1.1875,7.875 C1.095459,7.875 1.02050781,7.94995119 1.02050781,8.04199219 L1.02050781,8.375 L2.1875,8.375 C2.46337888,8.375 2.6875,8.59912112 2.6875,8.875 C2.6875,9.15087888 2.46337888,9.375 2.1875,9.375 Z" id="Path"></path>
                                            <path d="M1.52148438,13.2080078 L0.854492188,13.2080078 C0.57861325,13.2080078 0.354492188,12.9838867 0.354492188,12.7080078 C0.354492188,12.4318847 0.57861325,12.2080078 0.854492188,12.2080078 L1.52148438,12.2080078 C1.61352538,12.2080078 1.68847656,12.1330566 1.68847656,12.0410156 L1.68847656,11.875 C1.68847656,11.782959 1.61352538,11.7080078 1.52148438,11.7080078 L0.521484375,11.7080078 C0.2456055,11.7080078 0.021484375,11.4838867 0.021484375,11.2080078 C0.021484375,10.9318847 0.2456055,10.7080078 0.521484375,10.7080078 L1.52148438,10.7080078 C2.16455075,10.7080078 2.68847656,11.230957 2.68847656,11.875 L2.68847656,12.0419922 C2.6875,12.6850586 2.16455075,13.2080078 1.52148438,13.2080078 Z" id="Path"></path>
                                            <path d="M1.52148438,14.7080078 L0.521484375,14.7080078 C0.2456055,14.7080078 0.021484375,14.4838867 0.021484375,14.2080078 C0.021484375,13.9318847 0.2456055,13.7080078 0.521484375,13.7080078 L1.52148438,13.7080078 C1.61352538,13.7080078 1.68847656,13.6330566 1.68847656,13.5410156 L1.68847656,13.375 C1.68847656,13.282959 1.61352538,13.2080078 1.52148438,13.2080078 L0.854492188,13.2080078 C0.57861325,13.2080078 0.354492188,12.9838867 0.354492188,12.7080078 C0.354492188,12.4318847 0.57861325,12.2080078 0.854492188,12.2080078 L1.52148438,12.2080078 C2.16455075,12.2080078 2.68847656,12.730957 2.68847656,13.375 L2.68847656,13.5419922 C2.6875,14.1850586 2.16455075,14.7080078 1.52148438,14.7080078 Z" id="Path"></path>
                                            <path d="M1.52148438,4.04199219 C1.2456055,4.04199219 1.02148438,3.81811525 1.02148438,3.54199219 L1.02148438,1.04199219 L0.521484375,1.04199219 C0.2456055,1.04199219 0.021484375,0.81811525 0.021484375,0.541992188 C0.021484375,0.26611325 0.2456055,0.0419921875 0.521484375,0.0419921875 L1.52148438,0.0419921875 C1.79760744,0.0419921875 2.02148438,0.26611325 2.02148438,0.541992188 L2.02148438,3.54199219 C2.02148438,3.81811525 1.79760744,4.04199219 1.52148438,4.04199219 Z" id="Path"></path>
                                        </g>
                                        <path d="M23.5,11.3330078 L13.5,11.3330078 C13.1320801,11.3330078 12.8330078,11.0349121 12.8330078,10.6660156 C12.8330078,10.2971191 13.1320801,10 13.5,10 L23.5,10 C23.8679199,10 24.1669922,10.2980957 24.1669922,10.6669922 C24.1669922,11.0358887 23.8688965,11.3330078 23.5,11.3330078 Z" id="Path" fill="#26C6DA"></path>
                                        <path d="M23.5,16.6669922 L13.5,16.6669922 C13.1320801,16.6669922 12.8330078,16.3688965 12.8330078,16 C12.8330078,15.6320801 13.1311035,15.3330078 13.5,15.3330078 L23.5,15.3330078 C23.8679199,15.3330078 24.1669922,15.6311035 24.1669922,16 C24.1669922,16.3679199 23.8688965,16.6669922 23.5,16.6669922 Z" id="Path" fill="#26C6DA"></path>
                                        <path d="M23.5,22 L13.5,22 C13.1320801,22 12.8330078,21.7019043 12.8330078,21.3330078 C12.8330078,20.9650879 13.1311035,20.6660156 13.5,20.6660156 L23.5,20.6660156 C23.8679199,20.6660156 24.1669922,20.9641113 24.1669922,21.3330078 C24.1669922,21.7019043 23.8688965,22 23.5,22 Z" id="Path" fill="#26C6DA"></path>
                                    </g>
                                </g>
                            </svg>
                            <span>List</span>
                        </li>
                    </template>
	        	</ul>
	        </div>
	    </button>
	</div>
</template>


<style lang="scss" scoped>
    @import 'addButton.scss';
</style>

<script>

    import addButton from '../utilities/addButton.vue';
    import axios from 'axios';
    import {
        EventBus
    } from '../events/event-bus.js';
    import definitions from '../utilities/definitions.js';

    export default {
        props: ['totalblocks', 'block', 'index', 'menuVisible', 'shortKey'],
        data: function () {
            return {
                textBlock: [{
                    type: "text",
                    text: ""
                }],
                listBlock: [{
                    type: "list_item",
                    text: ""
                }],
                imageBlock: [{
                    type: "image",
                    src: ""
                }],
                visibleBlocks: {
                    image: true,
                    code: true,
                    divider: true,
                    bullets: true,
                    list: true
                },
                active: 'image'
            }
        },
        mounted() {},
        methods: {
            addBlock: function (blockType, el) {
                if (blockType == "listBlock") {
                    if (typeof el === 'undefined') {
                        el = 'ul';
                    }
                    this.$emit('newBlock', {
                        type: blockType,
                        el: el,
                        content: [{
                            type: "list_item",
                            content: ""
                        }]
                    });
                } else if (blockType == "imageBlock") {
                    this.$emit('newBlock', {
                        type: blockType,
                        content: [{
                            type: "image",
                            src: ""
                        }]
                    });
                } else if (blockType == "codeBlock") {
                    this.$emit('newBlock', {
                        type: blockType,
                        content: [{
                            type: "code",
                            content: "",
                            lang: "html"
                        }]
                    });
                } else {
                    this.$emit('newBlock', {
                        type: blockType,
                        content: [{
                            type: "text",
                            content: ""
                        }]
                    });
                }
            },
            changeBlock: function (type, event) {
                EventBus.$emit('changeBlock', {
                    index: this.index,
                    type: type,
                    event: event
                });
            },
            setVisibleBlocks(visibleBlocks) {
                this.visibleBlocks = visibleBlocks;
            },
            clickActiveBlock(event) {
                this.changeBlock(this.active, event);
            },
            buttonClicked() {
                EventBus.$emit('buttonClicked', {
                    index: this.index
                });
            },
            imageSearchClick: function () {
                this.$emit('imageSearchClick', {});
            },
            blockClass: function (type) {
                if (this.active == type) {
                    return type + ' active';
                }
                return type;
            },
            setActiveBlock: function (type) {
                this.active = type;
            }
        },
        computed: {
            buttonClass: function () {
                var btnClass = '';

                if (this.menuVisible) {
                    btnClass += ' visible';
                }
                if (this.shortKey) {
                    btnClass += ' shortkey';
                }
                return btnClass;
            }
        }
    }

</script>