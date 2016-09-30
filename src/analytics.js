import angular from 'angular';
import app from 'app';

/* @ngInject */
let analytics = (AnalyticsProvider, thirdPartyConstant) => {
	AnalyticsProvider.setPageEvent('$stateChangeSuccess');
	AnalyticsProvider.setAccount([{
		tracker: thirdPartyConstant.digsterTracker1GA,
		trackEvent: true,
		name: 'digsterTracker1'
	}]);
};

export default angular
	.module(app)
	.config(analytics)
	.name;
