import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundTaskWorkerComponent } from './background-task-worker.component';

describe('BackgroundTaskWorkerComponent', () => {
  let component: BackgroundTaskWorkerComponent;
  let fixture: ComponentFixture<BackgroundTaskWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundTaskWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundTaskWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
