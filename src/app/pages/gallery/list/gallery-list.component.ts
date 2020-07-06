import { FacebookImage } from './../../../interfaces/facebook-image.interface';
import { Component, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookAlbum } from 'src/app/interfaces/facebook-album.interface';
import { FacebookAlbumsResponse, FacebookAlbumContentsResponse } from 'src/app/interfaces/api-responses.interfaces';
import { api } from 'src/app/api.config';

@Component({
  selector: 'app-gallery-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit{

  public albums: FacebookAlbum[]; 
  public images: FacebookImage[];
  public error: string = '';

  public loading: boolean = true;
  public showAlbums: boolean = false;
  public showContent: boolean = false;

  private currentAlbum: number = 0;
  @Output() onChoose: EventEmitter<{id: number, cover: string, name: string}> = new EventEmitter<{id: number, cover: string, name: string}>();

  ngOnInit(): void {
    this.http.get(api.Facebook.albums.list()).subscribe((r: FacebookAlbumsResponse) => {

      if (r.statusCode !== 200) {
        this.error = r.error.description;
        this.changeDetector.markForCheck();
        return;
      }

      this.albums = r.data.albums;
      this.showAlbums = true;
      this.loading = false;
      this.changeDetector.markForCheck();
    }, (error) => {
      this.error = error.message;
      this.changeDetector.markForCheck();
    });
  }

  constructor(private http: HttpClient, private changeDetector: ChangeDetectorRef) {
  }

  public show(albumID: number): void {
    this.currentAlbum = albumID;
    this.showAlbums = false;
    this.loading = true;
    this.changeDetector.markForCheck();

    this.http.get(api.Facebook.albums.get(albumID)).subscribe((r: FacebookAlbumContentsResponse) => {
      
      console.log(r);
      if (r.statusCode !== 200) {
        this.error = r.error.description;
        this.changeDetector.markForCheck();
        return;
      }

      this.images = r.data.images;
      this.loading = false;
      this.showContent = true;
      this.changeDetector.markForCheck();
    }, (error) => {
      this.error = error.message;
      this.changeDetector.markForCheck();
    });
  }

  public choose(albumID: number = this.currentAlbum): void {

    for (const album of this.albums) {
      if (album.id === albumID) {
        this.onChoose.emit({
          id: album.id,
          cover: album.coverPhotoUrl,
          name: album.name
        });        
        break;
      }
    }
  }

  public back(): void {
    this.showAlbums = true;
    this.showContent = false;
    this.changeDetector.markForCheck();
  }
}
