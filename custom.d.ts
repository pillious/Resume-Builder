// https://stackoverflow.com/questions/69598232/next-js-typescript-mongoose-error-when-using-let-cached-global-mongoose/70616400
declare global {
    var mongoose: any;
}

// This is required to make the global.mongoose work for some reason.
export {};
 