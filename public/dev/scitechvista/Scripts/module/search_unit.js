
//進階搜尋組合區塊
function initSearchunit(closeText, openText) {

  var $searchKBtn = $('.kf-search-unit-more');
      $searchKMask = $('.kf-search-unit');
      $searchKeyword = $(".kf-search-unit-keyword");

  $searchKBtn.click(function() {
    
      $searchKMask.toggleClass("unit-open");
      $searchKeyword.focus();//無障礙TAB順序的關係，聚焦在第一個input

      $(this).toggleText(closeText, openText);
  });

  jQuery.fn.extend({
      toggleText: function (c, d) {
          var that = this;
          if (that.text() != c && that.text() != d) {
              that.text(c);
          }
          else
              if (that.text() == c) {
                  that.text(d);
              }
              else
                  if (that.text() == d) {
                      that.text(c);
                  }
          return this;
      }
  });
}

//初始化↓這段自行搬至有使用到的頁面(關閉、進階搜尋←文字可自行更改)
//initSearchunit('關閉', '進階搜尋');//進階搜尋