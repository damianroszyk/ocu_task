import angular from 'angular';
import _ from 'lodash';

import PlayerController from 'abstract/player';

export default class PlayerCustomController extends PlayerController {
	/* @ngInject */
	constructor(deezer, $scope, $state, $window, $timeout, dispatcherService, playlistService, playerWidgetService, playerConstant) {
		super($window, $state, dispatcherService, playerConstant);
		this.$scope = $scope;
		this.$state = $state;
		this.$window = $window;
		this.$timeout = $timeout;
		this.dispatcherService = dispatcherService;
		this.deezer = deezer;
		this.playlistService = playlistService;
		this.playerWidgetService = playerWidgetService;
		this.playerConstant = playerConstant;
		this.track = {};
	}
	$onInit() {
		this.deezer.deferredPlayer.promise.then(() => {
			this.deezer
			.getPlaylist(parseInt(this.servicePlaylistId, 10))
			.then(playlist => this.tracks = playlist.tracks.data);
			return this.popup ? this.runPlayerInPopup() : this.runPlayerInWhitelabel();
		});
	}
	$onChanges(changedBindings) {
		if (changedBindings.servicePlaylistId) {
			this.$onInit();
		}
	}
	runPlayerInPopup() {
		this.playLocalPlaylist(this.localPlaylistId);
	}
	playLocalPlaylist(localPlaylistId) {
		this.playlistService
			.getPlaylist(this.localPlaylistId)
			.then(playlist => {
				this.playlist = playlist.data;
				this.playerShown = true;
				this.initPlaylist();
			});
	}
	runPlayerInWhitelabel() {
		this.playlist = true;
		this.tracks = this.playerWidgetService.tracks;
		this.initPlaylist();
	}
	initPlaylist() {
		this.subscribePlayerEvents();
		this.isPlayingTrack = true;
		if (this.trackIdx) {
			this.deezer.dz.player.playPlaylist(
				parseInt(this.servicePlaylistId, 10), true,
				parseInt(this.trackIdx, 10),
				parseInt(this.trackTime, 10)
			);
			this.$timeout(() => {
				if (this.$state.params.shuffle === 'true') {
					this.shuffle();
				}
				if (this.$state.params.repeat === 'true') {
					this.repeat();
				}
			}, 3000);
		} else {
			this.deezer.dz.player.playPlaylist(parseInt(this.servicePlaylistId, 10), 0);
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
			this.track.idx = newTrack.index === 0 && this.trackIndex ? this.trackIndex : newTrack.index;
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
	playTrackOfPlaylist(index, track) {
		this.isPlayingTrack = true;
		this.trackIndex = index;
		this.deezer.dz.player.playTracks([track.id]);
	}
	showPopup() {
		let url = [
			'/player',
			this.localPlaylistId,
			'deezer',
			this.servicePlaylistId,
			this.track.idx,
			this.track.completed,
			this.isShuffling,
			this.isRepeating
		].join('/');
		let attrs = [
			`width=${this.playerConstant.popupSize.width}`,
			`height=${this.playerConstant.popupSize.height}`,
			`menubar=no`, `status=no`, `titlebar=no`, `toolbar=no`, `directories=no`
		].join(',');
		this.playerWidgetService.popup = 'deezer';
		this.$window.open(url, '_blank', attrs);
		this.close();
		this.$timeout(() => this.pause(), 3000);
	}
	toggle() {
		this.isPlayerMinified = !this.isPlayerMinified;
		this.isMaximized = false;
	}
	maximize() {
		this.isMaximized = !this.isMaximized;
		this.isPlayerMinified = false;
	}
	close() {
		this.isPlayerMinified = false;
		this.isMaximized = false;
		this.pause();
		this.playerWidgetService.destroy().notify();
	}
	handlePlayLocalPlaylistEvent(event) {
		if (event.detail && event.detail.playlist) {
			this.localPlaylistId = event.detail.playlist.id;
			this.servicePlaylistId = event.detail.playlist.deezer.service_playlist_id;
			this.$onInit();
		}
	}
}
