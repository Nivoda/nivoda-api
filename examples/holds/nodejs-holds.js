let fetch = require("node-fetch"); // using node-fetch in this example

// You can call the GraphQL with all common request libraries such as:
let libraries = {
  fetch: "https://www.npmjs.com/package/node-fetch",
  axios: "https://www.npmjs.com/package/axios",
};

// Great documentation can be found here:
// https://graphql.org/graphql-js/graphql-clients/

// authentication query
let authenticate_query = `{
  authenticate { 
    username_and_password(username: "yourusername", password: "yourpassword") {
      token
    }
  }
}
`;

(async function () {
  let authenticate_result = await fetch(
    "http://wdc-intg-customer-staging.herokuapp.com/api/diamonds",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: authenticate_query }),
    }
  );
  let res = await authenticate_result.json();

  // the authentication token to get in future requests
  let { token } = res.data.authenticate.username_and_password;

  /*
    To create a hold, 
    pass in the product ID (the ID of the Diamond) and the ProductType (Diamond)
  */

  // example create hold call
  let hold_mutation = `
    mutation {
      create_hold(
        ProductId: "32cd4f24-4b24-4c13-9f5e-8d561aed3978", 
        ProductType: Diamond
      ) {
        id
      }
    }
  `;

  let result = await fetch(
    "http://wdc-intg-customer-staging.herokuapp.com/api/diamonds",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: order_mutation }),
    }
  );

  let hold_res = await result.json();
  let { id, denied, until } = order_res.data.create_hold;

  // id is the ID of the hold request which can you use to confirm or release the hold later
  console.log({ id, denied, until });
})();
