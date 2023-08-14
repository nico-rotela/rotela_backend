import winston, { transports } from "winston";
// import config from "./config.js";

//Custom logger options:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http:4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'black',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
};

//Custom Logger:
const devLogger = winston.createLogger({
    //Levels:
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.Console(
            {
                level: "http",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.Console(
            {
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.Console(
            {
                level: "fatal",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                maxFiles: 10,
                filename: './errors-warning.log', 
                level: 'warning', 
                format: winston.format.simple()
            }
        ),
        new winston.transports.File(
            {
                maxFiles: 10,
                filename: './errors.log', 
                level: 'error', 
                format: winston.format.simple()
            }
        )
    ]
});

//Creating our logger:
// const prodLogger = winston.createLogger({
//     //Declare transports:
//     transports: [
//         new winston.transports.Console({level: "http"}),
//         new winston.transports.File({filename: './errors.log', level: 'warn'})
//     ]
// });

//Declare a middleware:
export const addLogger = (req, res, next) => {
    // if (config.environment === 'production'){
    //     req.logger = prodLogger;
    // } else {
    //     req.logger = devLogger;
    // }
    req.logger = devLogger;
    req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    next();
};