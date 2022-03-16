import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLinkWithQuery } from '../hooks/useLinkWithQuery';
import { ConfirmedRoute } from './routes/ConfirmedRoute';
import { Home } from './routes/Home';
import { NewRoute } from './routes/NewRoute';
import { Project } from './routes/Project';
import { PendingRoute } from './routes/PendingRoute';
import { RootRoute } from './routes/RootRoute';
import { TransactionsRoute } from './routes/TransactionsRoute';

export const Router: FC = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route element={<RootRoute />}>
                    <Route index element={<IndexRedirect />} />
                    <Route path="new" element={<NewRoute />} />
                    <Route path="pending" element={<PendingRoute />} />
                    <Route path="confirmed" element={<ConfirmedRoute />} />
                    <Route path="transactions" element={<TransactionsRoute />} />
                </Route>
                <Route path="home" element={<Home />} />
                <Route path="/project/:id" element={<Project />} />
            </Routes>
        </BrowserRouter>
    );
};

const IndexRedirect: FC = () => {
    const to = useLinkWithQuery('/new');
    return <Navigate to={to} replace />;
};