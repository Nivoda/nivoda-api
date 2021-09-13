<?
$url = 'http://wdc-intg-customer-staging.herokuapp.com/api/diamonds';

// authenticate request

$authenticate = '{authenticate{username_and_password(username:"yourusername",password:"yourpassword"){token}}}';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS, $authenticate);
curl_setopt($ch, CURLOPT_POST, 1);

$headers = array();
$headers[] = 'Content-Type: application/json';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);

curl_close($ch);

$json = json_decode($result, true);
$token = $json['data']['username_and_password']['token'];

// query request

$query = "query {
  diamonds_by_query(
    query: {
      labgrown: false,
      shapes: ['ROUND'],
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
";

$ch_query = curl_init();
curl_setopt($ch_query, CURLOPT_URL, $url);
curl_setopt($ch_query, CURLOPT_RETURNTRANSFER, 0);
curl_setopt($ch_query, CURLOPT_POSTFIELDS, $query);
curl_setopt($ch_query, CURLOPT_POST, 1);

$headers_query = array();
$headers_query['Content-Type'] = 'application/json';
$headers_query['Authorization'] = "Bearer $token";
curl_setopt($ch_query, CURLOPT_HTTPHEADER, $headers_query);

$result_query = curl_exec($ch_query);

curl_close($ch_query);

$json = json_decode($result_query, true);
$results = $json['data']['diamonds_by_query'];

var_dump($results['items']);
echo $results['total_count'];
?>
