import './sass/main.scss';
import baselineElements from './utlis/baselineElements';
import { openNoteForm } from './utlis/noteForm';
import { deleteNote } from './utlis/instruments';
import { renderNote } from './utlis/rederNote';
import { refs } from './utlis/refs';
import { archive } from './utlis/acrhive';

baselineElements.map(({ icon, name, category, content, date }) =>
  renderNote(name, category, content, date, refs.notesBody),
);

const onFuncButtonClick = e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  switch (e.target.getAttribute('data-type')) {
    case 'edit':
      openNoteForm(e);
      break;
    case 'archive':
      archive(e.target);
      break;
    case 'delete':
      deleteNote(e.target);
      break;
  }
};

refs.notesBody.addEventListener('click', onFuncButtonClick);

refs.addBtn.addEventListener('click', openNoteForm);
