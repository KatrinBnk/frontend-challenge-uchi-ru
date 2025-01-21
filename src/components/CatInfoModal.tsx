import React, {useEffect, useState} from 'react';
import {Modal, Select, Spin} from 'antd';
import axios from 'axios';
import {translateService} from '../services/translateService.ts';
import CatPostCard from './CatPostCard';
import styles from './CatInfoModal.module.css';

const { Option } = Select;

interface CatCardProps {
    id: string;
    visible: boolean;
    onClose: () => void;
}

//TODO: добавить и другие характеристики котика?

const CatInfoModal: React.FC<CatCardProps> = ({ id, visible, onClose }) => {
    const [catData, setCatData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [language, setLanguage] = useState<'en' | 'ru'>('ru');

    const fetchCatData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.thecatapi.com/v1/images/${id}`);
            const cat = response.data;

            if (cat.breeds?.[0] && language === 'ru') {
                const originMessage = `родом из ${cat.breeds[0].origin}`;
                cat.breeds[0].origin = await translateService(originMessage, 'ru');
                cat.breeds[0].description = await translateService(cat.breeds[0].description, 'ru');
            }

            setCatData(cat);
            setError(false);
        } catch (err) {
            console.error('Error fetching cat data:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (visible) {
            fetchCatData();
        }
    }, [id, visible, language]);

    const handleLanguageChange = (value: 'en' | 'ru') => {
        setLanguage(value);
    };

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <div className={styles.languageSelector}>
                <Select value={language} onChange={handleLanguageChange}>
                    <Option value="en">English</Option>
                    <Option value="ru">Русский</Option>
                </Select>
            </div>
            {loading ? (
                <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
            ) : error || !catData ? (
                <p className={styles.errorText}>Не удалось загрузить информацию о котике.</p>
            ) : (
                <div className={styles.modalContent}>
                    <h1 className={styles.modalTitle}>
                        {language === 'ru' ? 'Давай познакомимся!' : 'Let\'s get acquainted!'}
                    </h1>
                    {catData?.breeds?.[0] ? (
                        <>
                            <p className={styles.breedName}>
                                {language === 'ru'
                                    ? `Моя порода ${catData.breeds[0].name} ${catData.breeds[0].origin}`
                                    : `My breed is ${catData.breeds[0].name} from ${catData.breeds[0].origin}`}
                            </p>
                            <p className={styles.descriptionText}>
                                {catData.breeds[0].description}
                            </p>
                            <i className={styles.sorryText}>
                                {language === 'ru' ?
                                    `*перевод выполнен бесплатным переводчиком, в некоторые моменты информация может быть переведена некорректно. Приношу свои извинения!`
                                    : null
                                }
                            </i>
                        </>
                    ) : (
                        <p className={styles.descriptionText}>
                            {language === 'ru'
                                ? 'Информация обо мне отсутствует в API... Надеюсь, её скоро добавят!'
                                : 'Information about me is missing from the API... Hopefully, it will be added soon!'}
                        </p>
                    )}

                    <div className={styles.catCard}>
                        <CatPostCard cat={catData} isInfoModal={true} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default CatInfoModal;
