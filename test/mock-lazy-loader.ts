/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BundleType,
  LazyLoaderServiceEvents,
  LazyLoaderServiceInterface,
} from '@internetarchive/lazy-loader-service';
import { Unsubscribe } from 'nanoevents';

export class MockLazyLoaderService implements LazyLoaderServiceInterface {
  on<E extends keyof LazyLoaderServiceEvents>(
    event: E,
    callback: LazyLoaderServiceEvents[E]
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
    console.debug('loadScript', options);
  }
}
