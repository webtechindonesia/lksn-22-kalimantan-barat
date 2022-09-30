<?php 
$xml = '';
$json = '';
if($_POST['xml']){
    $xml = simplexml_load_string($_POST['xml']);
    $json = json_encode($xml,JSON_PRETTY_PRINT);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <form action="." method="POST">
        <div class="text-area">
            <textarea name="xml" id="xml" value="<?= $xml?>" cols="30" rows="10"></textarea>
            <textarea name="json" id="json" value="<?= $json?>"  cols="30" rows="10"></textarea>
        </div>
        <button class="convert-button">Conver</button>
    </form>
</body>
</html>