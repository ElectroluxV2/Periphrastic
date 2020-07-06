import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  {
    path: 'login',
    component: OAuth2GoogleLoginComponent
  },
  {
    path: 'callback',
    component: OAuth2GoogleCallbackComponent
  },
  {
    path: 'logout',
    component: Oauth2GoogleLogoutComponent
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    children: [
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'create-post',
        component: CreatePostComponent
      },
      {
        path: 'list-posts',
        component: ListPostsComponent
      },
      {
        path: 'change-info',
        component: ChangeInfoComponent
      },
      {
        path: 'list-galleries',
        component: ListGalleriesComponent
      },
      {
        path: 'create-gallery',
        component: CreateGalleryComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'pages/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
