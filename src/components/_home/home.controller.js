export default class HomeController {
    /*@ngInject*/
    constructor($timeout) {
        this.categories = [
            { name: 'category1', featured: true },
            { name: 'category2' },
            { name: 'category3' },
            { name: 'category4' },
            { name: 'category5' },
            { name: 'category6' },
            { name: 'category7' },
            { name: 'category8' },
            { name: 'category9' },
            { name: 'category10' },
            { name: 'category11' }
        ];
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
