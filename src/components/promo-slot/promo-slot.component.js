import angular from 'angular';
import app from 'app';

import template from 'text!./promo-slot.html';
import controller from './promo-slot.controller';

let bindings = {
	layout: '@',
	featuredItem: '<'
};

export default angular
	.module(app)
	.component('promoSlot', { template, controller, bindings })
	.name;
