import { categories, defaultCategory } from './categories';
import { getFormatDate, setCurrentDate } from './instruments';
import datepicker from 'js-datepicker';
import { refs } from './refs';

let datePicker = null;

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
       <select id="categoryPicker" name="Category">${categories.map(
         category =>
           `<option value="${category}" ${chooseSelectedCategory(
             category,
             prevCategory,
           )}>${category}</option>`,
       )}</select>
     </td>
     <td>
     <textarea  type="text" name="Content" id="noteContent">${prevContent}</textarea>
</td>
     <td>
       <input type="text" name="Dates" id="datePicker" />
     </td>
     <td>
       <button type="button" id="${type}-done">
         done
       </button>
       <button type="button" id="closeEditForm">
         cansel
       </button>
     </td>
   </tr>`;
};

export const openNoteForm = e => {
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

    const note = e.target.closest('tr');
    name = note.querySelector('.name').textContent;
    category = note.querySelector('.category').textContent;
    content = note.querySelector('.content').textContent;
  }

  const datepickerOptions = {
    formatter: (input, date) => {
      input.value = date.toLocaleDateString();
    },
    dateSelected,
  };
  const openedForm = document.querySelector('#noteForm');
  if (openedForm) {
    closeForm();
  }

  elem.insertAdjacentHTML(place, noteForm(type, name, category, content));

  const closeRtn = document.querySelector('#closeEditForm');
  closeRtn.addEventListener('click', closeForm);

  datePicker = datepicker('#datePicker', datepickerOptions);
};

export function closeForm() {
  const openedForm = document.querySelector('#noteForm');
  datePicker.remove();
  openedForm.remove();
  datePicker = null;
}
