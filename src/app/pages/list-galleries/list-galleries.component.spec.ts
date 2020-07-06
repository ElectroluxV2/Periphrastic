import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGalleriesComponent } from './list-galleries.component';

describe('ListGalleriesComponent', () => {
  let component: ListGalleriesComponent;
  let fixture: ComponentFixture<ListGalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGalleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
