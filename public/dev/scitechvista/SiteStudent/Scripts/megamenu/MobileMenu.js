// Mobile menu
jQuery(document).ready(function ($) {
	var $menu = $('#mobile-nav'),
		$megamenu = $('.megamenu'),
		$menuWrap = $('#mobile-nav-wrap'),
		$menulink = $('.mobile-nav-link'),
		$menuTrigger = $('.has-submenu > a');

	$menulink.click(function (e) {
		e.preventDefault();
		$megamenu.toggleClass('active');
		$menuWrap.toggleClass('active');
		$menulink.toggleClass('active');
		$menu.toggleClass('active');
	});

	$menuTrigger.click(function (e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.next('ul').attr('class') == undefined) {
			window.location.href = $this.attr('href');
		} else {
			$this.toggleClass('active').next('ul').toggleClass('active');
		}
	});
});