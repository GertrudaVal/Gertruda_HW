const { test, expect } = require("@playwright/test");
const { CalcStartPage } = require("../pages/calcStartPage");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
//the loop part
for (let buildNumber = 0; buildNumber <= 9; buildNumber++) {
  test.describe("", () => {
    let page;
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      startPage = new CalcStartPage(page);
    });

    test.beforeEach(async () => {
      await startPage.goto();
      await page.selectOption("#selectBuild", buildNumber.toString());
    });
    test(`calculator opens ${buildNumber}`, async () => {
      const name = await page.innerText(".intro-lead-in");
      expect(name).toBe("Selenium Object");
    });

    test(`addition with positive numbers (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(20);
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "0");
      await page.click("#calculateButton");
      const expectedResultAddition = numberOne + numberTwo;
      let result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(expectedResultAddition.toString());
    });

    //it.only
    test(`addition with negative numbers (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100) * -1;
      const numberTwo = getRandomInt(20) * -1;
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "0");
      await page.click("#calculateButton");
      const expectedResultAddition = numberOne + numberTwo;
      let result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(expectedResultAddition.toString());
    });

    //it.only
    test(`clear button (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(20);
      await page.fill("#number1Field", numberOne.toString());
      await page.fill("#number2Field", numberTwo.toString());
      await page.click("#calculateButton");
      await page.click("#clearButton");
      const result = await page.inputValue("#numberAnswerField");
      expect(result).toBe("");
      const fieldOne = await page.inputValue("#number1Field");
      const fieldTwo = await page.inputValue("#number2Field");
      expect(fieldOne).toBe(numberOne.toString());
      expect(fieldTwo).toBe(numberTwo.toString());
    });

    //it.only
    test(`integer checkbox (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = 0.5;
      await startPage.fillFields(numberOne, numberTwo);
      await page.click("#calculateButton");
      const expectedResult = numberOne + numberTwo;
      let result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(expectedResult.toString());
      await page.check("#integerSelect");
      result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(numberOne.toString());
    });

    //it.only
    test(`division by zero error (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = 0;
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "3");
      await page.click("#calculateButton");
      const errorDivisionByZero = await page.innerText("#errorMsgField");
      expect(errorDivisionByZero).toBe("Divide by zero error!");
    });

    //it.only
    test(`invalid field error (Build ${buildNumber})`, async () => {
      let numberOne = "Hello, I hope you're doing well.";
      let numberTwo = 7;
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "0");
      await page.click("#calculateButton");
      let errorInvalidField = await page.innerText("#errorMsgField");
      expect(errorInvalidField).toBe("Number 1 is not a number");
      numberOne = 7;
      numberTwo = "*&$##";
      await startPage.fillFields(numberOne, numberTwo);
      await page.click("#calculateButton");
      errorInvalidField = await page.innerText("#errorMsgField");
      expect(errorInvalidField).toBe("Number 2 is not a number");
    });

    test(`empty field is zero (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = "";
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "0");
      await page.click("#calculateButton");
      const expectedResultAddition = numberOne;
      let result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(expectedResultAddition.toString());
    });

    test(`subtraction (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(100);
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "1");
      await page.click("#calculateButton");
      const expectedResultSubtraction = numberOne - numberTwo;
      let result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(expectedResultSubtraction.toString());
    });

    test(`Multiplication (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(100);
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "2");
      await page.click("#calculateButton");
      const expectedResultMultiplication = numberOne * numberTwo;
      let result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(expectedResultMultiplication.toString());
    });
    test(`Division (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(100);
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "3");
      await page.click("#calculateButton");
      const expectedResultDivision = numberOne / numberTwo;
      let result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(expectedResultDivision.toString());
    });

    test(`Concatenation (Build ${buildNumber})`, async () => {
      const numberOne = getRandomInt(100);
      const numberTwo = getRandomInt(100);
      await startPage.fillFields(numberOne, numberTwo);
      await page.selectOption("#selectOperationDropdown", "4");
      await page.click("#calculateButton");
      const expectedResultConcatenation = `${numberOne}${numberTwo}`;
      let result = await page.inputValue("#numberAnswerField");
      expect(result).toBe(expectedResultConcatenation);
    });
  });
}
