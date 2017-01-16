import angular from 'angular';
import app from 'app';

class NapsterPlayerService {
	/* @ngInject */
	constructor(napsterService, dispatcherService) {
		this.napsterService = napsterService;
		this.dispatcherService = dispatcherService;
		this.playlistAlbums = {};
	}

	next(track) {
		Rhapsody.player.play(track.id);
		this.notifyAboutNewCover(track);
		this.notifyAboutNewTrack(track);
	}

	prev(track) {
		Rhapsody.player.play(track.id);
		this.notifyAboutNewCover(track);
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
		let track = {};
		console.log("newTrack", newTrack);
		track.artist = newTrack.track.artist.name;
		track.album = newTrack.track.album.title;
		track.albumId = newTrack.track.album.id;
		track.title = newTrack.track.title;
		track.duration = newTrack.track.duration - 0;
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
