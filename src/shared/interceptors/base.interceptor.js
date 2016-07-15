export default class BaseInterceptor {
	constructor() {
		const HOOKS = ['request', 'requestError', 'response', 'responseError'];
		HOOKS.forEach(this.registerHook.bind(this));
	}
	registerHook(hook) {
		return (this[hook] || angular.noop).bind(this);
	}
}
