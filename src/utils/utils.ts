export const sleep = (ms: number | undefined):Promise<any> => new Promise(resolve => setTimeout(resolve, ms));
