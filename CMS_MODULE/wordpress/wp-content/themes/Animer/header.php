<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php bloginfo('title') ?></title>
  <link rel="stylesheet" href="<?= DIR ?>/style.css">
  <?php wp_head() ?>
</head>
<body <?php body_class() ?>>
  <nav class="nav">
    <?php wp_nav_menu() ?>
  </nav>
  <span id="top"></span>