import {
  LazyLoaderService,
  LazyLoaderServiceInterface,
} from '@internetarchive/lazy-loader-service';
import { RecaptchaWidget } from './recaptcha-widget';

export interface RecaptchaManagerInterface {
  /**
   * Load a recaptcha widget for a given site key or the default site key.
   */
  getRecaptchaWidget(options?: {
    siteKey?: string;
    recaptchaParams?: ReCaptchaV2.Parameters;
  }): Promise<RecaptchaWidget>;
}

export class RecaptchaManager implements RecaptchaManagerInterface {
  private lazyLoader: LazyLoaderServiceInterface;

  private defaultSiteKey?: string;

  private recaptchaCache: Record<string, RecaptchaWidget> = {};

  constructor(options?: {
    defaultSiteKey?: string;
    lazyLoader?: LazyLoaderServiceInterface;
    grecaptchaLibrary?: ReCaptchaV2.ReCaptcha; // allows dependency injection or will be lazy loaded
  }) {
    this.defaultSiteKey = options?.defaultSiteKey;
    this.lazyLoader = options?.lazyLoader ?? new LazyLoaderService();
    this.grecaptchaLibraryCache = options?.grecaptchaLibrary;
  }

  /** @inheritdoc */
  async getRecaptchaWidget(options?: {
    siteKey?: string;
    recaptchaParams?: ReCaptchaV2.Parameters;
  }): Promise<RecaptchaWidget> {
    const key = options?.siteKey ?? this.defaultSiteKey;
    if (!key) {
      throw new Error('Recaptcha widget requires a site key');
    }

    const cached = this.recaptchaCache[key];
    if (cached) return cached;

    const grecaptchaLibrary = await this.getRecaptchaLibrary();
    const recaptcha = new RecaptchaWidget(
      {
        siteKey: key,
        grecaptchaLibrary,
      },
      options?.recaptchaParams
    );

    this.recaptchaCache[key] = recaptcha;
    return recaptcha;
  }

  /**
   * Load the Recaptch library from Google.
   *
   * @returns Promise<ReCaptchaV2.ReCaptcha>
   */
  private async getRecaptchaLibrary(): Promise<ReCaptchaV2.ReCaptcha> {
    if (this.grecaptchaLibraryCache) {
      return this.grecaptchaLibraryCache;
    }
    return new Promise(resolve => {
      (window as any).grecaptchaLoadedCallback = (): void => {
        setTimeout(() => {
          // remove the callback when we're done with it
          delete (window as any).grecaptchaLoadedCallback;
        }, 10);
        this.grecaptchaLibraryCache = window.grecaptcha;
        resolve(window.grecaptcha);
      };

      this.lazyLoader.loadScript({
        src: 'https://www.google.com/recaptcha/api.js?onload=grecaptchaLoadedCallback&render=explicit',
      });
    });
  }

  /** don't use directly, use `getRecaptchaLibrary()` */
  private grecaptchaLibraryCache?: ReCaptchaV2.ReCaptcha;
}
