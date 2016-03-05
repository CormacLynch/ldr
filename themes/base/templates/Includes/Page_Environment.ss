<% if isDev %>
	<script src="{$ThemeDir}/js/bundle-head.js"></script>
<% else %>
	<script>
		$addInlineScript('/js/bundle-head.js').RAW
	</script>
<% end_if %>
<% if isDev %><%-- Site stylesheet, compiled from lesscss --%>
<link rel="stylesheet" href="{$ThemeDir}/css/style.css"><% else %>
<link rel="stylesheet" href="$HashPath('css/style.css')"><% end_if %>