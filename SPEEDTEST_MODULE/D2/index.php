<?php

$dataFile = file_get_contents(realpath('result.json'));
$data = json_decode($dataFile);
$all = [];
$allStr = [];
foreach ($data->messages as $message) {
  if (!isset($all[$message->text])) $all[$message->text] = 1;
  else $all[$message->text] += 1;
}
arsort($all);
$total = sizeof($all);
$top5 = array_splice($all, 0, 5);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <ul>
    <li>Top 5 sent words: <ul>
        <?php foreach ($top5 as $word => $count) : ?>
          <li><?= $word ?></li>
        <?php endforeach; ?>
      </ul>
    </li>
    <li>Total Message sent: <?= $total ?></li>
    <li></li>
  </ul>
</body>

</html>