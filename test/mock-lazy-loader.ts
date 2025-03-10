/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BundleType,
  LazyLoaderServiceEvents,
  LazyLoaderServiceInterface,
} from '@internetarchive/lazy-loader-service';
import { Unsubscribe } from 'nanoevents';
import { MockGrecaptcha } from './mock-grecaptcha';

export class MockLazyLoaderService implements LazyLoaderServiceInterface {
  loadScriptSrc?: string;

  on<E extends keyof LazyLoaderServiceEvents>(
    event: E,
    callback: LazyLoaderServiceEvents[E],
  ): Unsubscribe {
    throw new Error('Method not implemented.');
  }

  async loadBundle(bundle: {
    module?: string;
    nomodule?: string;
  }): Promise<void> {
    console.debug('loadBundle', bundle);
  }

  async loadScript(options: {
    src: string;
    bundleType?: BundleType;
    attributes?: Record<string, string>;
  }): Promise<void> {
    this.loadScriptSrc = options.src;
    window.grecaptcha = new MockGrecaptcha({
      mode: 'success',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).grecaptchaLoadedCallback();
  }
}
