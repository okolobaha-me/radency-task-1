import { format } from 'date-fns';
import { archiveCategoryCounter, categoryCounter } from './categories';

export function getFormatDate(date = new Date()) {
  return format(date, 'dd.MM.yyyy');
}

export function setCurrentDate(e) {
  const currentDate = e.target.closest('tr').querySelector('.date').textContent.slice(-10);
  if (currentDate) {
    const day = currentDate.split('.')[0];
    const month = currentDate.split('.')[1];
    const year = currentDate.split('.')[2];

    return new Date(year, month - 1, day);
  }

  return '';
}

export function updateCounter(category) {
  categoryCounter[category] = document.querySelectorAll(
    `#noteTable [data-category="${category}"]`,
  ).length;
  archiveCategoryCounter[category] = document.querySelectorAll(
    `#archiveTable [data-category="${category}"]`,
  ).length;
  updateCounterTable(category);
}

export function updateCounterTable(category) {
  const categoryRow = document.querySelector(`[data-category="${category}-archive"]`);
  if (categoryCounter[category] + archiveCategoryCounter[category] === 0) {
    categoryRow.classList.add('isHidden');
  } else {
    categoryRow.classList.remove('isHidden');
  }
  const active = categoryRow.querySelector('[data-active]');

  active.textContent = categoryCounter[category];
  const archive = categoryRow.querySelector('[data-archive]');
  archive.textContent = archiveCategoryCounter[category];
}

export function deleteNote(elem) {
  const row = elem.closest('tr');
  row.remove();
  updateCounter(row.getAttribute('data-category'));
}
