import app from '../../app';

const HOME_ROUTER = {
    homeState: {
        url: '/',
        template: `<home></home>`,
    }
};

/*@ngInject*/
let homeRouter = $stateProvider => $stateProvider
    .state('home', HOME_ROUTER.homeState);

export default angular
    .module(app)
    .config(homeRouter)
    .name;
