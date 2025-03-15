// Настройка пути к worker файлу PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

// Основные переменные
let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.5;

const canvas = document.getElementById('pdf-render'),
      ctx = canvas.getContext('2d');

// Загрузка PDF
function loadPDF(url) {
    // Показываем индикатор загрузки
    document.getElementById('loader').style.display = 'block';

    // Загружаем документ
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page-count').textContent = pdfDoc.numPages;
        
        // Скрываем индикатор загрузки
        document.getElementById('loader').style.display = 'none';
        
        // Отрисовываем первую страницу
        renderPage(pageNum);
    });
}

// Отрисовка страницы
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({scale: scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        page.render(renderContext).promise.then(function() {
            pageRendering = false;
            
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });

        document.getElementById('page-num').textContent = num;
    });
}

// Переход на предыдущую/следующую страницу
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
}

// Обработчики событий
document.getElementById('prev').addEventListener('click', onPrevPage);
document.getElementById('next').addEventListener('click', onNextPage);

// Загрузка PDF при запуске
loadPDF('/files/algebra.pdf');
