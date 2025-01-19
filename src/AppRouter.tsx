import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import AllCatsPage from './pages/AllCatsPage.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/all" element={<AllCatsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;