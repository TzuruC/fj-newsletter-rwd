document.addEventListener('DOMContentLoaded', function () {
    try {
        const sidebarMenu = document.querySelector('aside.aside-left');
        const pageContent = document.querySelector('.page-content-bg');
        const sidebarMenuRight = document.querySelector('.aside-right'); // 获取右侧栏元素

        // 仅在存在右侧栏的情况下，设置初始状态
        if (sidebarMenuRight) {
            // 預設狀態
            sidebarMenu.classList.add('hidden');
            pageContent.classList.add('hidden-left');
        }

        // 左侧栏逻辑
        const toggleBtn = document.querySelector('.btn-toggle');

        if (sidebarMenu && toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();

                if (sidebarMenu.classList.contains('hidden')) {
                    sidebarMenu.classList.remove('hidden');
                    pageContent.classList.remove('hidden-left');

                    console.log(toggleBtn);
                    // 同时隐藏右侧栏（如果打开）
                    if (sidebarMenuRight && !sidebarMenuRight.classList.contains('hidden')) {
                        sidebarMenuRight.classList.add('hidden');
                        pageContent.classList.add('hidden-right');
                        toggleIconRight.classList.add('fa-rotate-180');
                    }
                } else {
                    sidebarMenu.classList.add('hidden');
                    pageContent.classList.add('hidden-left');
                }
            });
        }

        // 右侧栏逻辑
        const toggleBtnRight = document.querySelector('.btn-toggle-right');
        const toggleIconRight = document.querySelector('.fa-circle-chevron-right');
        if (sidebarMenuRight && toggleBtnRight && toggleIconRight) {
            toggleBtnRight.addEventListener('click', (e) => {
                e.preventDefault();

                if (sidebarMenuRight.classList.contains('hidden')) {
                    sidebarMenuRight.classList.remove('hidden');
                    pageContent.classList.remove('hidden-right');
                    toggleIconRight.classList.remove('fa-rotate-180');

                    // 隐藏左侧栏
                    if (!sidebarMenu.classList.contains('hidden')) {
                        sidebarMenu.classList.add('hidden');
                        pageContent.classList.add('hidden-left');
                    }
                } else {
                    sidebarMenuRight.classList.add('hidden');
                    pageContent.classList.add('hidden-right');
                    toggleIconRight.classList.add('fa-rotate-180');
                }
            });
        }

        // 螢幕寬度小於768預設收合
        if (window.innerWidth <= 768) {
            sidebarMenu.classList.add('hidden');
            pageContent.classList.add('hidden-left');
            let initialWidth = window.innerWidth;
            window.addEventListener('resize', function () {
                if (window.innerWidth !== initialWidth) {
                    location.reload();
                }
            });
        }
    } catch (error) {
        console.error(error.message);
    }
});
