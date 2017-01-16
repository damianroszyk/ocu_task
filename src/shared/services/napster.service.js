import angular from 'angular';
import app from 'app';

class NapsterService {
	/* @ngInject */
	constructor($q, thirdPartyConstant, $http, storage, modelHelper, dispatcherService) {
		this.$q = $q;
		this.thirdPartyConstant = thirdPartyConstant;
		this.$http = $http;
		this.storage = storage;
		this.modelHelper = modelHelper;
		this.dispatcherService = dispatcherService;
	}

	authorize() {
		let deferredAuthorization = this.$q.defer();
		window.addEventListener(
			'message',
			event => this._handleRedirection(event, deferredAuthorization),
			false
		);
		window.open(this._authUrl, 'Napster', this._iframeAttrs);
		return deferredAuthorization.promise;
	}

	get _authUrl() {
		return [
			this.thirdPartyConstant.napsterApiUrl,
			'/oauth/authorize?client_id=', this.thirdPartyConstant.napsterApiKey,
			'&response_type=code', '&redirect_uri=',
			this.thirdPartyConstant.napsterRedirectUrl
		].join('');
	}

	get _iframeAttrs() {
		return [
			`menubar=no`, `location=no`, `resizable=no`, `scrollbars=no`, `status=no`,
			`width=${this.thirdPartyConstant.authWindowWidth}`,
			`height=${this.thirdPartyConstant.authWindowHeight}`,
			`top=${(screen.height / 2) - (this.thirdPartyConstant.authWindowHeight / 2)}`,
			`left=${(screen.width / 2) - (this.thirdPartyConstant.authWindowWidth / 2)}`
		].join(',');
	}

	_handleRedirection(event, deferred) {
		if (!this._isEventValid(event)) {
			deferred.reject();
		} else {
			let params = JSON.parse(event.data);
			if (params.type === 'temporary_code') {
				this.temporaryCode = params.temporary_code;
				deferred.resolve(params.temporary_code);
				this.getNapsterAccessData(this.temporaryCode);
			} else if (params.type === 'error') {
				console.log('try again');
				// @TODO response when unsuccessful authorization
			}
		}
	}

	_isEventValid(event) {
		return event.origin === window.location.origin;
	}

	getNapsterAccessData(code) {
		let data = {
			client_id: this.thirdPartyConstant.napsterApiKey,
			client_secret: this.thirdPartyConstant.napsterApiSecret,
			response_type: 'code',
			grant_type: 'authorization_code',
			redirect_uri: this.thirdPartyConstant.napsterRedirectUrl,
			code: code
		};
		let url = this.thirdPartyConstant.napsterApiUrl + '/oauth/access_token';
		return this.$http
			.post(url, data).then(response => {
				this.storage.setStorageProperty('napster', response.data);
				return response.data;
			});
	}

	getPlaylistDetails(playlistId) {
		let deferredRequest = this.$q.defer();
		let headers = {
			apikey: this.thirdPartyConstant.napsterApiKey
		};
		let url = this.modelHelper.buildUrl(
			this.thirdPartyConstant.napsterApiUrl, this.thirdPartyConstant.napsterApiVersion,
			'playlists', playlistId
		);

		this.$http
			.get(url, { headers })
			.then(response => deferredRequest.resolve(response.data.playlists[0]));

		return deferredRequest.promise;
	}

	getPlaylistTracks(playlistId) {
		let deferredRequest = this.$q.defer();
		let headers = {
			apikey: this.thirdPartyConstant.napsterApiKey
		};
		let url = this.modelHelper.buildUrl(
			this.thirdPartyConstant.napsterApiUrl, this.thirdPartyConstant.napsterApiVersion,
			'playlists', playlistId, 'tracks?limit=200'
		);

		this.$http
			.get(url, { headers })
			.then(response => deferredRequest.resolve(response.data.tracks));

		return deferredRequest.promise;
	}

	getPlaylist(playlistId) {
		let tracks = this.getPlaylistTracks(playlistId);

		let details = this.getPlaylistDetails(playlistId);

		return this.$q.all([tracks, details]);
	}

	getAlbumImages(albumId) {
		let deferredRequest = this.$q.defer();
		let headers = {
			apikey: this.thirdPartyConstant.napsterApiKey
		};

		let url = this.modelHelper.buildUrl(
			this.thirdPartyConstant.napsterApiUrl, this.thirdPartyConstant.napsterApiVersion,
			'albums', albumId, 'images'
		);

		this.$http
			.get(url, { headers })
			.then(response => {
				return deferredRequest.resolve(response.data.images);
			});

		return deferredRequest.promise;
	}

	processTracks(tracks) {
		for (var i = 0; i < tracks.length; i++) {
			tracks[i] = {
				id: tracks[i].id,
				title: tracks[i].name,
				album: {
					name: tracks[i].albumName,
					albumId: tracks[i].albumId
				},
				artist: {
					name: tracks[i].artistName
				},
				duration: tracks[i].playbackSeconds
			};
		}
		return tracks;
	}

	processAlbumImages(imagesList) {
		let mediumSizeImage;
		for (var i = 0; i < imagesList.length; i++) {
			if (imagesList[i].height === 170) {
				mediumSizeImage = imagesList[i].url;
			}
		}
		return mediumSizeImage;
	}

	processDetails(playlist) {
		playlist = {
			description: playlist.description,

		};
		return playlist;
	}

	initNapsterPlayer(track) {
		let service = this;
		let tokens = this.storage.getStorageProperty('napster');
		Rhapsody.init({
			consumerKey: this.thirdPartyConstant.napsterApiKey
		});

		Rhapsody.player.on('ready', function(e) {
			Rhapsody.member.set({
				accessToken: tokens.access_token,
				refreshToken: tokens.refresh_token
			});
			service.getAlbumImages(track.album.albumId)
				.then(response => {
					let trackImage = service.processAlbumImages(response);
					service.dispatcherService.dispatch('albumImageChange', trackImage);
				});
			Rhapsody.player.play(track.id);
		});

		this.subscribePlayerEvents();

		Rhapsody.player.on('playevent', function(e) {
			console.log(e.data);
		});
	}

	subscribePlayerEvents() {
		let service = this;
		Rhapsody.player.on('playtimer', function(position) {
			console.log('time', position.data);
			service._handlePlayerPositionChange(position.data);
		});
		// Rhapsody.player.on('playevent', function(event) {
		// 	console.log('play', event.data);
		// 	if (event.data.code === 'PlayStarted') {
		// 		service._handleCurrentTrackChange(event.data.id);
		// 	}
		// });
	}

	_handleCurrentTrackChange(newTrack) {
		// let track = {};
		// console.log("newTrack", newTrack);
		// track.artist = newTrack.track.artist.name;
		// track.album = newTrack.track.album.title;
		// track.albumId = newTrack.track.album.id;
		// track.title = newTrack.track.title;
		// track.duration = newTrack.track.duration - 0;
		// track.idx = newTrack.index === 0 && this.trackIndex ? this.trackIndex : newTrack.index;
		this.dispatcherService.dispatch('currentTrackChange', newTrack);
		// this.dispatcherService.dispatch('albumImageChange', `https://api.deezer.com/album/${track.albumId}/image`);
	}

	_handlePlayerPositionChange(position) {
		let percent = (position.currentTime == 0 ? 0 : (position.currentTime / position.totalTime) * 100);
		let completedTime = Math.floor(position.currentTime);
		this.dispatcherService.dispatch('trackPositionChange', { percent, completedTime });
	}
}

export default angular
	.module(app)
	.service('napsterService', NapsterService)
	.name;
