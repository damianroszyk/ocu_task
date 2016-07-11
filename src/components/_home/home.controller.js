export default class HomeController {
    /*@ngInject*/
    constructor($timeout) {
        this.categories = [{
            name: 'l1_category1',
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
                    name: 'l3_category_4'
                }, {
                    name: 'l3_category_5'
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
                    name: 'l3_category_7'
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
        this.playlists = [{
            id: 30595446,
            name: 'playlist 1',
            imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
            description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.'
        }, {
            id: 30595446,
            name: 'playlist 2',
            imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
            description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.'
        }, {
            id: 30595446,
            name: 'playlist 3',
            imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
            description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.'
        }, {
            id: 30595446,
            name: 'playlist 4',
            imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
            description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.'
        }];
    }
}
