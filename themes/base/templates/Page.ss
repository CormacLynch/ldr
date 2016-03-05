<!DOCTYPE html>
<!--[if lte IE 8]> <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if IE 9]>     <html class="no-js ie9" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<title>$Title | $SiteConfig.Title</title>
	<% base_tag %>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	$MetaTags
	<% include Page_Environment %>
	<link rel="icon" type="image/png" href="/favicon.png">
</head>
<body>
	<% include Page_Accessibility %>
	<% include Page_Header %>
	$Layout
	<% include Page_Footer %>
	<script src="{$ThemeDir}/js/bundle-index.js"></script>
</body>
</html>
