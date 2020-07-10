export interface API {
    Google: {
        albums: {
            /**
             * Lists Google photos albums
             * @param pageToken next page
             */
            list: Function;

            /**
             * Gets photos inside Google photos album
             * @param id ID of album
             * @param pageToken next page
             */
            get: Function;
        },
        photos: {
            /**
             * Lists Google photos images
             * @param pageToken next page
             */
            list: Function;

            /**
             * Returns data of photo
             * @param id ID of photo
             */
            get: Function;

            /**
             * Returns data of photos
             */
            getBatch: Function;
        }
    },
    Facebook: {
        albums: {
            /**
             * Lists Facebook albums
             * @param pageToken next page
             */
            list: Function;

            /**
             * Gets photos inside Facebook album
             * @param id ID of album
             */
            get: Function;

            /**
             * Adds photo to Facebook album
             * @param id ID of album
             */
            add: Function;

            /**
             * Creates Facebok album
             * @param name Name of album to create
             */
            create: Function;
        }
    },
    Users: {
        /**
         * Lists users
         */
        list: Function;
        /**
         * Returns current user's data
         */
        current: Function;
    },
    Deceptive: {
        posts: {
            /**
             * Creates post
             * @param name Name of post
             */
            create: Function;

            /**
             * Lists posts
             * @param pageToken next page
             */
            lists: Function;
        },
        image: {
            parse: {
                /**
                 * Sends Facebook photo to server in order to parse image by CMS
                 * @param id ID of image
                 */
                facebook: Function;
            }
        },
        file: {
            /**
             * If valid auth token returns base url to requested file
             * @param id file ID
             */
            download: Function;
        },
        regatta: {
            /**
             * Creates new entry in database with provided data
             * @param data (POST) json encoded new regatta data
             */
            new: Function;

            /**
             * Lists all avaliable regatta
             * @param limit how many entries
             * @param pageToken after what show entries
             */
            list: Function;

            /**
             * Update regatta with data
             * @param data (POST) json encoded new regatta data
             * @param id ID of data to change
             */
            update: Function;

            /**
             * Deletes entry
             * @param id ID of data to delete
             */
            delete: Function;
        }
    }
}