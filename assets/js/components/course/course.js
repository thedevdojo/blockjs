import axios from 'axios';
import player from '../player/player.vue';

export default {
    props: ['id', 'content'],
    extends: player,
    data() {
        return {
            course: {}
        }
    },
    components: {
        player
    },
    mounted () {
        if(typeof(this.content) == 'undefined'){
            this.getCourse();
        } else {
            this.course = JSON.parse(this.content);
        }
    },
    methods: {
        getCourse: function(){
            var that = this;
            axios.get('/api/auth/course/' + this.id)
                .then(function (response) {
                    // handle success
                    that.course = JSON.parse(response.data);
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
            if(this.course.episode_favorited){
                return 'favorited';
            }
            return '';
        },
        hasBeenCompleted: function(){
            // if(this.episode.completed){
            //     return 'uk-button uk-button-default completed';
            // }
            // return 'uk-button uk-button-default';
        }
    }
}