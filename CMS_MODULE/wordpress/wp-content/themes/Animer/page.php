<?php get_header() ?>
<main class="container">
  <section class="posts">
    <h1><?= get_queried_object()->post_title ?></h1>
    <div class="cards">
      <?php
      $post = get_queried_object()->post_name;

      $post_type = str_contains($post, 'rticle') ? 'article' : $post_type;
      $post_type = str_contains($post, 'nime') ? 'anime' : $post_type;
      $query = new WP_Query(['post_type' => $post_type]);
      if($post_type == 'anime'):?>
        <select name="filter" >
          <option disabled>Filter:</option>
          
        </select>
      <?php
      endif;
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
  </section>
</main>
<?php get_footer() ?>