import { Page } from "puppeteer";
import { config } from "../config";
import { logger } from "../initLogger";
import {sleep} from "../utils/utils";

export const doLogin = async (page: Page): Promise<void> => {
    logger.info('[doLogin]: lets log in to web');
    try{
        await page.goto(config.entryUrl, { waitUntil: 'load' });
        await page.waitForSelector('#app > div.loginWarp > div.loginContent > div:nth-child(2) > input[type=text]', { visible: true });
        await page.click('#app > div.loginWarp > div.loginContent > div:nth-child(2) > input[type=text]');
        await page.type('#app > div.loginWarp > div.loginContent > div:nth-child(2) > input[type=text]', config.login.user);
        await page.click('#app > div.loginWarp > div.loginContent > div:nth-child(3) > input[type=password]');
        await page.type('#app > div.loginWarp > div.loginContent > div:nth-child(3) > input[type=password]', config.login.pass);
        await page.click('.sumbitBtn');
        await page.waitForNavigation();
        await sleep(3000);
        page.waitForSelector('.van-icon-close', { visible: true, timeout: 3000})
            .then(async () =>  await page.click('.van-icon-close'))
            .catch(() => logger.info(`[doLogin]: banner not appeared, lets continue`));

    } catch {
        logger.error(`[doLogin]: can not login in to web`);
        throw new Error(`Puppeteer can not login in to web`);
    }
}