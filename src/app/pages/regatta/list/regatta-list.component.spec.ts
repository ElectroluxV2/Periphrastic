import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegattaListComponent } from './regatta-list.component';

describe('RegattaListComponent', () => {
  let component: RegattaListComponent;
  let fixture: ComponentFixture<RegattaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegattaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegattaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
