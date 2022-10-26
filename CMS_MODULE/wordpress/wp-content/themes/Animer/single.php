<?php get_header() ?>
<main class="container">
  <section class="single-post" style="background: url('<?= get_the_post_thumbnail_url() ?>');"></section>
  <section class="single-post-content">
    <h1><?= the_title() ?></h1>
    <p><?= the_content() ?></p>
  </section>
  <?php
  echo do_shortcode('[anime-gallery id="anime-gallery"]'); ?>
</main>
<?php get_footer() ?>