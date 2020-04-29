<template>
    <div>
        <div id="dynamic-content">
            <div id="dynamic-container">
                <component v-bind:is="dynamicContent" :id="feedItemId"></component>
            </div>
        </div>
        <div :class="cardClass(item.image, item.type, item.body)" v-for="(item, index) in feed" @click="cardClicked($event)" :data-index="index" :data-url="item.link" :data-type="item.type" :data-id="item.id">


            <div class="feed-content">
                
                <h3 class="uk-card-title uk-text-bold uk-margin-small-top uk-margin-remove-top">{{ item.title }}</h3>

                <div class="feed-user-info">
                    <img :src="imgURL(item.avatar)">
                    <div class="feed-user-info-img-right">
                        <p><a :href="'@' + item.username" class="no-load">{{ item.first_name }} {{ item.last_name}}</a></p>
                        <span>{{ item.created_at }}</span>
                        <span>in<a :href="'/' + item.display_type" :class="'no-load feed-type feed-type-' + item.display_type">{{ item.display_type }}</a></span>
                    </div>
                </div>

                <div class="feed-description">
                    {{ item.body | striphtml | substring }}
                </div>

                <div class="uk-inline reaction">
                    <button :class="emojiAddClass(item.user_reaction)" type="button">
                        <template v-if="item.reactions.length !== 0">
                            <div class="reaction_btns no-load">
                                <img v-for="(value, name) in item.reactions" :src="'https://cdn.devdojo.com/images/emojis/' + name + '.png'">
                                <span class="reactions_total no-load">{{ item.reactions_total }}</span>
                            </div>
                        </template>
                        <template v-else>
                            <img src="https://cdn.devdojo.com/images/emojis/icon.png" class="no-load">
                        </template>
                    </button>
                    <div class="uk-drop no-load" uk-drop="mode: hover; offset: 5; animation: uk-animation-fade; duration: 40">
                        <div class="uk-card uk-card-body uk-card-default uk-padding-small no-load">
                            <h5>Select One: </h5>
                            <div class="reactions no-load">
                                    <template v-for="reaction in reactions">
                                        <div :class="userReactedClass(item.user_reaction, reaction.name)" @click="userReacted(reaction, item, index, $event)"><img :src="'https://cdn.devdojo.com/images/emojis/' + reaction.name + '.png'"></div>
                                    </template>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div><!-- .feed-content -->

            <!-- Media -->
            <template v-if="item.type == 'fun'">

                <div class="feed-media">
                    <div class="uk-flex">
                        <template v-if="item.video">
                            <video class="fun-video" preload="auto" :poster="imgURL(item.image)" loop="loop" autoplay width="auto" style="min-height: auto;" muted>
                            <source :src="item.video + '.mp4'" type="video/mp4">
                            <source :src="item.video + '.webm'" type="video/webm">
                            </video>
                        </template>
                        <template v-else>
                            <img :src="imgURL(item.image)" style="width:100%;">
                        </template>
                    </div>
                </div>

            </template>
            <template v-else>

                    <div class="feed-media">
                    <template v-if="item.image">
                        <div class="uk-flex">
                            <img :src="imgURL(item.image)" style="width:100%; height:auto;">
                        </div>
                    </template>
                    </div>

            </template>
            <!-- END MEDIA -->



        </div>
    </div>
</template>
<script src="./feed.js"></script>