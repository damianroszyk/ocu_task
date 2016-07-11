import angular from 'angular';
import app from '../../app';

let convertSeconds = () => (input, type) => {

    if (angular.isNumber(input)) {
        let minutes = Math.floor(input / 60);
        let seconds = input % 60;
        let hours = 0;

        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            minutes = minutes - (hours * 60);
        }

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        if (type === 'min') {
            return `${minutes}:${seconds}`;
        } else if (type === 'hour') {
            return `${hours} hrs ${minutes} mins`;
        } else {
            return 0;
        }
    }

}

  export default angular
      .module(app)
      .filter('convertSeconds', convertSeconds)
      .name;
