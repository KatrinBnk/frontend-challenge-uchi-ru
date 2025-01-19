import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import AppHeader from './components/AppHeader.tsx';
import MainPage from './components/MainPage';
import AllCatsPage from './components/AllCatsPage';
import FavoritesPage from './components/FavoritesPage';
import { initializeCats } from './redux/catsSlice';

const { Content } = Layout;

const App: React.FC = () => {
    const dispatch = useDispatch();

    // Инициализация данных при загрузке приложения
    useEffect(() => {
        dispatch(initializeCats());
    }, [dispatch]);

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <AppHeader />
                <Content style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/all" element={<AllCatsPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
