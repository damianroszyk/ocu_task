export default class PlayerCustomController {
	/* @ngInject */
	constructor(deezer, $scope, $window, playlistService, playerService, playerConstant) {

		var player = this;

		this.deezer = deezer;
		this.playlistService = playlistService;
		this.playerService = playerService;
		this.playerConstant = playerConstant;
		this.scope = $scope;
		this.isPlayingTrack = false;
		this.isShuffling = false;
		this.isRepeating = false;
		this.isPlayerMinified = false;
		this.isMuted = false;
		this.volume = 100; // <0, 100>
		this.percent = 0.0; // <0.0, 100.0>
		this.playlist;
		this.window = $window;
		this.track = {
			artist: '',
			album: '',
			albumId: null,
			title: '',
			duration: 0,
			completed: 0,
			idx: 0
		};

		if(player.popup){
			let header = document.getElementsByClassName('header')[0];
			let nav = document.getElementsByClassName('nav')[0];
			let footer = document.getElementsByClassName('footer')[0];
			header.parentNode.removeChild(header);
			nav.parentNode.removeChild(nav);
			footer.parentNode.removeChild(footer);
		}

		if(!!deezer.dz && !!deezer.dz.player && deezer.dz.player.loaded){
			player.subscribePlayerEvents();
			if(player.popup){
				player.runPlayerInPopup();
			}
		}
		else{
			document.addEventListener('DEEZER_LOADED', () => {
				player.subscribePlayerEvents();
				if(player.popup){
					player.runPlayerInPopup();
				}
			});
		}
	}
	runPlayerInPopup(){

		var player = this;

		this.playlistService.getPlaylist(player.playlistId - 0).then(response => {

			player.playlist = response;

			if(typeof player.trackIdx === 'undefined'){
				this.deezer.dz.player.playPlaylist(player.playlistId - 0, false);
				console.log(this.deezer.dz.player.getTrackList());
			}
			else{
				this.deezer.dz.player.playPlaylist(player.playlistId - 0, true, player.trackIdx - 0, player.trackTime - 0);
				console.log(this.deezer.dz.player.getTrackList());
			}

		});

	}
	runPlayerInWhitelabel(){

		var player = this;

		this.playlist = true;

		if(typeof player.trackIdx === 'undefined'){
			this.deezer.dz.player.playPlaylist(player.playlistId - 0, false);
		}
		else{
			this.deezer.dz.player.playPlaylist(player.playlistId - 0, true, player.trackIdx - 0, player.trackTime - 0);
		}

	}
	subscribePlayerEvents(){

		var player = this;

		document.addEventListener('RUN_PLAYER', () => {
			player.runPlayerInWhitelabel();
		});

		this.deezer.dz.Event.subscribe('current_track', newTrack => {

			this.scope.$apply(() => {
				player.track.artist = newTrack.track.artist.name;
				player.track.album = newTrack.track.album.title;
				player.track.albumId = newTrack.track.album.id;
				player.track.title = newTrack.track.title;
				player.track.duration = newTrack.track.duration - 0;
				player.track.idx = newTrack.index;
			});
		});

		this.deezer.dz.Event.subscribe('player_position', positionArray => {

			var percent = (positionArray[1] == 0 ? 0 : (positionArray[0] / positionArray[1]) * 100);
			var completedTime = Math.floor(positionArray[0]);

			this.scope.$apply(() => {
				player.percent = percent;
				player.track.completed = completedTime;
			});

		});

	}
	play(){
		this.isPlayingTrack = true;
		this.deezer.dz.player.play();
	}
	pause(){
		this.isPlayingTrack = false;
		this.deezer.dz.player.pause();
	}
	next(){
		this.isPlayingTrack = true;
		this.deezer.dz.player.next();
	}
	prev(){
		this.isPlayingTrack = true;
		this.deezer.dz.player.prev();
	}
	shuffle(){
		this.deezer.dz.player.setShuffle(!this.isShuffling);
		this.isShuffling = !this.isShuffling;
	}
	repeat(){
		this.deezer.dz.player.setRepeat(this.isRepeating ? this.playerConstant.deezerRepeatingDictionary.noRepeat : this.playerConstant.deezerRepeatingDictionary.repeatTrack);
		this.isRepeating = !this.isRepeating;
	}
	mute(){
		this.deezer.dz.player.setMute(!this.isMuted);
		this.isMuted = !this.isMuted;
	}
	setVolume(event){
		if(event.which === 1){
			var percent = (event.offsetX / event.currentTarget.clientWidth) * 100;
			this.deezer.dz.player.setVolume(percent);
			this.volume = percent;
		}
	}
	setPercent(event){
		if(event.which === 1) {
			var percent = (event.offsetX / event.currentTarget.clientWidth);
			this.deezer.dz.player.seek(percent * 100);
			var completedTime = Math.floor(this.track.duration * percent);
			this.percent = percent * 100;
			this.track.completed = completedTime;
			//setTimeout(this.deezer.dz.player.play, 2000);
			this.isPlayingTrack = true;
		}
	}
	setPercentTemporarily(event){
		if(event.which === 1) {
			var percent = (event.offsetX / event.currentTarget.clientWidth);
			var completedTime = Math.floor(this.track.duration * percent);
			this.percent = percent * 100;
			this.track.completed = completedTime;
		}
	}
	playTrackOfPlaylist(event){
		var srcElement = event.srcElement || event.target;
		var parentTr = srcElement.parentElement.parentElement;
		var rowIndex = parentTr.rowIndex;
		this.isPlayingTrack = true;
		DZ.player.playPlaylist(this.playlistId - 0, true, rowIndex);
	}
	showPopup(){
		this.window.open(
			'#/player/deezer/' + (this.playerService.playlistId - 0) + '/' + this.track.idx + '/' + this.track.completed,
			'_blank',
			'width='+this.playerConstant.popupSize.width+',height='+this.playerConstant.popupSize.height+',menubar=no,status=no,titlebar=no,toolbar=no,directories=no');
		this.close();
	}
	toggle(){
		this.isPlayerMinified = !this.isPlayerMinified;
	}
	maximize(){
		this.isMaximized = !this.isMaximized;
	}
	close(){
		this.isPlayerMinified = false;
		this.isMaximized = false;
		this.playerService.hide();
		this.pause();
	}

}
