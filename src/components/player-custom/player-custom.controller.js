import angular from 'angular';
import _ from 'lodash';

import PlayerController from 'abstract/player';

export default class PlayerCustomController extends PlayerController {
	/* @ngInject */
	constructor(deezer, $scope, $state, $window, $timeout, dispatcherService, playlistService,
		playerWidgetService, playerConstant, musicProvider, napsterService,
		napsterPlayerService, deezerPlayerService) {
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
		this.musicProvider = musicProvider;
		this.napsterService = napsterService;
		this.napsterPlayerService = napsterPlayerService;
		this.deezerPlayerService = deezerPlayerService;
		console.log("serviceTracks", this.servicePlaylistTracks);
		this.currentTrack = this.servicePlaylistTracks[0];

		this.dispatcherService.listen('albumImageChange', (event, response) => {
			this.track.albumImageUrl = response;
		});

		this.dispatcherService.listen('currentTrackChange', (event, track) => {
			console.log("trackListen", track);
			this.$scope.$apply(() => {
				this.track.albumImageUrl = `https://api.deezer.com/album/${track.albumId}/image`;
				this.track.artist = track.artist;
				this.track.album = track.album;
				this.track.albumId = track.albumId;
				this.track.title = track.title;
				this.track.duration = track.duration - 0;
				this.track.idx = track.index === 0 && this.trackIndex ? this.trackIndex : track.index;
			});
		});

		this.dispatcherService.listen('trackPositionChange', (event, trackPosition) => {
			console.log("trackPosition", trackPosition);
			this.$scope.$apply(() => {
				this.percent = trackPosition.percent;
				this.track.completed = trackPosition.completedTime;
			});
		});

		this.dispatcherService.listen('initialTrackSetting', (event, settings) => {
			this.$scope.$apply(() => {
				this.volume = settings.volume;
				setting.shuffle ? this.shuffle() : '';
				setting.repeat ? this.repeat() : '';
			});
		});

		this.currentPlayerService = this.musicProvider.isNapster() ?
			this.napsterPlayerService : this.deezerPlayerService;
	}
	
	$onInit() {
		if (this.musicProvider.isNapster()) {
			console.log('napster');
			this.napsterService.initNapsterPlayer(this.currentTrack);
			this.isPlayingTrack = true;
			return this.popup ? this.runPlayerInPopup() : this.runPlayerInWhitelabel();
		} else if (this.musicProvider.isDeezer()) {
			console.log('deezer');
			return this.popup ? this.runPlayerInPopup() : this.runPlayerInWhitelabel();
		}
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
		if (this.musicProvider.isDeezer()) {
			this.initPlaylist();
		}
	}

	initPlaylist() {
		this.isPlayingTrack = true;
		this.currentPlayerService.initPlaylist({
			trackIdx: this.trackIdx,
			servicePlaylistId: this.servicePlaylistId,
			trackTime: this.trackTime
		});
	}

	play() {
		this.isPlayingTrack = true;
		this.currentPlayerService.play(this.currentTrack);
	}

	pause() {
		this.isPlayingTrack = false;
		this.currentPlayerService.pause();
	}

	getNextTrack() {
		for (var i = 0; i < this.servicePlaylistTracks.length; i++) {
			if (this.servicePlaylistTracks[i].id === this.currentTrack.id) {
				this.currentTrack = this.servicePlaylistTracks[i + 1];
				// @TODO case: last track
				break;
			}
		}
	}

	next() {
		this.getNextTrack();
		console.log("this.track", this.track);
		this.isPlayingTrack = true;
		this.currentPlayerService.next(this.currentTrack);
	}

	getPrevTrack() {
		for (var i = 0; i < this.servicePlaylistTracks.length; i++) {
			if (this.servicePlaylistTracks[i].id === this.currentTrack.id) {
				this.currentTrack = this.servicePlaylistTracks[i - 1];
				// @TODO case: first track
				break;
			}
		}
	}

	prev() {
		this.getPrevTrack();
		this.isPlayingTrack = true;
		this.currentPlayerService.prev(this.currentTrack);
		// this.deezer.dz.player.prev();
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
		this.currentPlayerService.mute(this.isMuted);
		this.isMuted = !this.isMuted;
	}
	setVolume(event) {
		if (event.which === 1) {
			let percent = (event.offsetX / event.currentTarget.clientWidth) * 100;
			this.volume = Math.round(percent);
			this.currentPlayerService.setVolume(this.volume);
		}
	}
	setStartVolume(level) {
		this.deezer.dz.player.setVolume(level);
	}
	setPercent(event) {
		if (event.which === 1) {
			let percent = (event.offsetX / event.currentTarget.clientWidth);
			this.currentPlayerService.seek(percent, this.currentTrack);
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
		this.currentPlayerService.playTrack(track);
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
			this.isRepeating,
			this.volume
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
