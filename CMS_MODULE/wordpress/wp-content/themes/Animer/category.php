<?php
$query = [
  "post_type" => ['article', 'anime'],
  'category_name' => get_queried_object()->slug
];
if (isset($_GET['filter'])) {
  $filter = $_GET['filter'];
  if ($filter == 'view_count') {
    $query = [
      "post_type" => ['article', 'anime'],
      'category'=>get_queried_object()->slug,
      'meta_key' => 'view_count',
      'orderby' => 'meta_value_num'
    ];
  }
  if ($filter == 'asc') {
    $query = [
      "post_type" => ['article', 'anime'],
      'category'=>get_queried_object()->slug,
      'order' => 'asc'
    ];
  }
  if ($filter == 'desc') {
    $query = [
      "post_type" => ['article', 'anime'],
      'category'=>get_queried_object()->slug,
      'order' => 'desc'
    ];
  }
  if ($filter == 'date') {
    $query = [
      "post_type" => ['article', 'anime'],
      'category'=>get_queried_object()->slug,
      'orderby' => 'date',
      'order' => 'desc'
    ];
  }
}
?>
<?php get_header() ?>
<main class="container">
  <section class="posts">
    <h1><?= get_queried_object()->name ?></h1>
    <div class="cards">
      <?php
      $query = new WP_Query($query);
      if (get_queried_object()->category_parent == 3) : ?>
        <select name="filter" onchange="change(this)">
          <option disabled selected>Filter:</option>
          <option value="view_count">View Count</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="date">Date</option>
        </select>
        <?php
      endif;
      if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post()
        ?>
          <div class="card">
            <div class="card-thumbnail" style="background: url('<?= get_the_post_thumbnail_url() ?>');"></div>
            <div class="card-content">
              <div class="card-text">
                <h1><?= the_title() ?> <span class="view_count">View Count: <?= the_field('view_count') ?></span></h1>
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
<script>
  const change = (event) => {
    location.href = location.origin + location.pathname + `?filter=${event.value}`
  }
</script>