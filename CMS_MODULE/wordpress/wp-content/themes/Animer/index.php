<?php get_header() ?>
<main class="container">
  <section class="banner" style="background: url('<?= DIR ?>/assets/spyfamily-2.jpg'); background-size:cover;">
    <div class="banner-overlay"></div>
    <div class="banner-content">
      <div class="banner-text">
        <h1 class="banner-title">Let's watch anime and heal ourselves</h1>
        <p class="banner-slogan">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisl arcu, viverra non luctus nec, dictum sed nisl. Integer porta turpis sed condimentum pretium.</p>
      </div>
      <div class="banner-thumbnail" style="background: url('<?= DIR ?>/assets/spyfamily-1.jpg'); background-repeat:no-repeat;"></div>
    </div>
  </section>
  <section class="posts">
    <h1>Recommendation</h1>
    <div class="cards">
      <?php
      $query = new WP_Query(['post_type' => 'anime']);
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
  <section class="posts">
    <h1>Recent Update</h1>
    <div class="cards">
      <?php
      $query = new WP_Query(['post_type' => "article"]);
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