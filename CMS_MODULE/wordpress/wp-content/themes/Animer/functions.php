<?php
define("DIR", get_stylesheet_directory_uri());
update_user_meta(get_current_user_id(), 'show_welcome_panel', 0);
add_action('wp_dashboard_setup', function () {
  remove_meta_box('dashboard_primary', 'dashboard', 'side');
  remove_meta_box('dashboard_site_health', 'dashboard', 'normal');
  remove_meta_box('wpseo-dashboard-overview', 'dashboard', 'normal');
});

add_action('init', function () {
  register_post_type('article', [
    'label' => "Article",
    'supports' => ['thumbnail', 'title', 'author', 'editor'],
    'public' => true,
    'taxonomies' => ['category']
  ]);
  register_post_type('anime', [
    'label' => "Anime",
    'supports' => ['thumbnail', 'title', 'author', 'editor'],
    'public' => true,
    'taxonomies' => ['category']
  ]);

  add_option('ratings', []);
});

add_action('admin_menu', function () {
  remove_menu_page('edit.php');
});
add_action('login_head', function () {
  echo "
  <style>
  #login h1{
    display:none;
  }
  body{
    background:url(" . DIR . "/assets/black-summoner-2.jpg);
    background-size:cover;
  }
  </style>
  ";
});

add_shortcode('anime-gallery', function ($atts) {
  $atts = shortcode_atts([
    'id' => "PLACE-ID",
    'ani' => 'ani'
  ], $atts);

  $query = new WP_Query(['post_type' => 'anime', 'category_name' => esc_attr('ani')]);
?>
  <div id="<?= esc_attr('id') ?>" class="gallery">
    <?php if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post() ?>
        <div class="gallery-block" style="background: url('<?= get_the_post_thumbnail_url() ?>');"></div>
    <?php endwhile;
    endif; ?>
  </div>
<?php
});

add_action('excerpt_length', function () {
  return rand(20, 30);
});


add_action('admin_post_ratings', function () {
  $id = $_GET['page'];
  $rate = $_GET['rate'];

  $option = get_option('ratings');
  if (!isset($option[$id])) {
    $option[$id] = [];
  }
  array_push($option[$id], $rate);
  update_option('ratings', $option);
  wp_redirect(wp_get_referer());
});
