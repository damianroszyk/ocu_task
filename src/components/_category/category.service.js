import angular from 'angular';
import app from '../../app';

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
		//@TODO: handle brand header in interceptor
		return this.$http.get(url, {
		    headers: {'brand': this.backendConstant.clientBrand}
		});
	}
}

export default angular
    .module(app)
    .service('categoryService', CategoryService)
    .name;
