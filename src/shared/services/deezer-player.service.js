import angular from 'angular';
import app from 'app';

class DeezerPlayerService {
	/* @ngInject */
	constructor(deezer, dispatcherService, $state) {
		this.deezer = deezer;
		this.dispatcherService = dispatcherService;
		this.$state = $state;
	}

	next(track) {
		this.deezer.dz.player.next();
		// this.dispatcherService.dispatch('albumImageChange', `https://api.deezer.com/album/${track.albumId}/image`);
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
		let track = {};
		console.log("newTrack", newTrack);
		track.artist = newTrack.track.artist.name;
		track.album = newTrack.track.album.title;
		track.albumId = newTrack.track.album.id;
		track.title = newTrack.track.title;
		track.duration = newTrack.track.duration - 0;
		track.idx = newTrack.index === 0 && this.trackIndex ? this.trackIndex : newTrack.index;
		this.dispatcherService.dispatch('currentTrackChange', track);
		// this.dispatcherService.dispatch('albumImageChange', `https://api.deezer.com/album/${track.albumId}/image`);
	}
	_handlePlayerPositionChange(positionArray) {
		let percent = (positionArray[1] == 0 ? 0 : (positionArray[0] / positionArray[1]) * 100);
		let completedTime = Math.floor(positionArray[0]);
		this.dispatcherService.dispatch('trackPositionChange', { percent, completedTime });
	}

	initPlaylist(track) {
		this.subscribePlayerEvents();
		if (track.trackIdx) {
			this.deezer.dz.player.playPlaylist(
				parseInt(track.servicePlaylistId, 10), true,
				parseInt(track.trackIdx, 10),
				parseInt(track.trackTime, 10)
			);
			if(this.$state.params.volume) {
				this.setStartVolume(this.$state.params.volume);
				let volume = this.$state.params.volume;
			}
			this.$timeout(() => {
				if (this.$state.params.shuffle === 'true') {
					// this.shuffle();
					let shuffle = true;
				}
				if (this.$state.params.repeat === 'true') {
					// this.repeat();
					let repeat = true;
				}
				this.dispatcherService.dispatch('initialTrackSetting', { volume, shuffle, repeat });
			}, 2000);
		} else {
			this.deezer.dz.player.setShuffle(false);
			this.deezer.dz.player.setRepeat(false);
			this.setStartVolume(this.volume || 100);
			this.deezer.dz.player.playPlaylist(parseInt(track.servicePlaylistId, 10), 0);
		}
	}

	setStartVolume(level) {
		this.deezer.dz.player.setVolume(level);
	}

	pause() {
		this.deezer.dz.player.pause();
	}

	play() {
		this.deezer.dz.player.play();
	}
}

export default angular
	.module(app)
	.service('deezerPlayerService', DeezerPlayerService)
	.name;
