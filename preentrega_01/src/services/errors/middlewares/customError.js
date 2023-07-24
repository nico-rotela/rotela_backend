export default class CustomError {

    static createError({name= "error", cause, message, code=1}) {
        const error = new Error(message, {cause: new Error(cause)});
        error.name= name;
        error.code= code;
        throw error
    };
    
}
