import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-post-add-gallery',
    templateUrl: './post-add-gallery.component.html',
    styleUrls: ['./post-add-gallery.component.scss'],
})
export class PostAddGalleryComponent {

    constructor(protected dialogRef: NbDialogRef<PostAddGalleryComponent>) {
    }

    public close(): void {
        this.dialogRef.close();
    }
    
    public submit(albumData) {
        this.dialogRef.close(albumData);
    }
}
