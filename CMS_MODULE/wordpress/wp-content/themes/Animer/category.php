<?php get_header() ?>
<main class="container">
  <h1><?= get_queried_object()->name ?></h1>
  <div class="cards">
    <?php
    $query = new WP_Query(['post_type' => ['article', 'anime'], 'category_name' => get_queried_object()->slug]);
    if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post()
    ?>
        <div class="card">
          <div class="card-thumbnail" style="background: url('<?= get_the_post_thumbnail_url() ?>');"></div>
          <div class="card-content">
            <div class="card-text">
              <h1><?= the_title() ?></h1>
              <p><?= the_excerpt() ?></p>
            </div>
            <div class="card-button">
              <a href="<?= the_permalink() ?>">LearnMore</a>
            </div>
          </div>
        </div>
    <?php endwhile;
    endif; ?>
  </div>
</main>
<?php get_footer() ?>