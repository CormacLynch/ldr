<div class="header">
	<div class="l-col-12 l-content h-clearfix">
		<div class="l-col-6 l-padding">
			<h1>Header</h1>
		</div>
		<div class="l-col-6 l-padding">
			<ul class="h-list-reset h-right nav-primary">
				<% loop $Menu(1) %>
				<li class="h-left">
					<a href="$Link" class="$LinkingMode">$MenuTitle</a>
				</li>
				<% end_loop %>
			</ul>
		</div>
	</div>
</div>
