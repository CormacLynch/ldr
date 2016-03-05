<ul class="h-list-reset"> 
	<% loop $Menu(2) %>
	<li>
		<a href="$Link" class="$LinkingMode">$MenuTitle</a>
	</li> 
	<% end_loop %> 
</ul>