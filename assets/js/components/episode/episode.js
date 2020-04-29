import axios from 'axios';
import player from '../player/player.vue';

export default {
    props: ['id', 'content'],
    extends: player,
    data() {
        return {
            episode: {}
        }
    },
    components: {
        player
    },
    mounted () {
        console.log('mounted!');
        if(typeof(this.content) == 'undefined'){
            this.getEpisode();
        } else {
            console.log('assigned');
            this.episode = JSON.parse(this.content);
        }
    },
    methods: {
        getEpisode: function(){
            var that = this;
            axios.get('/api/auth/episode/' + this.id)
                .then(function (response) {
                    // handle success
                    that.episode = JSON.parse(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },
        hasBeenFavorited: function(){
            if(this.episode.favorited){
                return 'favorited';
            }
            return '';
        },
        hasBeenCompleted: function(){
            if(this.episode.completed){
                return 'uk-button uk-button-default completed';
            }
            return 'uk-button uk-button-default';
        }
    }
}