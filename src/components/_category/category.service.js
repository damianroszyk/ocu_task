import angular from 'angular';
import app from 'app';

class CategoryService {
    /*@ngInject*/
    constructor($http, backendConstant, modelHelper) {
		this.$http = $http;
		this.modelHelper = modelHelper;
		this.backendConstant = backendConstant;
		this.categoryBackend = this.modelHelper.buildUrl(
			backendConstant.apiVersion, 'category'
		);
	}
	getCategories() {
		let url = this.modelHelper.buildUrl(this.categoryBackend, 'list');
		return this.$http.get(url, { cache: true });
	}
}

export default angular
    .module(app)
    .service('categoryService', CategoryService)
    .name;
