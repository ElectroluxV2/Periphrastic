import { AddGalleryComponent } from './pages/create-post/add-gallery.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbInfiniteListDirective, NbDialogModule, NbStepperModule, NbThemeModule, NbLayoutModule, NbSearchModule, NbActionsModule, NbCardModule, NbListModule, NbButtonModule, NbInputModule, NbWindowModule, NbProgressBarModule, NbIconModule, NbTabsetModule, NbDialogService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbOAuth2AuthStrategy, NbAuthModule, NbOAuth2ResponseType, NbAuthSimpleInterceptor } from '@nebular/auth';
import { OAuth2GoogleLoginComponent } from './oauth2-google-login/oauth2-google-login.component';
import { OAuth2GoogleCallbackComponent } from './oauth2-google-callback/oauth2-google-callback.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';
import { ChangeInfoComponent } from './pages/change-info/change-info.component';
import { AuthGuard } from './auth-guard.service';
import { ListGalleriesComponent } from './pages/list-galleries/list-galleries.component';
import { CreateGalleryComponent } from './pages/create-gallery/create-gallery.component';
import { Oauth2GoogleLogoutComponent } from './oauth2-google-logout/oauth2-google-logout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import { registerLocaleData } from '@angular/common';
import { BackgroundTaskWorkerComponent } from './services/background-task-worker/background-task-worker.component';
import { BackgroundTaskWorkerService } from './services/background-task-worker/background-task-worker.service';
registerLocaleData(localePl, 'pl-PL', localePlExtra);


@NgModule({
  declarations: [
    AppComponent,
    OAuth2GoogleLoginComponent,
    OAuth2GoogleCallbackComponent,
    DashboardComponent,
    CreatePostComponent,
    ListPostsComponent,
    ChangeInfoComponent,
    ListGalleriesComponent,
    CreateGalleryComponent,
    Oauth2GoogleLogoutComponent,
    NotFoundComponent,
    BackgroundTaskWorkerComponent,
    AddGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbDialogModule.forRoot(),
    NbIconModule,
    NbTabsetModule,
    NbSearchModule,
    NbActionsModule,
    NbSearchModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbInputModule,
    NbProgressBarModule,
    NbStepperModule,
    NbWindowModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: '705995026521-cdqf59nruub3asdbef7k0sa146v2aqb8.apps.googleusercontent.com',
          clientSecret: 'jVjccasYl6fC1T3JqVLaAedB',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/photoslibrary',
            redirectUri: 'http://localhost:4200/callback',
          },
        }),
      ],
    }),
    HttpClientModule
  ],
  entryComponents: [
    BackgroundTaskWorkerComponent,
    AddGalleryComponent
  ],
  providers: [
    NbInfiniteListDirective,
    AuthGuard,
    BackgroundTaskWorkerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NbAuthSimpleInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
