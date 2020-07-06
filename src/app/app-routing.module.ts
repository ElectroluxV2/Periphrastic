import { CalendarEditComponent } from './pages/calendar/edit/calendar-edit.component';
import { CalendarCreateComponent } from './pages/calendar/create/calendar-create.component';
import { CalendarListComponent } from './pages/calendar/list/calendar-list.component';
import { GalleryEditComponent } from './pages/gallery/edit/gallery-edit.component';
import { PostEditComponent } from './pages/post/edit/post-edit.component';
import { RegattaEditComponent } from './pages/regatta/edit/regatta-edit.component';
import { RegattaCreateComponent } from './pages/regatta/create/regatta-create.component';
import { RegattaListComponent } from './pages/regatta/list/regatta-list.component';
import { GalleryCreateComponent } from './pages/gallery/create/gallery-create.component';
import { GalleryListComponent } from './pages/gallery/list/gallery-list.component';
import { PostCreateComponent } from './pages/post/create/post-create.component';
import { PostListComponent } from './pages/post/list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChangeInfoComponent } from './pages/change-info/change-info.component';
import { AuthGuard } from './auth-guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OAuth2GoogleLoginComponent } from './pages/oauth2-google/login/oauth2-google-login.component';
import { OAuth2GoogleCallbackComponent } from './pages/oauth2-google/callback/oauth2-google-callback.component';
import { Oauth2GoogleLogoutComponent } from './pages/oauth2-google/logout/oauth2-google-logout.component';

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
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'change-info',
        component: ChangeInfoComponent
      },
      {
        path: 'post',
        children: [
          {
            path: 'create',
            component: PostCreateComponent
          },
          {
            path: 'list',
            component: PostListComponent
          },
          {
            path: 'edit',
            component: PostEditComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          }
        ]
      },
      {
        path: 'gallery',
        children: [
          {
            path: 'list',
            component: GalleryListComponent
          },
          {
            path: 'create',
            component: GalleryCreateComponent
          },
          {
            path: 'edit',
            component: GalleryEditComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          }
        ]
      },
      {
        path: 'regatta',
        children: [
          {
            path: 'list',
            component: RegattaListComponent
          },
          {
            path: 'create',
            component: RegattaCreateComponent
          },
          {
            path: 'edit',
            component: RegattaEditComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          }
        ]
      },
      {
        path: 'calendar',
        children: [
          {
            path: 'list',
            component: CalendarListComponent
          },
          {
            path: 'create',
            component: CalendarCreateComponent
          },
          {
            path: 'edit',
            component: CalendarEditComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          }
        ]
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pages/dashboard'
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
