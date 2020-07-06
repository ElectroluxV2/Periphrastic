import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-add-gallery-selector',
    templateUrl: './add-gallery.component.html',
    styleUrls: ['./add-gallery.component.scss'],
})
export class AddGalleryComponent {

    constructor(protected dialogRef: NbDialogRef<AddGalleryComponent>) {
    }

    public close(): void {
        this.dialogRef.close();
    }
    
    public submit(albumData) {
        this.dialogRef.close(albumData);
    }
}
