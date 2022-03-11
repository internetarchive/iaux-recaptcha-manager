import { html, css, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { RecaptchaManager } from '../src/recaptcha-manager';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('#recaptcha') recaptchaElement!: HTMLDivElement;

  render() {
    return html`

      <div id="recaptcha"></div>
      <button @click="${this.setupRecaptcha}">Setup Recaptcha</button>
    `;
  }

  private async setupRecaptcha() {
    const manager = await RecaptchaManager.getRecaptchaManager({
      siteKey: '6LeTUvYUAAAAAPTvW98MaXyS8c6vxk4-9n8DI1ve'
    })

    manager.setup(this.recaptchaElement, 0, 'light', 'image');
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
