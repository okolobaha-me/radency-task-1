import { getFormatDate, updateCounter } from './instruments';

export function renderNote(icon, name, category, content, dates, elem) {
  const row = `<tr data-category="${category}">
        <td class="name">${name}</td>
        <td class="">${getFormatDate()}</td>
        <td class="category" style="background-color: ${icon};">${category}</td>
        <td class="content">${content}</td>
        <td class="date">${dates}</td>
        <td class="">
        <button type="button" data-type="edit">edit</button>
        <button type="button" data-type="archive">archive</button>
        <button type="button" data-type="delete">del</button>
        </td>
      </tr>`;

  elem.insertAdjacentHTML('beforeend', row);
  updateCounter(category);
}
