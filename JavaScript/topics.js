// Функция для перехода к теме
async function goToPage(pageNumber) {
    if (!pdfDoc || pageNumber < 1 || pageNumber > pdfDoc.numPages) {
        console.error('Неверный номер страницы');
        return;
    }

    try {
        const page = await pdfDoc.getPage(pageNumber);
        renderPage(pageNumber);
    } catch (error) {
        console.error('Ошибка при переходе на страницу:', error);
    }
}

// Добавляем обработчик для всех кнопок с атрибутом data-page
document.addEventListener('DOMContentLoaded', () => {
    // Находим все кнопки с классом page-button
    const pageButtons = document.querySelectorAll('.topic');
    
    // Добавляем обработчик для каждой кнопки
    pageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Получаем номер страницы из ID кнопки
            // Предполагается, что ID имеет формат 'page-X', где X - номер страницы
            const pageNumber = parseInt(e.target.id.split('-')[1]);
            if (pageNumber) {
                goToPage(pageNumber);
            }
        });
    });
});