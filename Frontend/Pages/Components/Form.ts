import { Page, Locator } from '@playwright/test';

export class Form {
  constructor(private page: Page, private formSelector: string) {}

  getForm(): Locator {
    return this.page.locator(this.formSelector);
  }

  // Check if form exists
  async formExists(): Promise<boolean> {
    return await this.getForm().isVisible();
  }

  // Get input by name attribute
  getInputByName(name: string): Locator {
    return this.page.locator(`input[name="${name}"], textarea[name="${name}"], select[name="${name}"]`);
  }

  // Check if input field exists by name
  async hasInputField(name: string): Promise<boolean> {
    return await this.getInputByName(name).isVisible();
  }

  // Fill input by name
  async fillField(name: string, value: string): Promise<void> {
    await this.getInputByName(name).fill(value);
  }

  // Get input value
  async getFieldValue(name: string): Promise<string> {
    return await this.getInputByName(name).inputValue();
  }

  // Verify multiple fields exist by name
  async hasFields(fieldNames: string[]): Promise<boolean> {
    for (const name of fieldNames) {
      const exists = await this.hasInputField(name);
      if (!exists) return false;
    }
    return true;
  }

  // Submit form
  async submitForm(): Promise<void> {
    await this.getForm().locator('button[type="submit"]').click();
  }

  // Check if submit button exists
  async hasSubmitButton(): Promise<boolean> {
    return await this.getForm().locator('button[type="submit"]').isVisible();
  }
}