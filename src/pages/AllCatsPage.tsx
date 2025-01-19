import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCats } from '../redux/catsSlice';
import { RootState } from '../redux/store';
import { Spin } from 'antd';
import CatPostCard from '../components/CatPostCard';
import styles from './AllCatsPage.module.css';
import { useAppDispatch } from '../redux/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

const AllCatsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { cats, loading } = useSelector((state: RootState) => state.cats);


    useEffect(() => {
        if (!cats.length) {
            dispatch(fetchCats(20));
        }
    }, [dispatch, cats.length]);


    const loadMoreCats = () => {
        if (!loading) {
            dispatch(fetchCats(20)); //Новая порция котиков
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <InfiniteScroll
                className={styles.container}
                dataLength={cats.length}
                next={loadMoreCats}
                hasMore={true}
                loader={
                    <div className={styles.loading}>
                        <Spin size="large" />
                        <p>Загружаем новых котиков...</p>
                    </div>
                }
                endMessage={
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                       Котики закончились..
                    </p>
                }
            >
                {cats.map((cat) => (
                    <div className={styles.card} key={cat.id}>
                        <CatPostCard cat={cat} />
                    </div>
                ))}
            </InfiniteScroll>

        </div>
    );
};

export default AllCatsPage;
