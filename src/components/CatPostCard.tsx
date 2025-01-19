import React, { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { toggleFavorite } from '../redux/catsSlice';
import { useDispatch } from 'react-redux';
import styles from './CatPostCard.module.css';

interface CatPostCardProps {
    cat: {
        id: string;
        url: string;
        isFavorite: boolean;
    };
}

//TODO: есть проблема с залипанием лайка при быстром и хаотичном движении курсора, нужно исправить.

const CatPostCard: React.FC<CatPostCardProps> = ({ cat }) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const handleToggleFavorite = (id: string) => {
        dispatch(toggleFavorite(id));
        setIsHovered(false);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardImageWrapper}>
                <img
                    alt="cat"
                    src={cat.url}
                    className={styles.cardImage}
                />
                <div
                    onClick={() => handleToggleFavorite(cat.id)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`${styles.likeButton} ${!cat.isFavorite ? 'inactive' : ''}`}
                    style={{ color: isHovered && cat.isFavorite ? '#BB777C' : '' }}
                >
                    {cat.isFavorite || isHovered ? <HeartFilled /> : <HeartOutlined />}
                </div>
            </div>
        </div>
    );
};

export default CatPostCard;
