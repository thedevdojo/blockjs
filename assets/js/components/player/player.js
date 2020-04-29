import Plyr from 'plyr';

window.player = '';

export default {
    props: ['image', 'hd_1080_url', 'hd_url', 'sd_540_url', 'sd_url'],
    data() {
        return {
            episode: {},
            loginToWatchVideo: '',
            allowWatchTo: Math.floor((Math.random() * 90) + 60),
            playerStoppedLogin: false,
            currentSecond: 0,
            seeked: false
        }
    },
    mounted () {
        this.initPlayer(true);
        this.loginToWatchVideo = document.getElementById('video_login');

    },
    methods: {
        initPlayer: function(autoplay){
            console.log('yep!');
            let playerEl = document.getElementById('player');
            if (autoplay === undefined) { autoplay = false; }
            if( playerEl ){
                console.log('hit yo');
                player = new Plyr('#player', {
                    iconUrl: '/themes/dd2018/images/video-player/plyr.svg',
                    ads: { enabled: false, publisherId: '881441980232400' },
                    autoplay: autoplay,
                    currentTime: 60,
                    quality: {
                        default: '1080'
                    }
                });
                player.on('ready', event => {
                    courseProgress();
                    setSideBarWidth();
                    setPlayListHeight();
        
                    setInterval(function(){
                        if(!this.seeked){
                            if(document.getElementById('seek')){
                                player.currentTime = parseInt(document.getElementById('seek').value);
                                if(player.currentTime >= parseInt(document.getElementById('seek').value)){
                                    this.seeked = true;
                                }
                            } else {
                                this.seeked = true;
                            }
                        }
                    }, 100);
        
                    //loadEpisode(document.getElementById('episode_order').value);
                    //startVideoProgress();
                });
        
                player.on('seeked', event => {
                    this.currentSecond = Math.floor(player.currentTime);
                });
        
                player.on('loadstart', event => {
                    setPlayListHeight();
                });
        
                var imgProgressEl = document.getElementById('img_progress');
                var timeRemainingEl = document.getElementById('time_remaining');
        
                player.on('timeupdate', event => {
        
                    if(this.loginToWatchVideo && !this.playerStoppedLogin){
                        if(player.currentTime > this.allowWatchTo){
                            player.stop();
                            this.loginToWatchVideo.classList.remove('hidden');
                            playerEl.style.display = 'none';
                            this.playerStoppedLogin = true;
                        }
                    }
        
        
                    var percentageComplete = (player.currentTime/player.duration)*100;
                    var totalSecondsRemaining = Math.round(player.duration - player.currentTime);
                    var remainingMinutes = Math.floor(totalSecondsRemaining/60);
                    var remainingSeconds = totalSecondsRemaining - remainingMinutes * 60;
                    var remaining = str_pad_left(remainingMinutes,'0',2)+':'+str_pad_left(remainingSeconds,'0',2);
        
                    // this gets called every second the video is playing
                    if( Math.floor(player.currentTime) > this.currentSecond ){
                        this.currentSecond = Math.floor(player.currentTime);
        
                        // After every five seconds we can submit a status update
                        if(this.currentSecond % 5 == 0){
        
                            var courseEl = document.getElementById('course_id');
                            if(courseEl){
                                postAjax('/course/seeking', { courseId : courseEl.value, episodeId: episodeId, currentSecond : currentSecond, _token: csrf }, function(data){});
                            }
                        }
        
                        //console.log(currentSecond);
                        if(this.currentSecond % 60 == 0){
        
                            console.log('we hit the minute mark');
                            var courseEl = document.getElementById('course_id');
                            if(courseEl){
                                postAjax('/watched/minute', { typeId : courseEl.value, type: 'course', _token: csrf }, function(data){});
                            }
        
                            var episodeEl = document.getElementById('episode_id');
                            if(episodeEl){
                                postAjax('/watched/minute', { typeId : episodeEl.value, type: 'episode', _token: csrf }, function(data){});
                            }
                        }
        
                    }
        
                    var activeEpisode = document.querySelector('.episodeLi.active');
                    if(activeEpisode){
                        var activeEpisodeProgress = document.getElementById('episode-' + activeEpisode.dataset.order + '-progress');
                    }
        
                    if(activeEpisodeProgress){
                        activeEpisodeProgress.style.width = percentageComplete + '%';
                    }
        
                    if(imgProgressEl){
                        imgProgressEl.style.width = percentageComplete + '%';
                    }
                    if(timeRemainingEl){
                        timeRemainingEl.innerHTML = remaining;
                    }
                });
                player.on('play', event => {
                    if(this.playerStoppedLogin){
                        player.stop();
                    }
                    // add here asdf
                    var activeEpisode = document.querySelector('.episodeLi.active');
                    if(activeEpisode){
                        document.getElementById(activeEpisode.id + '-playpause').classList.add('playing');
                    }
        
                });
        
                player.on('pause', event => {
                    var activeEpisode = document.querySelector('.episodeLi.active');
                    document.getElementById(activeEpisode.id + '-playpause').classList.remove('playing');
                });
        
                player.on('ended', event => {
                    window.finishVideoPoint();
                    if(document.getElementById('button-complete')){
                        document.getElementById('button-complete').click();
                    }
                    var activeEpisode = document.querySelector('.episodeLi.active');
                    for (var i = 0; i < activeEpisode.childNodes.length; i++) {
                        if ( activeEpisode.childNodes[i].className && activeEpisode.childNodes[i].className.includes("button-complete") ) {
                            console.log('found');
                          activeEpisode.childNodes[i].click();
                          break;
                        }
                    }
        
                    if(!localStorage.getItem("disable_autoplay_" + document.getElementById('course_id').value)){
                        var next_episode = parseInt(document.getElementById('episode_order').value) + 1;
                        console.log('next_ep' + next_episode);
                        loadEpisode(next_episode);
                    }
        
                });
        
                if(autoplay){
                    player.play();
                }
        
            }
        }
    }
}