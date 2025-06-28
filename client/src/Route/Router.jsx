import React, { lazy } from 'react';

import Loadable from '../loader/Loadable';

const Error = Loadable(lazy(() => import('../pages/Error')));
const AuthCard = Loadable(lazy(() => import('../components/Layout/AuthCard')));
const OrderSteps = Loadable(lazy(() => import('../pages/OrderSteps.jsx')));

export default [
    {
        path: '/',
        element: <AuthCard />,
        children: [
            { path: '*', element: <Error  /> },
            { path: '/', element: <OrderSteps /> },
            { path: '/step1', element: <OrderSteps /> },
            { path: '/step2', element: <OrderSteps /> },
            { path: '/step3', element: <OrderSteps /> },
        ],
    },
];

