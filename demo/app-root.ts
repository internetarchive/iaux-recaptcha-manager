import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { RecaptchaWidgetInterface } from '../src/recaptcha-widget';
import {
  RecaptchaManager,
  RecaptchaManagerInterface,
} from '../src/recaptcha-manager';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() result?: string;

  @state() result2?: string;

  private recaptchaManager: RecaptchaManagerInterface = new RecaptchaManager({
    defaultSiteKey: '6Ld64a8UAAAAAGbDwi1927ztGNw7YABQ-dqzvTN2',
  });

  private recaptcha1?: RecaptchaWidgetInterface;

  private recaptcha2?: RecaptchaWidgetInterface;

  render() {
    return html`
      <p>
        <button @click="${this.loadRecaptcha}">Load Recaptcha</button
        ><button @click="${this.executeRecaptcha}">Execute Recaptcha</button>
      </p>
      ${this.result
        ? html`<p><strong>Token:</strong></p>
            <p>${this.result}</p>`
        : ''}
      <p>
        <button @click="${this.loadRecaptcha2}">Load Another Recaptcha</button
        ><button @click="${this.executeRecaptcha2}">
          Execute Another Recaptcha
        </button>
      </p>
      ${this.result2
        ? html`<p><strong>Token 2:</strong></p>
            <p>${this.result2}</p>`
        : ''}
    `;
  }

  private async loadRecaptcha() {
    this.recaptcha1 = await this.recaptchaManager?.getRecaptchaWidget({
      recaptchaParams: {
        tabindex: 0,
        theme: 'light',
        type: 'image',
      },
    });
  }

  private async executeRecaptcha() {
    if (!this.recaptcha1) {
      await this.loadRecaptcha();
    }

    if (!this.recaptcha1) {
      console.error('error loading recaptcha');
      return;
    }

    this.result = await this.recaptcha1.execute();
  }

  private async loadRecaptcha2() {
    this.recaptcha2 = await this.recaptchaManager?.getRecaptchaWidget({
      siteKey: '<your-site-key>',
    });
  }

  private async executeRecaptcha2() {
    if (!this.recaptcha2) {
      await this.loadRecaptcha();
    }

    if (!this.recaptcha2) {
      console.error('error loading recaptcha');
      return;
    }

    this.result2 = await this.recaptcha2.execute();
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
