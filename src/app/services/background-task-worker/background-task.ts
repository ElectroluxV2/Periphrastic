import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TaskPublicData } from './task-public-data.interface';

export abstract class BackgroundTask {

    /**
     * Data structure avaliable for public
     */
    private _data: TaskPublicData = {
        name: "Unnamed Task",
        description: "Not avaliable",
        status: "None",
        work: {
            done: 0,
            total: 1,
            finished: false
        },
        error: false,
        retry: false,
    };

    private bsTaskPublicData: BehaviorSubject<TaskPublicData> = new BehaviorSubject<TaskPublicData>(this._data);

    protected set data(value: TaskPublicData) {
        this._data = value;
        this.bsTaskPublicData.next(value);
    }

    protected get data() {
        /**
         * Accessing deep values and changing them does not lead to setter call 
         */
        this.bsTaskPublicData.next(this._data);
        return this._data;
    }

    /**
     * Provides access to public data
     */
    get publicData(): BehaviorSubject<TaskPublicData> {
        return this.bsTaskPublicData;
    }
    
    /**
     * Required to be injected by service as it depends on auth system
     */
    public http: HttpClient;
    
    /**
     * Return true if everything went well otherwise return false
     */
    abstract async doWork(): Promise<boolean>;
}