import angular from 'angular';
import uiRouter from 'angular-ui-router';

const PITCHED_WEBAPP = angular
    .module('pitchedWebapp', [
        'ui.router'
    ]);

export default PITCHED_WEBAPP.name;
