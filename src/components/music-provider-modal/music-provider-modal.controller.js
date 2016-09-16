import _ from 'lodash';

export default class MusicProviderModal {
	/* @ngInject */
	constructor(musicProvider) {
		musicProvider.registerModalHandler(this.openModal.bind(this));
	}
	onSave() {
		(this.callback || angular.noop)();
		this.closeModal();
	}
	openModal(callback) {
		this.callback = callback;
		this.isOpened = true;
	}
	closeModal() {
		this.isOpened = false;
	}
}
