const {test, expect} = require('@playwright/test')


test('Myfirst test', async ({page}) => {
    await page.goto('https://greenfin.onrender.com/')
    await expect(page).toHaveTitle('GreenFin')

})
