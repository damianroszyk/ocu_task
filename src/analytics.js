import angular from 'angular';
import app from 'app';

/* @ngInject */
let analytics = (AnalyticsProvider, thirdPartyConstant) => {
	AnalyticsProvider.setPageEvent('$stateChangeSuccess');
	AnalyticsProvider.setAccount([{
		tracker: thirdPartyConstant.digsterTracker1GA,
		trackEvent: true,
		name: 'digsterTracker1'
	}, {
		tracker: thirdPartyConstant.digsterTracker2GA,
		trackEvent: true,
		name: 'digsterTracker2'
	}]);
};

export default angular
	.module(app)
	.config(analytics)
	.name;
