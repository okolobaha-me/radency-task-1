import { getFormatDate, updateCounter } from './instruments';
import { categories } from './categories';

export function renderNote(name, category, content, dates, elem) {
  const row = `<tr data-category="${category}" data-isArchived="false">
        <td><img src="${
          categories[category]
        }" alt="category icon" width="20px" class="hello"><span class="name">${name}</span></td>
        <td class="">${getFormatDate()}</td>
        <td class="category">${category}</td>
        <td class="content">${content}</td>
        <td class="date">${dates}</td>
        <td class="buttons">
        <button type="button" data-type="edit">edit</button>
        <button type="button" data-type="archive">archive</button>
        <button type="button" data-type="delete">del</button>
        </td>
      </tr>`;

  elem.insertAdjacentHTML('beforeend', row);
  updateCounter(category);
}
