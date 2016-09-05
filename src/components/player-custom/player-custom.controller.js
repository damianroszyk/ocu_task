export default class PlayerCustomController {
	/* @ngInject */
	constructor(deezer, $scope, $window, playlistService, playerWidgetService, playerConstant) {
		this.$scope = $scope;
		this.window = $window;
		this.deezer = deezer;
		this.playlistService = playlistService;
		this.playerWidgetService = playerWidgetService;
		this.playerConstant = playerConstant;
		this.track = {};
	}
	$onInit() {
		this.deezer.deferredPlayer.promise.then(() => this.popup ?
			this.runPlayerInPopup() : this.runPlayerInWhitelabel()
		);
	}
	$onChanges(changedBindings) {
		if (changedBindings.servicePlaylistId) {
			this.$onInit();
		}
	}
	runPlayerInPopup() {
		this.playlistService
			.getPlaylist(this.localPlaylistId)
			.then(playlist => {
				this.playlist = playlist.data;
				this.playerShown = true;
				this.initPlaylist();
				this.play();
			});
		this.deezer
			.getPlaylist(this.servicePlaylistId)
			.then(playlist => this.tracks = playlist.tracks.data);
	}
	runPlayerInWhitelabel() {
		this.playlist = true;
		console.log('this.playerWidgetService', this.playerWidgetService.tracks);
		this.tracks = this.playerWidgetService.tracks;
		console.log('this.tracks[0]', this.tracks[0]);
		this.initPlaylist();
	}
	initPlaylist() {
		this.subscribePlayerEvents();
		if (this.trackIdx) {
			this.deezer.dz.player.playPlaylist(
				parseInt(this.servicePlaylistId, 10), true,
				parseInt(this.trackIdx, 10),
				parseInt(this.trackTime, 10)
			);
		} else {
			this.deezer.dz.player.playPlaylist(parseInt(this.servicePlaylistId, 10), false);
		}
	}
	subscribePlayerEvents() {
		this.deezer.dz.Event.subscribe('current_track', this._handleCurrentTrackChange.bind(this));
		this.deezer.dz.Event.subscribe('player_position', this._handlePlayerPositionChange.bind(this));
	}
	_handleCurrentTrackChange(newTrack) {
		this.$scope.$apply(() => {
			this.track.artist = newTrack.track.artist.name;
			this.track.album = newTrack.track.album.title;
			this.track.albumId = newTrack.track.album.id;
			this.track.title = newTrack.track.title;
			this.track.duration = newTrack.track.duration - 0;
			this.track.idx = newTrack.index;
		});
	}
	_handlePlayerPositionChange(positionArray) {
		let percent = (positionArray[1] == 0 ? 0 : (positionArray[0] / positionArray[1]) * 100);
		let completedTime = Math.floor(positionArray[0]);
		this.$scope.$apply(() => {
			this.percent = percent;
			this.track.completed = completedTime;
		});
	}
	play() {
		this.isPlayingTrack = true;
		this.deezer.dz.player.play();
	}
	pause() {
		this.isPlayingTrack = false;
		this.deezer.dz.player.pause();
	}
	next() {
		this.isPlayingTrack = true;
		this.deezer.dz.player.next();
	}
	prev() {
		this.isPlayingTrack = true;
		this.deezer.dz.player.prev();
	}
	shuffle() {
		this.deezer.dz.player.setShuffle(!this.isShuffling);
		this.isShuffling = !this.isShuffling;
	}
	repeat() {
		let repeat = this.isRepeating ?
			this.playerConstant.deezerRepeatingDictionary.noRepeat :
			this.playerConstant.deezerRepeatingDictionary.repeatTrack;
		this.deezer.dz.player.setRepeat(repeat);
		this.isRepeating = !this.isRepeating;
	}
	mute() {
		this.deezer.dz.player.setMute(!this.isMuted);
		this.isMuted = !this.isMuted;
	}
	setVolume(event) {
		if (event.which === 1) {
			let percent = (event.offsetX / event.currentTarget.clientWidth) * 100;
			this.deezer.dz.player.setVolume(percent);
			this.volume = percent;
		}
	}
	setPercent(event) {
		if (event.which === 1) {
			let percent = (event.offsetX / event.currentTarget.clientWidth);
			this.deezer.dz.player.seek(percent * 100);
			let completedTime = Math.floor(this.track.duration * percent);
			this.percent = percent * 100;
			this.track.completed = completedTime;
			this.isPlayingTrack = true;
		}
	}
	setPercentTemporarily(event) {
		if (event.which === 1) {
			let percent = (event.offsetX / event.currentTarget.clientWidth);
			let completedTime = Math.floor(this.track.duration * percent);
			this.percent = percent * 100;
			this.track.completed = completedTime;
		}
	}
	playTrackOfPlaylist(event) {
		let srcElement = event.srcElement || event.target;
		let parentTr = srcElement.parentElement.parentElement;
		let rowIndex = parentTr.rowIndex;
		this.isPlayingTrack = true;
		this.deezer.dz.player.playPlaylist(parseInt(this.servicePlaylistId, 10), true, rowIndex);
	}
	showPopup() {
		let url = [
			'#/player',
			this.localPlaylistId,
			'deezer',
			this.servicePlaylistId,
			this.track.idx,
			this.track.completed
		].join('/');
		let attrs = [
			`width=${this.playerConstant.popupSize.width}`,
			`height=${this.playerConstant.popupSize.height}`,
			`menubar=no`, `status=no`, `titlebar=no`, `toolbar=no`, `directories=no`
		].join(',');
		this.window.open(url, '_blank', attrs);
		this.close();
	}
	toggle() {
		this.isPlayerMinified = !this.isPlayerMinified;
	}
	maximize() {
		this.isMaximized = !this.isMaximized;
	}
	close() {
		this.isPlayerMinified = false;
		this.isMaximized = false;
		this.pause();
		this.playerWidgetService.destroy().notify();
	}
}
