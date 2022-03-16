/**
 * This encompasses a widget for a given site key.
 */
export interface RecaptchaWidgetInterface {
  /** execute the recaptcha request and returns a token */
  execute(): Promise<string>;
}

/**
 * This encompasses a widget for a given site key.
 */
export class RecaptchaWidget implements RecaptchaWidgetInterface {
  private executionSuccessBlock?: (token: string) => void;

  private executionExpiredBlock?: () => void;

  private executionErrorBlock?: () => void;

  private grecaptchaLibrary: ReCaptchaV2.ReCaptcha;

  private siteKey: string;

  private widgetId: number | null = null;

  private isExecuting = false;

  constructor(
    config: {
      siteKey: string;
      grecaptchaLibrary: ReCaptchaV2.ReCaptcha;
    },
    recaptchaParams?: ReCaptchaV2.Parameters
  ) {
    this.siteKey = config.siteKey;
    this.grecaptchaLibrary = config.grecaptchaLibrary;

    const container = this.createContainer();
    this.setup(container, recaptchaParams);
  }

  /** @inheritdoc */
  async execute(): Promise<string> {
    const { widgetId } = this;

    if (widgetId === null) {
      throw new Error('Recaptcha is not setup');
    }

    if (this.isExecuting) {
      // there is no way to know when users have dismissed a previous recaptcha
      // so if we're still in the middle of execution when we call execute again,
      // just reset it and execute it again
      this.finishExecution();
    }

    return new Promise((resolve, reject) => {
      this.executionSuccessBlock = (token: string): void => {
        this.finishExecution();
        resolve(token);
      };

      this.executionExpiredBlock = (): void => {
        this.finishExecution();
        reject(new Error('expired'));
      };

      this.executionErrorBlock = (): void => {
        this.finishExecution();
        reject(new Error('error'));
      };

      this.grecaptchaLibrary.execute(widgetId);
    });
  }

  private finishExecution() {
    this.isExecuting = false;
    const { widgetId } = this;
    if (widgetId === null) return;
    this.grecaptchaLibrary.reset(widgetId);
  }

  /** @inheritdoc */
  private setup(
    container: HTMLElement,
    recaptchaParams?: ReCaptchaV2.Parameters
  ): void {
    this.widgetId = this.grecaptchaLibrary.render(container, {
      callback: this.responseHandler.bind(this),
      'expired-callback': this.expiredHandler.bind(this),
      'error-callback': this.errorHandler.bind(this),
      sitekey: this.siteKey,
      tabindex: recaptchaParams?.tabindex,
      theme: recaptchaParams?.theme,
      type: recaptchaParams?.type,
      size: recaptchaParams?.size ?? 'invisible',
    });
  }

  private createContainer(): HTMLElement {
    const elementId = `recaptchaManager-${this.siteKey}`;
    let element: HTMLElement | null = document.getElementById(elementId);
    if (!element) {
      element = document.createElement('div');
      element.id = elementId;
      element.style.position = 'fixed';
      element.style.top = '50%';
      element.style.left = '50%';
      document.body.appendChild(element);
    }
    return element;
  }

  private responseHandler(response: any): void {
    if (this.executionSuccessBlock) {
      this.executionSuccessBlock(response);
      this.executionSuccessBlock = undefined;
    }
  }

  private expiredHandler(): void {
    if (this.executionExpiredBlock) {
      this.executionExpiredBlock();
      this.executionExpiredBlock = undefined;
    }
  }

  private errorHandler(): void {
    if (this.executionErrorBlock) {
      this.executionErrorBlock();
      this.executionErrorBlock = undefined;
    }
  }
}
