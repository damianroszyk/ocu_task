import _ from 'lodash';

export default class SearchResultsController {
	/* @ngInject */
	constructor($scope, $location) {
		var searchedText = _.split($location.path(), '/',3)[2];
		$scope.searched = searchedText;
	}
}
