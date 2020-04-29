window.Vue = require('vue');
var Encoder = require('node-html-encoder').Encoder;
window.encoder = new Encoder('entity');
window.htmlToJson = require('himalaya');
import InputTag  from 'vue-input-tag';
import axios from 'axios';

Vue.component('input-tag', InputTag);
window.blockEditor = Vue.component('block-editor', require('./components/block-editor/block-editor.vue').default);
const app = new Vue({
    el: '#ddBlockJS',
    data: {
        post: {
            title: '',
            type: 'article',
            tags: [],
            image: '',
            active: false,
            slug: '',
            content: {}
		},
    	savingPost: false,
		saveButtonDimensions: { width: 0, height: 0 },
		sideBarOpen: false
    },
    mounted(){

        if(this.$refs.post){
            // we are editing a current post
            axios.post('/posts/json/' + this.$refs.post.value, {
                  _token: document.querySelector('meta[name="csrf-token"]').content
                })
                .then(response => {
                    console.log(response.data);
                    this.post = response.data;
                    this.$refs.tags.innerTags = this.post.tags;
                })
                .catch(e => {
                    this.savingPost = false;
                    dojo_alert('Whoops', 'Error retrieving post. Contact site admin if you think this is a mistake.', 'danger');
                });
        }
    },
    watch: {
    	savingPost: function(){
    		document.getElementById('saveButton').style.width = this.saveButtonDimensions.width + 'px';
    		document.getElementById('saveButton').style.height = this.saveButtonDimensions.height + 'px';
    	}
    },
    computed: {
    	statusClass(){
    		if(this.post.active){
    			return 'toggleCopy published';
    		}
    		return 'toggleCopy draft';
    	},
    	buttonStatusClass(){
    		if(this.post.active){
    			return 'uk-button uk-button-primary';
    		}
    		return 'uk-button uk-button-default';
    	},
    	postImgClass(){
    		if(this.post.image){
    			return 'postImg imgAdded'
    		}
    		return 'postImg';
		},
		sideBarClass(){
			if(this.sideBarOpen){
				return 'opened';
			}
			return '';
		}

    },
    methods: {
    	newImage: function(e){

    		if (e.target.files && e.target.files[0]) {

		        var reader = new FileReader();

		        // calculate file size
		        var file_size = e.target.files[0].size;
		        if(file_size < 1500000){

			        reader.onload = function (event) {
			            app.post.image = event.target.result;
			        }

			        reader.readAsDataURL(e.target.files[0]);
			    } else {
			    	dojo_alert('Image too Large', 'Please upload an image smaller than 1.5MB. Thanks :)', 'danger');
			    }
		    }
    	},
        visitPost: function(){
            var postURL = '/' + this.post.type + 's/' + this.post.slug;
            window.open(postURL, '_blank');
        },
    	save: function(){
    		console.log('click saved');

    		if(this.post.image == ''){
    			dojo_alert('Whoops', 'Please make sure to enter a valid image.', 'danger');
    		} else if(this.post.title == ''){
    			dojo_alert('Whoops', 'Please make sure to enter a valid title.', 'danger');
    		} else {

	    		var image = document.getElementById('img_preview');
				image.onerror = function () {
				  alert('error loading ' + this.src);
				  this.src = 'error.png'; // place your error.png image instead
				};

			    this.savingPost = true;
	    		axios.post('/posts/create', {
			      post: this.post,
			      _token: document.querySelector('meta[name="csrf-token"]').content
			    })
			    .then(response => {
			    	this.savingPost = false;
			    	console.log(response.data);
                    this.post['id'] = response.data.post.id;
                    this.post['slug'] = response.data.post.slug;

                    if (window.history.pushState) {
                        window.history.pushState(null, 'Edit Post', '/posts/edit/' + response.data.post.id);
                    }

                    dojo_alert('Success', 'Your post has been saved.', 'success');
			    })
			    .catch(e => {
			    	this.savingPost = false;
			    	dojo_alert('Whoops', 'Something went wrong. Make sure all fields are valid. Contact site admin if you think this is a mistake.', 'danger');
			    });
			}
    	},
        blockEditorUpdate(blockContent){
            this.post.content = blockContent;
        }
    }
});
