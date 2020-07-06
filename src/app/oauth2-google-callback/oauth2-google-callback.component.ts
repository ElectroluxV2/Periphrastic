import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GoogleUser } from '../interfaces/google-user.interface';
import { api } from '../api.config';

@Component({
  selector: 'app-oauth2-google-callback',
  templateUrl: './oauth2-google-callback.component.html',
  styleUrls: ['./oauth2-google-callback.component.scss']
})
export class OAuth2GoogleCallbackComponent implements OnDestroy {

  private alive: boolean = true;

  constructor(private http: HttpClient, private authService: NbAuthService, private router: Router) {

    this.authService.authenticate('google', { prompt: 'none' })
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess()) {       

          this.http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+authResult.getResponse()['access_token']).subscribe((response: GoogleUser) => {
            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['/pages/dashboard']);
          });

        } else {
          this.router.navigate(['/login'], {
            state: {
              messages: authResult.getMessages()
            }
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
