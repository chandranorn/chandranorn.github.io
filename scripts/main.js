jQuery(function($) {

	var windowWidth = $("body").width();

/*
|----------------------------------------------------------------
| Masonry
|----------------------------------------------------------------
*/
	var $grid = $('.grid').masonry({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  columnWidth: '.grid-sizer'
	});
	// layout Masonry after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.masonry();
	});  

/*
|----------------------------------------------------------------
| Hide/Show Header
|----------------------------------------------------------------
*/

	var didScroll;
	    var lastScrollTop = 0;
	    var delta = 5;
	    var navbarHeight = $('header').outerHeight();

	    $(window).scroll(function(event){
	        didScroll = true;
	    });

	    function hasScrolled() {
	        var st = $(this).scrollTop();

	        // Make sure they scroll more than delta
	        if(Math.abs(lastScrollTop - st) <= delta) {
	          return;
	        }

	        // If they scrolled down and are past the navbar, add class .header-up.
	        // This is necessary so you never see what is "behind" the navbar.
	        if (st > lastScrollTop && st > navbarHeight){
	            // Scroll Down
	            $('header').removeClass('header-down').addClass('header-up');
	        } else {
	            // Scroll Up
	            if(st + $(window).height() < $(document).height()) {
	                $('header').removeClass('header-up').addClass('header-down');
	            }
	        }
	        lastScrollTop = st;
	    }

	    setInterval(function() {
	        if(didScroll) {
	            hasScrolled();
	            didScroll = false;
	        }
	    }, 250);

/*
|----------------------------------------------------------------
| Navigation
|----------------------------------------------------------------
*/

	const targetElement = document.querySelector(".gn");
	bodyScrollLock.disableBodyScroll(targetElement);
	bodyScrollLock.enableBodyScroll(targetElement);

	$(".gn-trigger").on("click",function(e) {
		e.preventDefault();
		if($(this).hasClass("is-active")) {
			$(this).removeClass("is-active");
			$(".gn").slideUp(400);
			bodyScrollLock.enableBodyScroll(targetElement);
		} else {
			$(this).addClass("is-active");
			$(".gn").slideDown(400);
			bodyScrollLock.disableBodyScroll(targetElement);
		}
	});

	$(window).resize(function() {
		windowWidth = $("body").width();
		if(windowWidth > 767 && $ (".gn-trigger").hasClass("is-active")) {
			setTimeout(function() {
				$(".gn-trigger").removeClass("is-active");
				$(".gn").slideUp(0);
			}, 200);
			bodyScrollLock.enableBodyScroll(targetElement);
		}
	});


});
