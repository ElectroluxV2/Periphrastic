import { FacebookAlbum } from './facebook-album.interface';
import { GoogleAlbum } from './google-album.interface';
import { GoogleImage } from './google-image.interface';
import { FacebookImage } from './facebook-image.interface';

export enum ErrorType {
    BAD_REQUEST,
    INSUFFICIENT_PRIVILEGES,
    NOT_ALLOWED,
    NOT_IMPLEMENTED,
    RESOURCE_NOT_FOUND,
    SERVER_ERROR,
    UNAUTHENTICATED,
    VALIDATION_ERROR,
    VERIFICATION_ERROR,
}

interface ApiResponse {
    statusCode: number;
    error?: {
        type: ErrorType;
        description: string;
    };
}

export interface FacebookAlbumsResponse extends ApiResponse {
    data: {
        albums: FacebookAlbum[];
    }
}

export interface GoogleAlbumsResponse extends ApiResponse {
    data: {
        albums: GoogleAlbum[];
        nextPageToken?: string;
    }
}

export interface GooglePhotosContentsResponse extends ApiResponse {
    data: {
        images: GoogleImage[];
        nextPageToken?: string;
    }
}

export interface FacebookAlbumContentsResponse extends ApiResponse {
    data: {
        images: FacebookImage[];
        nextPageToken?: string;
    }
}

export interface GooglePhotoResponse extends ApiResponse {
    data: {
        image: GoogleImage;
    }
}

export interface GooglePhotoBatchResponse extends ApiResponse {
    data: {
        images: GoogleImage[];
    }
}


export interface CreateFacebookAlbumResponse extends ApiResponse {
    data: {
        newAlbumID: number;
    }
}

export interface AddPhotoToFacebookAlbumResponse extends ApiResponse {
    data: {
        newPhotoID: number;
    }
}