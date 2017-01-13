import angular from 'angular';
import app from 'app';

class DeezerPlayerService {
	/* @ngInject */
	constructor(deezer, dispatcherService) {
		this.deezer = deezer;
		this.dispatcherService = dispatcherService;
	}

	next(track) {
		this.deezer.dz.player.next();
		this.dispatcherService.dispatch('albumImageChange', `https://api.deezer.com/album/${track.albumId}/image`);
	}

	processTracks(tracks) {
		for (var i = 0; i < tracks.length; i++) {
			tracks[i] = {
				id: tracks[i].id,
				title: tracks[i].title,
				album: {
					name: tracks[i].album.title,
					albumId: tracks[i].album.id,
					cover: tracks[i].album.cover_medium
				},
				artist: {
					name: tracks[i].artist.name
				},
				length: tracks[i].duration
			};
		}
		return tracks;
	}

	subscribePlayerEvents() {
		this.deezer.dz.Event.subscribe('current_track', this._handleCurrentTrackChange.bind(this));
		this.deezer.dz.Event.subscribe('player_position', this._handlePlayerPositionChange.bind(this));
	}
	_handleCurrentTrackChange(newTrack) {
		this.$scope.$apply(() => {
			this.albumImageUrl = newTrack.track.album.cover;
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
}

export default angular
	.module(app)
	.service('deezerPlayerService', DeezerPlayerService)
	.name;
