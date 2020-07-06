import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegattaEditComponent } from './regatta-edit.component';

describe('RegattaEditComponent', () => {
  let component: RegattaEditComponent;
  let fixture: ComponentFixture<RegattaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegattaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegattaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
