export default class Persistable {
	constructor($log = null) {
		this._log = $log || console;
		this._storage = localStorage;
	}
	setPersistentProperty(key, value) {
		try {
			this._storage.setItem(key, JSON.stringify(value));
		} catch(e) {
			this._log.error(`Unable to set persistent property: ${key}, ${value}, ${e}`);
		}
	}
	getPersistentProperty(key) {
		try {
			return JSON.parse(this._storage.getItem(key));
		} catch(e) {
			this._log.error(`Unable to get persistent property: ${key}, ${e}`);
		}
	}
	removePersistentProperty(key) {
		try {
			this._storage.removeItem(key);
		} catch(e) {
			this._log.error(`Unable to remove persistent property: ${key}, ${e}`);
		}
	}
}
