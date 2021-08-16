const { expect } = require("@playwright/test");

exports.CalcStartPage = class CalcStartPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://testsheepnz.github.io/BasicCalculator");
  }

  async calculate(numberOne, numberTwo) {
    await this.page.fill("#number1Field", numberOne.toString());
    await this.page.fill("#number2Field", numberTwo.toString());
    await this.page.click("#calculateButton");
  }

  async assertFieldExistsAndIsEnabled(fieldId) {
    const visible = await this.page.isVisible(fieldId);
    expect(visible).toBeTruthy();

    const enabled = await this.page.isEnabled(fieldId);
    expect(enabled).toBeTruthy();
  }

  async getAnswer() {
    return await this.page.inputValue("#numberAnswerField");
  }

  async selectBuild(build) {
    await this.page.selectOption("#selectBuild", `${build}`);
  }
};
