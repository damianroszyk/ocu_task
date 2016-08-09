import angular from 'angular';
import _ from 'lodash';
import app from 'app';

const CLASSES = {
	xs: '0-25',
	sm: '25-50',
	md: '50-75',
	lg: '75-100',
};

/* @ngInject */
let tagItem = () => {
	return {
		restrict: 'A',
		scope: {
			tagItem: '<'
		},
		link: (scope, element) => {
			const WEIGHT = scope.tagItem.weight;
			for (let className in CLASSES) {
				let range = _.map(CLASSES[className].split('-'), _.parseInt);
				if (range[0] < WEIGHT && WEIGHT <= range[1]) {
					element.addClass(`tag-cloud-element--${className}`);
					break;
				}
			}
		}
	};
};

export default angular
	.module(app)
	.directive('tagItem', tagItem)
	.name;
