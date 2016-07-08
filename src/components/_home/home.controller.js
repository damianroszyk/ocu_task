export default class HomeController {
    /*@ngInject*/
    constructor($timeout) {
        this.categories = [
            { name: 'category 1', featured: true },
            { name: 'category 2' },
            { name: 'category 3' },
            { name: 'category 4' },
            { name: 'category 5' },
            { name: 'category 6' },
            { name: 'category 7' },
            { name: 'category 8' },
            { name: 'category 9' },
            { name: 'category 10' },
            { name: 'category 11' }
        ];

        this.featuredPlaylists = [
            { name: 'playlist 1' },
            { name: 'playlist 2' }
        ];
    }
}
