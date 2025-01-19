import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Страница не найдена</p>
            <button onClick={handleGoHome} className={styles.button}>
                Вернуться на главную страницу
            </button>
            <button onClick={()=> {navigate('/all')}} className={styles.button}>
                Хочу обратно к котикам
            </button>
            <button onClick={()=> {navigate('/favorites')}} className={styles.button}>
                Где мои любимые котики??
            </button>
        </div>
    );
};

export default NotFoundPage;