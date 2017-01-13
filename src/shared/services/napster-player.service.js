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
		//napsterSDK
		// Rhapsody.player.play(track.id);
		Rhapsody.player.play(track.id);
		console.log("track", track, this.playlistAlbums);
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

	pause() {
		Rhapsody.player.pause();
	}

	play(track) {
		Rhapsody.player.play(track.id);
	}
}

export default angular
	.module(app)
	.service('napsterPlayerService', NapsterPlayerService)
	.name;
