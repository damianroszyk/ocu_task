import angular from 'angular';
import app from '../../app';

class CategoriesService {
    /*@ngInject*/
    constructor() {

    }
    getCategories() {
        return [{
            name: 'l1_category1',
            active: true,
            featured: true,
            children: [{
                name: 'l2_category_1',
                children: [{
                    name: 'l3_category_1'
                }, {
                    name: 'l3_category_2'
                }, {
                    name: 'l3_category_3'
                }]
            }, {
                name: 'l2_category_2'
            }, {
                name: 'l2_category_3'
            }]
        }, {
            name: 'l1_category2',
            children: []
        }, {
            name: 'l1_category3',
            children: [{
                name: 'l2_category_4',
                children: [{
                    name: 'l3_category_4',
                    children: [{
                        name: 'l4_category_1'
                    }, {
                        name: 'l4_category_2'
                    }, {
                        name: 'l4_category_3'
                    }]
                }, {
                    name: 'l3_category_5',
                    children: [{
                        name: 'l4_category_4'
                    }, {
                        name: 'l4_category_5'
                    }, {
                        name: 'l4_category_6'
                    }]
                }, {
                    name: 'l3_category_6'
                }]
            }, {
                name: 'l2_category_5'
            }, {
                name: 'l2_category_6'
            }]
        }, {
            name: 'l1_category4',
            children: []
        }, {
            name: 'l1_category5',
            children: [{
                name: 'l2_category_7',
                children: [{
                    name: 'l3_category_7',
                    children: [{
                        name: 'l4_category_7'
                    }, {
                        name: 'l4_category_8'
                    }, {
                        name: 'l4_category_9'
                    }]
                }, {
                    name: 'l3_category_8'
                }, {
                    name: 'l3_category_9'
                }]
            }, {
                name: 'l2_category_8'
            }, {
                name: 'l2_category_9'
            }]
        }, {
            name: 'l1_category6',
            children: []
        }, {
            name: 'l1_category7',
            children: [{
                name: 'l2_category_10',
                children: [{
                    name: 'l3_category_10'
                }, {
                    name: 'l3_category_11'
                }, {
                    name: 'l3_category_12'
                }]
            }, {
                name: 'l2_category_11'
            }, {
                name: 'l2_category_12'
            }]
        }, {
            name: 'l1_category8',
            children: []
        }, {
            name: 'l1_category9',
            children: [{
                name: 'l2_category_13',
                children: [{
                    name: 'l3_category_13'
                }, {
                    name: 'l3_category_14'
                }, {
                    name: 'l3_category_15'
                }]
            }, {
                name: 'l2_category_14'
            }, {
                name: 'l2_category_15'
            }]
        }, {
            name: 'l1_category10',
            children: []
        }, {
            name: 'l1_category11',
            children: [{
                name: 'l2_category_16',
                children: [{
                    name: 'l3_category_16'
                }, {
                    name: 'l3_category_17'
                }, {
                    name: 'l3_category_18'
                }]
            }, {
                name: 'l2_category_17'
            }, {
                name: 'l2_category_18'
            }]
        }];
    }
}

export default angular
    .module(app)
    .service('categories', CategoriesService)
    .name;
