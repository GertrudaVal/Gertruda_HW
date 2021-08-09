const { expect } = require("@playwright/test");

exports.CalcStartPage = class CalcStartPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://testsheepnz.github.io/BasicCalculator");
  }

  async fillFields(numberOne, numberTwo) {
    await this.page.fill("#number1Field", numberOne.toString());
    await this.page.fill("#number2Field", numberTwo.toString());
  }
};
