import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NbWindowRef, NbWindowStateChange } from '@nebular/theme';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskPublicData } from './task-public-data.interface';

@Component({
  selector: 'app-background-task-worker',
  templateUrl: './background-task-worker.component.html',
  styleUrls: ['./background-task-worker.component.scss']
})
export class BackgroundTaskWorkerComponent implements OnDestroy {
  private alive: boolean = true;
  public full: boolean = false;

  public progress: number = 0.0;
  public data: Observable<TaskPublicData>;

  private lastTime: number = new Date().getTime();
  private lastProgress: number = this.progress;
  private lastTimes: number[] = [];
  public timeEnd: Date = new Date();
  
  constructor(public windowRef: NbWindowRef, private ref: ChangeDetectorRef) {
    this.windowRef.stateChange
    .pipe(takeWhile(() => this.alive))
    .subscribe((state: NbWindowStateChange) => {
      if (state.newState.toString() === 'full-screen') {
        this.full = true;
      } else {
        this.full = false;
      }
    });

    this.data = (this.windowRef.config.context as BehaviorSubject<TaskPublicData>).pipe();
    (this.windowRef.config.context as BehaviorSubject<TaskPublicData>)
    .pipe(takeWhile(() => this.alive))
    .subscribe((data: TaskPublicData) => {      
      this.progress = (data.work.done / data.work.total) * 100;

      if (this.progress === this.lastProgress) return;
      if (this.progress < 0) return;
      this.lastProgress = this.progress;

      const now = new Date().getTime();
      
      const timeDiff = now - this.lastTime;
      this.lastTime = now;
      this.lastTimes.push(timeDiff);

      const avg = this.lastTimes.reduce( ( p, c ) => p + c, 0 ) / this.lastTimes.length;

      const secondsLeft = avg / 1000 * (data.work.total - data.work.done + 1);
      this.timeEnd = new Date();
      this.timeEnd.setSeconds(this.timeEnd.getSeconds() + secondsLeft);

      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}