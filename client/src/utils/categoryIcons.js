import { Print, PhotoCamera, Book, Category } from '@mui/icons-material';

export const categoryIcons = {
  'הדפסות': Print,
  'צילומים': PhotoCamera,
  'כריכות': Book,
};

export const getCategoryIcon = (categoryName) => {
  return categoryIcons[categoryName] || Category;
};
