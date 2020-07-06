import { AddPhotoToFacebookAlbumResponse } from 'src/app/interfaces/api-responses.interfaces';
import { GooglePhotosContentsResponse, GooglePhotoBatchResponse, CreateFacebookAlbumResponse } from './../../../interfaces/api-responses.interfaces';
import { BackgroundTask } from 'src/app/services/background-task-worker/background-task';
import { api } from 'src/app/api.config';

/**
 * Holds data that is necssecarry to create gallery
 */
interface galleryData {
    /**
     * Name of gallery, visible publicly
     */
    name: string;

    /**
     * Array of ids of albums to upload 
     */
    albums?: string[];

    /**
     * Array of ids of images to upload 
     */
    images?: string[];
}

enum WorkStage {
    GetGoogleAlbumsContent = 0,
    GetGoogleStandalonePhotos = 1,
    CreateFacebookAlbum = 2,
    UploadImagesToFacebookAlbum = 3,
}

export class GalleryCreateTask extends BackgroundTask {

    /**
     * Name of album
     */
    private _name: string;
    private _albums: string[] = [];
    private _images: string[] = [];

    /**
     * Holds album page for getting images
     */
    private _albumNextPage: {
        albumID: string;
        token: string;
    } = {
        albumID: '',
        token: ''
    };

    /**
     * Holds urls to images
     */
    private _imagesToUpload: string[] = [];

    /**
     * Holds album ID for images upload
     */
    private _createdFacebookAlbumID: number;

    /**
     * Holds uploads ids in order to provide undo functionality and needed by CMS to download
     */
    private _uploadedIds: number[] = [];
    private _uploadedIdsSafeCopy: number[] = [];

    /**
     * Controls what is current task to do in order
     */
    private _workStage: WorkStage = WorkStage.GetGoogleAlbumsContent;

    /**
     * Before doWork it has to have assigned http property in order to work
     * @param gallery New gallery data
     */
    constructor(gallery: galleryData) {
        super(); 

        this.data.name = 'Tworzenie galerii ' + gallery.name;
        this.data.description = 'Proces może zająć nawet do kilkudziesięciu minut i nie ma na to wpływu szybkość internetu, ponad to zdjęcia wysyłane do Facebook nie zużywają damych transerowych, natomiast wymagane jest stałe połączenie z internetem.';
        this._name = gallery.name;
        this._albums.push(...gallery.albums);
        this._images.push(...gallery.images);
    }

    /**
     * Moves to the next stage of work ends task if work done
     */
    private async nextStage(): Promise<boolean> {
        this._workStage++;

        if (this._workStage > 3) {
            // Mark this task as done
            this.data.work.finished = true;
            this.data.status = 'Uploaded '+this._uploadedIdsSafeCopy.length+' images total.';
            return true;
        }

        return await this.doWork();
    }

    public async doWork(): Promise<boolean> {

        switch (this._workStage) {

            case WorkStage.GetGoogleAlbumsContent: {

                // Get next page of album
                if (this._albumNextPage.token.length !== 0) {
                    return await this.getNextPageOfGooleAlbum(this._albumNextPage);
                }

                if (this._albums.length === 0) {
                    // Next stage
                    return await this.nextStage();
                }

                // We have at least one album to get images of
                return await this.getGoogleAlbumContentToArray(this._albums.shift());
            }

            case WorkStage.GetGoogleStandalonePhotos: {

                if (this._images.length === 0) {
                    // Next stage
                    return this.nextStage();
                }

                return await this.getGoogleStandalonePhotos(49);
            }

            case WorkStage.CreateFacebookAlbum: {

                return await this.createFacebookAlbum();
            }

            case WorkStage.UploadImagesToFacebookAlbum: {

                if ((this._imagesToUpload.length === 0) && (this._uploadedIds.length === 0)) {
                    // Work done
                    return this.nextStage();
                }

                if (this._uploadedIds.length) {
                    // Notify CMS
                    return await this.parseImagesInCMS(this._uploadedIds.shift())
                }

                return await this.uploadImagesToFacebookAlbum(this._imagesToUpload.shift())
            }

            default:
                this.data.status = '#0 - Unknown work stage!';
                console.trace(this.data.status);
                // ERROR
                this.data.error = true;
                return false;
        }
    }

    /**
     * Gets images from Google album and push them to array
     * @param id ID of album to get content of
     */
    private async getGoogleAlbumContentToArray(id: string): Promise<boolean> {
        
        this.data.status = 'Getting images from Google album [ '+id+' ], '+(this._albums.length + 1)+' total albums left.';

        // Call api
        return await this.http.get(api.Google.albums.get(id)).toPromise()
        .then((r: GooglePhotosContentsResponse) => {

            if (r.statusCode !== 200) {
                this.data.status = '#1 - ' +  r.error.description;
                console.trace(this.data.status);
                // ERROR
                this.data.error = true;
                return false;
            }

            for (const image of r.data.images) {
                this._imagesToUpload.push(image.baseUrl + '=d'); // Google arg for download link
            }

            // Handle next page
            if (r.data.nextPageToken) {
                this._albumNextPage.token = r.data.nextPageToken;
                this._albumNextPage.albumID = id;
            }
            
            return true;
        })
        .catch(e => {
            console.log(e);
            this.data.status = '#2 - ' + e.message;
            console.trace(this.data.status);
            // ERROR
            this.data.error = true;
            return false;
        })
    }

    /**
     * Gets images from Google album and push them to array
     * @param nextPage url of next page
     */
    private async getNextPageOfGooleAlbum(nextPage: {
        albumID: string;
        token: string;
    }): Promise<boolean> {
        return await this.http.get(api.Google.albums.get(nextPage.albumID, nextPage.token)).toPromise()
        .then((r: GooglePhotosContentsResponse) => {

            if (r.statusCode !== 200) {
                this.data.status = '#3 - ' + r.error.description;
                console.trace(this.data.status);
                // ERROR
                this.data.error = true;
                return false;
            }

            for (const image of r.data.images) {
                this._imagesToUpload.push(image.baseUrl + '=d'); // Google arg for download link
            }

            // Handle next page
            if (!!r.data.nextPageToken) {
                this._albumNextPage.token = r.data.nextPageToken;
            } else {
                // Remove
                this._albumNextPage.token = '';
            }
            
            return true;
        })
        .catch(e => {
            console.log(e);
            this.data.status = '#4 - ' + e.message;
            console.trace(this.data.status);
            // ERROR
            this.data.error = true;
            return false;
        })
    }

    /**
     * Gets standalone images, amd push them to array,
     * If possible create batch request
     * @param maxBundle controls how many images can be gotten at once
     */
    private async getGoogleStandalonePhotos(maxBundle: number): Promise<boolean> {
        const ids: string[] = [];
        // Try to batch request
        for (let i = 0; i < maxBundle; i++) {
            if (!this._images.length) break; // No more

            const toAdd = this._images.shift();
            if (ids.includes(toAdd)) continue;
            ids.push(toAdd);
        }

        this.data.status = 'Getting '+ids.length+' images from Google.';

        return await this.http.post(api.Google.photos.getBatch(), ids).toPromise()
        .then((r: GooglePhotoBatchResponse) => {
            if (r.statusCode !== 200) {
                this.data.status = '#5 - ' + r.error.description;
                console.trace(this.data.status);

                // ERROR
                this.data.error = true;
                return false;
            }

            for (const image of r.data.images) {
                this._imagesToUpload.push(image.baseUrl + '=d'); // Google arg for download link
            }

            return true;
        })
        .catch(e => {
            console.log(e);
            this.data.status = '#6 - ' +  e.message;
            console.trace(this.data.status);
            // ERROR
            this.data.error = true;
            return false;
        })
    }

    /**
     * Creates Facebook album with provided name
     */
    private async createFacebookAlbum(): Promise<boolean> {
        // Do it only once
        this._workStage++;

        this.data.status = 'Creating Facebook album with "'+this._name+'" as name';

        return await this.http.get(api.Facebook.albums.create(this._name)).toPromise()
        .then((r: CreateFacebookAlbumResponse) => {
            if (r.statusCode !== 200) {
                this.data.status = '#7 - ' + r.error.description;
                console.trace(this.data.status);
                // ERROR
                this.data.error = true;
                return false;
            }
            this.data.status = 'Created Facebook album with "'+this._name+'" as name';
            this._createdFacebookAlbumID = r.data.newAlbumID;
            return true;
        })
        .catch(e => {
            console.log(e);
            this.data.status = '#8 - ' + e.message;
            console.trace(this.data.status);
            // ERROR
            this.data.error = true;
            return false;
        })
    }

    /**
     * Uploads image to Facebook album
     * @param imageSource Url to image
     */
    private async uploadImagesToFacebookAlbum(imageSource: string): Promise<boolean> {

        // Exact reaming time
        this.data.work.total = 2*(this._imagesToUpload.length + 1 + this._uploadedIdsSafeCopy.length);
        this.data.work.done = 2*(this._uploadedIdsSafeCopy.length + 1) - 1;        
        
        this.data.status = 'Uploading images, '+(this._imagesToUpload.length + 1)+' left total.';

        return await this.http.post(api.Facebook.albums.add(this._createdFacebookAlbumID), {
            url: imageSource
        }).toPromise()
        .then((r: AddPhotoToFacebookAlbumResponse) => {
            if (r.statusCode !== 200) {
                this.data.status = '#9 - ' + r.error.description;
                console.log(imageSource);
                console.log(r);
                console.log(this._createdFacebookAlbumID);
                console.trace(this.data.status);
                // ERROR
                this.data.error = true;
                return false;
            }
            this._uploadedIds.push(r.data.newPhotoID);
            this._uploadedIdsSafeCopy.push(r.data.newPhotoID);
            return true;
        })
    }

    /**
     * Sends ID to server in order to parse image by CMS
     * @param fbImageID ID of image to parse by CMS
     */
    private async parseImagesInCMS(fbImageID: number): Promise<boolean> {

        // Exact reaming time
        this.data.work.total = 2*(this._imagesToUpload.length + this._uploadedIdsSafeCopy.length);
        this.data.work.done = 2*(this._uploadedIdsSafeCopy.length);

        this.data.status = 'Parsing image.';
        return await this.http.get(api.Deceptive.image.parse.facebook(fbImageID)).toPromise()
        .then((r: AddPhotoToFacebookAlbumResponse) => {
            if (r.statusCode !== 200) {
                this.data.status = '#10 - ' + r.error.description;
                // ERROR
                this.data.error = true;
                console.trace(this.data.status);
                return false;
            }
            return true;
        })
    }
}
