import { expect } from '@open-wc/testing';
import { MockGrecaptcha } from './mock-grecaptcha';
import { RecaptchaManager } from '../src/recaptcha-manager';
import { MockLazyLoaderService } from './mock-lazy-loader';

const mockLazyLoader = new MockLazyLoaderService();

describe('ReCaptcha Management', () => {
  describe('ReCaptcha Manager', () => {
    it('can return recaptchas', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
      });
      mockGrecaptcha.response = 'foo';
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();
      const result = await recaptcha.execute();
      expect(result).to.equal('foo');
    });

    it('throws an error if no site key found', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
      });
      mockGrecaptcha.response = 'foo';
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
      });
      try {
        await recaptchaManager.getRecaptchaWidget();
        expect.fail('should not get here');
      } catch (e) {
        expect((e as Error).message).to.equal(
          'RecaptchaManager requires a site key'
        );
      }
    });

    it('returns a cached version if one already exists for a given site key', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
      });
      mockGrecaptcha.response = 'foo';
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha1 = await recaptchaManager.getRecaptchaWidget();
      const recaptcha2 = await recaptchaManager.getRecaptchaWidget();
      expect(recaptcha1).to.equal(recaptcha2);
    });

    it('loads the recaptcha library if needed', async () => {
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        defaultSiteKey: '123',
      });
      await recaptchaManager.getRecaptchaWidget();
      const loadUrl = mockLazyLoader.loadScriptSrc;
      expect(
        loadUrl?.includes('recaptcha/api.js?onload=grecaptchaLoadedCallback')
      ).to.be.true;
    });
  });

  describe('ReCaptcha Widget', () => {
    it('can error properly like a Promise', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'error',
      });
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();

      try {
        await recaptcha.execute();
        expect.fail('should not get here');
      } catch (error) {
        expect((error as Error).message).to.equal('error');
      }
    });

    it('can expire properly like a Promise', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'expired',
      });
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();

      try {
        await recaptcha.execute();
        expect.fail('should not get here');
      } catch (error) {
        expect((error as Error).message).to.equal('expired');
      }
    });

    it('resets the captcha after execution', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
        addDelay: true,
      });
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();

      expect(mockGrecaptcha.resetCallCount).to.equal(0);
      await recaptcha.execute();
      expect(mockGrecaptcha.resetCallCount).to.equal(1);
      await recaptcha.execute();
      expect(mockGrecaptcha.resetCallCount).to.equal(2);
    });

    // there's no way to know if the user has dismissed the captcha so if another execution
    // comes through while the captcha is still active, it will be reset
    it('resets the captcha if another execution gets called', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
        addDelay: true,
      });
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();

      expect(mockGrecaptcha.resetCallCount).to.equal(0);
      recaptcha.execute();
      expect(mockGrecaptcha.resetCallCount).to.equal(0);
      await recaptcha.execute();
      expect(mockGrecaptcha.resetCallCount).to.equal(2);
    });
  });
});
