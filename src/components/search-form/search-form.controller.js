export default class SearchFormController {
	/* @ngInject */
	constructor($scope) {
		let clearQuery = () => {
			this.query = '';
		};
		$scope.$on('$stateChangeSuccess', clearQuery);
	}
}
