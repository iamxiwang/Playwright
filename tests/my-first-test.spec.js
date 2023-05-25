const { test, expect } = require("@playwright/test");

// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 1000 });

test("my first test", async ({ page }) => {
  // go to Netflix.com
    await page.goto("https://www.netflix.com");

    await expect(
        page.locator('[data-uia="nmhp-card-hero-text-title"]')
    ).toHaveText("Unlimited movies, TV shows, and more.");
});

// ADD YOUR TESTS HERE!

test.beforeEach(async ({ page }) => {
  // go to Netflix
    await page.goto("https://www.netflix.com");
});

// Test 1: Sign In with Invalid Email

test("Test 1: Sign In with Invalid Email ", async ({ page }) => {
  // find Sign In locator and click it
    await page.locator("[data-uia='header-login-link']").click();

    // url should be changed to https://www.netflix.com/login
    await expect(page).toHaveURL(/.*login/);

    // fill out email field
    await page.fill("#id_userLoginId", "test-email@gmail.com");

    // fill out password field
    await page.fill("#id_password", "test-password123");

    // check if there is Sign In button
    await expect(page.locator('[data-uia="login-page-title"]')).toHaveText(
        "Sign In"
    );

    // click Enter keystroke to submit form
    await page.keyboard.press("Enter");

    // expect to see error message
    await expect(page.locator('[data-uia="text"]')).toContainText(
        "Sorry, we can't find an account with this email address. Please try again"
    );

    await page.waitForTimeout(1000);
});

// Test 2: Sign In with Incorrect Password

test("Test 2: Sign In with Incorrect Password", async ({ page }) => {
  // find Sign In locator and click it
    await page.locator("[data-uia='header-login-link']").click();

    // url should be changed to https://www.netflix.com/login
    await expect(page).toHaveURL(/.*login/);

    // fill out email field
    await page.fill("#id_userLoginId", "youremail@gmail.com");

    // fill out password field
    await page.fill("#id_password", "blablabla");

    // check if there is Sign In button
    await expect(page.locator('[data-uia="login-page-title"]')).toHaveText(
        "Sign In"
    );

  // find Sign In locator and click it
    await page.locator("[data-uia='login-submit-button']").click();

    // expect to see error message
    await expect(page.locator('[data-uia="text"]')).toContainText(
        "Incorrect password."
    );

    await page.waitForTimeout(1000);
});

// Test 3: Sign In with Short Password

test("Test 3: Sign In with Short Password", async ({ page }) => {
  // find Sign In locator and click it
    await page.locator("[data-uia='header-login-link']").click();

    // url should be changed to https://www.netflix.com/login
    await expect(page).toHaveURL(/.*login/);

    // fill out email field
    await page.fill("#id_userLoginId", "test-email@gmail.com");

    // fill out password field
    await page.fill("#id_password", "123");

    // check if there is Sign In button
    await expect(page.locator('[data-uia="login-page-title"]')).toHaveText(
        "Sign In"
    );

  // find Sign In locator and click it
    await page.locator("[data-uia='login-submit-button']").click();

  // expect to see error message
    await expect(page.locator('[data-uia="password-field+error"]')).toContainText(
        "Your password must contain between 4 and 60 characters."
    );

    await page.waitForTimeout(1000);
});

// Test 4: Sign In with Invalid Phone Number

test("Test 4: Sign In with Invalid Phone Number", async ({ page }) => {
  // find Sign In locator and click it
    await page.locator("[data-uia='header-login-link']").click();

    // url should be changed to https://www.netflix.com/login
    await expect(page).toHaveURL(/.*login/);

    // fill out email field
    await page.fill("#id_userLoginId", "123456789");

    // fill out password field
    await page.fill("#id_password", "test-password123");

    // check if there is Sign In button
    await expect(page.locator('[data-uia="login-page-title"]')).toHaveText(
        "Sign In"
    );

    // find Sign In locator and click it
    await page.locator("[data-uia='login-submit-button']").click();

    // expect to see error message
    await expect(page.locator('[data-uia="text"]')).toContainText(
        "Sorry, we can't find an account with this number."
    );

    await page.waitForTimeout(1000);
});