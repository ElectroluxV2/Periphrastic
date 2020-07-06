import { API } from './interfaces/api.interface';

let baseUrl = 'http://localhost:8080';

export const api: API = {
    Google: {
        albums: {
            list: (pageToken: string = '') => { 
                if (pageToken !== '') return baseUrl + '/GooglePhotos/albums/list/' + pageToken; 
                else return baseUrl + '/GooglePhotos/albums/list'; 
            },
            get: (albumID: string, pageToken: string = '') => { 
                if (pageToken !== '') return baseUrl + '/GooglePhotos/albums/get/' + albumID + '/' + pageToken; 
                else return baseUrl + '/GooglePhotos/albums/get/' + albumID; 
            }
        },
        photos: {
            list: (pageToken: string = '') => { 
                if (pageToken !== '') return baseUrl + '/GooglePhotos/photos/list/' + pageToken;
                else return baseUrl + '/GooglePhotos/photos/list';
            },
            get: (photoID: string) => { return baseUrl + '/GooglePhotos/photos/get' + photoID; },
            getBatch: () => { return baseUrl + '/GooglePhotos/photos/getBatch'; }
        }
    },
    Facebook: {
        albums: {
            list: (pageToken: string = '') => {
                if (pageToken !== '') return baseUrl + '/Facebook/albums/list/' + pageToken;
                else return baseUrl + '/Facebook/albums/list';
            },
            get: (albumID: number) => { return baseUrl + '/Facebook/albums/get/' + albumID; },
            add: (albumID: number) => { return baseUrl + '/Facebook/albums/add/' + albumID; },
            create: (name: string) => { return baseUrl + '/Facebook/albums/create/' + name; }
        }
    },
    Users: {
        list: () => { return baseUrl + '/Users/list'; },
        current: () => { return baseUrl + '/Users/current'; }
    },
    Deceptive: {
        posts: {
            lists: (pageToken: string = '') => {
                if (pageToken !== '') return baseUrl + '/Deceptive/posts/list/' + pageToken;
                else return baseUrl + '/Deceptive/posts/list';
            },
            create: (name: string) => { return baseUrl + '/Deceptive/posts/create/' + name; }
        },
        image: {
            parse: {
                facebook: (id: number) => {
                    return baseUrl + '/Deceptive/image/parse/facebook/' + id;
                }
            }
        }
    }
}

