import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Oauth2GoogleLogoutComponent } from './oauth2-google-logout.component';

describe('Oauth2GoogleLogoutComponent', () => {
  let component: Oauth2GoogleLogoutComponent;
  let fixture: ComponentFixture<Oauth2GoogleLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oauth2GoogleLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oauth2GoogleLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
