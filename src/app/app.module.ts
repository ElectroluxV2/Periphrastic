import { GalleryCreateComponent } from './pages/gallery/create/gallery-create.component';
import { PostAddGalleryComponent } from './pages/post/create/post-add-gallery.component';
import { GalleryListComponent } from './pages/gallery/list/gallery-list.component';
import { PostListComponent } from './pages/post/list/post-list.component';
import { PostCreateComponent } from './pages/post/create/post-create.component';
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
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChangeInfoComponent } from './pages/change-info/change-info.component';
import { AuthGuard } from './auth-guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import localePl from '@angular/common/locales/global/pl';
import { registerLocaleData } from '@angular/common';
import { BackgroundTaskWorkerComponent } from './services/background-task-worker/background-task-worker.component';
import { BackgroundTaskWorkerService } from './services/background-task-worker/background-task-worker.service';
import { OAuth2GoogleLoginComponent } from './pages/oauth2-google/login/oauth2-google-login.component';
import { OAuth2GoogleCallbackComponent } from './pages/oauth2-google/callback/oauth2-google-callback.component';
import { Oauth2GoogleLogoutComponent } from './pages/oauth2-google/logout/oauth2-google-logout.component';
import { RegattaEditComponent } from './pages/regatta/edit/regatta-edit.component';
import { RegattaListComponent } from './pages/regatta/list/regatta-list.component';
import { GalleryEditComponent } from './pages/gallery/edit/gallery-edit.component';
import { PostEditComponent } from './pages/post/edit/post-edit.component';
import { CalendarEditComponent } from './pages/calendar/edit/calendar-edit.component';
import { CalendarCreateComponent } from './pages/calendar/create/calendar-create.component';
import { CalendarListComponent } from './pages/calendar/list/calendar-list.component';
registerLocaleData(localePl, 'pl-PL');


@NgModule({
  declarations: [
    AppComponent,
    OAuth2GoogleLoginComponent,
    OAuth2GoogleCallbackComponent,
    DashboardComponent,
    PostCreateComponent,
    PostListComponent,
    ChangeInfoComponent,
    GalleryListComponent,
    GalleryCreateComponent,
    Oauth2GoogleLogoutComponent,
    NotFoundComponent,
    BackgroundTaskWorkerComponent,
    PostAddGalleryComponent,
    RegattaEditComponent,
    RegattaListComponent,
    GalleryEditComponent,
    PostEditComponent,
    CalendarEditComponent,
    CalendarCreateComponent,
    CalendarListComponent
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
    PostAddGalleryComponent
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
