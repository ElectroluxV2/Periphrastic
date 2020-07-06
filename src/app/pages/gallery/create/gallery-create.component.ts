import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleImage } from 'src/app/interfaces/google-image.interface';
import { GoogleAlbum } from 'src/app/interfaces/google-album.interface';
import { api } from 'src/app/api.config';
import { GooglePhotosContentsResponse, GoogleAlbumsResponse, GooglePhotoResponse, CreateFacebookAlbumResponse, AddPhotoToFacebookAlbumResponse, GooglePhotoBatchResponse } from 'src/app/interfaces/api-responses.interfaces';
import { BackgroundTaskWorkerService } from 'src/app/services/background-task-worker/background-task-worker.service';
import { GalleryCreateTask } from './gallery-create-task';

@Component({
  selector: 'app-gallery-create',
  templateUrl: './gallery-create.component.html',
  styleUrls: ['./gallery-create.component.scss']
})
export class GalleryCreateComponent implements OnInit {
  public images: GoogleImage[];
  public albums: GoogleAlbum[];
  public error: string = '';

  public selectedImages: boolean[] = [];
  public selectedAlbums: boolean[] = [];

  public selectedImagesIds: string[] = [];
  public selectedAlbumsIds: string[] = [];

  private nextImagesToken: string = '';
  private nextAlbumsToken: string = '';

  public loadingImages: boolean = false;
  public loadingAlbums: boolean = false;

  public selecting: boolean = true;
  public saving: boolean = false;

  public message: string = "";
  public total: number = 0;
  public name: string = "";

  constructor(private http: HttpClient, private changeDetector: ChangeDetectorRef,private router: Router, private backgroundWorker: BackgroundTaskWorkerService) { }

  ngOnInit() {
    this.loadingImages = true;
    this.http.get<GooglePhotosContentsResponse>(api.Google.photos.list()).subscribe((r) => {
      if (r.statusCode !== 200) {
        this.error = r.error.description;
        this.changeDetector.markForCheck();
        return;
      }
      
      this.images = r.data.images;
      this.nextImagesToken = r.data.nextPageToken;
      this.changeDetector.markForCheck();
    }, (error) => {
      this.error = error.message;
      this.changeDetector.markForCheck();
    }, () => this.loadingImages = false);

    this.loadingAlbums = true;
    this.http.get<GoogleAlbumsResponse>(api.Google.albums.list()).subscribe((r) => {
      if (r.statusCode !== 200) {
        this.error = r.error.description;
        this.changeDetector.markForCheck();
        return;
      }

      this.albums = r.data.albums;
      this.nextAlbumsToken = r.data.nextPageToken;
      this.changeDetector.markForCheck();
    }, (error) => {
      this.error = error.message;
      this.changeDetector.markForCheck();
    }, () => {
      this.loadingAlbums = false;
      this.loadNextAlbums();
    });
  }

  public sh(input: string): string {
    return (input.length > 25) ? input.substr(0, 25) + '...' : input;
  }

  public gImage(baseUrl: string) {
    return baseUrl + '=w200-h200-c';
  }

  public loadNextImages(): void {
    if (this.loadingImages) {
      return;
    }
    
    if (!this.nextImagesToken) {
      return;
    }

    this.loadingImages = true;
    this.http.get<GooglePhotosContentsResponse>(api.Google.photos.list(this.nextImagesToken)).subscribe((r) => {
      if (r.statusCode !== 200) {
        this.error = r.error.description;
        this.changeDetector.markForCheck();
        return;
      }
      
      this.images.push(...r.data.images);
      this.nextImagesToken = r.data.nextPageToken;
      this.changeDetector.markForCheck();
    }, (error) => {
      this.error = error.message;
      this.changeDetector.markForCheck();
    }, () => this.loadingImages = false);
    
  }

  public toggleImage(index: number): void {
    if (!this.selectedImages[index]) {
      this.selectedImages[index] = true;
      this.selectedImagesIds.push(this.images[index].id);
      this.total++;
    } else {
      this.selectedImages[index] = false;
      this.selectedImagesIds.filter(id => id === this.images[index].id);
      this.total--;
    }
  }

  public loadNextAlbums(): void {
    if (this.loadingAlbums) {
      return;
    }

    if (!this.nextAlbumsToken) {
      return;
    }
    
    this.loadingAlbums = true;
    this.http.get<GoogleAlbumsResponse>(api.Google.albums.list(this.nextAlbumsToken)).subscribe((r) => {
      if (r.statusCode !== 200) {
        this.error = r.error.description;
        this.changeDetector.markForCheck();
        return;
      }

      this.albums.push(...r.data.albums);
      this.nextAlbumsToken = r.data.nextPageToken;
      this.changeDetector.markForCheck();
    }, (error) => {
      this.error = error.message;
      this.changeDetector.markForCheck();
    }, () => {
      this.loadingAlbums = false;
      //this.loadNextAlbums();
    });
  }

  public toggleAlbum(index: number): void {
    console.log(this.albums[index]);
    
    if (!this.selectedAlbums[index]) {
      this.selectedAlbums[index] = true;
      this.selectedAlbumsIds.push(this.albums[index].id);
      this.total+=this.albums[index].mediaItemsCount;
    } else {
      this.selectedAlbums[index] = false;
      this.selectedAlbumsIds.filter(id => id === this.albums[index].id);
      this.total-=this.albums[index].mediaItemsCount;
    }
  }

  public save(): void {

    // Check if data valid
    if (this.total === 0) return;
    if (this.name.length === 0 || !this.name.trim()) return;

    // Prevent from double dance party
    if (this.saving) {
      return;
    }

    this.saving = true;

    // Create new task
    const task = new GalleryCreateTask({
      name: this.name,
      albums: this.selectedAlbumsIds,
      images: this.selectedImagesIds,
    });

    // Add task to BackgroundWorker
    this.backgroundWorker.addTask(task);

    // Navigate User to DashBoard
    this.router.navigate(['pages/dashboard']);
  }
}
