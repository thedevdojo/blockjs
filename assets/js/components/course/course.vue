<template>
    <div class="uk-playlist">
        <div class="uk-grid uk-align-center uk-margin-remove-bottom">
			<div class="uk-width-2-3@m uk-padding-remove-left">

                <template v-if="course.guest">
                    <div id="video_login" :style="'background-image:url(' + course.image + ')'" >
                        <div class="video_login_bg"></div>
                        <h2>Login to Finish Watching</h2>
                        <p>Howdy, this video is free to watch, but you need to login first :)</p>
                        <a href="/login" class="btn-login-continue">Login to Continue Watching</a>
                    </div>
                </template>

                <template v-if="course.user_can_access_episode">
                    <span id="player_info" data-type="course" :data-id="course.id"></span>
                    <player :image="course.image" :hd_1080_url="course.hd_1080_url" :hd_url="course.hd_url" :sd_540_url="course.sd_540_url" :sd_url="course.sd_url"></player>

                    <div itemprop="video" itemscope itemtype="http://schema.org/VideoObject">
                        <!-- Schema.org Meta Data for videos -->
                        <meta itemprop="duration" :content="course.iso8601_duration" />
                        <meta itemprop="thumbnailUrl" :content="course.image" />
                        <meta itemprop="contentURL" :content="course.hd_url" />
                        <meta itemprop="uploadDate" :content="course.upload_date" />
                        <meta itemprop="height" content="1280" />
                        <meta itemprop="width" content="720" />
                    </div>

                    <template v-if="course.next_episode">
                        <input type="hidden" id="next_video_url" name="next_video_url" :value="course.next_episode">
                    </template>

                    <input type="hidden" id="course_slug" name="course_slug" :value="course.slug">
                    <input type="hidden" id="course_id" name="course_id" :value="course.id">
                    <input type="hidden" id="episode_id" name="episode_id" :value="course.episode_id">
                    <input type="hidden" id="episode_order" name="episode_order" :value="course.episode_order">
                    <input type="hidden" id="seek" name="seek" :value="course.startAt">
                    <input type="hidden" id="count" name="count" :value="course.episodes_total">
                    <input type="hidden" id="percentage_complete" name="percentage_complete" :value="course.completedPercent">

                </template>
                <template v-else>
                    
                    <div class="subscriber_only_wrapper">
                        <div id="subscribers_only"  :style="'background-image:url(' + course.image + '); background-size:cover'" >
                            <div style="background:rgba(0, 0, 0, 0.5); width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:-1"></div>
                            <h2 style="font-size:22px;">Sorry, this video is only available to Subscribers</h2>
                            <div class="clear"></div>
                            <template v-if="course.guest">
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

			</div>

            <!-- FIX THIS -->
            <div class="uk-width-1-3@m">
                <div id="videoPlayList" class="video-right">
                    <div class="videoDetails">
                        <div class="videoDetailsLeft">
                            <p>{{ course.title }}</p>
                            <span class="course-length">{{ course.episode_total }} videos <small>({{ course.lengthWords }})</small></span>
                        </div>

                        <div class="autoplay-option">
                            <p>Autoplay?</p>
                            <label class="switch">
                                <input type="checkbox" id="video_autoplay" onclick="toggleAutoPlay()" :data-id="course.id" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>

                    <ul class="playlist">
                        <li v-for="(episode, index) in course.episodes" :class="'episodeLi ' + episode.active + ' ' + episode.completed" :id="'episode-' + episode.order" :data-order="episode.order">
                            <a href="#_" class="episode_link" :data-order="episode.order" :data-access="episode.user_access">
                                <div class="dojo-play-pause">
                                    <template v-if="episode.user_access">
                                        <i :class="'dojo-playpause ' + episode.active + '-playpause'" :id="'episode-' + episode.order + '-playpause'"></i>
                                    </template>
                                    <template v-else>
                                        <i class="dojo-lock"></i>
                                    </template>
                                </div>
                                <span class="now-playing">Now Playing</span>
                                <span class="uk-text-truncate">{{ index+1 }}. {{ episode.title }} <time>({{ episode.duration }})</time></span>
                            </a>
                            <div :class="'button-complete course-button-complete ' + episode.completed" :data-id="episode.id" :data-order="episode.order" data-type="course_episode"><i class="dojo-checkmark"></i></div>
                            <div class="episodeProgress" :id="'episode-' + episode.order + '-progress'"></div>
                        </li>
                    </ul>
                
                </div>
            </div>
            <!-- FIX -->
        </div><!-- uk-grid -->

        <div class="uk-container align-center uk-grid" uk-grid>
            <div class="uk-width-2-3@m uk-padding-remove-left uk-margin-medium-top body-content">

                <div class="uk-margin-small-top uk-margin-medium-bottom">

                    <h1 itemprop="name" class="uk-margin-remove-top">{{ course.episode_title }} <span :class="hasBeenFavorited()" id="button-favorite"  :data-id="episode_id" data-type="course"><i class="dojo-star"></i> Favorite</span></h1>
                    <div class="video-user"><img :src="course.author_image"><span class="created_at">on {{ course.created }}</span><span>created by</span><a :href="course.author_link">{{ course.author_name }}</a></div>

                    <div class="follow-sm">
                        
                        <button class="uk-button uk-button-secondary uk-button-message follow-button" :data-id="author_id">
                            <template v-if="course.user_following_author">
                                <span class="f-text">Unfollow</span>
                            </template>
                            <template v-else>
                                <span class="f-text">Follow</span>
                            </template>
                        </button>
                
                    </div>

                    <div style="clear:both"></div>

                    <div class="video-details" itemprop="description" v-html="course.body"></div>

                </div>

                <div class="clear"></div>

                <template v-if="course.topics && course.topics.length > 0">
                    <div class="uk-container-small uk-align-center uk-margin-remove-bottom uk-text-center uk-margin-remove-top">
                        <div id="display_tags">
                            <ul id="tag_list">
                                <li v-for="topic in course.topics"><a :href="'/topic/' + topic.slug">{{ topic.name }}</a></li>
                            </ul>
                        </div>
                    </div>
                </template>

                <div class="clear"></div>
                <div id="social_share">
                    <p>Share This Course:</p>
                    <ul class="share-buttons clearfix">
                        <li><a :href="'https://www.facebook.com/sharer/sharer.php?u=' + course.link" class="popup"><i class="dojo-facebook"></i><span>facebook</span></a></li>
                        <li><a :href="'http://twitter.com/home?status=' + course.title + ' : ' + course.link" class="popup"><i class="dojo-twitter"></i><span>twitter</span></a></li>
                        <li><a :href="'mailto:?subject=' + course.title + '&amp;body=' + course.link"><i class="dojo-envelope"></i><span>email</span></a></li>
                    </ul>
                </div>

            </div>

            <div class="uk-width-1-3@m uk-margin-medium-top sidebar">
                <div id="completion" class="uk-margin-small-top">
                    <h2>Course Completion</h2>
                    <div class="progress">
                        <div id="progress-bar" class="bar" :style="'width:' + course.completedPercent + '%'"></div>
                        <div class="bar-num"><span id="progress-num">{{ course.completedPercent }}</span>% completed</div>
                    </div>
                </div>
                <div id="codefund"></div>
            </div>
        </div>

	</div>
        <!-- ... -->

</template>
<script src="./course.js"></script>
<style lang="scss" scoped>
    @import './course.scss';
</style>