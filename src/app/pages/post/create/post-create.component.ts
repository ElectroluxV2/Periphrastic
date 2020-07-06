import { HttpClient } from '@angular/common/http';
import { PostAddGalleryComponent } from './post-add-gallery.component';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import * as CKE from '@ckeditor/ckeditor5-build-decoupled-document';
import { api } from 'src/app/api.config';

class GalleryElement extends HTMLElement {
  fbAlbumId: number;
  constructor(albumID: number) {
    super();

    this.fbAlbumId = albumID;
  }
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  private editor: CKE;
  public title: string = '';

  constructor(private dialogService: NbDialogService, private http: HttpClient) { }

  ngOnInit() { 

    customElements.define('gallery-to-proceed', GalleryElement);

    CKE
    .create(document.querySelector( '#editor' ))
    .catch(error => {
      console.error( error );
      
    })
    .then(editor => {
      this.editor = editor;
      const cln = editor.ui.view.toolbar.items.last.element.cloneNode(true);
      cln.classList = 'ck ck-button ck-off';
      cln.children[1].children[0].textContent = 'Wstaw galerie';
      cln.children[0].setAttribute('viewBox', '0 0 25 25');
      const d = "M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 5h12a1 1 0 0 1 1 1v8.36l-3.2-2.73a2.77 2.77 0 0 0-3.52 0L5 17.7V6a1 1 0 0 1 1-1zm12 14H6.56l7-5.84a.78.78 0 0 1 .93 0L19 17v1a1 1 0 0 1-1 1z";
      cln.children[0].children[0].setAttribute('d', d);
      document.querySelector( '#toolbar-container' ).appendChild(editor.ui.view.toolbar.element);
      document.querySelector('.ck.ck-toolbar__items').appendChild(cln);
      cln.onclick = () => {

        this.dialogService.open(PostAddGalleryComponent, {
          closeOnBackdropClick: false,
          hasScroll: false
        }).onClose.subscribe( albumData => {
          
          if (!albumData) return;

          const gaEl = '<figure class="image"><img src="'+albumData.cover+'" alt="'+albumData.id+'"><figcaption>['+albumData.name+']</figcaption></figure>';
          const viewFragment = editor.data.processor.toView(gaEl);
          const modelFragment = editor.data.toModel(viewFragment);

          editor.model.insertContent(modelFragment, editor.model.document.selection);

          console.log(editor.getData());
          
        })
      }
    });



    
  }

  public save(): void {
    console.log(this.editor.getData());
    
    const data = {
      rawHTML: this.editor.getData(),
    };

    this.http.post(api.Deceptive.posts.create(this.title), data).subscribe(r => {
      console.log(r);
    });
  }

}
