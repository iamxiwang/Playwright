const {context} = await launch()
const page = await context.newPage()

await page.goto('https://todomvc.com/examples/react/#/')
await page.locator('[placeholder="What needs to be done?"]').fill("learning Playwright");
await page.keyboard.press('Enter')
await page.locator('[placeholder="What needs to be done?"]').fill("learning AWS");
await page.keyboard.press('Enter')
// await page.locator('li:nth-of-type(2) [type="checkbox"]').click();
await page.locator('[placeholder="What needs to be done?"]').fill("learning Detection");
await page.keyboard.press('Enter')
// Variable containing the text to match
const labelText = 'learning Detection';

  // Select the element based on the variable text
const label = await page.$(`label:has-text("${labelText}")`);
// Select the previous sibling element
const previousElement = await label.evaluateHandle((el) => el.previousElementSibling);

// Use the previous element for further actions
await previousElement.click();
