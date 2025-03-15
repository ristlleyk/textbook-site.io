// Функция для перехода на определенную страницу PDF
async function goToPage(pageNumber) {
    if (!pdfDoc || pageNumber < 1 || pageNumber > pdfDoc.numPages) {
        console.error('Неверный номер страницы');
        return;
    }

    try {
        // Получаем страницу
        const page = await pdfDoc.getPage(pageNumber);
        
        // Отрисовываем страницу
        renderPage(pageNumber);
        
    } catch (error) {
        console.error('Ошибка при переходе на страницу:', error);
    }
}

// Обработчик события для кнопки перехода на страницу
document.getElementById('goToPageBtn').addEventListener('click', () => {
    const pageInput = document.getElementById('pageInput');
    const pageNumber = parseInt(pageInput.value);
    if (pageNumber) {
        goToPage(pageNumber);
    }
});