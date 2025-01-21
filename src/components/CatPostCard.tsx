import React, { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { toggleFavorite } from '../redux/catsSlice';
import { useDispatch } from 'react-redux';
import styles from './CatPostCard.module.css';
import CatInfoModal from "./CatInfoModal.tsx";

interface CatPostCardProps {
    cat: {
        id: string;
        url: string;
        isFavorite: boolean;
    };
    isInfoModal?: boolean;
}

//TODO: есть проблема с залипанием лайка при быстром и хаотичном движении курсора, нужно исправить.

const CatPostCard: React.FC<CatPostCardProps> = ({ cat , isInfoModal}) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Чтобы не открылась модалка с информацией о котике
        dispatch(toggleFavorite(id));
        setIsHovered(false);
    };

    const handleOpenModal = () => {
        if (!isInfoModal) {
            setIsModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
        <div className={styles.card} onClick={handleOpenModal}>
            <div className={styles.cardImageWrapper}>
                <img
                    alt="cat"
                    src={cat.url}
                    className={styles.cardImage}
                />
                {!isInfoModal &&
                <div
                    onClick={(e) => handleToggleFavorite(e, cat.id)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`${styles.likeButton} ${!cat.isFavorite ? 'inactive' : ''}`}
                    style={{ color: isHovered && cat.isFavorite ? '#BB777C' : '' }}
                >
                    {cat.isFavorite || isHovered ? <HeartFilled /> : <HeartOutlined />}
                </div>
                }
            </div>
        </div>
            <CatInfoModal
                id={cat.id}
                visible={isModalVisible}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default CatPostCard;
