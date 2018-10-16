<?php require_once($_SERVER['DOCUMENT_ROOT'].'/assets/inc/head.php'); ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/assets/inc/header.php'); ?>

	<div class="l-breadcrumbs">
		<div class="l-breadcrumbs__in" itemscope itemtype="http://schema.org/BreadcrumbList">
			<div class="l-breadcrumbs__list" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<a href="/" itemprop="item" class="l-breadcrumbs__anc">
					<span itemprop="name" class="l-breadcrumbs__txt">HOME</span>
				</a>
				<meta itemprop="position" content="3">
			</div>
			<div class="l-breadcrumbs__list" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<a href="" itemprop="item" class="l-breadcrumbs__anc">
					<span itemprop="name" class="l-breadcrumbs__txt">カテゴリ名</span>
				</a>
				<meta itemprop="position" content="2">
			</div>
			<div class="l-breadcrumbs__list" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<a href="" itemprop="item" class="l-breadcrumbs__anc is-notAnc">
					<span itemprop="name" class="l-breadcrumbs__txt">ページタイトル</span>
				</a>
				<meta itemprop="position" content="1">
			</div>
		</div>
	</div>

	<div class="l-main">
		<main class="l-conts">
			<section>
				<h2>ページタイトル</h2>
				<section>
					<h3>中見出し</h3>
					<section>
						<h4>小見出し</h4>
					</section>
				</section>
			</section>
		</main><!-- /#conts -->

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/assets/inc/subconts.php'); ?>
	</div><!-- /#main -->

<?php require_once($_SERVER['DOCUMENT_ROOT'].'/assets/inc/footer.php'); ?>
