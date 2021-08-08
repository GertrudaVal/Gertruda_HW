
const { test, expect } = require('@playwright/test');
const {CalcStartPage} = require('../pages/calcStartPage');

test.describe('', () => {
  let page;
  test.beforeAll(async ({browser}) => {
      page = await browser.newPage();
      startPage = new CalcStartPage(page);
  })

  test.beforeEach(async () => {
    await startPage.goto();
  });
  test('calculator opens', async () => {    
    const name = await page.innerText('.intro-lead-in');
    expect(name).toBe('Selenium Object');
  })

  test('additionWorks_in progress', async () => {    
      
    const numberOne = 8; //kad imtu random sk
    const numberTwo = 3;
    await page.fill('#number1Field', numberOne.toString());
    await page.fill('#number2Field', numberTwo.toString());
    await page.click('#calculateButton');
    const expectedResult = numberOne + numberTwo;
    const result = await page.inputValue('#numberAnswerField');  
    expect(result).toBe(expectedResult.toString());
  })

  test('subtractionWorks_in progress', async () => {    
      
    const numberOne = 8; //kad imtu random sk
    const numberTwo = 3;
    await page.fill('#number1Field', numberOne.toString());
    await page.fill('#number2Field', numberTwo.toString());
    await page.selectOption('#selectOperationDropdown', '1')
    await page.click('#calculateButton');
    const expectedResult = numberOne - numberTwo;
    const result = await page.inputValue('#numberAnswerField');  
    expect(result).toBe(expectedResult.toString());
  })

  test('clear button', async () => {    
      
    const numberOne = 8; //kad imtu random sk
    const numberTwo = 3;
    await page.fill('#number1Field', numberOne.toString());
    await page.fill('#number2Field', numberTwo.toString());
    await page.click('#calculateButton');       
    await page.click('#clearButton');
    const result = await page.inputValue('#numberAnswerField');  
    expect(result).toBe('');
  })

  test('integer checkbox', async () => {    
      
    const numberOne = 1.5; //kad imtu random sk
    const numberTwo = 3;
    await page.fill('#number1Field', numberOne.toString());
    await page.fill('#number2Field', numberTwo.toString());
    await page.click('#calculateButton');
    const expectedResult = numberOne + numberTwo;
    let result = await page.inputValue('#numberAnswerField'); 
    expect(result).toBe(expectedResult.toString());
    await page.check('#integerSelect');
    result = await page.inputValue('#numberAnswerField');  
    expect(result).toBe("4");
  })
  
})

