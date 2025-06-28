import { setCategories, setProducts, setError } from "../store/slices/productsSlice";
import { getErrorMessage } from "../utils/errorMessages";
import { request } from '../api/axios';
import { config } from '../config/config';
import { fakeCategories, fakeProducts } from '../data/fakeData';

const CATEGORIES_API_URL = config.servers?.categories || 'http://localhost:5001/api';
const ORDERS_API_URL = config.servers?.orders || 'http://localhost:3001/api';

export const fetchCategories = async (dispatch, openDialog, ismoke) => {

    if (ismoke) {
        dispatch(setCategories(fakeCategories));
        return;
    }
    try {
        const uri = `${CATEGORIES_API_URL}/categories`;
        const result = await request(uri, 'get');
        if (!result || result.ok === false) {
            dispatch(setCategories([]));
            // Open a dialog to notify the user that the server is not available
            openDialog(result.message);
            return;
        }
        dispatch(setCategories(result));
    } catch (error) {
        const message = getErrorMessage(error);
        dispatch(setError(message));
        dispatch(setCategories([]));
        if (typeof openDialog === 'function') openDialog();
    }
};

export const fetchProductsByCategory = async (categoryId, dispatch, ismoke) => {
    if (ismoke) {
        // Filter products by category in ismoke mode
        const filteredProducts = fakeProducts.filter(p => p.categoryId === categoryId);
        dispatch(setProducts(filteredProducts));
        return;
    }
    try {
        const uri = `${CATEGORIES_API_URL}/products/${categoryId}`;
        const result = await request(uri, 'get');
        dispatch(setProducts(Object.values(result)));
    } catch (error) {
        const message = getErrorMessage(error);
        dispatch(setError(message));
    }
};

export const submitOrder = async ({ orderData, setStatus, navigate, dispatch, ismoke }) => {
    if (ismoke) {
        setStatus(true);
        navigate('/step3');
        return;
    }
    try {
        const uri = `${ORDERS_API_URL}/orders`;
        const result = await request(uri, 'post', orderData);
        setStatus(result?.status);
        navigate('/step3');
    } catch (error) {
        const message = getErrorMessage(error);
        setStatus('error');
        dispatch(setError(message));
    }
};
