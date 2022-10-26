<?php get_header() ?>
<?php
?>
<main class="container">
  <section class="single-post" style="background: url('<?= get_the_post_thumbnail_url() ?>');"></section>
  <section class="single-post-content">
    <h1><?= the_title() ?> <span class="view_count">View Count: <?php $view = the_field('view_count');
                                                                update_field(
                                                                  'view_couint',
                                                                  $view
                                                                ) ?></span></h1>
    <p><?= the_content() ?></p>
    <p class="date"><?= the_date() ?></p>
  </section>
  <?= do_shortcode('[anime-gallery id="anime-gallery" ]'); ?>
</main>
<?php get_footer() ?>