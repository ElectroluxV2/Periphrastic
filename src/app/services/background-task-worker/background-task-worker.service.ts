import { BackgroundTask } from 'src/app/services/background-task-worker/background-task';
import { Injectable } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { BackgroundTaskWorkerComponent } from './background-task-worker.component';
import { HttpClient } from '@angular/common/http';
import { TaskPublicData } from './task-public-data.interface';

interface InternalTask {
  task: BackgroundTask,
  /**
    * Prevents double dance party
    */
  isWorkInProgess: boolean;
  window: {
    ref: NbWindowRef,
    data: Observable<TaskPublicData>
  }
}

@Injectable({
  providedIn: 'root'
})
export class BackgroundTaskWorkerService {
  private tasks: InternalTask[] = [];
  private taskLoopRunning = false;

  constructor(private http: HttpClient, private windowService: NbWindowService) { }

  public addTask(task: BackgroundTask): void {
    // Assign http service
    task.http = this.http;

    // Convert
    const internalTask: InternalTask = {
      task: task,
      isWorkInProgess: false,
      window: {
        ref: null,
        data: task.publicData
      }
    };

    // Create window for this task
    internalTask.window.ref = this.windowService.open(BackgroundTaskWorkerComponent, {
      title: task.publicData.getValue().name,
      context: task.publicData
    });

    internalTask.window.ref.maximize();

    // Save this task
    this.tasks.push(internalTask);

    // TaskLoop will handle this task
    if (this.taskLoopRunning) return;

    // Start task loop
    console.log('TL: Start');
    this.taskLoop();
  }

  /**
   * Exectue tasks until its done
   */
  private taskLoop(): void {
    // Prevent double dance party
    this.taskLoopRunning = true;
    for (let index = 0; index < this.tasks.length; index++) {

      if (this.tasks[index].isWorkInProgess) continue;
      this.tasks[index].isWorkInProgess = true;

      const task = this.tasks[index].task;

      task.doWork().then(result => {

        // Free task
        this.tasks[index].isWorkInProgess = false;

        if (result) {

          // Check if task has done it's work
          const work = task.publicData.getValue().work;
          
          if (work.finished) {
            // Remove this task
            const finishedTask = this.tasks.splice(index, 1);
            // Notify User that task had done its work
            console.warn('TL: TASK DONE');
          } else {

          }
        } else {
          // Handle error
          const data = task.publicData.getValue();

          if (data.retry) {
            console.info('TL: Task #' + (index+1) + ' "' + data.name + '" has occured error and will try to repeat it\'s last activity.');
            return;
          }
          
          // Remove this task
          const taskWithError = this.tasks.splice(index, 1);
          // TODO
          console.info(taskWithError);
          
        }
      })
    }

    // Is there need to loop?
    if (this.tasks.length > 0) {
      setTimeout(() => {
        this.taskLoop();
      }, 300);
    } else {
      console.log('TL: Terminate');
      this.taskLoopRunning = false;
    }
  }

}


