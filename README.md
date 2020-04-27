# InteractiveMatTable

Angular CLI version 9.1.2. Запуск и автоматическое открытие в браузере на http://localhost:4200/: npm start. Посмотреть в ghpages: https://lonelydutchhound.github.io/interactive-mat-table/.

## Описание задания
### USER STORY:
Как покупатель сайта Я хочу видеть весь список товаров с ценами, выбрать несколько позиций и добавить в заказ Чтобы осуществить покупку

### Details:
API: https://ssdev.superagent.ru/TestApp/swagger/#/Values Для получения списка товаров использовать метод: /GetWithParent

### Done Criteria:
На страничке выводится таблица с товарами, колонки: выбран (флажок), категория (group), товар (name), цена (price) - DONE: mat-table
Можно выбрать несколько строк путем установки флажка в таблице - DONE: по одной
После нажатия на кнопку «в корзину» - выбранные позиции перестают отображаться в списке товаров - DONE: их можно извлечь из созданного сервиса
Должна быть возможность отобрать товары по определенной категории - DONE: mat-select
Должна быть возможность установить сортировку по: алфавиту (наименования товара), по цене (убывание/возрастание) - DONE: matSort, кнопки сортировки в заголовках столбцов
Приложение написано с использованием фреймворка Angular (версия на Ваше усмотрение) - DONE
