<?php
$post = get_queried_object()->post_name;

$post_type = str_contains($post, 'rticle') ? 'article' : $post_type;
$post_type = str_contains($post, 'nime') ? 'anime' : $post_type;
$query = ['post_type' => $post_type];
if (isset($_GET['filter'])) {
  $filter = $_GET['filter'];
  if ($filter == 'view_count') {
    $query = [
      'post_type' => $post_type,
      'meta_key' => 'view_count',
      'orderby' => 'meta_value_num'
    ];
  }
  if ($filter == 'asc') {
    $query = [
      'post_type' => $post_type,
      'order' => 'asc'
    ];
  }
  if ($filter == 'desc') {
    $query = [
      'post_type' => $post_type,
      'order' => 'desc'
    ];
  }
  if ($filter == 'date') {
    $query = [
      'post_type' => $post_type,
      'orderby' => 'date',
      'order' => 'desc'
    ];
  }
}
?>
<?php get_header() ?>
<main class="container">
  <section class="posts">
    <h1><?= get_queried_object()->post_title ?></h1>
    <div class="cards">
      <?php
      $query = new WP_Query($query);
      if ($post_type == 'anime') : ?>
        <section class="filter_field">
          <select id="filter" onchange="change(this)">
            <option disabled selected>Filter:</option>
            <option value="view_count">View Count</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="date">Date</option>
          </select>
          <select id="season" onchange="change(this)">
            <option disabled selected>Season:</option>
            <option value="winter-2022">Winter 2022</option>
            <option value="summer-2022">Summer 2022</option>
            <option value="spring-2022">Spring 2022</option>
            <option value="fall-2022">Fall 2022</option>
            <option value="winter-2023">Winter 2023</option>
          </select>
          <select id="genre" onchange="change(this)">
            <option disabled selected>Genre:</option>
            <option value="winter-2022">Winter 2022</option>
            <option value="summer-2022">Summer 2022</option>
            <option value="spring-2022">Spring 2022</option>
            <option value="fall-2022">Fall 2022</option>
            <option value="winter-2023">Winter 2023</option>
          </select>
        </section>

        <?php
      endif;
      if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post()
        ?>
          <div class="card">
            <div class="card-thumbnail" style="background: url('<?= get_the_post_thumbnail_url() ?>');background-size:cover;"></div>
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
<script>
  const change = (event) => {
    location.href = location.origin + location.pathname + `?filter=${event.value}`
  }
</script>