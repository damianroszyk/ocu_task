import angular from 'angular';
import app from 'app';

class MobileHelperService {
	/* @ngInject */
	constructor() {}
	detectMobile() {
		if ( (navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPod/i) ||
			navigator.userAgent.match(/BlackBerry/i) ||
			navigator.userAgent.match(/Windows Phone/i)) &&
			window.innerWidth < 767
		) {
			return true;
		} else {
			return false;
		}
	}
}

export default angular
	.module(app)
	.service('mobileHelper', MobileHelperService)
	.name;
