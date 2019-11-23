# verdaccio-gitea-auth

It's an [authentication plugin for Verdaccio](https://verdaccio.org/docs/en/plugins) private node module registry that checks your [Gitea](https://gitea.io) private git server for user authentication.

## Table of Contents

+ [Install](#install)
+ [Configuration](#configuration)
+ [Development](#development)
+ [Production](#production)

## Install

Get it from the private verdaccio npm:

```sh
npm install --global verdaccio verdaccio-gitea-auth
```

## Configuration

In your verdaccio config file YAML:

```yaml
auth:
  gitea-auth:
    url: https://url-to-your-gitea-server
    defaultOrg: gitea
```

`gitea-auth.url` is not the api to the URl but just the server itself. Underneath we're concatenating `/api/v1/user/orgs`. If no orgs are in the list it defaults to `["gitea"]`.

The groups correspond to verdaccio groups that restrict access to scopes. <https://verdaccio.org/docs/en/authentification#understanding-groups>

We don't have user feedback how this is used in the wild so if you have a specific need please file an issue and we'll help you figure it out.

Want to generate an auth token?

```sh
npm login --registry=https://url-to-your-verdaccio-server:1234
```

## Development

Copy the sample config and set the Gitea config.

```sh
cp test/verdaccio-config-example.yml test/verdaccio.yml
```

Run development tasks

```sh
npm run dev
```

+ <https://verdaccio.org/docs/en/authentification>
+ Scoped packages <https://verdaccio.org/docs/en/packages>
+ Types of plugins <https://verdaccio.org/docs/en/plugins>
+ Gitea swagger doc <https://try.gitea.io/api/swagger>

## Production

Create the production build

```sh
npm run prd
```
