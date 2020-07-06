import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { GoogleUser } from '../interfaces/google-user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oauth2-google-login',
  templateUrl: './oauth2-google-login.component.html',
  styleUrls: ['./oauth2-google-login.component.scss']
})
export class OAuth2GoogleLoginComponent implements OnInit, OnDestroy {

  public name: string = '';
  private alive: boolean = true;
  public errors: string[] = [];

  constructor(private authService: NbAuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { messages: string[] };
    if (state) { 
      this.errors.push(...state.messages);
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')) as GoogleUser;
    if (!user) {
      this.name = '';
    } else {
      this.name = user.given_name;
    }
  }

  public login(): void {

    if (!localStorage.getItem('user')) {
      return this.selectAccount();
    }

    this.authService.authenticate('google', { prompt: 'none' })
    .pipe(takeWhile(() => this.alive))
    .subscribe((authResult: NbAuthResult) => {
      console.log(authResult);
    });
  }

  public selectAccount(): void {
    this.authService.authenticate('google', { prompt: 'select_account' })
    .pipe(takeWhile(() => this.alive))
    .subscribe((authResult: NbAuthResult) => {
      console.log(authResult);
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
