const {Builder, Browser, By, until} = require('selenium-webdriver')

let driver;

beforeEach( async () => {
    driver = new Builder().forBrowser(Browser.CHROME).build()
})

afterEach(async () => {
    await driver.quit()
})

describe('Movie App tests', () => {
    test('Can delete movie', async () => {
        await driver.get('http://localhost:3000')
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Deadpool');
        await driver.sleep(1000)
        await driver.findElement(By.css('button[type="submit"]')).click()
        
        await driver.findElement(By.className('delete-btn')).click()

        const message = await driver.wait(until.elementLocated(By.id('message')))
        expect(await message.getText()).toBe('Deadpool deleted!')
    })

    test('Can check movie', async () => {
        await driver.get('http://localhost:3000')
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Deadpool');
        await driver.sleep(1000)
        await driver.findElement(By.css('button[type="submit"]')).click()

        await driver.findElement(By.css('input[type="checkbox"]')).click()
        const message = await driver.wait(until.elementLocated(By.id('message')))
        expect(await message.getText()).toBe('Watched Deadpool')
        await driver.sleep(1000)
        await driver.findElement(By.className('delete-btn')).click()
    })

    test('Can uncheck movie', async () => {
        await driver.get('http://localhost:3000')
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Deadpool');
        await driver.sleep(1000)
        await driver.findElement(By.css('button[type="submit"]')).click()
        await driver.findElement(By.css('input[type="checkbox"]')).click()
        await driver.sleep(1000)
        await driver.findElement(By.css('input[type="checkbox"]')).click()
        const message = await driver.wait(until.elementLocated(By.id('message')))
        expect(await message.getText()).toBe('Added back Deadpool')
        await driver.sleep(2000)
        await driver.findElement(By.className('delete-btn')).click()
    })
})