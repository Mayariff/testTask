Задание по созданию списков контактов.

Технологии в проекте:
react with hooks, redux, ts, jest, axios, sass, MUI, redux thunk, redux toolkit

![hall](https://github.com/Mayariff/testTask/blob/master/src/gif/demo.gif)

Как запускать:

1. Скачать приложение https://github.com/Mayariff/testTask
2. Скачать приложение https://github.com/Mayariff/json-server1 
3. Стартануть оба приложения (yarn start)
4. Все должно работать) 

PS: версия  node v16.14.2

Описание:
Приложение -аналог электронной телефонной книги.
Доступ к контактам пользователь получает после авторизации.
Пользователь может создавать контакты (имя/ фамилия/ телефон/ почта
+ по желанию можно добавить дополнительную информацию о контакте и фотографию).
  Так же пользователь может удалять и редактировать контакты.
  При нажалии на почту контакта можно перейти на почту.
  В приложении использован адаптивный дизайн.+ есть несколько тестов

Допушение:
использован рекомендованный сервис с моковыми данными.
1) В связи с этим авторизация сделана через get запрос.
   Я знаю, что в реальном мире, через get никакие данные передавать не стоит,
   особенно связанные с авторизацией. + на реальных сарверах  пароли шифруются.
2) Все обновления данных на странице (удаление/добавление/обнавление контактов)
   сделанно через повторный get запрос  контактов
3) С сервера не приходят ошибки, поэтому в приложении обработка ошибок упрощена