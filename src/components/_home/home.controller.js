export default class HomeController {
    /*@ngInject*/
    constructor() {
        this.categories = [
            { name: 'category 1' },
            { name: 'category 2' }
        ];

        this.featuredPlaylists = [
            { name: 'playlist 1' },
            { name: 'playlist 2' }
        ];
    }
}
