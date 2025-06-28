import axios from 'axios';
import { getErrorMessage } from '../utils/errorMessages';
import { validateApiResult } from '../api/apiValidation';

export const request = async (uri, method = 'get', body) => {
    try {
        let result = await axios[method](uri, body);
        // Validate
        validateApiResult(result);
        return result.data;
    } catch (error) {
        const message = getErrorMessage(error);
        return { ok: false, message };
    }
}
