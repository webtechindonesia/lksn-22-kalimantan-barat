<?php

/**
 * Plugin Name: Footer Icons
 */

add_action('init', function () {
  $path = plugin_dir_url(__FILE__);
  add_option('footer-icons', [
    'facebook' => [
      'show' => '1',
      'link' => '#',
      'icon' => "$path/svg/facebook.svg"
    ],
    'instagram' => [
      'show' => '1',
      'link' => '#',
      'icon' => "$path/svg/instagram.svg"
    ],
    'twitter' => [
      'show' => '1',
      'link' => '#',
      'icon' => "$path/svg/twitter.svg"
    ],
  ]);
});

add_action('admin_menu', function () {
  add_menu_page('Social Icons', 'Social Icons', 'manage_options', 'social-icons', function () {
    $option = get_option('footer-icons'); ?>
    <div class="wrapper">
      <form action="<?= admin_url('admin-post.php') ?>" method="post">
        <input type="hidden" name="action" value="footer_icons">
        <table class="widefat">
          <thead>
            <tr>
              <td>Social</td>
              <td>Show/Hide</td>
              <td>Link</td>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($option as $social_name => $item) : ?>
              <tr>
                <td><?= $social_name ?></td>
                <td>
                  <input type="radio" name="option[<?= $social_name ?>][show]" value="1" <?= $item['show'] == "1" ? 'checked' : '' ?>>
                  <input type="radio" name="option[<?= $social_name ?>][show]" value="0" <?= $item['show'] == "0" ? 'checked' : '' ?>>
                </td>
                <td>
                  <input type="text" name="option[<?= $social_name ?>][link]" value="<?= $item['link'] ?>">
                  <input type="hidden" name="option[<?= $social_name ?>][icon]" value="<?= $item['icon'] ?>">
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
        <button type="submit" class="button button-primary">Save</button>
      </form>
    </div>
  <?php
  });
});

add_action('admin_post_footer_icons', function () {
  update_option('footer-icons', $_POST['option']);
  wp_redirect(wp_get_referer());
});

add_action('wp_footer', function () {
  $option = get_option('footer-icons'); ?>
  <div class="social-icons">
    <?php foreach ($option as $social_name => $item) : if ($item['show']) : ?>
        <a href="<?= $item['link'] ?>">
          <img src="<?= $item['icon'] ?>" alt="">
        </a>
    <?php endif;
    endforeach; ?>
  </div>
<?php
});
