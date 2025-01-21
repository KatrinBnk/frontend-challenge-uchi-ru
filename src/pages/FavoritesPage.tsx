import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {clearFavorites, fetchFavoriteCatsFromStorage} from '../redux/catsSlice.ts';
import { RootState } from '../redux/store.ts';
import {Spin, Empty, FloatButton, ConfigProvider} from 'antd';
import CatPostCard from "../components/CatPostCard.tsx";
import {useAppDispatch} from "../redux/hooks.ts";
import {DeleteOutlined} from "@ant-design/icons";


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
            <Empty description="Нет любимых котиков" style={{ margin: '50px auto' }} />
        );
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#d11141',
                        colorPrimaryHover: '#FF5D55',
                        boxShadowSecondary: '0 4px 4px 0 #0000003D',
                    },
                }}
            >
                <FloatButton
                    onClick={() => dispatch(clearFavorites())}
                    icon={<DeleteOutlined />}
                    tooltip='Удалить любимых котиков...'
                    type="primary"
                    className="custom-float-button"
                />
            </ConfigProvider>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '20px', justifyContent: 'center'}}>
                {favoriteCats.map((cat) => (
                    <CatPostCard key={cat.id} cat={cat}/>
                ))}
            </div>
        </>
    );
};

export default FavoritesPage;
