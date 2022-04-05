import { refs } from './refs';
import { deleteNote, updateCounter } from './instruments';

const editBtn = '<button type="button" class="button" data-type="edit">edit</button>';

export function archive(target) {
  const note = target.closest('tr');
  note.remove();
  if (note.getAttribute('data-isArchived') === 'false') {
    note.setAttribute('data-isArchived', 'true');
    refs.archiveBody.append(note);
    note.querySelector('[data-type="edit"]').remove();
  } else {
    note.setAttribute('data-isArchived', 'false');
    refs.notesBody.append(note);
    note.querySelector('.buttons').insertAdjacentHTML('afterbegin', editBtn);
  }

  updateCounter(note.getAttribute('data-category'));
}

const onFuncButtonClick = e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  switch (e.target.getAttribute('data-type')) {
    case 'archive':
      archive(e.target);
      break;
    case 'delete':
      deleteNote(e.target);
      break;
  }
};

refs.archiveBody.addEventListener('click', onFuncButtonClick);

const toggleArchive = e => {
  refs.archive.classList.toggle('isHidden');
  e.target.textContent = e.target.textContent === 'show archive' ? 'hide archive' : 'show archive';
};

refs.toggleArchive.addEventListener('click', toggleArchive);
