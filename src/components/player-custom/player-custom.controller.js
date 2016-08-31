export default class PlayerCustomController {
	/* @ngInject */
	constructor(deezer, $scope, $window, $stateParams, playlistService, playerConstant) {

		var player = this;

		this.deezer = deezer;
		this.playerConstant = playerConstant;
		this.isPlayingTrack = false;
		this.isShuffling = false;
		this.isRepeating = false;
		this.isPlayerMinified = false;
		this.isMuted = false;
		this.volume = 100; // <0, 100>
		this.percent = 0.0; // <0.0, 100.0>
		this.playlistId = $stateParams.playlistId - 0;
		this.playlist;
		this.window = $window;
		this.track = {
			artist: '',
			album: '',
			albumId: null,
			title: '',
			duration: 0,
			completed: 0
		};

		if(this.popup){
			let header = document.getElementsByClassName('header')[0];
			let nav = document.getElementsByClassName('nav')[0];
			let footer = document.getElementsByClassName('footer')[0];
			header.parentNode.removeChild(header);
			nav.parentNode.removeChild(nav);
			footer.parentNode.removeChild(footer);
		}

		document.addEventListener('DEEZER_LOADED', () => {

			deezer.dz.Event.subscribe('current_track', newTrack => {
				$scope.$apply(() => {
					player.track.artist = newTrack.track.artist.name;
					player.track.album = newTrack.track.album.title;
					player.track.albumId = newTrack.track.album.id;
					player.track.title = newTrack.track.title;
					player.track.duration = newTrack.track.duration - 0;
				});
			});

			deezer.dz.Event.subscribe('player_position', positionArray => {
				var percent = (positionArray[1] == 0 ? 0 : (positionArray[0] / positionArray[1]) * 100);
				var completedTime = Math.floor(positionArray[0]);
				$scope.$apply(() => {
					player.percent = percent;
					player.track.completed = completedTime;
				});
			});

		$scope.$on('$stateChangeStart', player.deezer.dz.player.pause);

		playlistService.getPlaylist($stateParams.playlistId - 0).then(response => {
			player.playlist = response;
			deezer.dz.player.playPlaylist($stateParams.playlistId - 0, false);
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
		DZ.player.playPlaylist(this.playlistId, true, rowIndex);
	}

	showPopup(){
		this.window.open(
			'#/player/deezer/' + this.playlistId,
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
		this.hidePlayer();
		this.pause();
	}

}
