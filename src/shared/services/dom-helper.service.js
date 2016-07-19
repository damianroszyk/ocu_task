import angular from 'angular';
import app from 'app';

class DomHelperService {
    /*@ngInject*/
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    handleOutsideClick(element, callback) {
        angular.element(window).on('click', ($event) => {
            if (!element.contains($event.target)) {
                this.$timeout(() => callback());
            }
        });
    }
}

export default angular
    .module(app)
    .service('domHelper', DomHelperService)
    .name;
