function initOwl() {
  $('.owl_fv').owlCarousel({
    items: 1,
    loop: false,
    dots: true,
    nav: false,
  });

  $('.owl_col-one').owlCarousel({
    loop: false,
    margin: 32,
    nav: false,
    dots: true,
    items: 1,
  });

  $('.owl_col-two').owlCarousel({
    loop: false,
    margin: 32,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
    }
  });

  $('.owl_col-three').owlCarousel({
    loop: false,
    margin: 32,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      992: {
        items: 3,
      },
    }
  });

  $('.owl_col-four').owlCarousel({
    loop: false,
    margin: 32,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    }
  });

  $('.owl-fastMenu').owlCarousel({
    loop: false,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    }
  });

  $('.owl_iLinks').owlCarousel({
    loop: false,
    margin: 16,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 7,
      },
    }
  });
}
// 無障礙輪播
function owlAccessibility(){
  $(".owl-nav").find(".owl-prev").each(function () {
    $(this).attr("aria-label", '上一頁');
  });
  $(".owl-nav").find(".owl-next").each(function () {
    $(this).attr("aria-label", '下一頁');
  });

  var indexPro = 0;
  
  $(".owl-carousel").find(".owl-dot").each(function () {
    indexPro++;
    $(this).attr("aria-label", '第' + indexPro + '頁');
  });
}
// Header sticky
function stickyHeader() {
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 1) {
			$('.header-row, .header-search, .category-bar, .megamenu, .contents_wrap, .Banner-wrap').addClass('sticky');
		} else {
			$('.header-row, .header-search, .category-bar, .megamenu, .contents_wrap, .Banner-wrap').removeClass('sticky');
		}
	});
}
//Tabs
function inTabs01(){
  wrapper01   = $(".injs-Tabs01");
  tabs01      = wrapper01.find(".injs-TabBtn01");
  tabToggle01 = wrapper01.find(".injs-TabBtn01 a");
  // ----------------- Functions
  function openTab(){
    var content = $(this).parent().next(".injs-TabContent01"),
      activeItems = wrapper01.find(".active");
    
    if(!$(this).hasClass('active')) {
      $(this).add(content).add(activeItems).toggleClass('active');
      // wrapper.css('min-height', content.outerHeight());
      return false;
    }
  };
  // ----------------- Interactions
  tabToggle01.on('click', openTab);
  // ----------------- Constructor functions
  $(window).on("load", function () {     
    tabToggle01.first().trigger('click');
  });
}

function inTabs02(){
  wrapper02   = $(".injs-Tabs02");
  tabs02      = wrapper02.find(".injs-TabBtn02");
  tabToggle02 = wrapper02.find(".injs-TabBtn02 a");
  // ----------------- Functions
  function openTab(){
    var content = $(this).parent().next(".injs-TabContent02"),
      activeItems = wrapper02.find(".active");
    
    if(!$(this).hasClass('active')) {
      $(this).add(content).add(activeItems).toggleClass('active');
      // wrapper.css('min-height', content.outerHeight());
      return false;
    }
  };
  // ----------------- Interactions
  tabToggle02.on('click', openTab);
  // ----------------- Constructor functions
  $(window).on("load", function () {     
    tabToggle02.first().trigger('click');
  }); 
}

//商品輪播  活動報名使用
function owlThumbnailr() {
	var sync1 = $(".owl-big");
	var sync2 = $(".owl-thumbs");
	var slidesPerPage = 5; //globaly define number of elements per page 全局定義每頁元素的數量
	var syncedSecondary = true;
  
  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: false,
    dots: false,
    responsiveRefreshRate : 200,
    navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
    responsive:{
      768:{
        nav: false,
        dots: false,
      },
    }
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : 3,
    dots: false,
    margin: 4,
    nav: false,
    // center:true,
    smartSpeed: 200,
    slideSpeed : 500,
    URLhashListener:true,
    startPosition: 'URLHash',
    slideBy: 3, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100,
    responsive:{
      768:{
        items: slidesPerPage,
        slideBy: slidesPerPage,
        nav: false,
        dots: false,
      },
    }
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    var current = el.item.index;
    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
}

// 浮動區塊
function MainFixedFunction() {
  $(document).ready(function() {
    var $window = $(window);  
    var $sidebar = $(".SwitcherStraight"); 
    var $sidebarHeight = $sidebar.innerHeight();   
    var $footerOffsetTop = $(".FloatWraEnd, .Stv-Recommend, .fat-wrap").offset().top; 
    var $sidebarOffset = $sidebar.offset();
    
    $window.scroll(function() {
      if($window.scrollTop() > $sidebarOffset.top) {
        $sidebar.addClass("fixed");   
      } else {
        $sidebar.removeClass("fixed");   
      }    
      if($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
        $sidebar.css({"top" : -($window.scrollTop() + $sidebarHeight - $footerOffsetTop)});  
      } else {
        $sidebar.css({"top": "0",});  
      }    
    });   
  });
}
// 側邊浮動區塊 活動報名使用
function FloatWrap() {
  $(document).ready(function() {
    var $window = $(window);  
    var $sidebar = $(".kf-SideContent"); 
    var $sidebarHeight = $sidebar.innerHeight();   
    var $footerOffsetTop = $(".kf-FloatWraEnd").offset().top; 
    var $sidebarOffset = $sidebar.offset();
    
    $window.scroll(function() {
      if($window.scrollTop() > $sidebarOffset.top) {
        $sidebar.addClass("fixed");   
      } else {
        $sidebar.removeClass("fixed");   
      }    
      if($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
        $sidebar.css({"top" : -($window.scrollTop() + $sidebarHeight - $footerOffsetTop)});        
      } else {
        $sidebar.css({"top": "0",});  
      }    
    });   
  });
}

function CollapseList() {
  var Accordion = function(el, multiple) {
  this.el = el || {};
  this.multiple = multiple || false;
  
  var links = this.el.find('.link');
  
  links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }
  
  Accordion.prototype.dropdown = function(e) {
  var $el = e.data.el;
  $this = $(this),
  $next = $this.next();
  
  $next.slideToggle();
  $this.parent().toggleClass('open');
  
  if (!e.data.multiple) {
  $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
  };
  }
  
  var accordion = new Accordion($('#accordion'), false);
}
// 左側分類項目
function SideCategory() {
  var 
  $CategoryOpen =  $(".category-open");
  $CategoryClose = $(".category-close");
  $CategorySide =  $(".category-side");
  $CategoryLast = $(".category-list li:last-child");

  $(document).ready(function () {
    $CategoryOpen.click(function () {
      $CategorySide.toggleClass("active");
      return false;
    });
    $CategoryClose.click(function () {
      $CategorySide.removeClass("active");
      return false;
    });
    $(document).on("click", function (e) {
      if ($(e.target).parents(".category-side").length == 0) {
        $CategorySide.removeClass('active');
      }
    });
    $CategoryLast.keydown(function () {
      $CategorySide.removeClass("active");
      return false;
    });
    //跳過關閉鈕，blur時，將區塊隱藏
    // $CategoryClose.blur(function () {
    //   $CategorySide.removeClass("active");
    // });
  });
}
// 相關連結（伙伴）-列表
function Weblink() {
  var flag = 1;
  $("a.chevron_box").click(function () {
    if (flag == 1) {
      $(this).html("收合資訊");
      $(this).append('<i class="fas fa-minus"></i>');
      flag = 0;
    } else {
      $(this).html("展開更多");
      $(this).append('<i class="fas fa-plus"></i>');
      flag = 1;
    }
  });
}

