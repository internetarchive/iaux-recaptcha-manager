import {
  LazyLoaderService,
  LazyLoaderServiceInterface,
} from '@internetarchive/lazy-loader-service';

export interface RecaptchaManagerInterface {
  /**
   * Executes the recaptcha and returns a token
   *
   * Example:
   *
   * try {
   *   const recaptchaResult = await recaptchaManager.execute();
   *   console.log('recaptcha token:', recaptchaResult);
   * } catch {
   *   console.error('something happened')
   * }
   */
  execute(): Promise<string>;

  /**
   * Create the recaptcha widget.
   *
   * If the `container` is not passed in, one will be created.
   *
   * @param options
   */
  setup(options?: {
    container?: HTMLElement;
    tabIndex?: number;
    theme?: ReCaptchaV2.Theme;
    type?: ReCaptchaV2.Type;
    size?: ReCaptchaV2.Size;
  }): void;
}

export class RecaptchaManager implements RecaptchaManagerInterface {
  /**
   * This is a convenience initializer that also lazily loads
   * the recaptcha library from Google.
   *
   * @param options
   * @returns
   */
  static async getRecaptchaManager(
    siteKey: string,
    options?: {
      lazyLoader?: LazyLoaderServiceInterface;
      tabIndex?: number;
      theme?: ReCaptchaV2.Theme;
      type?: ReCaptchaV2.Type;
      size?: ReCaptchaV2.Size;
    }
  ): Promise<RecaptchaManagerInterface> {
    const grecaptchaLibrary = await RecaptchaManager.loadRecaptchaLibrary({
      lazyLoader: options?.lazyLoader,
    });

    const manager = new RecaptchaManager({
      grecaptchaLibrary,
      siteKey,
    });

    manager.setup({
      tabIndex: options?.tabIndex,
      theme: options?.theme,
      type: options?.type,
      size: options?.size,
    });

    return manager;
  }

  /**
   * Load the Recaptch library from Google.
   *
   * @param options
   * @returns
   */
  static async loadRecaptchaLibrary(options?: {
    lazyLoader?: LazyLoaderServiceInterface;
  }): Promise<ReCaptchaV2.ReCaptcha> {
    const service = options?.lazyLoader ?? new LazyLoaderService();

    return new Promise(resolve => {
      (window as any).grecaptchaLoadedCallback = (): void => {
        setTimeout(() => {
          // remove the callback when we're done with it
          delete (window as any).grecaptchaLoadedCallback;
        }, 10);
        resolve(window.grecaptcha);
      };

      service.loadScript({
        src: 'https://www.google.com/recaptcha/api.js?onload=grecaptchaLoadedCallback&render=explicit',
      });
    });
  }

  private grecaptchaLibrary: ReCaptchaV2.ReCaptcha;

  private siteKey: string;

  constructor(options: {
    grecaptchaLibrary: ReCaptchaV2.ReCaptcha;
    siteKey: string;
  }) {
    this.grecaptchaLibrary = options.grecaptchaLibrary;
    this.siteKey = options.siteKey;
  }

  private executionSuccessBlock?: (token: string) => void;

  private executionExpiredBlock?: () => void;

  private executionErrorBlock?: () => void;

  private isExecuting = false;

  private containerElement: HTMLElement | null = null;

  /** @inheritdoc */
  execute(): Promise<string> {
    if (this.isExecuting) {
      throw new Error('Recaptcha is already executing');
    }

    this.isExecuting = true;
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

      this.grecaptchaLibrary.execute();
    });
  }

  /** @inheritdoc */
  setup(options?: {
    container?: HTMLElement;
    tabIndex?: number;
    theme?: ReCaptchaV2.Theme;
    type?: ReCaptchaV2.Type;
    size?: ReCaptchaV2.Size;
  }): void {
    const container = options?.container ?? this.createContainer();

    // we've already rendered this container, don't do it again
    if (container === this.containerElement) return;

    this.containerElement = container;
    this.grecaptchaLibrary.render(container, {
      callback: this.responseHandler.bind(this),
      'expired-callback': this.expiredHandler.bind(this),
      'error-callback': this.errorHandler.bind(this),
      sitekey: this.siteKey,
      tabindex: options?.tabIndex,
      theme: options?.theme,
      type: options?.type,
      size: options?.size ?? 'invisible',
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
      // #recaptcha - TopCollections {
      //   position: fixed;
      //   top: 50 %;
      //   left: 50 %;
      // }

      document.body.insertBefore(element, document.body.firstChild);
    }
    return element;
  }

  private finishExecution(): void {
    this.isExecuting = false;
    this.grecaptchaLibrary.reset();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
