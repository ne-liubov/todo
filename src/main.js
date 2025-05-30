import {
  addDataToLS,
  getDataFromLS,
  removeFromLS,
} from './js/local-storage-api';

import { createTask, clearList } from './js/tasks';
import { refs } from './js/refs';
import './js/theme-switcher';
import { renderSavedTasks } from './js/render-tasks';
import { updateTaskCounters } from './js/update-counter';
import { filterTask } from './js/filter-tasks';

renderSavedTasks();
updateTaskCounters();

const onFormSubmit = event => {
  event.preventDefault();

  const currentInput = refs.taskInput.value.trim();
  if (currentInput === '') return;

  const task = {
    id: crypto.randomUUID(),
    discr: currentInput,
    completed: false,
  };

  const tasks = getDataFromLS('tasks') || [];
  tasks.push(task);

  addDataToLS('tasks', tasks);
  refs.emptyList.classList.add('hidden');
  createTask([task]);
  updateTaskCounters();
  refs.headerForm.reset();
};

const onTasksListClick = event => {
  const target = event.target; // элемент, по которому клик
  const taskItem = target.closest('.task-list-item'); // ищет ближайшего родителя с нужным классом
  const taskId = target.dataset.id; // id таски (в разметке есть data-id="${task.id})

  let tasks = getDataFromLS('tasks') || [];

  // проверка клика по delete
  if (target.classList.contains('delete-btn')) {
    tasks = tasks.filter(task => task.id !== taskId);
    addDataToLS('tasks', tasks);
    updateTaskCounters();

    if (taskItem) taskItem.remove();
    if (tasks.length === 0) refs.emptyList.classList.remove('hidden');
  }

  // проверка клика по done
  if (target.classList.contains('done-btn')) {
    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    addDataToLS('tasks', tasks);
    updateTaskCounters();
    // taskItem.classList.toggle('completed');

    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const currentFilter = activeFilterBtn?.dataset.filter || 'all';
    filterTask(currentFilter);
  }
};

const onClearBtn = () => {
  clearList();
  removeFromLS('tasks');
  updateTaskCounters();
  refs.emptyList.classList.remove('hidden');
};

const onFilterClick = event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;

  document
    .querySelectorAll('.filter-btn')
    .forEach(btn => btn.classList.remove('active'));

  button.classList.add('active');

  const filterType = button.dataset.filter;
  filterTask(filterType);
};

refs.filterBtnAll.parentElement.parentElement.addEventListener(
  'click',
  onFilterClick
);
refs.headerForm.addEventListener('submit', onFormSubmit);
refs.tasksList.addEventListener('click', onTasksListClick);
refs.clearBtn.addEventListener('click', onClearBtn);
