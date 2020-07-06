import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleUser } from 'src/app/interfaces/google-user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public name: string = '';

  constructor(private http: HttpClient) {

    //http.get('https://api.beta.openskiff.pl/listPhotosInsideFacebookAlbum/2448992322028933').toPromise().then(r => console.log(r));
  
  }

  ngOnInit() {

    const user = JSON.parse(localStorage.getItem('user')) as GoogleUser;
    this.name = user.name;
    
  }

}
