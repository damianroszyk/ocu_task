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
		categories = _.values(categories);
		this.traverseCategories({}, categories, 0);
		console.timeEnd('categoriesParamsBuilder');
		return categories;
	}
	categoryParamsBuilder(category) {
		console.time('categoriesParamsBuilder');
		category.children = _.values(category.children);
		category.parents = _.values(category.parents);
		let stateParams = {};
		this.traverseCategories(stateParams, category.parents, 0);
		let categoryNestingLevel = Object.keys(stateParams).length + 1;
		stateParams[`l${categoryNestingLevel}`] = 'mock';
		this.traverseCategories(stateParams, category.children, categoryNestingLevel);
		console.timeEnd('categoriesParamsBuilder');
		return category;
	}
	traverseCategories(stateParams, categories, nestingLevel) {
		nestingLevel++;
		for (let i = 0; i < categories.length; i++) {
			stateParams[nestingLevel] = _.kebabCase(categories[i].name);
			categories[i].stateParams = _.mapValues(stateParams, (key, index) => parseInt(index, 10) <= nestingLevel ? key : '');
			categories[i].stateParams = _.mapKeys(categories[i].stateParams, (value, key) => `l${key}`);
			categories[i].stateParams.categoryId = categories[i].id;
			if (categories[i].children && categories[i].children.length) {
				this.traverseCategories(stateParams, categories[i].children, nestingLevel);
			}
		}
	}
}

export default angular
	.module(app)
	.service('categoryService', CategoryService)
	.name;
