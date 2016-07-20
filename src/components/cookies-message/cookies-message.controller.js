export default class CookiesMessageController {
	/* @ngInject */
	constructor(storage) {
		this.storage = storage;
		this.showCookiesMessageBanner = !storage.getStorageProperty('cookiesPolicyIsConfirmed');
	}
	hideCookiesMessageBanner() {
		this.showCookiesMessageBanner = false;
		this.storage.setStorageProperty('cookiesPolicyIsConfirmed', true);
	}
}
