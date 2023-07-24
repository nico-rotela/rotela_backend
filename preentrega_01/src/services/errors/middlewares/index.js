import EErrors from "./enums";  

export default (error, req, res, next) => {

    console.error("error detectado entrando al error handler");
    console.error(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.status(400).send({status: "error", error: error.message})
            break;
    
        default:
            res.status(500).send({status: "error", error: "unandeld error!"})
            break;
    }
}