import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem, NbSearchService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  protected alive: boolean = true;
  public today: number = Date.now();
  public pageTitle: string = 'Niezidentyfikowana strona';
  public pageIcon: string = 'alert-triangle-outline';

  db: NbMenuItem[] = [
    {
      title: 'Utwórz nowy post / wpis',
      icon: 'plus-circle-outline',
      link: '/pages/post/create',
    },
    {
      title: 'Edytuj post / wpis',
      icon: 'edit-2-outline',
      link: '/pages/post/edit',
    },
    {
      title: 'Przeglądaj wpisy / posty',
      icon: 'list-outline',
      link: '/pages/post/list',
    },
    {
      title: 'Zmień informacje na stronie kontaktowej',
      icon: 'credit-card-outline',
      link: '/pages/change-info',
    },
    {
      title: 'Przeglądaj dostępne galerie zdjęć',
      icon: 'camera-outline',
      link: '/pages/gallery/list',
    },
    {
      title: 'Utwórz nową galerie zdjęć',
      icon: 'plus-circle-outline',
      link: '/pages/gallery/create',
    },
    {
      title: 'Edytuj galerie zdjęć',
      icon: 'edit-2-outline',
      link: '/pages/gallery/edit',
    },
    {
      title: 'Utwórz nowe regaty',
      icon: 'plus-circle-outline',
      link: '/pages/regatta/create'
    },
    {
      title: 'Edytuj regaty',
      icon: 'edit-2-outline',
      link: '/pages/regatta/edit'
    },
    {
      title: 'Przeglądaj regaty',
      icon: 'list-outline',
      link: '/pages/regatta/list'
    },
    {
      title: 'Utwórz nowy kalendarz',
      icon: 'plus-circle-outline',
      link: '/pages/calendar/create'
    },
    {
      title: 'Edytuj kalendarz',
      icon: 'edit-2-outline',
      link: '/pages/calendar/edit'
    },
    {
      title: 'Przeglądaj kalendarze',
      icon: 'list-outline',
      link: '/pages/calendar/list'
    }
  ];

  constructor(private searchService: NbSearchService, private authService: NbAuthService, private router: Router) {
    this.router.events
    .pipe(takeWhile(() => this.alive))
    .subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      for (const item of this.db) {
        if (item.link === event.url) {
          this.pageTitle = item.title;
          this.pageIcon = item.icon as string;
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

  public isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

