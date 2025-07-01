$(function (){
	initScrollTop();//ScrollTop	
	initAccessible();//無障礙設定
	initSearchBlock();//搜尋區塊
	initShareOnSocialNetwork();//社群分享
	initLeftMenu();//左側選單
	objfit();//圖片設定
	initFatfooter('關閉', '開啟');//Fatfooter
	initChangeFontSize(1028);//字級切換 (大中小切換)
	initFontchange();///字級切換 (大小切換 按鈕樣式與字體放大)
	stickyHeader();//捲動選單
	SideCategory();                //左側分類項目
	initOwl();//輪播
	CollapseList(); //收合
	Weblink() //相關連結（伙伴）-列表
});
