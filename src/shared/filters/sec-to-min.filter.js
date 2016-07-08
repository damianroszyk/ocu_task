import angular from 'angular';
import app from '../../app';

export default angular.
  module(app).
  filter('secToMin', function() {
    return function(input) {
        let minutes = Math.floor(input/60);
        let seconds = input%60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        if (seconds === 0) {
            seconds = '00';
        }

        return `${minutes}:${seconds}`;
    };
  });
