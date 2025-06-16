const hideSidebarBtn = document.querySelector('#hideInnerSidebar');
const showSidebarBtn = document.querySelector('#showInnerSidebar');
const innerSidebar = document.querySelector('#innerSidebar');
const contentData = document.querySelector('#contentData');
const tooltipHide = document.querySelector('#tooltipHide');
const tooltipShow = document.querySelector('#tooltipShow');
let trigger = 0;
showSidebarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    innerSidebar.classList.toggle('d-none');
    contentData.classList.toggle('sidebarHide');
    showSidebarBtn.classList.toggle('active');
});
