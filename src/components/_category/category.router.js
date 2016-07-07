import app from '../../app';

const CATEGORY_ROUTER = {
    categoryState: {
        url: '^/category/:categoryName',
        template: `<category></category>`,
        params: {
            categoryName: { array: true }
        }
    }
};

/*@ngInject*/
let categoryRouter = $stateProvider => $stateProvider
    .state('category', CATEGORY_ROUTER.categoryState);

export default angular
    .module(app)
    .config(categoryRouter)
    .name;
