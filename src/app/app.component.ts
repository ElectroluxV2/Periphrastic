import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem, NbSearchService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { share, takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  protected alive: boolean = true;
  public today: number = Date.now();
  public loggedin: Observable<boolean> = new Observable<boolean>();
  public pageTitle: string = 'Niezidentyfikowana strona';
  public pageIcon: string = 'alert-triangle-outline';

  db: NbMenuItem[] = [
    {
      title: 'Utwórz nowy post / wpis',
      icon: 'edit-2-outline',
      link: '/pages/create-post',
    },
    {
      title: 'Przeglądaj wpisy / posty',
      icon: 'list-outline',
      link: '/pages/list-posts',
    },
    {
      title: 'Zmień informacje na stronie kontaktowej',
      icon: 'credit-card-outline',
      link: '/pages/change-info',
    },
    {
      title: 'Przeglądaj dostępne galerie zdjęć',
      icon: 'camera-outline',
      link: '/pages/list-galleries',
    },
    {
      title: 'Utwórz nową galerie zdjęć',
      icon: 'plus-circle-outline',
      link: '/pages/create-gallery',
    },
  ];

  constructor(private searchService: NbSearchService, authService: NbAuthService, private router: Router) {
    this.loggedin = authService.onAuthenticationChange().pipe(share());

    this.router.events
    .pipe(takeWhile(() => this.alive))
    .subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      for (const item of this.db) {
        if (item.link === event.url) {
          this.pageTitle = item.title;
          this.pageIcon = item.icon;
          break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.alive =  false;
  }

  ngOnInit() {
    this.searchService.onSearchInput().subscribe((data: { term: string, tag: string }) => {

      if (data.term.toString().trim().length === 0) {
        this.searchService.setResults([], data.tag);
        return;
      }

      const results: NbMenuItem[] = [];
      let bestMatch = false;
      for (const item of this.db) {
        if (item.title.toString().toLocaleUpperCase().trim().includes(data.term.toLocaleUpperCase().trim())) {
          if (!bestMatch) {
            item.home = true;
            bestMatch = true;
          } else {
            item.home = false;
          }
          results.push(item);
        }
      }
      this.searchService.setResults(results, data.tag);
    });
  }
}

