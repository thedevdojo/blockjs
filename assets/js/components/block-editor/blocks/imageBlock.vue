<template>
    <div class="imageBlock">
        <div class="imageBlockPreview" v-show="loadingScreen" :class="imageLoading">
            <div class="msg">
                <p>{{ loadingMessage }}</p>
                <svg v-show="!imageUploaded" width="18" height="18" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#ccc">
                    <g fill="none" fill-rule="evenodd">
                        <g transform="translate(1 1)" stroke-width="3">
                            <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                            <path d="M36 18c0-9.94-8.06-18-18-18">
                                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18"
                                    dur="1s" repeatCount="indefinite" />
                            </path>
                        </g>
                    </g>
                </svg>
                <svg v-show="imageUploaded" id="successAnimation" class="animated" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 70 70">
                    <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
                    <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>
                    <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
                </svg>
            </div>
            <div class="imgPreview" ref="imgPreview"></div>
        </div>
        <template v-if="content[0].src">
            <img :src="content[0].src" :class="imageLoading" @load="setImageLoaded">
        </template>
        <template v-if="!loadingScreen && !content[0].src">
            <div class="imageBlockOptions">
                <button>
                    <input type="file" ref="fileInput" name="imageUploadInput" class="imageUploadInput" @change="fileInputChange('')">
                    <svg width="282px" height="279px" viewBox="0 0 282 279" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="upload">
                                <path
                                    d="M35.6,0.8 L215.6,0.8 C235.2,0.8 251.2,16.8 251.2,36.4 L251.2,221.6 C251.2,241.2 235.2,257.2 215.6,257.2 L35.6,257.2 C16,257.2 0,241.2 0,221.6 L0,36 C0,16.8 16,0.8 35.6,0.8 Z"
                                    id="Path" fill="#45B1EC"></path>
                                <path
                                    d="M116.4,168.4 L63.6,115.6 L0,179.2 L0,192.4 L0,221.2 C0,240.8 16,256.8 35.6,256.8 L215.6,256.8 C235.2,256.8 251.2,240.8 251.2,221.2 L251.2,192.4 L251.2,152.8 L191.6,92.8 L116.4,168.4 Z"
                                    id="Path" fill="#00B594"></path>
                                <circle id="Oval" fill="#FFCC03" cx="114.8" cy="85.6" r="22.4"></circle>
                                <circle id="Oval" fill="#FFFFFF" fill-rule="nonzero" cx="227" cy="224" r="55"></circle>
                                <g transform="translate(182.000000, 179.000000)">
                                    <circle id="Oval" fill="#0ACC13" fill-rule="nonzero" cx="45" cy="45" r="45">
                                    </circle>
                                    <g id="arrow" transform="translate(27.000000, 18.000000)">
                                        <path
                                            d="M35.0769231,20.5496259 L20.5538462,6.49077307 C19.0769231,5.03640898 16.8615385,5.03640898 15.3846154,6.49077307 L1.10769231,20.5496259 C-0.369230769,22.00399 -0.369230769,24.1855362 1.10769231,25.6399002 C2.58461538,27.0942643 4.8,27.0942643 6.27692308,25.6399002 L14.6461538,17.6408978 L14.6461538,50.3640898 C14.6461538,52.3032419 16.3692308,54 18.3384615,54 C20.3076923,54 22.0307692,52.3032419 22.0307692,50.3640898 L22.0307692,17.3985037 L30.1538462,25.3975062 C30.8923077,26.1246883 31.8769231,26.3670823 32.6153846,26.3670823 C33.3538462,26.3670823 34.3384615,26.1246883 35.0769231,25.3975062 C36.3076923,24.1855362 36.3076923,22.00399 35.0769231,20.5496259 Z"
                                            id="Path" fill="#06C125"></path>
                                        <path
                                            d="M35.0769231,15.1496259 L20.5538462,1.09077307 C19.0769231,-0.363591022 16.8615385,-0.363591022 15.3846154,1.09077307 L1.10769231,15.1496259 C-0.369230769,16.60399 -0.369230769,18.7855362 1.10769231,20.2399002 C2.58461538,21.6942643 4.8,21.6942643 6.27692308,20.2399002 L14.6461538,12.2408978 L14.6461538,44.9640898 C14.6461538,46.9032419 16.3692308,48.6 18.3384615,48.6 C20.3076923,48.6 22.0307692,47.1456359 22.0307692,44.9640898 L22.0307692,11.9985037 L30.1538462,19.9975062 C30.8923077,20.7246883 31.8769231,20.9670823 32.6153846,20.9670823 C33.3538462,20.9670823 34.3384615,20.7246883 35.0769231,19.9975062 C36.3076923,18.7855362 36.3076923,16.60399 35.0769231,15.1496259 Z"
                                            id="Path" fill="#FFFFFF"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span>Upload Image</span>
                    <span class="key">press the <i>(u)</i> key</span>
                </button>
                <button @click="fireImageSearch">
                    <svg width="282px" height="279px" viewBox="0 0 282 279" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="google-img-search">
                                <path
                                    d="M35.6,0.8 L215.6,0.8 C235.2,0.8 251.2,16.8 251.2,36.4 L251.2,221.6 C251.2,241.2 235.2,257.2 215.6,257.2 L35.6,257.2 C16,257.2 0,241.2 0,221.6 L0,36 C0,16.8 16,0.8 35.6,0.8 Z"
                                    id="Path" fill="#45B1EC"></path>
                                <path
                                    d="M116.4,168.4 L63.6,115.6 L0,179.2 L0,192.4 L0,221.2 C0,240.8 16,256.8 35.6,256.8 L215.6,256.8 C235.2,256.8 251.2,240.8 251.2,221.2 L251.2,192.4 L251.2,152.8 L191.6,92.8 L116.4,168.4 Z"
                                    id="Path" fill="#00B594"></path>
                                <circle id="Oval" fill="#FFCC03" cx="114.8" cy="85.6" r="22.4"></circle>
                                <circle id="Oval" fill="#FFFFFF" fill-rule="nonzero" cx="227" cy="224" r="55"></circle>
                                <g id="google" transform="translate(182.000000, 179.000000)">
                                    <path
                                        d="M86.5894319,36.9017587 L49.7456991,36.9 C48.1187459,36.9 46.8,38.2144309 46.8,39.8362775 L46.8,51.5692526 C46.8,53.1907474 48.1187459,54.50553 49.7455227,54.50553 L70.4936746,54.50553 C68.2217267,60.3831851 63.9812749,65.30553 58.5711527,68.433151 L67.4181297,83.7 C81.6097767,75.5181339 90,61.1622765 90,45.0918906 C90,42.8036834 89.8308124,41.1679433 89.4924372,39.326087 C89.2352156,37.9267123 88.0165003,36.9017587 86.5894319,36.9017587 Z"
                                        id="Path" fill="#167EE6"></path>
                                    <path
                                        d="M45.0919723,72.2878032 C35.0164127,72.2878032 26.2205616,66.7277003 21.4964942,58.5 L6.3,67.3467273 C14.0333955,80.8839846 28.5205355,90 45.0919723,90 C53.2213597,90 60.8920827,87.7892907 67.5,83.9366836 L67.5,83.9156427 L58.72113,68.5663924 C54.7055414,70.91873 50.0586766,72.2878032 45.0919723,72.2878032 Z"
                                        id="Path" fill="#12B347"></path>
                                    <path
                                        d="M67.5,83.8896132 L67.5,83.8684089 L58.6850977,68.4 C54.6530273,70.770421 49.9874414,72.1503007 45,72.1503007 L45,90 C53.1627539,90 60.8653125,87.7721286 67.5,83.8896132 Z"
                                        id="Path" fill="#0F993E"></path>
                                    <path
                                        d="M17.8502883,45 C17.8502883,40.0086213 19.2298572,35.3388697 21.6,31.3032233 L6.1317934,22.5 C2.22776673,29.1202759 0,36.8087128 0,45 C0,53.1912872 2.22776673,60.8797241 6.1317934,67.5 L21.6,58.6967767 C19.2298572,54.6611303 17.8502883,49.9913787 17.8502883,45 Z"
                                        id="Path" fill="#FFD500"></path>
                                    <path
                                        d="M45.170243,17.7121968 C51.7537787,17.7121968 57.8010679,20.0701925 62.5244929,23.9924643 C63.689781,24.9599923 65.3834219,24.8901506 66.4508279,23.8142355 L74.7427395,15.456223 C75.9538111,14.235497 75.8675065,12.2373185 74.5738139,11.1060605 C66.6599237,4.18572519 56.363008,0 45.170243,0 C28.56537,0 14.0489992,9.11601545 6.3,22.6532727 L21.5271562,31.5 C26.2607554,23.2722997 35.0743539,17.7121968 45.170243,17.7121968 Z"
                                        id="Path" fill="#FF4B26"></path>
                                    <path
                                        d="M62.4514156,23.6302663 C63.6232281,24.5831881 65.3265281,24.5144008 66.399734,23.4547281 L74.7380717,15.2228909 C75.9557477,14.0205933 75.8689598,12.05258 74.5682003,10.9383998 C66.6100006,4.12236198 56.2554328,0 45,0 L45,17.4448078 C51.6202202,17.4448078 57.7015443,19.7672064 62.4514156,23.6302663 Z"
                                        id="Path" fill="#D93F21"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span>Search Google Images</span>
                    <span class="key">press the <i>(s)</i> key</span>
                </button>
            </div>
        </template>

        <div id="imageSearch" ref="imageSearch" v-show="imageSearch" @click="imageSearchShow">
            <div id="modalClose">&times;</div>
            <div id="imageSearchModal">
                <div id="modalHead">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><g><g style="fill:#a9a9af"><svg fill="#a9a9af" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 65 65" enable-background="new 0 0 65 65" xml:space="preserve"><path d="M56.807,30.456V10.291c0-3.653-2.972-6.625-6.625-6.625H7.131c-3.653,0-6.625,2.972-6.625,6.625v35.192  c0,3.653,2.972,6.625,6.625,6.625h25.604c2.772,5.464,8.434,9.226,14.969,9.226c9.258,0,16.79-7.532,16.79-16.79  C64.494,38.642,61.426,33.451,56.807,30.456z M7.131,49.108c-1.999,0-3.625-1.626-3.625-3.625V10.291  c0-1.999,1.626-3.625,3.625-3.625h43.051c1.999,0,3.625,1.626,3.625,3.625v18.628c-1.895-0.743-3.948-1.165-6.103-1.165  c-0.989,0-1.953,0.103-2.896,0.268l-4.89-3.975c-0.007-0.005-0.014-0.008-0.021-0.014c-0.042-0.033-0.087-0.059-0.132-0.087  c-0.041-0.026-0.08-0.054-0.123-0.075c-0.032-0.016-0.066-0.026-0.1-0.04c-0.058-0.024-0.115-0.049-0.175-0.066  c-0.022-0.006-0.046-0.007-0.069-0.013c-0.07-0.016-0.142-0.031-0.213-0.036c-0.028-0.002-0.058,0.001-0.086,0  c-0.066-0.001-0.133-0.003-0.199,0.005c-0.036,0.004-0.071,0.015-0.107,0.021c-0.06,0.011-0.119,0.021-0.177,0.04  c-0.033,0.011-0.065,0.027-0.099,0.041c-0.06,0.023-0.118,0.047-0.175,0.078c-0.006,0.004-0.013,0.005-0.019,0.009l-6.792,3.903  l-8.074-7.523c-0.008-0.008-0.02-0.01-0.028-0.017c-0.136-0.122-0.288-0.213-0.451-0.277c-0.02-0.008-0.039-0.016-0.059-0.023  c-0.163-0.056-0.331-0.082-0.502-0.08c-0.022,0-0.044,0-0.066,0.001c-0.167,0.009-0.332,0.048-0.49,0.114  c-0.023,0.009-0.045,0.018-0.068,0.029c-0.116,0.055-0.228,0.121-0.331,0.208L6.073,33.246c-0.631,0.536-0.708,1.483-0.171,2.114  c0.296,0.349,0.719,0.528,1.143,0.528c0.344,0,0.689-0.117,0.971-0.357l14.275-12.137l11.96,11.146  c-2.086,2.798-3.338,6.254-3.338,10.004c0,1.584,0.235,3.11,0.647,4.564H7.131z M36.25,32.302l-2.521-2.349l5.097-2.928l2.469,2.006  C39.414,29.812,37.715,30.931,36.25,32.302z M47.704,58.334c-7.604,0-13.79-6.187-13.79-13.79s6.187-13.79,13.79-13.79  s13.79,6.187,13.79,13.79S55.308,58.334,47.704,58.334z"></path><path d="M11.871,20.932c3.488,0,6.326-2.838,6.326-6.326s-2.838-6.326-6.326-6.326s-6.326,2.838-6.326,6.326  S8.383,20.932,11.871,20.932z M11.871,11.279c1.834,0,3.326,1.492,3.326,3.326s-1.492,3.326-3.326,3.326s-3.326-1.492-3.326-3.326  S10.037,11.279,11.871,11.279z"></path><path d="M50.872,46.169c0.831-1.242,1.277-2.7,1.277-4.228c0-2.036-0.794-3.951-2.234-5.392s-3.355-2.233-5.392-2.233  s-3.951,0.793-5.392,2.233s-2.233,3.354-2.233,5.392c0,2.036,0.793,3.951,2.233,5.392s3.354,2.233,5.392,2.233  c1.527,0,2.986-0.446,4.228-1.276l5.132,5.132c0.293,0.293,0.677,0.439,1.061,0.439s0.768-0.146,1.061-0.439  c0.586-0.586,0.586-1.535,0-2.121L50.872,46.169z M41.253,45.212c-0.874-0.874-1.354-2.035-1.354-3.271s0.481-2.396,1.354-3.271  c0.874-0.874,2.035-1.354,3.271-1.354s2.396,0.48,3.271,1.354s1.355,2.035,1.355,3.271s-0.481,2.396-1.355,3.271  c-0.874,0.873-2.035,1.354-3.271,1.354S42.127,46.085,41.253,45.212z"></path></svg></g></g></svg>
                    <input type="text" name="imageSearch" ref="imageSearchInput" placeholder="Search for an Image"
                        @keyup.enter.prevent="searchImg()" autofocus>
                    <button @click="searchImg()">enter</button>
                </div>
                <div id="modalBody">
                    <div id="modalBodyLoader" v-show="searchLoader">
                        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"
                            stroke="#ccc">
                            <g fill="none" fill-rule="evenodd">
                                <g transform="translate(1 1)" stroke-width="2">
                                    <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                                    <path d="M36 18c0-9.94-8.06-18-18-18">
                                        <animateTransform attributeName="transform" type="rotate" from="0 18 18"
                                            to="360 18 18" dur="1s" repeatCount="indefinite" />
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="imgSearchThumb" v-for="result in imageSearchResults"
                        @click="imgSearchSelect($event, result.link)">
                        <div class="imgThumb" :style="'background-image:url(' + result.image.thumbnailLink + ')'"></div>
                        <div class="imgDetails">{{ result.image.width }} x {{ result.image.height }}</div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

    import block from './block.vue';
    import axios from 'axios';
    import {
        EventBus
    } from '../events/event-bus.js';

    export default {
        extends: block,
        props: ['content', 'index'],
        data: function () {
            return {
                loadingScreen: false,
                imageUploaded: false,
                imageLoaded: false,
                loadingMessage: "Uploading Image",
                activeBtn: "upload",
                
                imageSearch: false,
                imageSearchIndex: 0,
                searchLoader: false,
                imageSearchResults: []
            }
        },
        methods: {
            setImageLoaded() {
                this.imageLoaded = true;
            },
            fireFileInputClick: function (e) {
                this.$refs.fileInput.click()
            },
            fireImageSearch: function(){
                this.imageSearch = true;
                EventBus.$emit('disableKeys', {});
                console.log('focus that shit');
                this.$refs.imageSearchInput.focus();
            },
            closeImageSearch: function(){
                this.imageSearch = false;
                EventBus.$emit('enableKeys', {});
            },
            fileInputChange: function (image) {
                //this.$emit('imageUploaded');

                this.loadingScreen = true;
                this.loadingMessage = "Uploading Image";

                axios.defaults.headers.common["X-CSRF-TOKEN"] = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

                let formData = new FormData();

                formData.append('image', this.$refs.fileInput.files[0]);

                for (var i = 0; i < this.$refs.fileInput.files.length; i++) {
                    var file = this.$refs.fileInput.files[i];

                    var img = document.createElement("img");
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        img.src = reader.result;
                    }
                    img.style.width = "100%";
                    img.style.height = "auto";
                    reader.readAsDataURL(file);
                    this.$refs.imgPreview.appendChild( img );
                }

                let that = this;

                axios
                    .post("/blockjs/upload", formData)
                    .then(response => {
                        if (response.data.url) {
                            EventBus.$emit('setImageURL', { 
                                index: that.index, 
                                url: response.data.url 
                            });
                            that.imageUploaded = true;
                            that.loadingMessage = "Image Upload Complete";
                        } else {
                            alert("failed to upload");
                        }
                    })
                    .catch(response => {});
            },
            imageSearchShow(e) {
                if (e.target.id == "imageSearch" || e.target.id == "modalClose") {
                    this.closeImageSearch();
                }
            },
            searchImg() {
                this.searchLoader = true;
                var that = this;
                axios.post('/blockjs/image-search', {
                        search: this.$refs.imageSearchInput.value,
                        _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    })
                    .then(function (response) {
                        that.imageSearchResults = response.data.items;
                        that.searchLoader = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            imgSearchSelect(e, image) {

                if (e.target.id !== "imgExpand") {

                    var that = this;

                    this.loadingScreen = true;
                    this.loadingMessage = "Uploading Image";
                    this.closeImageSearch();

                    var img = document.createElement("img");
                    var reader = new FileReader();
                    img.src = image;
                    img.style.width = "100%";
                    img.style.height = "auto";
                    this.$refs.imgPreview.appendChild( img );

                    axios
                        .post("/blockjs/upload", {
                            image: image,
                            image_url: true,
                            _token: document.querySelector('meta[name="csrf-token"]').getAttribute("content")
                        }).then(response => {
                            console.log(response.data.url);
                            if (response.data.url) {
                                EventBus.$emit('setImageURL', { 
                                    index: that.index, 
                                    url: response.data.url
                                });
                                that.imageUploaded = true;
                                that.loadingMessage = "Image Upload Complete";
                            }
                        })
                        .catch(response => {
                            return false;
                        });

                    

                    
                }

            },
            uploadImage(image, imageSearchIndex){
                var curImageSearchIndex = imageSearchIndex;
                
            }
        },
        computed: {
            imageLoading() {
                if (!this.imageLoaded) {
                    return 'imageLoading';
                }
                return '';
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'imageBlock.scss';
</style>