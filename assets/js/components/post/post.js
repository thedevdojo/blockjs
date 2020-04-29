import axios from 'axios';

export default {
    props: ['id', 'content'],
    data() {
        return {
            post: {}
        }
    },
    mounted () {
        if(typeof(this.content) == 'undefined'){
            this.getPost();
        } else {
            this.post = JSON.parse(this.content);
        }
    },
    methods: {
        getPost: function(){
            var that = this;
            axios.get('/api/post/' + this.id)
                .then(function (response) {
                    // handle success
                    that.post = JSON.parse(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }
    }
}