<?php get_header() ?>
<?php
$view = get_field('view_count');
$view += 1;
update_field('view_count', $view, get_the_ID());
?>
<main class="container">
  <section class="single-post" style="background: url('<?= get_the_post_thumbnail_url() ?>');background-size:cover;"></section>
  <section class="single-post-content">
    <h1><?= the_title() ?> <span class="view_count">View Count: <?= the_field('view_count') ?></span></h1>
    <p><?= the_content() ?></p>
    <section class="preview">
      <h3>Preview</h3>
      <?= the_field('embed') ?>
    </section>

    <p class="date">published date: <?= the_date() ?></p>
    <?php $options = get_option('ratings'); ?>
    <form method="post" class="rating_form" action="<?= admin_url('admin-post.php') ?>" class="ratings">
      <input type="hidden" name="action" value="ratings">
      <input type="hidden" name="page" value="<?= get_the_ID() ?>">
      <?php for ($i = 0; $i < 5; $i++) : ?>
        <a href="<?php
                  $id = get_the_ID();
                  echo admin_url('admin-post.php?action=ratings&page=' . $id . '&rate=' . $i) ?>">
          <img src="<?= DIR ?>/star.svg" alt="">
        </a>
      <?php endfor; ?>
    </form>
    <div class="ratings"><?php $option = get_option('ratings');
                          if (isset($option[get_the_ID()])) {
                            $all = sizeof($option[get_the_ID()]);
                            $sum = array_sum($option[get_the_ID()]);
                            $res = $sum / $all;
                            $text = substr($res, 0, 3);
                            echo "rate: $text";
                          } else echo "Not Rated Yet";
                          ?></div>
  </section>


  <?= do_shortcode('[anime-gallery id="anime-gallery" ]'); ?>
</main>
<?php get_footer() ?>