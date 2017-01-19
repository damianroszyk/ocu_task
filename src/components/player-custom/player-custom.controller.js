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
		this.currentTrack = this.servicePlaylistTracks[0];

		this.currentPlayerService = this.musicProvider.isNapster() ?
			this.napsterPlayerService : this.deezerPlayerService;
	}

	$onInit() {
		this.dispatcherService.listen('albumImageChange', (event, response) => {
			this.track.albumImageUrl = response;
		});

		this.dispatcherService.listen('currentTrackChange', (event, track) => {
			if (this.musicProvider.isDeezer()) {
				this.$scope.$apply(() => {
					this.track.albumImageUrl = `https://api.deezer.com/album/${track.albumId}/image`;
					this.track.id = track.id;
					this.track.artist.name = track.artist;
					this.track.album = track.album;
					this.track.albumId = track.albumId;
					this.track.title = track.title;
					this.track.duration = track.duration - 0;
					this.track.idx = track.index === 0 && this.trackIndex ? this.trackIndex : track.index;
				});
			} else if (this.musicProvider.isNapster()) {
				this.track.id = track.id;
				this.track.artist.name = track.artist;
				this.track.album = track.album;
				this.track.albumId = track.albumId;
				this.track.title = track.title;
				this.track.duration = track.duration - 0;
				this.track.idx = track.index === 0 && this.trackIndex ? this.trackIndex : track.index;
			}
		});

		this.dispatcherService.listen('trackPositionChange', (event, trackPosition) => {
			this.$scope.$apply(() => {
				this.percent = trackPosition.percent;
				this.track.completed = trackPosition.completedTime;
			});
		});

		this.dispatcherService.listen('initialTrackSetting', (event, settings) => {
			this.$scope.$apply(() => {
				this.volume = settings.volume;
				settings.shuffle ? this.shuffle() : '';
				settings.repeat ? this.repeat() : '';
			});
		});

		this.dispatcherService.listen('playNextTrack', (event, data) => {
			this.next();
		});

		this.isPlayingTrack = true;
		this.track.id = this.currentTrack.id;
		this.track.duration = this.currentTrack.duration;
		this.track.artist = this.currentTrack.artist;
		this.track.album = this.currentTrack.album;
		this.track.albumId = this.currentTrack.albumId;
		this.track.title = this.currentTrack.title;
		this.track.duration = this.currentTrack.duration - 0;
		return this.popup ? this.runPlayerInPopup() : this.runPlayerInWhitelabel();
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
		this.isPlayingTrack = true;
		this.currentPlayerService.initPlaylist({
			track: this.track,
			trackIdx: this.trackIdx,
			servicePlaylistId: this.servicePlaylistId,
			trackTime: this.trackTime
		});
	}

	play() {
		this.isPlayingTrack = true;
		this.currentPlayerService.play(this.track);
	}

	pause() {
		this.isPlayingTrack = false;
		this.currentPlayerService.pause();
	}

	getNextTrack() {
		for (var i = 0; i < this.servicePlaylistTracks.length; i++) {
			if (this.servicePlaylistTracks[i].id === this.track.id) {
				if (i === this.servicePlaylistTracks.length - 1) {
					this.track = this.servicePlaylistTracks[0];
					break;
				}
				this.track = this.servicePlaylistTracks[i + 1];
				break;
			}
		}
	}

	next() {
		this.getNextTrack();
		this.isPlayingTrack = true;
		this.currentPlayerService.next(this.track);
	}

	getPrevTrack() {
		for (var i = 0; i < this.servicePlaylistTracks.length; i++) {
			if (this.servicePlaylistTracks[i].id === this.track.id) {
				if (i === 0) {
					this.track = this.servicePlaylistTracks[this.servicePlaylistTracks.length - 1];
					break;
				}
				this.track = this.servicePlaylistTracks[i - 1];
				break;
			}
		}
	}

	prev() {
		this.getPrevTrack();
		this.isPlayingTrack = true;
		this.currentPlayerService.prev(this.track);
	}

	shuffle() {
		this.currentPlayerService.shuffle(!this.isShuffling, this.servicePlaylistTracks);
		this.isShuffling = !this.isShuffling;
	}
	repeat() {
		this.currentPlayerService.repeat(this.isRepeating);
		this.isRepeating = !this.isRepeating;
	}
	mute() {
		this.currentPlayerService.mute(this.isMuted, this.volume);
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
			this.currentPlayerService.seek(percent, this.track);
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
		this.currentPlayerService.playTrack(track, index, this.servicePlaylistId);
	}
	showPopup() {
		let service = this.musicProvider.isDeezer() ? 'deezer' : 'napster';
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
		this.playerWidgetService.popup = service;
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
