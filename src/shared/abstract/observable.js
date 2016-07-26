import _ from 'lodash';

export default class Observable {
	constructor(observable = {}) {
		this._observers = [];
		this._observable = observable;
	}
	set observable(observable) {
		this._observable = observable;
	}
	get observable() {
		return this._observable;
	}
	registerObserver(observer = _.noop) {
		this._observers.push(observer);
	}
	notifyObservers(observable = false) {
		_.each(this._observers, observer =>
			(observer || _.noop)(observable || this._observable)
		);
	}
}
