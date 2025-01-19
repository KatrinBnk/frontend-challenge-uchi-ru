import React from 'react';
import { Collapse, CollapseProps } from 'antd';
import styles from './MainPage.module.css';
import {Link} from "react-router-dom";

const cats = [
    {
        id: '841',
        url: 'https://cdn2.thecatapi.com/images/841.gif',
    },
    {
        id: '66l',
        url: 'https://cdn2.thecatapi.com/images/66l.jpg',
    },
    {
        id: '2ph',
        url: 'https://cdn2.thecatapi.com/images/2ph.gif',
    },
    {
        id: 'abu',
        url: 'https://cdn2.thecatapi.com/images/abu.jpg',
    },
];

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Проект "Кошачий пинтерест"',
        children: (
            <div className={styles.collapseItem}>
                <p>
                    Необходимо реализовать интерфейс для просмотра котиков используя API{' '}
                    <a href="https://thecatapi.com" target="_blank" rel="noopener noreferrer">
                        https://thecatapi.com
                    </a>
                </p>
                <p>
                    Дизайн лежит тут -{' '}
                    <a href="https://bit.ly/3utxaL2" target="_blank" rel="noopener noreferrer">
                        https://bit.ly/3utxaL2
                    </a>
                </p>
                <ul>
                    <li>по умолчанию должна открываться вкладка <Link to='/all'>"все котики"</Link>*</li>
                    <li>у котика должна быть возможность добавить в "любимые" и убрать из "любимых"</li>
                    <li>данные о "любимых" котиках должны хранится на клиенте</li>
                    <li>на вкладке <Link to='/favorites'>"любимые котики"</Link> должны отображаться добавленные в "любимые" котики</li>
                    <li>реализация адаптивности будет плюсом, но не обязательна</li>
                    <li>бесконечная прокрутка будет плюсом, но не обязательна</li>
                </ul>
                <p>*Сейчас вы находитесь на домашней странице с целью познакомиться.
                    Для перехода на страницу с котиками воспользуйтесь заголовком или
                    перейдите по <Link to='/all'>ссылке</Link>
                </p>
            </div>
        ),
    },
    {
        key: '2',
        label: 'Использованные технологии',
        children: (
            <div className={styles.collapseItem}>
                <ul>
                    <li>React (vite для сборки)</li>
                    <li>TypeScript</li>
                    <li>Ant Design</li>
                    <li>Redux (для стора)</li>
                </ul>

                <div>
                    <p>
                        Использовала Ant Design для создания некоторых компонентов (например, на этой странице для реализации Collapse),
                    </p>
                    <ul>
                        Ant Design был выбран по следующим причинам:
                        <ul>
                            <li>Огромный набор готовых компонентов, что позволяет значительно ускорить разработку.</li>
                            <li>Хорошая и максимально подробная документация, что облегчает поиск решений и примеров.</li>
                        </ul>
                    </ul>
                    <p>
                        Для реализации стора приложения был использован Redux, так как это одно из самых популярных и
                        удобных решений, а также я имела опыт работы с этим инструментом.
                    </p>
                </div>
            </div>
        ),
    },
    {
        key: '3',
        label: 'Контакты',
        children: (
            <div className={styles.collapseItem}>
                <ul>
                    <li>
                        телеграм:{' '}
                        <a
                            href="https://t.me/Katrin_Bnk"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://t.me/Katrin_Bnk
                        </a>
                    </li>
                    <li>
                        вконтакте:{' '}
                        <a
                            href="https://vk.com/katrin_bnk"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://vk.com/katrin_bnk
                        </a>
                    </li>
                    <li>
                        почта:{' '}
                        <a href="mailto:yekaterina@bankoev.ru">yekaterina@bankoev.ru</a>
                    </li>
                </ul>
            </div>
        ),
    },
];

const MainPage: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.catWrapper}>
            <div className={styles.catColumn}>
                <img src={cats[0].url} alt={`Cat ${cats[0].id}`} className={styles.catImage} />
                <img src={cats[1].url} alt={`Cat ${cats[1].id}`} className={styles.catImage} />
            </div>
            <div className={styles.content}>
                <h1 className={styles.header}>Добро пожаловать в Кошачий пинтерест!</h1>
                <Collapse items={items} defaultActiveKey={['1', '3']} />
            </div>
            <div className={styles.catColumn}>
                <img src={cats[2].url} alt={`Cat ${cats[2].id}`} className={styles.catImage} />
                <img src={cats[3].url} alt={`Cat ${cats[3].id}`} className={styles.catImage} />
            </div>
        </div>
    </div>
);

export default MainPage;
