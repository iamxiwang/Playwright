const { test, expect } = require("@playwright/test");

// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 1000 });

test.beforeEach( async ({page}) => {
    try{
        await page.goto('https://greenfin.onrender.com')
        const demoButton = page.locator('button[id="demo"]')

        await demoButton.click()

        // wait for the button to disappear
        await page.waitForSelector('button[id="demo"]', {state: 'detached'})
        expect( await demoButton.count()).toBe(0)

    }catch (error) {
        console.log('Failed to login')
    }


})



test('Test 1: Hover over the profile picture show the drop down menu', async ({page}) => {
    const profile = page.locator('#img-btn')
    await profile.hover()
    const dropDownMenu = page.locator('.profile-dropdown')

    expect (await dropDownMenu.isVisible()).toBe(true)
})
