import angular from 'angular';
import app from 'app';

import template from 'text!./search-tile.html';
import controller from './search-tile.controller';

export default angular
	.module(app)
	.component('searchTile', { template, controller})
	.name;
