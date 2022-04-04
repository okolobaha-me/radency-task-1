import task from '../icons/task.svg';
import idea from '../icons/idea.svg';
import thought from '../icons/thought.svg';
import quote from '../icons/quote.svg';

export const categories = {
  Task: task,
  Idea: idea,
  'Random thought': thought,
  Quote: quote,
};

export const defaultCategory = 'Task';

export const categoryCounter = {};
export const archiveCategoryCounter = {};

Object.keys(categories).map(category => {
  categoryCounter[category] = 0;
  archiveCategoryCounter[category] = 0;
});
