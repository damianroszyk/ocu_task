import angular from 'angular';
import app from 'app';

/* @ngInject */
let analytics = (AnalyticsProvider) => {
	AnalyticsProvider.setPageEvent('$stateChangeSuccess');
	AnalyticsProvider.setAccount([{
		tracker: 'UA-16664610-9',
		trackEvent: true,
		name: 'DigsterTracker1'
	}, {
		tracker: 'UA-83012337-1',
		trackEvent: true,
		name: 'DigsterTracker2'
	}]);
};

export default angular
	.module(app)
	.config(analytics)
	.name;
