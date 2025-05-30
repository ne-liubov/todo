import { refs } from './refs';

export const createTask = tasks => {
  const markup = tasks
    .map(
      task => `
      <li class="task-list-item ${task.completed ? 'completed' : ''}">
      <p>${task.discr}</p>
      <div class="list-btn">
      <button class="task-list-btn done-btn ${
        task.completed ? 'completed' : ''
      }" data-id="${task.id}">✓</button>
        <button class="task-list-btn delete-btn" data-id="${task.id}">⨉</button>
      </div>
    </li>`
    )
    .join('');

  refs.tasksList.insertAdjacentHTML('beforeend', markup);
};

// очистка
export const clearList = () => {
  refs.tasksList.innerHTML = '';
};
