import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuth2GoogleLoginComponent } from './oauth2-google-login.component';

describe('OAuth2GoogleLoginComponent', () => {
  let component: OAuth2GoogleLoginComponent;
  let fixture: ComponentFixture<OAuth2GoogleLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OAuth2GoogleLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuth2GoogleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
