import pino from 'pino';
import {config} from "./config";
const logger = pino({
    name:config.name,
    level:config.log.level,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});

export { logger };