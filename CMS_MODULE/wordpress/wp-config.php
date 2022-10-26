<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'animer_database' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ']=Fl<:*6vR)HODm_w{g>Zei_e[ss~ZD 7-S-><bc!}(uO7e8F;]#VbjX]Og7GY#8' );
define( 'SECURE_AUTH_KEY',  'o~``8xR#;:zZ/N&mprPF]nOGCiqewb)C}-s<e4P9D+`1=f7xZOHpqIZh7wS1Ee[A' );
define( 'LOGGED_IN_KEY',    'zS`}Ab|W}h>p~ns)KCN_SjH7|8xS/Vi*B)?:cv[D&EP4yvNR$jfW*Vj|LL0q{(Ay' );
define( 'NONCE_KEY',        'jyXq4YIXk,)2np]AvVB<]biH9QN2l)Tw~DxCfL~r?Pl`Bpyl;-=PNO~-gJhYQ+Fr' );
define( 'AUTH_SALT',        '0UH@R_>O fz{V69WoB8}vciHyz|:_3?1!kWP;tt*f>U2w=@*bkJQI`oy_,uXs9=w' );
define( 'SECURE_AUTH_SALT', '?C4t=w]nyU#F $4{h).RSfPN[N{1g]tnjiS4*wGY.7!wyv1~l&F(0|dEh6$xbP^@' );
define( 'LOGGED_IN_SALT',   'uBrN9,3.Do6yp6=c+#WIqud?eB0~<R4=[me^hkt#Q}(ITI%3r$GJ`= P5hhyD/CK' );
define( 'NONCE_SALT',       '(+}tGQ8e a7Y.#093tX*oKs3=+|rJDZ)D9,NPXg@z]Gt:+fczY/4IP$kS@G7p#!t' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
