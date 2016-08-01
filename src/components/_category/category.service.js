import angular from 'angular';
import _ from 'lodash';
import app from 'app';

class CategoryService {
	/* @ngInject */
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
		return this.$http.get(url, { cache: true }).then(response =>
			this.decorateCategories(this.categoriesParamsBuilder.bind(this))(response.data)
		);
	}
	getCategory(categoryId) {
		let url = this.modelHelper.buildUrl(this.categoryBackend, 'single', categoryId);
		return this.$http.get(url).then(response =>
			this.decorateCategories(this.categoryParamsBuilder.bind(this))(response.data)
		);
	}
	decorateCategories(decorator) {
		return categories => (decorator || angular.identity)(categories);
	}
	categoriesParamsBuilder(categories) {
		console.time('categoriesParamsBuilder');
		this.traverseCategories({}, categories, 0);
		console.timeEnd('categoriesParamsBuilder');
		return categories;
	}
	categoryParamsBuilder(category) {
		console.time('categoryParamsBuilder');
		let stateParams = {};
		category.parents = this.traverseCategories(stateParams, category.parents, 0);
		let nestingLevel = Object.keys(stateParams).length + 1;
		stateParams[`l${nestingLevel}`] = category.category.name;
		category.children = this.traverseCategories(stateParams, category.children, nestingLevel);
		console.timeEnd('categoryParamsBuilder');
		return category;
	}
	traverseCategories(stateParams, categories, nestingLevel) {
		nestingLevel++;
		categories = _.values(categories);
		for (let i = 0; i < categories.length; i++) {
			this.addCategoryStateParams(stateParams, categories[i], nestingLevel);
			if (categories[i].children && categories[i].children.length) {
				this.traverseCategories(stateParams, categories[i].children, nestingLevel);
			}
		}
		return categories;
	}
	addCategoryStateParams(stateParams, category, nestingLevel) {
		stateParams[nestingLevel] = _.kebabCase(category.name);
		category.stateParams = _.mapValues(stateParams, (key, index) => parseInt(index, 10) <= nestingLevel ? key : '');
		category.stateParams = _.mapKeys(category.stateParams, (value, key) => `l${key}`);
		category.stateParams.categoryId = category.id;
	}
}

export default angular
	.module(app)
	.service('categoryService', CategoryService)
	.name;
