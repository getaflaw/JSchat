/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    listTable.innerHTML = "";
    let filterCoockie = filterNameInput.value;
    let coockieArray = document.cookie.split('; ');

    for (let i in coockieArray) {
        let currentCookie = coockieArray[i].split("=");
        if (currentCookie == "") return
        if (currentCookie[0].match(filterCoockie) || currentCookie[1].match(filterCoockie)) {
            listTable.innerHTML += '<tr><th>' + currentCookie[0] + '</th><th>' +
                currentCookie[1] + '</th><th><button  class="deleteButton">удалить</button></th></tr>';
        }
    }
});


addButton.addEventListener('click', () => {
    let coockieArray = document.cookie.split('; ');
    let double = false;
    let filterCoockie = filterNameInput.value;
    document.cookie = encodeURIComponent(addNameInput.value) + "=" + encodeURIComponent(addValueInput.value);
    if (addNameInput.value.toLowerCase().match(filterCoockie.toLowerCase()) || addValueInput.value.toLowerCase().match(filterCoockie.toLowerCase()) || filterNameInput == "") {
        for (let i in coockieArray) {
            let currentCookie = coockieArray[i].split("=");
            if (currentCookie[0] == addNameInput.value) {
                [double, index] = [true, i];
            }
        }
        listTable.innerHTML += '<tr><th>' + addNameInput.value + '</th><th>' + addValueInput.value + '</th><th><button  class="deleteButton">удалить</button></th></tr>';
        if (double != false) listTable.children[index].parentElement.removeChild(listTable.children[index]);
    } else {
        filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
    }

    deleteButton = listTable.querySelectorAll('.deleteButton');
    deleteButton.forEach((elem) => {
        elem.addEventListener('click', () => {
            elem.parentNode.parentNode.outerHTML = ""
            let deleteCookieName = elem.parentElement.parentElement.firstElementChild.textContent;
            let deleteCookie = document.cookie.split('; ');
            let index = 0;

            for (let i in deleteCookie) {
                if (deleteCookie[i].match(deleteCookieName)) index = i;
            }

            var cookie_date = new Date();
            cookie_date.setTime(cookie_date.getTime() - 1);
            document.cookie = deleteCookie[index] + "; expires=" + cookie_date.toGMTString();
        });
    })
});