export const categories = ['Task', 'Idea', 'Random thought', 'Quote'];
export const defaultCategory = 'Task';

export const categoryCounter = {};
export const archiveCategoryCounter = {};
export const categoriesIcon = {};

categories.map(category => {
  categoryCounter[category] = 0;
  archiveCategoryCounter[category] = 0;
});
