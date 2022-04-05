import { categories, defaultCategory } from './categories';
import { getFormatDate, setCurrentDate } from './instruments';
import datepicker from 'js-datepicker';
import { refs } from './refs';
import { renderNote } from './rederNote';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let datePicker = null;
let editableNote = null;

function chooseSelectedCategory(category, prevCategory) {
  if (prevCategory) {
    return category === prevCategory ? 'selected' : '';
  }
  return category === defaultCategory ? 'selected' : '';
}

const noteForm = (type, prevName, prevCategory, prevContent) => {
  return `<tr id="noteForm">
     <td>
       <input type="text" name="Name" id="noteName" value="${prevName}"/>
     </td>
     <td>${getFormatDate()}</td>
     <td>
       <select id="categoryPicker" name="Category">${Object.keys(categories).map(
         category =>
           `<option value="${category}" ${chooseSelectedCategory(
             category,
             prevCategory,
           )}>${category}</option>`,
       )}</select>
     </td>
     <td>
     <textarea  name="Content" id="noteContent">${prevContent}</textarea>
</td>
     <td>
       <input type="text" name="Dates" id="datePicker" />
     </td>
     <td>
       <button type="button" data-type="done-${type}" id="done" class="button">
         done
       </button>
       <button type="button" id="closeEditForm" class="button">
         cansel
       </button>
     </td>
   </tr>`;
};

const onDoneBtnClick = e => {
  const form = e.target.closest('tr');
  const name = form.querySelector('#noteName').value;
  const category = form.querySelector('#categoryPicker').value;
  const content = form.querySelector('#noteContent').value;
  const newDate = form.querySelector('#datePicker').value;

  if (!name || !content) {
    Notify.failure('fill name ant content fields');
  } else {
    const formType = e.target.getAttribute('data-type');
    if (formType === 'done-add') {
      renderNote(name, category, content, newDate, refs.notesBody);
    } else {
      editableNote.querySelector('.name').textContent = name;
      editableNote.querySelector('.category').textContent = category;
      editableNote.querySelector('.content').textContent = content;
      editableNote.querySelector('img').setAttribute('src', categories[category]);

      let date = editableNote.querySelector('.date').textContent.slice(-10);
      const dateField = editableNote.querySelector('.date');
      if (date) {
        date = date === newDate ? date : `${date} => ${newDate}`;
        dateField.textContent = date;
      } else {
        dateField.textContent = newDate;
      }
    }

    closeForm();
  }
};

export const openNoteForm = e => {
  const openedForm = document.querySelector('#noteForm');
  if (openedForm) {
    closeForm();
  }
  const btnIsAdd = e.target.getAttribute('data-type') === 'addNote';

  let dateSelected = '';
  const place = btnIsAdd ? 'beforeend' : 'afterend';
  const elem = btnIsAdd ? refs.notesBody : e.target.closest('tr');
  const type = btnIsAdd ? 'add' : 'edit';
  let name = '';
  let category = '';

  let content = '';
  if (!btnIsAdd) {
    dateSelected = setCurrentDate(e);
    editableNote = e.target.closest('tr');
    name = editableNote.querySelector('.name').textContent;
    category = editableNote.querySelector('.category').textContent;
    content = editableNote.querySelector('.content').textContent;
  }

  const datepickerOptions = {
    formatter: (input, date) => {
      input.value = date.toLocaleDateString();
    },
    dateSelected,
  };

  elem.insertAdjacentHTML(place, noteForm(type, name, category, content));

  const closeBtn = document.querySelector('#closeEditForm');
  const doneBtn = document.querySelector('#done');
  closeBtn.addEventListener('click', closeForm);
  doneBtn.addEventListener('click', onDoneBtnClick);

  datePicker = datepicker('#datePicker', datepickerOptions);
};

function closeForm() {
  const openedForm = document.querySelector('#noteForm');
  datePicker.remove();
  openedForm.remove();
  datePicker = null;
  editableNote = null;
}
