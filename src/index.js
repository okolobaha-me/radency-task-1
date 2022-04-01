import './sass/main.scss';
import { format } from 'date-fns';

const baselineElements = [
  {
    icon: 'teal',
    name: 'shoppingList',
    category: 'Task',
    content: 'Tomatoes, bread',
    date: '',
  },
  {
    icon: 'green',
    name: 'Mind',
    category: 'Random thought',
    content: 'What if.....',
    date: '',
  },
  {
    icon: 'blue',
    name: 'Gajusz Juliusz Cezar',
    category: 'Quote',
    content: 'Veni vidi vici',
    date: '',
  },
  {
    icon: 'teal',
    name: 'clean room',
    category: 'Task',
    content: '',
    date: '04.04.2022',
  },
  {
    icon: 'yellow',
    name: 'new feature',
    category: 'Idea',
    content: 'Tomatoes, bread',
    date: '01.05.2022',
  },
  {
    icon: 'yellow',
    name: 'use uml',
    category: 'Idea',
    content: 'use uml for big projects ',
    date: '',
  },
  {
    icon: 'teal',
    name: 'react',
    category: 'Task',
    content: 'learn react',
    date: '01.05.2022',
  },
];
const refs = {
  notesBody: document.querySelector('#notesBody'),
  addBtn: document.querySelector('.add-btn')
};
const categoryCounter = {
  Task: 0,
  Idea: 0,
  'Random thought': 0,
  Quote: 0,
};
const archiveCategoryCounter = {
  Task: 0,
  Idea: 0,
  'Random thought': 0,
  Quote: 0,
};

function getFormatDate(date = new Date()) {
  return format(date, 'dd.MM.yyyy');
}

function updateCounter(category, type = 'main') {
  categoryCounter[category] = document.querySelectorAll(`[data-category="${category}"]`).length;

  if (type === 'archive') {
    archiveCategoryCounter[category] = document.querySelectorAll(
      `[data-category="${category}-archive"]`,
    ).length;
  }

  updateCounterTable(category);
}

function renderNote(icon, name, category, content, dates) {
  const row = `<tr data-category="${category}">
        <td class="">${name}</td>
        <td class="">${getFormatDate()}</td>
        <td class="" style="background-color: ${icon};">${category}</td>
        <td class="">${content}</td>
        <td class="">${dates}</td>
        <td class="">
        <button type="button" data-type="edit">edit</button>
        <button type="button" data-type="archive">archive</button>
        <button type="button" data-type="delete">del</button>
        </td>
      </tr>`;

  refs.notesBody.insertAdjacentHTML('beforeend', row);
  updateCounter(category);
}

function updateCounterTable(category) {
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

baselineElements.map(({ icon, name, category, content, date }) =>
  renderNote(icon, name, category, content, date),
);

const onButtonClick = e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  switch (e.target.getAttribute('data-type')) {
    case 'edit':
      break;
    case 'archive':
      break;
    case 'delete':
      deleteNote(e.target);
      break;
  }
};

function deleteNote(elem) {
  const row = elem.closest('tr');
  row.remove();
  updateCounter(row.getAttribute('data-category'));
}

refs.notesBody.addEventListener('click', onButtonClick);

const openAddModal = () => {

}

refs.addBtn.addEventListener('click', openAddModal)

