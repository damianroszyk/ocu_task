import _ from 'lodash';

export default class MusicProviderModal {
	/* @ngInject */
	constructor() {
		this.isShown = true;
	}
	closeModal() {
		this.isShown = false;
	}
}
