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
});

add_action('admin_menu', function(){
  remove_menu_page('edit.php');
});
add_action('login_head', function () {
  echo "
  <style>
  #login h1{
    display:none;
  }
  </style>
  ";
});

add_shortcode('anime-gallery', function ($atts) {
  $atts = shortcode_atts([
    'id' => "PLACE-ID",
    'ani' => 'ani'
  ], $atts);
});

add_action('excerpt_length', function () {
  return rand(20, 30);
});
