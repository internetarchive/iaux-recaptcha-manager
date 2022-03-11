import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  RecaptchaManager,
  RecaptchaManagerInterface,
} from '../src/recaptcha-manager';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() result?: string;

  private recaptchaManager?: RecaptchaManagerInterface;

  render() {
    return html`
      <button @click="${this.loadRecaptcha}">Load Recaptcha</button>
      <button @click="${this.executeRecaptcha}">Execute Recaptcha</button>
      <slot name="recaptcha"></slot>
      ${this.result
        ? html`<strong
            >Token:<strong><p>${this.result}</p></strong></strong
          >`
        : ''}
    `;
  }

  private async loadRecaptcha() {
    this.recaptchaManager = await RecaptchaManager.getRecaptchaManager({
      siteKey: '6LeTUvYUAAAAAPTvW98MaXyS8c6vxk4-9n8DI1ve',
    });
    const element = document.querySelector('#recaptcha') as HTMLDivElement;
    this.recaptchaManager?.setup(element, 0, 'light', 'image');
  }

  private async executeRecaptcha() {
    if (!this.recaptchaManager) {
      await this.loadRecaptcha();
    }

    if (!this.recaptchaManager) {
      console.error('error loading recaptcha');
      return;
    }

    this.result = await this.recaptchaManager.execute();
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
