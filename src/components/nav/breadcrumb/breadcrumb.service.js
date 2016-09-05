import angular from 'angular';
import app from 'app';

import Observable from 'abstract/observable';

class BreadcrumbService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this._breadcrumb = [];
	}
	set breadcrumb(breadcrumb) {
		this._breadcrumb = breadcrumb;
		super.notifyObservers(this._breadcrumb);
	}
	get breadcrumb() {
		return this._breadcrumb;
	}
	buildPlaylistBreadcrumb(playlist) {
		this.breadcrumb = [{
			name: 'Home',
			state: 'home'
		}, {
			name: playlist.title
		}];
	}
	buildCategoryBreadcrumb(category) {
		let defaultCategoryStateParams = {
			l1: '', l2: '', l3: '', l4: ''
		};
		let breadcrumb = [{
			name: 'Home',
			state: 'home'
		}];
		let buildParentsCrumbRecursive = parent => {
			breadcrumb.push({
				name: parent.name,
				state: 'category',
				stateParams: _.defaults(parent.stateParams, defaultCategoryStateParams)
			});
			if (parent.children && parent.children.length) {
				buildParentsCrumbRecursive(parent.children[0]);
			}
		};
		if (category.parents && category.parents.length) {
			buildParentsCrumbRecursive(category.parents[0]);
		}
		breadcrumb.push({
			name: category.category.name
		});
		this.breadcrumb = breadcrumb;
	}
}

export default angular
	.module(app)
	.service('breadcrumbService', BreadcrumbService)
	.name;
