import angular from 'angular';
import app from 'app';

class NapsterPlayerService {
	/* @ngInject */
	constructor(napsterService, dispatcherService, storage, thirdPartyConstant) {
		this.napsterService = napsterService;
		this.dispatcherService = dispatcherService;
		this.storage = storage;
		this.thirdPartyConstant = thirdPartyConstant;
		this.playlistAlbums = {};
	}

	initPlaylist(playlist) {
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
			service.napsterService.getAlbumImages(playlist.track.album.albumId)
				.then(response => {
					let trackImage = service.napsterService.processAlbumImages(response);
					service.dispatcherService.dispatch('albumImageChange', trackImage);
				});
			Rhapsody.player.play(playlist.track.id);
			service.notifyAboutNewTrack(playlist.track);
		});

		this.subscribePlayerEvents();
	}

	subscribePlayerEvents() {
		let service = this;
		Rhapsody.player.on('playtimer', function(position) {
			service._handlePlayerPositionChange(position.data);
		});
	}

	_handlePlayerPositionChange(position) {
		let percent = (position.currentTime == 0 ? 0 : (position.currentTime / position.totalTime) * 100);
		let completedTime = Math.floor(position.currentTime);
		this.dispatcherService.dispatch('trackPositionChange', { percent, completedTime });
	}

	next(track) {
		Rhapsody.player.play(track.id);
		this.notifyAboutNewTrack(track);
	}

	prev(track) {
		Rhapsody.player.play(track.id);
		this.notifyAboutNewTrack(track);
	}

	notifyAboutNewCover(track) {
		if (!this.playlistAlbums[track.album.albumId]) {
			this.napsterService
				.getAlbumImages(track.album.albumId)
				.then(response => {
					this.trackImage = this.napsterService.processAlbumImages(response);
					this.playlistAlbums[track.album.albumId] = this.trackImage;
					this.dispatcherService.dispatch('albumImageChange', this.trackImage);
				});
		} else {
			this.dispatcherService.dispatch('albumImageChange', this.playlistAlbums[track.album.albumId]);
		}
	}

	notifyAboutNewTrack(newTrack) {
		this.notifyAboutNewCover(newTrack);
		let track = {};
		track.id = newTrack.id;
		track.artist = newTrack.artist.name;
		track.album = newTrack.album.name;
		track.albumId = newTrack.album.albumId;
		track.title = newTrack.title;
		track.duration = newTrack.duration - 0;
		track.idx = newTrack.index === 0 && this.trackIndex ? this.trackIndex : newTrack.index;
		this.dispatcherService.dispatch('currentTrackChange', track);
	}

	pause() {
		Rhapsody.player.pause();
	}

	play(track) {
		Rhapsody.player.play(track.id);
	}

	playTrack(track) {
		this.play(track);
		this.notifyAboutNewTrack(track);
	}

	mute(isMuted) {
		// @TODO case: current volume is not 100%
		isMuted === true ? Rhapsody.player.setVolume(1) : Rhapsody.player.setVolume(0);
	}

	setVolume(percent) {
		let volume = percent / 100;
		Rhapsody.player.setVolume(volume);
	}

	seek(percent, track) {
		let seekTo = track.duration * percent;
		Rhapsody.player.seek(seekTo);
	}
}

export default angular
	.module(app)
	.service('napsterPlayerService', NapsterPlayerService)
	.name;
