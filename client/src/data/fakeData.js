// This file contains fake data for the case when there is no connection to the database.

export const fakeCategories = [
  { id: 1, name: "הדפסות", description: "שירותי הדפסה שונים", createdAt: "2025-06-27T10:00:00Z" },
  { id: 2, name: "צילומים", description: "שירותי צילום ועיבוד תמונות", createdAt: "2025-06-27T10:00:00Z" },
  { id: 3, name: "כריכות", description: "שירותי כריכה למסמכים", createdAt: "2025-06-27T10:00:00Z" }
];

export const fakeProducts = [
  { id: 1, name: "הדפסה שחור לבן", description: "הדפסה איכותית A4", price: 0.5, categoryId: 1, createdAt: "2025-06-27T10:00:00Z" },
  { id: 2, name: "הדפסה צבעונית", description: "הדפסה צבעונית A4", price: 2.0, categoryId: 1, createdAt: "2025-06-27T10:00:00Z" },
  { id: 3, name: "הדפסה A3", description: "הדפסה גדולה A3", price: 1.5, categoryId: 1, createdAt: "2025-06-27T10:00:00Z" },
  { id: 4, name: "צילום מסמכים", description: "צילום מסמכים איכותי", price: 1.0, categoryId: 2, createdAt: "2025-06-27T10:00:00Z" },
  { id: 5, name: "צילום תמונות", description: "צילום תמונות מקצועי", price: 3.0, categoryId: 2, createdAt: "2025-06-27T10:00:00Z" },
  { id: 6, name: "כריכה רגילה", description: "כריכה פשוטה למסמכים", price: 5.0, categoryId: 3, createdAt: "2025-06-27T10:00:00Z" },
  { id: 7, name: "כריכת ספירלה", description: "כריכה ספירלה מתקדמת", price: 8.0, categoryId: 3, createdAt: "2025-06-27T10:00:00Z" }
];

export const fakeOrder = {
  fullName: "John Doe",
  email: "john@example.com",
  address: "123 Main St, Tel Aviv",
  items: [
    { productId: "1", productName: "הדפסה שחור לבן", quantity: 2, price: 0.5, totalPrice: 1.0 },
    { productId: "4", productName: "צילום מסמכים", quantity: 1, price: 1.0, totalPrice: 1.0 }
  ],
  totalAmount: 2.0,
  id: "665f1e2b7c1a2b0012a3b456",
  orderNumber: "ORD-000001",
  status: "confirmed",
  createdAt: "2025-06-27T10:00:00Z",
  customer: {
    fullName: "John Doe",
    email: "john@example.com",
    address: "123 Main St, Tel Aviv"
  },
  itemsCount: 2
};
