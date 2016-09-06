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
	getCategories(notFeatured = false) {
		let cache = true;
		let headers = { published: 1 };
		let url = this.modelHelper.buildUrl(this.categoryBackend, 'list');
		return this.$http
			.get(url, { cache, headers })
			.then(response => {
				let categories = this._buildCategoriesParams(response.data);
				return notFeatured ? _.filter(categories, ['featured', null]) : categories;
			});
	}
	getFlatCategories() {
		return this
			.getCategories()
			.then(categories => {
				let result = [];
				this._flattenCategories(categories, result);
				return result;
			});
	}
	getCategory(categoryId) {
		let url = this.modelHelper.buildUrl(this.categoryBackend, 'single', categoryId);
		return this.$http
			.get(url)
			.then(response => this._buildCategoryParams(response.data));
	}
	getFeaturedCategories() {
		let url = this.modelHelper.buildUrl(this.categoryBackend, 'list');
		let headers = { featured: 1, published: 1 };
		return this.$http
			.get(url, { headers })
			.then(response => this._buildFeaturedCategoriesParams(response.data));
	}
	_buildCategoriesParams(categories) {
		this._traverseCategories({}, categories, 0);
		return categories;
	}
	_buildCategoryParams(category) {
		let stateParams = {};
		category.parents = this._traverseCategories(stateParams, category.parents, 0);
		let nestingLevel = Object.keys(stateParams).length + 1;
		stateParams[`l${nestingLevel}`] = _.kebabCase(category.name);
		category.children = this._traverseCategories(stateParams, category.children, nestingLevel);
		return category;
	}
	_buildFeaturedCategoriesParams(categories) {
		angular.forEach(categories, category => {
			let stateParams = {};
			category.parents = this._traverseCategories(stateParams, category.parents, 0);
			stateParams = _.mapKeys(stateParams, (value, key) => `l${key}`);
			let nestingLevel = Object.keys(stateParams).length + 1;
			stateParams[`l${nestingLevel}`] = _.kebabCase(category.name);
			stateParams.categoryId = category.id;
			category.stateParams = stateParams;
		});
		return categories;
	}
	_traverseCategories(stateParams, categories, nestingLevel) {
		nestingLevel++;
		categories = _.values(categories);
		for (let i = 0; i < categories.length; i++) {
			this._addCategoryStateParams(stateParams, categories[i], nestingLevel);
			if (categories[i].children && categories[i].children.length) {
				this._traverseCategories(stateParams, categories[i].children, nestingLevel);
			}
		}
		return categories;
	}
	_addCategoryStateParams(stateParams, category, nestingLevel) {
		stateParams[nestingLevel] = _.kebabCase(category.name);
		category.stateParams = _.mapValues(stateParams, (key, index) => parseInt(index, 10) <= nestingLevel ? key : '');
		category.stateParams = _.mapKeys(category.stateParams, (value, key) => `l${key}`);
		category.stateParams.categoryId = category.id;
	}
	_flattenCategories(categories, target) {
		categories = _.values(categories);
		for (let i = 0; i < categories.length; i++) {
			if (categories[i].children && categories[i].children.length) {
				this._flattenCategories(categories[i].children, target);
			}
			target.push(categories[i]);
			delete categories[i].children;
		}
	}
}

export default angular
	.module(app)
	.service('categoryService', CategoryService)
	.name;
