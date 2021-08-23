const { test, expect } = require("@playwright/test");
const { CalcStartPage } = require("../pages/calcStartPage");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
//Build 0 is prototype.
const builds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 

builds.forEach((build) => {
  test.describe("", () => {
    let page;
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      startPage = new CalcStartPage(page);
    });

    test.beforeEach(async () => {
      await startPage.goto();
      await startPage.selectBuild(build);
    });
    test(`calculator opens ${build})`, async () => {
      const name = await page.innerText(".intro-lead-in");
      expect(name).toBe("Selenium Object");
    });

    test(`fields exist and are active (Build ${build})`, async () => {
      await startPage.assertFieldExistsAndIsEnabled("#number1Field");
      await startPage.assertFieldExistsAndIsEnabled("#number2Field");
      await startPage.assertFieldExistsAndIsEnabled("#selectOperationDropdown");
      await startPage.assertFieldExistsAndIsEnabled("#calculateButton");
      await startPage.assertFieldExistsAndIsEnabled("#integerSelect");
      await startPage.assertFieldExistsAndIsEnabled("#clearButton");
    });

    test(`addition with positive numbers (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(20);
      await page.selectOption("#selectOperationDropdown", "0");
      await startPage.calculate(numberOne, numberTwo);
      const expectedResultAddition = numberOne + numberTwo;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedResultAddition.toString());
    });

    //it.only
    test(`addition with negative numbers (Build ${build})`, async () => {
      const numberOne = getRandomInt(100) * -1;
      const numberTwo = getRandomInt(20) * -1;
      await page.selectOption("#selectOperationDropdown", "0");
      await startPage.calculate(numberOne, numberTwo);

      const expectedResultAddition = numberOne + numberTwo;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedResultAddition.toString());
    });

    //it.only
    test(`clear button (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(20);
      await startPage.calculate(numberOne, numberTwo);

      await page.click("#clearButton");
      const result = await startPage.getAnswer();
      expect(result).toBe("");
      const fieldOne = await page.inputValue("#number1Field");
      const fieldTwo = await page.inputValue("#number2Field");
      expect(fieldOne).toBe(numberOne.toString());
      expect(fieldTwo).toBe(numberTwo.toString());
    });

    //it.only. Pasiima dropdown pagal build?????????
    test(`integer checkbox (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = 0.5;
      //await page.selectOption("#selectOperationDropdown", "0");
      await startPage.calculate(numberOne, numberTwo);
      const expectedFullResult = numberOne + numberTwo;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedFullResult.toString());
      await page.check("#integerSelect");
      result = await startPage.getAnswer();
      expect(result).toBe(numberOne.toString());
    });

    //it.only
    test(`division by zero error (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = 0;
      await page.selectOption("#selectOperationDropdown", "3");
      await startPage.calculate(numberOne, numberTwo);

      const errorDivisionByZero = await page.innerText("#errorMsgField");
      expect(errorDivisionByZero).toBe("Divide by zero error!");
    });

    //it.only
    test(`invalid field error (Build ${build})`, async () => {
      let numberOne = "Hello, I hope you're doing well.";
      let numberTwo = 7;
      await page.selectOption("#selectOperationDropdown", "0");
      await startPage.calculate(numberOne, numberTwo);

      let errorInvalidField = await page.innerText("#errorMsgField");
      expect(errorInvalidField).toBe("Number 1 is not a number");
      numberOne = 7;
      numberTwo = "*&$##";
      await startPage.calculate(numberOne, numberTwo);

      errorInvalidField = await page.innerText("#errorMsgField");
      expect(errorInvalidField).toBe("Number 2 is not a number");
    });

    test(`empty field is zero (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = "";
      await page.selectOption("#selectOperationDropdown", "0");
      await startPage.calculate(numberOne, numberTwo);

      const expectedResultAddition = numberOne;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedResultAddition.toString());
    });

    test(`subtraction (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(100);
      await page.selectOption("#selectOperationDropdown", "1");
      await startPage.calculate(numberOne, numberTwo);

      const expectedResultSubtraction = numberOne - numberTwo;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedResultSubtraction.toString());
    });

    test(`Multiplication (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(100);

      await page.selectOption("#selectOperationDropdown", "2");
      await startPage.calculate(numberOne, numberTwo);
      const expectedResultMultiplication = numberOne * numberTwo;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedResultMultiplication.toString());
    });
    test(`Multiplication with negative numbers (Build ${build})`, async () => { 
      const numberOne = getRandomInt(100) * -1;
      const numberTwo = getRandomInt(100) *-1;

      await page.selectOption("#selectOperationDropdown", "2");
      await startPage.calculate(numberOne, numberTwo);
      const expectedResultMultiplication = numberOne * numberTwo;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedResultMultiplication.toString());
    });
    test(`Division (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(100);

      await page.selectOption("#selectOperationDropdown", "3");
      await startPage.calculate(numberOne, numberTwo);
      const expectedResultDivision = numberOne / numberTwo;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedResultDivision.toString());
    });

    test(`Concatenation (Build ${build})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(100);
      await page.selectOption("#selectOperationDropdown", "4");
      await startPage.calculate(numberOne, numberTwo);

      const expectedResultConcatenation = `${numberOne}${numberTwo}`;
      let result = await startPage.getAnswer();
      expect(result).toBe(expectedResultConcatenation);
    });
  });
});
