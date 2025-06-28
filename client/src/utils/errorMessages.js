const defaultErrorMessage = 'אירעה שגיאה בלתי צפויה.';

const errorMessages = {
    // HTTP Status errors
    'Request failed with status code 500': 'לא ניתן להתחבר לשרת. ייתכן שהשרת אינו פעיל או שהגדרות החיבור שגויות.',
    'Request failed with status code 404': 'המשאב המבוקש לא נמצא.',
    'Request failed with status code 400': 'בקשה לא תקינה.',
    
    // Network errors
    'Network Error': 'אירעה בעיה בחיבור לשרת.',
    'system error': 'אירעה שגיאת מערכת.',
    
    // Server responses from Node.js server
    'Server error - please try again': 'אירעה שגיאת שרת, אנא נסה שוב.',
    'Order number already exists - please try again': 'מספר הזמנה כבר קיים, אנא נסה שוב.',
    'Invalid data': 'נתונים לא תקינים.',
    
    // Validation errors from Node.js server
    'fullName is required': 'שם מלא הוא שדה חובה.',
    'email is required': 'כתובת אימייל היא שדה חובה.',
    'address is required': 'כתובת הוא שדה חובה.',
    'items is required': 'פריטים הם שדה חובה.',
    'totalAmount is required': 'סכום כולל הוא שדה חובה.',
    'fullName must be at least 2 characters': 'שם מלא חייב להיות לפחות 2 תווים.',
    'email is not valid': 'כתובת האימייל לא תקינה.',
    'address must be at least 5 characters': 'כתובת חייבת להיות לפחות 5 תווים.',
    'quantity must be a positive number': 'כמות חייבת להיות מספר חיובי.',
    'price must be a positive number': 'מחיר חייב להיות מספר חיובי.',
    'items must contain at least 1 items': 'חייב להיות לפחות פריט אחד.',
    
    // .NET Server responses
    'Error fetching categories from database': 'שגיאה בטעינת קטגוריות.',
    'Error fetching products from database': 'שגיאה בטעינת מוצרים.',
    
    // Generic responses
    'No page': 'הדף המבוקש לא נמצא.',
    'Empty result from server': defaultErrorMessage,
    'Invalid JSON response': defaultErrorMessage,
    'Payload is not valid JSON': defaultErrorMessage,
    'Data is not valid JSON': defaultErrorMessage,
    'Fail. Invalid status from server': defaultErrorMessage,

};

export const getErrorMessage = (error) => {
    const englishMessage = error?.response?.data?.error_message || error?.response?.data?.message || error.error_message || error.message;
    return errorMessages[englishMessage] || defaultErrorMessage;
};
