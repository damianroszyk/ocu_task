import angular from 'angular';
import app from 'app';

let convertSeconds = () => (input, type) => {

	if (angular.isNumber(input)) {
		let minutes = Math.floor(input / 60);
		let seconds = 0;
		let hours = 0;

		if (type === 'hours') {
			hours = Math.floor(minutes / 60);
			minutes = minutes - (hours * 60);
			return `${hours} hrs ${minutes} mins`;
		} else {
			seconds = input % 60;
			seconds = seconds < 10 ? `0${seconds}` : seconds;
			return `${minutes}:${seconds}`;
		}
	}
};

export default angular
	.module(app)
	.filter('convertSeconds', convertSeconds)
	.name;
