import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { Form } from './Components/Form';

export class ContactPage extends BasePage {
  readonly contactForm: Form;

  constructor(page : Page) {
    super(page);
    this.contactForm = new Form(page, 'form');
  }

  async navigateToContact(): Promise<void> {
    await this.goto('/contact');
    await this.waitForPageLoad();
  }

  getMainHeading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  getHeadingText(): Promise<string> {
    return this.getText(this.getMainHeading());
  }

  getSubmitButton(): Locator {
    return this.page.getByRole('button', { name: 'Verstuur' });
  }

  // Fill contact form fields by name attribute
  async fillContactForm(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    await this.contactForm.fillField('name', name);
    await this.contactForm.fillField('email', email);
    await this.contactForm.fillField('subject', subject);
    await this.contactForm.fillField('message', message);
  }

  // Submit contact form
  async submitContactForm(): Promise<void> {
    await this.contactForm.submitForm();
  }
}