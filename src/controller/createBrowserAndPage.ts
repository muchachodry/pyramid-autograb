import puppeteer, {Browser, Page} from "puppeteer";
import puppeteerConfig from "../config/puppeteer.config";
import {logger} from "../initLogger";

export const createBrowserAndPage = async ():Promise<Browser> => {
    try {
        logger.info('[createBrowserAndPage]: creating Browser...')
        const browser: Browser =  await puppeteer.launch(puppeteerConfig);
        logger.info('[createBrowserAndPage]: created Successfully');
        logger.info('[createBrowserAndPage]: creating Page...');
        return browser;
    } catch {
        logger.error(`[createBrowser]: can not create browser or page`);
        throw new Error(`Puppeteer can not create browser or page`);
    }
};



