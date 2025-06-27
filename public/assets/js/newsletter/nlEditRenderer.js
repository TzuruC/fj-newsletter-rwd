
const newsletterTopic = document.querySelector('#newsletterTopic');
const newsletterArticlesEdit = document.querySelector('.newsletter-articles-edit');
const accordionButton = document.querySelectorAll('.accordion-item .accordionButton');
// 電子報標題資訊
const nlPublicNo = document.querySelector('#nlPublicNo');
const nlSelectYear = document.querySelector('#nlSelectYear');
const nlSelectMonth = document.querySelector('#nlSelectMonth');
const nlWisdom = document.querySelector('#nlWisdom');
const nlWisdomHint = document.querySelector('#nlWisdomHint');
// 電子報內容資訊
const articleSection1 = document.querySelector('#articleSection1');
const articleSection2 = document.querySelector('#articleSection2');

// 取得 json 資料
let newsletterRenderData = [...newsletterContent];
let createNewsletterData = {
    nlId: 1,
    nlPublicNo: 265,
    nlYear: 2025,
    nlMonth: 3,
    nlWisdom:"因為我們的一舉一動，我們的衣、食、住、行都是很多人的奉獻，所以要好好學法，去報恩。",
    nlWisdomHint:"──── 修行",
    nlArticles:[],
}
let articleObject = {
    id: 0,
    section: "",
    title: "",
    subtitle: "",
    date: "",
    label: "",
    summary: "",
    imageUrl: "",
    hrefUrl: "",
};

console.log(newsletterRenderData[0].nlArticles);

// 從 JSON 渲染電子報當期標題資訊
nlPublicNo.textContent = `第 ${newsletterRenderData[0].nlPublicNo} 期`;
nlSelectYear.value = newsletterRenderData[0].nlYear;
nlSelectMonth.value = newsletterRenderData[0].nlMonth;
nlWisdom.value = newsletterRenderData[0].nlWisdom;
nlWisdomHint.value = newsletterRenderData[0].nlWisdomHint;


// 電子報區塊
accordionButton.forEach((e)=>{
    e.addEventListener('click',(el)=>{
        el.preventDefault();
        el.stopImmediatePropagation();
        if(el.target.classList.contains('render-section-check')){
            el.preventDefault();
            console.log(el);

        }
    });
});
// 電子報內容
// 取出電子報分類
const articleGroupedBySection = newsletterRenderData[0].nlArticles.reduce((acc, article) => {
    const section = article.section;  
    if (!acc[section]) {
      acc[section] = [];
    }  
    acc[section].push(article);
    return acc;
  }, {});

console.log(articleGroupedBySection);

// 新增 & 刪除文章
let section1ArticleNum = 1;
let section2ArticleNum = 0;
newsletterArticlesEdit.addEventListener('click',(e)=>{ 
    console.log(e);
       
    if(e.target.classList.contains('add-article')){
        section1ArticleNum += 1;   
        e.target.closest('.accordion-body').insertAdjacentHTML('beforeend', getArticleTemplate((section1ArticleNum)));
    }else if(e.target.classList.contains('delete-article')){
        console.log('section1ArticleNum');     
    }


});
// 點擊+號新增一篇文章
// 文章篇號+1
// 點擊-號刪除當前文章
// 若完全沒有文章，accordion去除「>」改為「+」按鈕，不再展開

function getNewsletterData(){

};


let renderNewsletterTopic = `
    <!-- 區塊標題 -->
    <div class="mx-1 p-1 row align-items-center row-bg-gray">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-start">
            <p class="m-0 fw-bold">時間資訊</p>
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input01">期數</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            第 256 期
            <!-- <input type="text" class="form-control" id="input01" name="input01" value="第 256 期" placeholder="" disabled="trues"> -->
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label" for="input01"><span class="text-danger">*</span>電子報日期</label>
        </div>
        <!-- -- -->
        <div class="col-12 col-md-10 col-lg-5">
            <div class="row">
                <div class="col-12 col-sm-6 col-lg-6">
                    <div class="row mb-1">
                        <div class="col-9">
                            <input type="text" class="form-control d-inline" id="input01" name="input01" value="input01" placeholder="名稱">
                        </div>
                        <div class="col-3">
                            <div class="col-4 col-md-1 col-lg-1">
                                年
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-6">
                    <div class="row">
                        <label for="selectMonth" class="d-none">請選擇國家：</label>
                        <div class="col-9">
                            <select class="form-select" id="selectMonth" name="selectMonth">
                                <option selected value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div class="col-3">
                            月份
                        </div>
                    </div>
                </div>
            </div>
        </div>                    
    </div>

    
    <!-- 區塊標題 -->
    <div class="mx-1 p-1 row align-items-center row-bg-gray">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-start">
            <p class="m-0 fw-bold">本期智慧法語</p>
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input02"><span class="text-danger">*</span>內容</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <input type="text" class="form-control" id="input02" name="input02" value="" placeholder="信箱">
        </div>
    </div>
`;



function getArticleTemplate(num) {
    return `
      <!-- 文章單位 -->
    <div class="mx-1 p-3 row align-items-center row-bg-gray">
        <div class="col-12 col-md-2 col-lg-2 px-0 text-start text-md-start">
            <div class="m-0 fw-bold">
                <i class="fz-5 add-article fas fa-plus-circle"></i> 
                <i class="fz-5 delete-article fas fa-minus-circle me-2"></i> 
                第 ${num} 篇  
            </div> 
        </div>
    </div>
    <!-- 文章 1 -->
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input11${num}"><span class="text-danger">*</span>文章標籤</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <input type="" class="form-control" id="input11${num}" name="input11${section1ArticleNum}" value="" placeholder="">
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input112"><span class="text-danger">*</span>封面照片</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <div class="row">
                <div class="col-12 col-lg-6 d-flex flex-column justify-content-center">
                    <input class="form-control" type="file" id="input112" name="input112">
                </div>
                <div class="col-12 col-lg-6">
                    <!-- ʕ•͡ᴥ•ʔノ 封面圖片 -->
                    <img src="https://placehold.jp/215x150.png" class="my-1" alt="封面圖片" />
                </div>
            </div>
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input113"><span class="text-danger">*</span>主標題</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <input type="" class="form-control" id="input113" name="input113" value="" placeholder="">
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input114">次標題</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <input type="" class="form-control" id="input114" name="input114" value="" placeholder="">
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input115"><span class="text-danger">*</span>內容簡介</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <textarea class="form-control" name="input115" id="input115"></textarea>
        </div>
    </div>
    `;
  }
  


const articleTemplate = `
    <!-- 文章單位 -->
    <div class="mx-1 p-3 row align-items-center row-bg-gray">
        <div class="col-12 col-md-2 col-lg-2 px-0 text-start text-md-start">
            <div class="m-0 fw-bold">
                <i class="fz-5 fas fa-plus-circle"></i> 
                <i class="fz-5 fas fa-minus-circle me-2"></i> 
                第 ${section1ArticleNum} 篇  
            </div> 
        </div>
    </div>
    <!-- 文章 1 -->
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input11${section1ArticleNum}"><span class="text-danger">*</span>文章標籤</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <input type="" class="form-control" id="input11${section1ArticleNum}" name="input11${section1ArticleNum}" value="" placeholder="">
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input112"><span class="text-danger">*</span>封面照片</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <div class="row">
                <div class="col-12 col-lg-6 d-flex flex-column justify-content-center">
                    <input class="form-control" type="file" id="input112" name="input112">
                </div>
                <div class="col-12 col-lg-6">
                    <!-- ʕ•͡ᴥ•ʔノ 封面圖片 -->
                    <img src="https://placehold.jp/215x150.png" class="my-1" alt="封面圖片" />
                </div>
            </div>
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input113"><span class="text-danger">*</span>主標題</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <input type="" class="form-control" id="input113" name="input113" value="" placeholder="">
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input114">次標題</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <input type="" class="form-control" id="input114" name="input114" value="" placeholder="">
        </div>
    </div>
    <div class="mx-1 p-4 row align-items-center row-bg-light">
        <div class="col-12 col-md-2 col-lg-2 text-start text-md-end">
            <label class="form-label mb-0" for="input115"><span class="text-danger">*</span>內容簡介</label>
        </div>
        <div class="col-12 col-md-5 col-lg-5">
            <textarea class="form-control" name="input115" id="input115"></textarea>
        </div>
    </div>
`;