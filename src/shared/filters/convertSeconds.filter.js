import angular from 'angular';
import app from '../../app';

let convertSeconds = () => (input) => {
    let minutes = Math.floor (input / 60);
    let seconds = input % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

  export default angular
      .module(app)
      .filter('convertSeconds', convertSeconds)
      .name;
