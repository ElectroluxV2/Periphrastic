export interface TaskPublicData {
    /**
     * Showing progress to User but also have influance to task importance
     */
    work: {
        done: number;
        total: number;
        /**
         * Decides when task will be killed
         */
        finished: boolean;
    };
    name: string;
    description: string;
    /**
     * Text showing up to user in order to inform whats going on
     */
    status: string;
    error: boolean;
    retry: boolean;
}