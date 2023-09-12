import { CATEGORY_COLOR } from "@/constants/category";

export const getCategoryColor = (categoryName: string) => {
  const category = CATEGORY_COLOR.find((item) => item.name === categoryName);
  return category ? category.color : '#000000';
};
