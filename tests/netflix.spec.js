const { test, expect } = require("@playwright/test");

// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 3000 });

test.beforeEach(async({page}) => {
  await page.goto('http://www.netflix.com');
})


test('T1: User cannot sign in with invaild email/password combination on Netflix', async( {page}) => {

      //Click Sign in button
      await page.click('text= Sign In')

      expect(page.url()).toContain('/login')

     // check if in the Sign in form existing
     //check if the form existing
      const emailField = page.locator('.nfInput.nfEmailPhoneInput.login-input.login-input-email')
      const passwordField = page.locator('[data-uia="password-field+container"]')
      const signInButton = page.locator('button[class="btn login-button btn-submit btn-small"]')


      await emailField.waitFor()
      await passwordField.waitFor()
      await signInButton.waitFor()

      expect (emailField).toBeVisible()
      expect(passwordField).toBeVisible()
      expect(signInButton).toBeVisible()

      // Input invaild email and password
      await page.fill('input[data-uia="login-field"]','invalidemail@invalid.com' )
      await page.fill('input[data-uia="password-field"]','invalidpassword' )

      //click the submit button
      await page.click('button[data-uia="login-submit-button"]')

      // locate the error message
      const errorMessageElement = page.locator('[class="ui-message-contents"]')
      //get errormessage text
      const errorMessage = await errorMessageElement.textContent()
      expect(errorMessage).toContain("Sorry, we can't find an account with this email address. Please try again or create a new account.")
  
})

test('T2: Edge cases: empty email and empty password  show error messages', async ({ page }) => {
    
    //Click Sign in button
    await page.click('text= Sign In')

    //check if the form existing
    const emailField = page.locator('.nfInput.nfEmailPhoneInput.login-input.login-input-email')
    const passwordField = page.locator('[data-uia="password-field+container"]')
    const signInButton = page.locator('button[class="btn login-button btn-submit btn-small"]')


    await emailField.waitFor()
    await passwordField.waitFor()
    await signInButton.waitFor()

    expect (emailField).toBeVisible()
    expect(passwordField).toBeVisible()
    expect(signInButton).toBeVisible()

    // Input invaild email and password
    await page.fill('input[data-uia="login-field"]','' )
    await page.fill('input[data-uia="password-field"]','' )
    // Click sign-in button without filling in the fields
    await page.click('.login-button');


    // Locate the error message
    const emailErrorMessage = page.locator('[data-uia="login-field+error"]');
    const passwordErrorMessage = page.locator('[data-uia="password-field+error"]');

    // Assert that the error messages are what we expect
    expect(await emailErrorMessage.textContent()).toBe("Please enter a valid email or phone number.");
    expect(await passwordErrorMessage.textContent()).toBe("Your password must contain between 4 and 60 characters.");

    await page.waitForTimeout(1000)
});

test('T3: Using invalid email format to sign in', async({page}) => {
    page.click('text=sign in')

    const emailField = page.locator('[data-uia = "login-field+container"]')
    const passwordField = page.locator('.nfInput.nfPasswordInput.login-input.login-input-password')
    const signInButton = page.locator('.btn.login-button.btn-submit.btn-small')

    await emailField.waitFor()
    await passwordField.waitFor()
    await signInButton.waitFor()

    expect (emailField).toBeVisible()
    expect(passwordField).toBeVisible()
    expect(signInButton).toBeVisible()

    // Input invaild email and password
    await page.fill('input[id="id_userLoginId"]','notanemailaddress' )
    await page.fill('input[name="password"]','123456' )
    // Click sign-in button without filling in the fields
    await page.click('.login-button');
    //it works in codesandbox but not here
    // await page.waitForTimeout(10000)
    // expect(await page.textContent('body')).toContain('Sorry, we cant find an account with this email address. Please try again')

    const errorMessage = page.locator('.ui-message-contents')
    expect(await errorMessage.textContent()).toContain("Sorry, we can't find an account with this email address. Please try again")
    
    await page.waitForTimeout(1000)
})


test('T4: Press enter key  with invalid password', async ({page}) =>{
      await page.click('text =sign in')

      await page.fill('input[name="userLoginId"]', 'test@email.com')
      await page.fill('input[type="password"]', '123')
      //Simulate pressing the Enter key
      await page.press('input[id="id_password"]', 'Enter')
      
      const errorMessage = page.locator('.ui-message-contents')
      expect( await errorMessage.textContent()).toContain('Incorrect password. Please try again or you can reset your password.')
      //it works in codesandbox but not here
      // await page.waitForTimeout(10000)
      // expect(await page.textContent('body')).toContain('Incorrect password. Pleae try again')
      await page.waitForTimeout(1000)
})

test('T5: Click sign in button with invalid password', async ({page}) =>{
  await page.click('text =sign in')

  await page.fill('input[name="userLoginId"]', 'test@email.com')
  await page.fill('input[type="password"]', '123')


  //Simulate click the sign in button
  await page.click('.btn.login-button.btn-submit.btn-small')
  
  const errorMessage = page.locator('[data-uia="password-field+error"]')
  
  expect( await errorMessage.textContent()).toContain('Your password must contain between 4 and 60 characters.')
  //it works in codesandbox but not here
  // await page.waitForTimeout(5000)
  // expect(await page.textContent('body')).toContain('Your password must contain between 4 and 60 characters.')
})


test.only('T6: login with valid email address but invalid password', async ({page}) => {
    await page.click('text=sign in')

    await page.fill('input[name="userLoginId"]', 'test@email.com')
    await page.fill('input[type="password"]', 'password')
    await page.click('button:has-text("sign in")')
    
    const errorMessage = page.locator('.ui-message-contents')
    
    expect(await errorMessage.textContent()).toContain('Incorrect password. Please try again or you can reset your password.')
    
    //The following way dont work in vs code environment
    // await page.waitForTimeout(10000)
    // expect(await page.textContent('body')).toContain('Incorrect password. Pleae try again')
})