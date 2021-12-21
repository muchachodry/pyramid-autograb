import { logger } from "./initLogger";
import {Browser, Page} from 'puppeteer'
import { createBrowserAndPage } from "./controller/createBrowserAndPage";
import { doLogin } from "./controller/doLogin";
import {grabAndLoot} from "./controller/grabAndLoot";

( async () => {
    try {
        logger.info(`Starting bot....`);
        const browser: Browser = await createBrowserAndPage();
        const page: Page = await browser.newPage();
        await doLogin(page);
        await grabAndLoot(page);
        await browser.close();
        return 0;

    } catch (e) {
        logger.error(e)
    }
})();




