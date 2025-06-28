// Generic helper function to validate an API response
export const validateApiResult = (result) => {
    if (!result || !result.data) {
        throw { message: 'Empty result from server' };
    }

    const data = result.data;
    if (!data || typeof data !== 'object') {
        throw { message: 'Data is not valid JSON' };
    }

};

export const validateGetApiPayload = (payload) => {
    if (!payload || typeof payload !== 'object') {
        throw { message: 'Payload is not valid JSON' };
    }

    if (!Object.keys(payload).length > 0) {
        throw { message: 'No page' };
    }
}
