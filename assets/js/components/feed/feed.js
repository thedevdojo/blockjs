import axios from 'axios';
import { SlowBuffer } from 'buffer';

export default {
    props: ['data', 'reactions'],
    data() {
        return {
            feed: [],
            fetchingData: false,
            curPage: 0,
            feedItemType: '',
            feedItemId: 0,
        }
    },
    mounted () {
        // Do something useful with the data in the template
        console.dir(this.data)
    },
    created () {
        //this.feed = this.data;
        this.fetchFeed();
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
        dynamicContent: function () {
            return this.feedItemType;
        }
    },
    methods: {
        imgURL: function(image){
            return 'https://cdn.devdojo.com/' + image;
        },
        emojiAddClass: function(user_reaction){
            if(user_reaction != null){
                return 'uk-button uk-button-default no-load emoji-add user_reacted';    
            }
            return 'uk-button uk-button-default no-load emoji-add';
        },
        userReactedClass: function(user_reaction, reaction_name){
            if(user_reaction != null){
                if(user_reaction.name == reaction_name){
                    return 'react no-load reaction_active';
                }
            }
            return 'react no-load';
        },
        cardClass: function(image, type, description){
            var descriptionClass = '';
            if(typeof(description) == 'undefined' || !description.trim()){
                descriptionClass = ' no-description';
            }
            if(image){
                return 'uk-card uk-card-padding default-border uk-padding uk-margin-medium-bottom with-image card-' + type + descriptionClass;
            } else {
                return 'uk-card uk-card-padding default-border uk-padding uk-margin-medium-bottom card-' + type + descriptionClass;
            }
        },
        userReacted: function(reaction, item, itemIndex, event){
            
            event.stopPropagation();
            var thisItem = item;
            var thisReaction = reaction;
            var that = this;
            axios.post('/api/user/react', {
                    reaction : reaction.name, type: item.type, id : item.id, _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                })
                .then(function (response) {
                    that.changeUserReaction(itemIndex, response.data.reaction);
                    that.updateItemReactions(itemIndex, response.data.reactions, response.data.total_reactions);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleScroll: function(){
            var pixelFetchOffset = 3000;

            var scrollPos = window.scrollY + pixelFetchOffset;
            var feedPos = document.getElementById('feed_container').offsetHeight - document.getElementById('feed_container').offsetTop;
            if( (feedPos <= scrollPos) && !this.fetchingData ){
                this.fetchFeed();
            }
        },
        changeUserReaction: function(id, reaction){
            this.feed[id].user_reaction = reaction;
        },
        updateItemReactions: function(id, reactions, total){
            this.feed[id].reactions = reactions;
            this.feed[id].reactions_total = total;
        },
        fetchFeed: function(){
            this.curPage += 1;
            this.fetchingData = true;
            var that = this;

            axios.get('/api/feed/' + this.curPage)
                .then(function (response) {
                    // if(that.curPage == 1){
                    //     // put at least 2 feed items with images at the top
                    //     var nonImageArray = [];
                    //     var imageArray = [];
                        
                    //     for(var i=0; i<response.data.length; i++){
                    //         if(response.data[i].image && imageArray.length < 2){
                    //             imageArray.push(response.data[i]);
                    //         } else {
                    //             nonImageArray.push(response.data[i]);
                    //         }
                            
                    //     }

                    //     for(var j=0; j<imageArray.length; j++){
                    //         that.feed.push(imageArray[j]);
                    //     }

                    //     for(var k=0; k<nonImageArray.length; k++){
                    //         that.feed.push(nonImageArray[k]);
                    //     }


                    // } else {
                    //     // handle success
                    //     for(var i=0; i<response.data.length; i++){
                    //         that.feed.push(response.data[i]);
                    //     }
                    // }
                    for(var i=0; i<response.data.length; i++){
                        //if(response.data[i].type == 'episode'){
                                that.feed.push(response.data[i]);
                        //}
                            }
                    that.fetchingData = false;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },
        cardClicked: function(event){
            if(event.target.id != 'modal-layer' && !document.getElementById('modal-layer') && !event.target.classList.contains('no-load') && event.target.closest(".uk-card").dataset.index){

                document.body.classList.add('noscroll');
                document.body.classList.add('dynamic-content-open');
                var dynamicModal = document.createElement('div');
                dynamicModal.id = 'modal-layer';

                var dynamicModalClose = document.createElement('div');
                dynamicModalClose.id = 'modal-close';
                dynamicModalClose.innerHTML = '&times;';

                var modalLoader = document.createElement('div');
                modalLoader.id = 'modal-loader';

                var feedItem = event.target.closest(".uk-card");
                feedItem.classList.add('clicked');
                var feedItemOffset = feedItem.getBoundingClientRect();

                var item = this.feed[feedItem.dataset.index];

                var widthPercentage = 100 * (feedItem.offsetWidth / window.innerWidth);
                var heightPercentage = 100 * ( (feedItem.offsetHeight-4) / window.innerHeight);
                console.log('percentage ' + feedItem.offsetHeight);

                Object.assign(dynamicModal.style, {top: feedItemOffset.top + 'px', left: feedItemOffset.left + 'px', width: widthPercentage + '%', height: heightPercentage + '%', position: 'fixed'});

                dynamicModal.innerHTML = `<div id="modal-close-display">&times;</div><div id="modal-content"></div>`;

                
                this.feedItemType = this.getFeedType(feedItem.dataset.type);
                this.feedItemId = item.id;

                document.getElementById('dynamic-container').className = feedItem.dataset.type + '-type';

                feedItem.appendChild(dynamicModal);
                feedItem.appendChild(dynamicModalClose);
                feedItem.appendChild(modalLoader);

                var that = this;
                setTimeout(function(){
                    
                    window.history.pushState(null, item.title, item.link);
                    dynamicModal.classList.add('expand');

                    setTimeout(function(){
                        document.getElementById('dynamic-content').className = 'in-front uk-animation-slide-bottom-small';
                    }, 250);

                    setTimeout(function(){
                        document.getElementById('modal-close-display').classList.add('visible');
                        dynamicModal.classList.add('expanded');
                    }, 300);

                    // if the user presses the back button
                    window.addEventListener('popstate', function(){
                        that.closeFeedItem();
                    });

                    document.getElementById('modal-close').addEventListener('click', function(e){
                        
                        window.history.back();
                        that.closeFeedItem();
                    });

                }, 800);

            }
        },
        closeFeedItem: function(){
            document.getElementById('dynamic-content').className = 'in-front uk-animation-reverse';
            //document.getElementById('dynamic-content').style.display = 'none';
            setTimeout(function(){
                document.getElementById('dynamic-content').classList.add('uk-animation-slide-bottom-small');
            }, 10);
            var that = this;
            setTimeout(function(){
                document.getElementById('modal-layer').classList.remove('expand');
                setTimeout(function(){
                    that.feedItemType = '';
                    document.getElementById('dynamic-content').className = '';
                    if(document.getElementById('modal-layer')){
                        document.getElementById('modal-layer').classList.add('fadeOut');
                    }
                    setTimeout(function(){
                        window.removeEventListener('popstate', null);
                        if(document.getElementById('modal-layer')){
                            document.getElementById('modal-layer').remove();
                        }
                        if(document.getElementById('modal-loader')){
                            document.getElementById('modal-loader').remove();
                        }
                        if(document.getElementById('modal-close')){
                            document.getElementById('modal-close').remove();
                        }
                        if(document.getElementById('modal-close-display')){
                            document.getElementById('modal-close-display').remove();
                        }
                        document.body.classList.remove('noscroll');
                        document.body.classList.remove('dynamic-content-open');
                        if(document.querySelector('.uk-card.clicked')){
                            document.querySelector('.uk-card.clicked').classList.remove('clicked');
                        }
                    });
                }, 300);
            }, 250);
        },
        getFeedType: function(type){
            if(type == 'tutorial' || type == 'article'){
                return 'post';
            }
            return type;
        }
    }
}

Vue.filter('striphtml', function (value) {
    var div = document.createElement("div");
    div.innerHTML = value;
    var text = div.textContent || div.innerText || "";
    return text;
  });

Vue.filter('substring', function(value){
    if(value.length > 180){
        var newValue = value.substring(0, 180);
        return newValue.substring(0, newValue.lastIndexOf(" ")) + '...';
    }
    return value;
});