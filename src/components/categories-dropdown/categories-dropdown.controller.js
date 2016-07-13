export default class CategoriesDropdownController {
    /*@ngInject*/
    constructor(categories) {
        this.categories = categories.getCategories();
        console.log("categoriessd", categories.getCategories());
    }
    isActive(category, currentState){
        if(category.name === currentState){
            return 'active';
        }
    }
}
