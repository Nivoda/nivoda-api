<?
$url = 'http://wdc-intg-customer-staging.herokuapp.com/api/diamonds';

// authenticate request

$authenticate = '{"query":"{authenticate{username_and_password(username:\"yourusername\",password:\"yourpassword\"){token}}}"}';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $authenticate);
curl_setopt($ch, CURLOPT_POST, 1);

$headers = array();
$headers[] = 'Content-Type: application/json';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);

curl_close($ch);

$json = json_decode($result, true);
$token = $json["data"]["authenticate"]["username_and_password"]["token"];

$query = '{"query":"query{diamonds_by_query(query:{labgrown:true}){total_count,items{id,price,diamond{video,certificate{certNumber}}}}}"}';

$headers_q = array();
$headers_q[] = 'Content-Type: application/json';
$headers_q[] = 'Authorization: Bearer '.$token;

$ch_query = curl_init();
curl_setopt($ch_query, CURLOPT_URL, $url);
curl_setopt($ch_query, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch_query, CURLOPT_POSTFIELDS, $query);
curl_setopt($ch_query, CURLOPT_POST, 1);
curl_setopt($ch_query, CURLOPT_HTTPHEADER, $headers_q);

$result_query = curl_exec($ch_query);

curl_close($ch_query);

$json = json_decode($result_query, true);
var_dump($json);
$results = $json["data"]["diamonds_by_query"];

var_dump($results['items']);
echo $results['total_count'];
?>
