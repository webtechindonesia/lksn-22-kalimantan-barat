<?php
$dest = imagecreatefromjpeg(realpath('image.jpg'));
list($destWidth, $destHeight) = getimagesize(realpath('image.jpg'));

$src = imagecreatefrompng(realpath('logo.png'));
list($srcWidth, $srcHeight) = getimagesize(realpath('logo.png'));

imagecopy($dest, $src, $destWidth - $srcWidth, 0, 0, 0, $srcWidth, $srcHeight);

header('Content-type:image');
imagejpeg($dest);
