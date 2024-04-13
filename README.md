## Build

There is a volta config in the `package.json` pinning the npm version and node version.

```
$ yarn --immutable
$ yarn run build
```

## Run

You need an open AI API token for this.

```
$ AI_API_KEY=<your token> AI_MODEL=gpt-3.5-turbo yarn run start
```
