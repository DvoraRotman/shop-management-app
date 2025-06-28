import * as Yup from 'yup';

// Order validation schema
const orderSchema = Yup.object({
    fullName: Yup.string().min(2, 'שם מלא חייב להכיל לפחות 2 תווים').required('שם מלא נדרש'),
    email: Yup.string().email('כתובת מייל לא תקינה').required('כתובת מייל נדרשת'),
    address: Yup.string().min(5, 'כתובת חייבת להכיל לפחות 5 תווים').required('כתובת נדרשת'),
    items: Yup.array(
        Yup.object({
            productName: Yup.string().required('שם מוצר נדרש'),
            quantity: Yup.number().min(0, 'כמות חייבת להיות 0 או יותר').required('כמות נדרשת'),
            price: Yup.number().min(0, 'מחיר חייב להיות 0 או יותר').required('מחיר נדרש')
        })
    ).min(1, 'חייב להיות לפחות מוצר אחד'),
    totalAmount: Yup.number().min(0, 'סכום חייב להיות 0 או יותר').required('סכום נדרש')
});

// Validate order data. Returns only the first error.
export async function validateOrderData(orderData) {
    try {
        await orderSchema.validate(orderData, { abortEarly: true });
        return { isValid: true };
    } catch (err) {
        return { isValid: false, message: err.message };
    }
}

//  Function for backward compatibility
export const validateApiResult = (result) => {
    // Check if result has data
    if (!result || !result.data) {
        throw new Error('Empty result from server');
    }
    return true;
};
