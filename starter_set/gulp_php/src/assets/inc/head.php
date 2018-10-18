<?php require_once($_SERVER['DOCUMENT_ROOT'].'/../public/class/set.php'); ?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title><?php echo $units->get_meta_title(); ?></title>

<meta name="description" content="<?php echo $units->get_meta_description(); ?>">
<meta name="keywords" content="">

<meta property="og:url" content="<?php echo $units->location; ?>">
<meta property="og:title" content="<?php echo $units->get_meta_title(); ?>">
<meta property="og:description" content="<?php echo $units->get_meta_description(); ?>">

<?php if ($units->get_meta_body_id() === 'index'): ?>
<meta property="og:type" content="website">
<?php else: ?>
<meta property="og:type" content="article">
<?php endif ?>

<meta property="og:site_name" content="<?php echo _SITE_NAME_; ?>">
<meta property="og:image" content="<?php echo __OG_IMG__; ?>">
<meta property="og:locale" content="<?php echo __OG_LOCALE__; ?>">

<meta name="twitter:card" content="<?php echo __TWITTER_CARD__; ?>">
<meta name="twitter:site" content="<?php echo __TWITTER_SITE__; ?>">
<meta name="twitter:domain" content="<?php echo __TWITTER_DOMEIN__; ?>">

<link rel="canonical" href="<?php echo $units->location; ?>">

<link href="/assets/img/favicon.ico" rel="icon">
<link href="/assets/img/webclip.png" rel="apple-touch-icon-precomposed">

<link href="/assets/css/style.css" rel="stylesheet">

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/assets/inc/tag.php'); ?>
</head>
<body id="<?php echo $units->get_meta_body_id(); ?>">
