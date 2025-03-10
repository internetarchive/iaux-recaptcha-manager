/* eslint-disable @typescript-eslint/no-unused-vars */

export type MockGrecaptchaMode = 'success' | 'expired' | 'error';

export class MockGrecaptcha implements ReCaptchaV2.ReCaptcha {
  response = 'foo';

  renderCalled = false;

  executeCalled = false;

  resetCallCount = 0;

  getResponseCalled = false;

  mode: MockGrecaptchaMode;

  addDelay: boolean;

  callback?: (response: string) => void;

  'expired-callback'?: () => void;

  'error-callback'?: () => void;

  render(
    container: string | HTMLElement,
    parameters?: ReCaptchaV2.Parameters | undefined,
    inherit?: boolean | undefined,
  ): number {
    this.callback = parameters?.callback?.bind(this);
    this['error-callback'] = parameters?.['error-callback']?.bind(this);
    this['expired-callback'] = parameters?.['expired-callback']?.bind(this);
    this.renderCalled = true;
    return 1;
  }

  reset(opt_widget_id?: number | undefined): void {
    this.resetCallCount += 1;
  }

  getResponse(opt_widget_id?: number | undefined): string {
    this.getResponseCalled = true;
    return 'foo';
  }

  execute(opt_widget_id?: number): void {
    this.executeCalled = true;

    if (this.addDelay) {
      setTimeout(this.callCallback.bind(this), 100);
    } else {
      this.callCallback();
    }
  }

  ready(callback: () => void): void {}

  private callCallback(): void {
    switch (this.mode) {
      case 'success':
        if (this.callback) {
          this.callback('foo');
        }
        break;
      case 'error':
        if (this['error-callback']) {
          this['error-callback']();
        }
        break;
      case 'expired':
        if (this['expired-callback']) {
          this['expired-callback']();
        }
        break;
      default:
        break;
    }
  }

  constructor(options: { mode: MockGrecaptchaMode; addDelay?: boolean }) {
    this.mode = options.mode;
    this.addDelay = options.addDelay ?? false;
  }
}
