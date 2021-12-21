import {Page} from "puppeteer";
import {sleep} from "../utils/utils";
import {logger} from "../initLogger";
import {config} from "../config";


const ordersSelector = "#app > section > main > section > div.item_wrap.achievements > div > div:nth-child(3) > div > h1";
const lootButton = '#app > section > main > section > div.btns.df.fz16.fw600 > span.bg-blue';

export const grabAndLoot = async (page: Page): Promise<void> => {
    try {
        logger.info('[grabAndLoot]: lets grabAndLoot...');

        await page.click('.grab_wrap');

        await page.waitForSelector(ordersSelector, {visible: true});
        await sleep(1000);
        let orders:number = +await page.$eval(ordersSelector, el => el.textContent);
        logger.info(`[grabAndLoot]: Today you loot ${orders} orders`)

        while(orders < config.maxLoots) {
            await page.waitForSelector(lootButton, {visible: true});
            await page.click(lootButton);
            await page.waitForSelector('span.btn.submit', {visible: true});
            await page.click('span.btn.submit');
            await sleep(1000);
            let orders:number = +await page.$eval(ordersSelector, el => el.textContent);
            logger.info(`[grabAndLoot]: Today you loot ${orders} orders`)
        }
        if(orders === config.maxLoots) {
            logger.warn('[grabAndLoot]: you done all loots today');
        }
    }catch {
        logger.error('[grabAndLoot]: error looting')
        throw Error('error looting')
    }
}

