import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-oauth2-google-logout',
  templateUrl: './oauth2-google-logout.component.html',
  styleUrls: ['./oauth2-google-logout.component.scss']
})
export class Oauth2GoogleLogoutComponent implements OnDestroy {
  alive: boolean = true;
  error: string = '';

  constructor(private router: Router, authService: NbAuthService) {
    authService.logout('google')
      .pipe(takeWhile(() => this.alive))
      .subscribe((result: NbAuthResult) => {
        if (result.isSuccess()) {
          this.router.navigate(['/login']);
        } else {
          this.error = result.getMessages().join(', ');
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}