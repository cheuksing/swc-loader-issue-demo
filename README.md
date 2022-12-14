# Intro

In `.swcrc`, baseUrl is set to `wrong` directory, which does not exist.

In `webpack.config.js`, baseUrl is set to in swc-loader as below,

```js
{
  loader: require.resolve("swc-loader"),
  options: {
    jsc: {
      baseUrl: "src",
      paths: {
        "@services/*": ["services/*"],
        "@i18n": ["i18n"],
      },
    },
  },
}
```

## Expected result

- Success to start webpack server with `dev:webpack`.
- Faild to build with `build:swc`.
- `build:swc` will be successful if `baseUrl` set to `src` in `.swcrc`

## Actual result

- Unable to override `baseUrl` in webpack's `swc-loader`
