import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './components/AppHeader.tsx';
import AppRouter from './AppRouter';
import { initializeCats } from './redux/catsSlice';
import {useAppDispatch} from "./redux/hooks.ts";

const { Content } = Layout;

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeCats());
    }, [dispatch]);

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <AppHeader />
                <Content style={{ padding: '20px' }}>
                    <AppRouter />
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
