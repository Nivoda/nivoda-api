let fetch = require('node-fetch'); // using node-fetch in this example

// You can call the GraphQL with all common request libraries such as:
let libraries = {
  fetch: 'https://www.npmjs.com/package/node-fetch',
  axios: 'https://www.npmjs.com/package/axios'
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

(async function() {
  let authenticate_result = await fetch('http://wdc-intg-customer-staging.herokuapp.com/api/diamonds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: authenticate_query }),
  });
  let res = await authenticate_result.json();
  
  // the authentication token to get in future requests
  let { token } = res.data.authenticate.username_and_password;

  // example diamond query
  let diamond_query = `
    query {
      diamonds_by_query(
        query: {
          labgrown: false,
          shapes: ["ROUND"],
          sizes: [{ from: 1, to: 1.5}],
          has_v360: true,
          has_image: true,
        },
        offset: 0,
        limit: 50, 
        order: { type: price, direction: ASC }
      ) {
        items {
          id
          diamond {
            id
            video
            image
            availability
            certificate {
              id
              shape
              certNumber
              cut
            }
          }
          price
          discount
        }
        total_count
      }
    }
  `;

  let result = await fetch('http://wdc-intg-customer-staging.herokuapp.com/api/diamonds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query: diamond_query }),
  });

  let diamond_res = await result.json();
  let { items, total_count } = diamond_res.data.diamonds_by_query;

  console.log({ items, total_count });
})();
