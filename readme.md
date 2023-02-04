# redirectgen

> CLI tool for generating static URL shortener HTML documents from a yaml data source

redirectgen creates a static folder of HTML documents that serve as URL shorteners. It creates a (potentially deeply nested)
folder for every shortened URL configuration with an `index.html` file which contains an HTML redirect. It can also
be configured to contain a countapi call as well to track the amount of redirects.

## How to use

Install globally via

    npm install -g redirectgen

or directly use via

    npx redirectgen

You need a yaml configuration file that contains your links:

```yaml
links:
  example:
    url: https://lukasbach.com
  with-count-api:
    url: https://lukasbach.com
    countapi: adfsafdsafd
  my/deeply/nested/link:
    url: https://lukasbach.com
    countapi: adfsafdsafd
```

Usage:

    Usage: redirectgen [options]
    
    Options:
    -V, --version        output the version number
    -o, --output <path>  path to output
    -c, --config <path>  path to config yaml file
    -h, --help           display help for command

For example:

    npx redirectgen -c ./link-config.yaml -o ./output

## How to develop

- `yarn` to install dependencies
- `yarn start` to run in dev mode
- `yarn test` to run tests
- `yarn lint` to test and fix linter errors

To publish a new version, the publish pipeline can be manually
invoked.
