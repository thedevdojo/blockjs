<template>
    <div class="article">

        
        <div class="article-info">

            <h1 class="uk-article-title uk-margin-medium-top uk-text-left">{{ post.title }}</h1>
            <div class="post-author">
                <div v-html="post.author_image"></div>
                <div class="user-card-info">
                    <div class="user-card-info-top">
                        <a :href="post.author_link" class="profile-link">{{ post.author_name }}</a>
                        <!-- @include('theme::partials.follow-btn', ['follow_id' => $post->user->id]) -->
                    </div>
                    <div class="post-details uk-text-left">
                        <span class="uk-article-meta"> <time :datetime="post.created_iso8601">{{ post.created }}</time></span>
                        <span class="uk-article-meta uk-article-meta-sep">|</span>
                        <span class="uk-article-meta"><a :href="'/' + post.category" rel="category">{{ post.category }}</a></span>
                        <span class="uk-article-meta uk-article-meta-sep">|</span>
                        <span class="uk-article-meta"><span id="view_count">{{ post.views }} Views</span>
                        <span class="uk-article-meta uk-article-meta-sep">|</span>
                        <span class="uk-article-meta uk-payout">${{ post.earnings }}</span></span>
                    </div>
                </div>
            </div>

            <div class="uk-article-image">
                <img width="1200" height="640" :data-src="post.image + '?auto=compress&w=800&h=450&dpr=2'" :data-srcset="post.image + '?auto=compress&w=450&dpr=2 450w, ' + post.image + '?auto=compress&w=640&dpr=2 640w, ' + post.image + '?auto=compress&w=960&dpr=2 960w'" class="placeholder" :alt="post.title" uk-img>
            </div>

        </div>

        <article :id="'post-' + post.id" :class="'uk-article post-' + post.id + ' uk-text-center uk-margin-large-bottom'">

            <input id="postId" name="postID" type="hidden" :value="post.id">
            <meta property="name" :content="post.title">
            <meta property="author" typeof="Person" content="admin">
            <meta property="dateModified" :content="post.updated_iso8601">
            <meta class="uk-margin-remove-adjacent" property="datePublished" :content="post.updated_iso8601">

            <div class="uk-text-left" v-html="post.body"></div>

        </article>

        <template v-if="post.topics && post.topics.length > 0">
            <div class="uk-container-small uk-align-center uk-margin-remove-bottom uk-text-center uk-margin-remove-top">
                <div id="display_tags">
                    <ul id="tag_list">
                        <li v-for="topic in post.topics"><a :href="'/topic/' + topic.slug">{{ topic.name }}</a></li>
                    </ul>
                </div>
            </div>
        </template>

    </div>
</template>
<script src="./post.js"></script>