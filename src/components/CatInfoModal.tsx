import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import axios from 'axios';
import CatPostCard from "./CatPostCard";
import styles from './CatInfoModal.module.css';

interface CatCardProps {
    id: string;
    visible: boolean;
    onClose: () => void;
}

//TODO: Добавить перевод с английского языка на русский?

const CatInfoModal: React.FC<CatCardProps> = ({ id, visible, onClose }) => {
    const [catData, setCatData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (visible) {
            const fetchCatData = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`https://api.thecatapi.com/v1/images/${id}`);
                    setCatData(response.data);
                    setError(false);
                } catch (err) {
                    console.error("Error fetching cat data:", err);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };

            fetchCatData();
        }
    }, [id, visible]);

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            {loading ? (
                <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
            ) : error || !catData ? (
                <p className={styles.errorText}>Не удалось загрузить информацию о котике.</p>
            ) : (
                <div className={styles.modalContent}>
                    <h1 className={styles.modalTitle}>Давай познакомимся!</h1>
                    {catData.breeds?.[0] ? (
                        <>
                            <h3 className={styles.breedName}>Моя порода называется: {catData.breeds[0].name}</h3>
                            <p className={styles.originText}>Я родом из {catData.breeds[0].origin}</p>
                            <p className={styles.descriptionText}><strong>Описание:</strong> {catData.breeds[0].description}</p>
                        </>
                    ) : (
                        <p className={styles.descriptionText}>
                            Информация обо мне отсутствует в API... Надеюсь, её скоро добавят, а пока что сохрани меня в любимые котики!
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
