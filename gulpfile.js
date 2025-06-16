import gulp from 'gulp';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';

// import rename from 'gulp-rename';

// 任務1: 移除 crossorigin 屬性
export const removeCrossorigin = () => {
    return gulp
        .src('dist/**/*.html')
        .pipe(
            cheerio({
                run: ($) => {
                    // 查找所有帶有 crossorigin 屬性的標籤，並移除該屬性
                    $('script[crossorigin], link[crossorigin]').removeAttr('crossorigin');
                },
                parserOptions: {
                    decodeEntities: false, // 保留原始字符編碼，避免轉換為 HTML 實體
                },
            })
        )
        .pipe(gulp.dest('dist'));
};

// 任務2: 修改相對路徑
export const modifyRelativePath = () => {
    return gulp
        .src('dist/**/*.html')
        .pipe(
            cheerio({
                run: ($) => {
                    $('script[src], link[href]').each((_, el) => {
                        const $el = $(el);
                        const attrName = $el.is('link') ? 'href' : 'src';
                        const originalPath = $el.attr(attrName);
                        let newPath = originalPath.replace('./assets/', '../assets/');
                        if (originalPath.startsWith('Plugin/')) {
                            newPath = originalPath.replace('Plugin/', '../Plugin/');
                        }
                        $el.attr(attrName, newPath);
                    });
                },
                parserOptions: { decodeEntities: false }, // 保留原始字符編碼
            })
        )
        .pipe(gulp.dest('dist'));
};

// 任務3: 改副檔名為 .jsp
export const renameToJsp = () => {
    return gulp
        .src('dist/**/*.html')
        .pipe(rename({ extname: '.jsp' }))
        .pipe(gulp.dest('dist/jsp'));
};

// 任務4: 改副檔名為 .jsp
export const fixCssPaths = () => {
    return gulp
        .src('dist/assets/css/**/*.css')
        .pipe(replace(/url\(["']?assets\/Image\/layout\//g, 'url("../../assets/Image/layout/'))
        .pipe(gulp.dest('dist/assets/css'));
};

// 合併任務: 順序執行移除 crossorigin 和修改相對路徑
// export default gulp.series(removeCrossorigin, modifyRelativePath);
export default gulp.series(removeCrossorigin);
// 💡 A 打包流程（HTML）：只跑移除 crossorigin
export const html = gulp.series(removeCrossorigin);

// 💡 B 打包流程（JSP）：跑完所有處理 + 改副檔名
export const jsp = gulp.series(removeCrossorigin, modifyRelativePath, renameToJsp);
