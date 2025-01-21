# Профильное задание для стажировки Frontend-разработчик мини-приложений учи.ру

## Задание для Front-end стажёра

Привет! Если ты хочешь стать частью команды Учи.ру в рамках стажёрской программы,
то тебе необходимо выполнить небольшое тестовое задание. Это нужно, что бы твои
потенциальные наставники смогли оценить твои навыки и сравнив их с остальными
кандидатами выбрать лучших из лучших.

Помни, что работающий продукт важнее количества технологий и красивого кода.

Удачи!

### Что нужно сделать ?

- форкнуть этот репозиторий в свой github аккаунт
- реализовать проект по описанию ниже
- опубликовать его на github pages
- прислать нам свой гитхаб аккаунт и ссылку на опубликованный сайт
- ждать обратной связи :)

## Проект "Кошачий пинтерест"

Необходимо реализовать интерфейс для просмотра котиков используя API https://thecatapi.com

Дизайн лежит тут - https://bit.ly/3utxaL2

- по умолчанию должна открываться вкладка "все котики"
- у котика должна быть возможность добавить в "любимые" и убрать из "любимых"
- данные о "любимых" котиках должны хранится на клиенте
- на вкладке "любимые котики" должны отображаться добавленные в "любимые" котики
- реализация адаптивности будет плюсом, но не обязательна
- бесконечная прокрутка будет плюсом, но не обязательна
- можно использовать любой фреймворк включая vanilla.js

---

## Решение

В рамках задания был создан и опубликован на gh-pages интерфейс, который позволяет просматривать котиков, добавлять их в избранные и удалять из избранных.
Во время выполнения задания было сделано небольшое отклонение от изначального дизайна:
- в хедер страницы был добавлен логотип, ведущий на главную (домашнюю) страницу-знакомство. Это сделано с целью быстро ознакомить пользователя с проектом и использованными технологиями.
- добавлена страница 404 (в случае если пользователь введет неверный адрес). Сделано с целью улучшения пользовательского опыта (при попадании на неопределенную страницу пользователь сможет выбрать варианты возврата на существующие страницы)
- для вкладки "любимые котики" добавлено состояние "нет избранных котиков" (в случае если пользователь не добавлял котиков в избранные). Сделано с целью улучшения пользовательского опыта. Сделано это тоже с целью улучшения пользовательского опыта (так пользователь будет знать, что проблема "белой" страницы произошла по причине отсутствия любимчиков).
- для вкладки "любимые котики" и "все котики" добавлен индикатор загрузки 
- для вкладки "любимые котики" добавлена кнопка для удаления всех любимых котиков
- добавлена карточка с подробным описанием котика (если она есть) с возможностью выбора языка отображения (английского или перевода на русский)


## Особенности
- При открытии приложения Вы попадаете на приветственный экран, на котором можно ознакомиться с описанием проекта, использованными технологиями, а так же получить контактную информацию для связи.
- На главной странице можно ознакомиться с примером котиков, которые могут приходить с api (это и картинки, и gif).
- Вкладка "Все котики" позволяет просматривать все котиков, которые могут прийти с api. При этом каждый раз котики получаются случайным образом.
    - При первом попадании на страницу на экране будет выведено 10 котиков, с которыми можно взаимодействовать:
        - добавлять в "любимые" котики
        - удалять из "любимых" котиков
    - При последующих пролистываниях страницы будут появляться новые котики (реализована бесконечная прокрутка)
- Вкладка "Любимые котики" позволяет просматривать все котиков, которые были добавлены в "любимые", а так же на этой кладке можно удалять котиков из избранных (по аналогии со всеми котиками при нажатии на сердечко)
- Любимые котики хранятся на клиенте в формате массива айдишников (можно было бы хранить и url картинки избранного котика, но был выбран вариант хранить только айди, чтобы пользователь получал актуальную картинку котика в случае обновления ее на сервере) избранных котиков, которые при обращении к приложению будут подгружены в стор.
- Для реализации перевода с английского на русский использовался https://ftapi.pythonanywhere.com/ (простейший, без авторизации) 

### Технологии

- React (Vite для сборки)
- TypeScript
- Ant Design
- Redux (для стора)
- axios (для запросов к API)

## Хочу добавить
- [x] Очистку любимых котиков (добавить на вкладке любимых котиков кнопку полной очистки)
- [ ] Сортировку любимых котиков (добавить на вкладке любимых котиков возможность сортировать котиков по "времени" их добавлению: последние добавленные или первые добавленные)
- [x] Карточка с информацией о котике (с api можно запросить информацию о котике по его айди там есть информация о породе, годах жизни и ссылочка на вики, это можно интересно обыграть)
- [ ] Переделать обращение к api (вместо axios попробовать использовать @thatapicompany/thecatapi)
- [ ] Тесты? (просто практики ради)

## Запуск проекта

1. Клонируйте репозиторий:
   ```bash
   gh repo clone KatrinBnk/frontend-challenge-uchi-ru
   ```

2. Перейдите в директорию проекта:
   ```bash
   cd frontend-challenge-uchi-ru
   ```

3. Установите зависимости:
   ```bash
   npm install
   ```

4. Запустите приложение:
   ```bash
   npm run dev
   ```


## Деплой

Готовое приложение задеплоено на GitHub Pages и доступно по
[ссылке](https://katrinbnk.github.io/frontend-challenge-uchi-ru/)

--- 

# Контакты:
- телеграм: https://t.me/Katrin_Bnk
- вконтакте: https://vk.com/katrin_bnk
- почта:  yekaterina@bankoev.ru

--- 

# Скриншоты работы

## Страница-знакомство 
![Знакомство](./screenshots/homePage.png)
## Вкладка "любимые котики"
### Любимые котики
![Любимые котики](./screenshots/favoritesPage.png)
### Нет любимых котиков
![Нет любимых котиков](./screenshots/favoritesPageEmpty.png)
### Добавлено: плавающая кнопка для удаления всех любимых котиков
![](./screenshots/clearFavorites.png)

## Вкладка "все котики"
![Все котики](./screenshots/allCatsPage.png)

## Состояние карточек-котиков
### Наведение на карточку котика
![](./screenshots/hoveredCard.png)
### Наведение на сердечко любимого котика
![](./screenshots/hoveredLikedCard.png)
### Наведение на сердечко еще не любимого котика
![](./screenshots/hoveredUnLikedCard.png)

## Карточка котика
### Если о котике не приходит информации с api (с выбранным русским - по умолчанию)
![](./screenshots/catCardWithoutInfo_ru.png)
### Если о котике не приходит информации с api (с выбранным английским языком)
![](./screenshots/catCardWithoutInfo_en.png)
### Если о котике приходит информации с api (с выбранным английским языком)
![](./screenshots/catCardWithInfo_en.png)
### Если о котике приходит информации с api (с выбранным русским - по умолчанию)
![](./screenshots/catCardWithInfo_ru.png)


## Был реализован простейший адаптив

![](./screenshots/iPhoneSE.png)
![](./screenshots/iPadPro.png)