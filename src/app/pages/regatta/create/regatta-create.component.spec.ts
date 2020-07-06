import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegattaCreateComponent } from './regatta-create.component';

describe('RegattaCreateComponent', () => {
  let component: RegattaCreateComponent;
  let fixture: ComponentFixture<RegattaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegattaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegattaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
