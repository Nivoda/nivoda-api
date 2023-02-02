# Nivoda GraphQL API

The Nivoda GraphQL API is a public API that can be used by verified Nivoda customers.
Below are the features, as well as code samples in the most common languages.

If you are not verified yet, please reach out to your account manager to sign the Nivoda Feed Agreement first.

No rights can be reserved to data in the API.

## Features

**Search diamonds**

The API contains the same query capabilities as the Nivoda platform and mobile apps.

**Images & Videos**

Videos and images are included where available.

## Pro Features

**Automate requests and orders**

If you are a Nivoda API Pro user, you have the option to place orders, holds, diamond requests and concierge requests through the API.

If you are interested in the Pro features, please reach out to your account manager.

# Getting Started

## Constants

**Staging**
Endpoint: https://wdc-intg-customer-staging.herokuapp.com
/api/diamonds

GraphiQL: https://wdc-intg-customer-staging.herokuapp.com
/api/diamonds-graphiql

The staging username and password are:
[on request]

**Production**
Endpoint: https://integrations.nivoda.net
/api/diamonds

GraphiQL: https://integrations.nivoda.net
/api/diamonds-graphiql

To access the GraphiQL endpoint page, enter the following username and password:

nivoda-api-docs <br />
nivoda-graphiql

Here you can browse the API queries and mutations visually, and write & test the code to run against the staging and production endpoints too.

## Moving to Production

Once you are ready to move to production, you can request your Account Manager / Technical Support and they will activate your production login. 

## General Concepts

The API will return only the fields you request. The available fields can be viewed in the GraphiQL explorer. 

For example, to get the size of a diamond, you can do:

```
diamond { 
  id
  certificate {
    id
    certNumber
    carats # this is the size
  }
}
```

Once you parse the JSON response this will be available to you through an object, i.e. `diamond.certificate.carats` for Node.

## Code Examples

Code examples can be found in the examples folder. The code examples contain the most commonly requested fields and filters.

- Generic GraphQL Examples
- Node.js Examples
- PHP Examples

Any questions? Please reach out to tech at nivoda.net.
