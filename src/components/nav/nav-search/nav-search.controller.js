export default class NavSearchController {
	/* @ngInject */
	constructor($scope) {
		let clearQuery = () => this.query = '';
		$scope.$on('$stateChangeSuccess', clearQuery);
	}
}
