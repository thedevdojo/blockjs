<template>
    <div>
        <div class="uk-video-container">

            <div class="uk-align-center uk-margin-remove-bottom">

                    <template v-if="episode.guest">
                        <div id="video_login" :style="'background-image:url(' + episode.image + ')'" >
                            <div class="video_login_bg"></div>
                            <h2>Login to Finish Watching</h2>
                            <p>Howdy, this video is free to watch, but you need to login first :)</p>
                            <a href="/login" class="btn-login-continue">Login to Continue Watching</a>
                        </div>
                    </template>

                    <template v-if="episode.user_has_access">
                        <player :image="episode.image" :hd_1080_url="episode.hd_1080_url" :hd_url="episode.hd_url" :sd_540_url="episode.sd_540_url" :sd_url="episode.sd_url"></player>

                        <!-- Schema.org Meta Data for videos -->
                        <meta itemprop="duration" :content="episode.iso8601_duration" />
                        <meta itemprop="thumbnailUrl" :content="episode.image" />
                        <meta itemprop="contentURL" :content="episode.hd_url" />
                        <meta itemprop="uploadDate" :content="episode.upload_date" />
                        <meta itemprop="height" content="1280" />
                        <meta itemprop="width" content="720" />

                        <input type="hidden" name="episode_id" id="episode_id" :value="episode.id" >

                    </template>
                    <template v-else>
                        
                        <div class="subscriber_only_wrapper">
                            <div id="subscribers_only"  :style="'background-image:url(' + episode.image + '); background-size:cover'" >
                                <div style="background:rgba(0, 0, 0, 0.5); width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:-1"></div>
                                <h2 style="font-size:22px;">Sorry, this video is only available to Subscribers</h2>
                                <div class="clear"></div>
                                <template v-if="episode.guest">
                                    <form method="get" action="/subscribe">
                                        <button id="button">Become a Subscriber to Gain Access</button>
                                    </form>
                                </template>
                                <template v-else>
                                    <form method="get" action="/signup">
                                        <button id="button">Signup Now to Become a Subscriber</button>
                                    </form>
                                </template>
                            </div>
                        </div>

                   </template>

            </div><!-- .uk-grid -->
        </div><!-- .uk-video-container -->

        <div class="uk-container align-center uk-grid">
            <div class="uk-width-2-3@m uk-padding-remove-left uk-margin-medium-top body-content">
                <h1 itemprop="name" class="uk-margin-remove-top">{{ episode.title }} <span :class="hasBeenFavorited()" id="button-favorite"  :data-id="episode.id" data-type="episode"><i class="dojo-star"></i> Favorite</span></h1>

                        <div class="video-user"><img :src="episode.author_image"><span class="created_at">on {{ episode.created }}</span><span>created by</span><a :href="episode.author_link">{{ episode.author_name }}</a></div>
                        <div class="follow-sm">
                            
                            <button class="uk-button uk-button-secondary uk-button-message follow-button" :data-id="author_id">
                                <template v-if="user_following_author">
                                    <span class="f-text">Unfollow</span>
                                </template>
                                <template v-else>
                                    <span class="f-text">Follow</span>
                                </template>
                            </button>
                    
                        </div>
                        <div style="clear:both"></div>

                        <div class="video-details uk-margin-medium-bottom" itemprop="description" v-html="episode.body"></div>

                <div class="clear"></div>
                <template v-if="episode.topics && episode.topics.length > 0">
                    <div class="uk-container-small uk-align-center uk-margin-remove-bottom uk-text-center uk-margin-remove-top">
                        <div id="display_tags">
                            <ul id="tag_list">
                                <li v-for="topic in episode.topics"><a :href="'/topic/' + topic.slug">{{ topic.name }}</a></li>
                            </ul>
                        </div>
                    </div>
                </template>
                
                <div id="social_share">
                    <small>Share This Video:</small>
                    <ul class="share-buttons clearfix">
                        <li><a :href="'https://www.facebook.com/sharer/sharer.php?u=' + episode.link" class="popup"><i class="dojo-facebook"></i><span>facebook</span></a></li>
                        <li><a :href="'http://twitter.com/home?status=' + episode.title + ' : ' + episode.link" class="popup"><i class="dojo-twitter"></i><span>twitter</span></a></li>
                        <li><a :href="'mailto:?subject=' + episode.title + '&amp;body=' + episode.link"><i class="dojo-envelope"></i><span>email</span></a></li>
                    </ul>
                </div>
            </div>

            <div class="uk-width-1-3@m uk-margin-medium-top sidebar">
                <div id="sidebar_img">
                    <img :src="episode.image">
                    <span id="img_progress"></span>
                </div>

                <p id="duration"><i class="dojo-clock"></i> {{ episode.duration }}</p>
                <div :class="hasBeenCompleted()" id="button-complete" :data-id="episode.id" data-type="episode"><i class="dojo-checkmark"></i> Mark as Complete</div>

                <div id="codefund"></div>
            </div>

        </div>
    </div>
</template>
<script src="./episode.js"></script>
<style lang="scss" scoped>
    @import './episode.scss';
</style>