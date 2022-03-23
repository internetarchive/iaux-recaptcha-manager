![Build Status](https://github.com/internetarchive/iaux-recaptcha-manager/actions/workflows/ci.yml/badge.svg)

# Internet Archive reCaptcha Manager

A library to lazy load and interact with reCaptcha

## Installation

```shell
> yarn add @internetarchive/recaptcha-manager
```

## Usage

```ts
const recaptchaManager = new RecaptchaManager({
  defaultSiteKey: 'your-site-key',
});

// will load recaptcha library if it's not loaded
const recaptchaWidget = await recaptchaManager.getRecaptchaWidget({
  recaptchaParams: {
    tabindex: 0,
    theme: 'light',
    type: 'image',
  },
});

const token = await recaptchaWidget.execute();

// submit token with your post and validate on the backend
```

For more usage examples, see `demo/app-root.ts` and `test/recaptcha-manager.test.ts`.

## Local Demo with `web-dev-server`
```bash
yarn start
```
To run a local development server that serves the basic demo located in `demo/index.html`

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
yarn run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
yarn run test:watch
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
yarn run lint
```

You can lint with ESLint and Prettier individually as well
```bash
yarn run lint:eslint
```
```bash
yarn run lint:prettier
```

To automatically fix many linting errors, run
```bash
yarn run format
```

You can format using ESLint and Prettier individually as well
```bash
yarn run format:eslint
```
```bash
yarn run format:prettier
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
