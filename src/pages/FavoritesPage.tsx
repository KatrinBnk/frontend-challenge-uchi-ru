import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchFavoriteCatsFromStorage } from '../redux/catsSlice.ts';
import { RootState } from '../redux/store.ts';
import { Spin, Empty } from 'antd';
import CatPostCard from "../components/CatPostCard.tsx";
import {useAppDispatch} from "../redux/hooks.ts";

const FavoritesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { allCats } = useSelector((state: RootState) => state.cats);
    const [loading, setLoading] = useState(true);

    const favoriteCats = allCats.filter((cat) => cat.isFavorite);

    useEffect(() => {
        const favoriteIds = localStorage.getItem('favorites')
            ? JSON.parse(localStorage.getItem('favorites')!)
            : [];

        const missingFavorites = favoriteIds.filter(
            (id: string) => !allCats.some((cat) => cat.id === id)
        );

        if (missingFavorites.length) {
            setLoading(true);
            dispatch(fetchFavoriteCatsFromStorage(missingFavorites)).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, favoriteCats.length, allCats]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Spin size="large" />
                <p>Загружаем избранных котиков...</p>
            </div>
        );
    }

    if (!favoriteCats.length) {
        return (
            <Empty description="Нет избранных котиков" style={{ margin: '50px auto' }} />
        );
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '20px' }}>
            {favoriteCats.map((cat) => (
                <CatPostCard key={cat.id} cat={cat}/>
            ))}
        </div>
    );
};

export default FavoritesPage;
