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
    To create orders, you need to pass in the "offer id" of the item(s) you want to purchase
    You will get these from the Diamond search response

    It's made up of the ProductType and then the ProductId: DIAMOND/id

    An example offer id: DIAMOND/32cd4f24-4b24-4c13-9f5e-8d561aed3978

    Note on the return option: this is only available for stones that are returnable. 
    If you pass true on an item that is not returnable, it will change to false. 

    The only required parameter is offerId

    Everything else is optional
  */

  // example create order call
  let order_mutation = `
    mutation {
      create_order(
        items: [
            {
                offerId: "DIAMOND/32cd4f24-4b24-4c13-9f5e-8d561aed3978", 
                customer_comment: "The comment you want to add to the order",
                customer_order_number: "Internal reference - shows up on dashboard & invoice",
                return_option: true, 
                destinationId: ID
            }
        ]
      )
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

  let order_res = await result.json();
  let response = order_res.data.create_order;

  console.log({ response });
})();
