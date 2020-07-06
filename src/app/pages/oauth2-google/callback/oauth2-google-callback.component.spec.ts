import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuth2GoogleCallbackComponent } from './oauth2-google-callback.component';

describe('OAuth2GoogleCallbackComponent', () => {
  let component: OAuth2GoogleCallbackComponent;
  let fixture: ComponentFixture<OAuth2GoogleCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OAuth2GoogleCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuth2GoogleCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
