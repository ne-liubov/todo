import { refs } from './refs';
import { createTask } from './tasks';
import { getDataFromLS } from './local-storage-api';
import { updateTaskCounters } from './update-counter';

// отрисовка сохранённых задач
export const renderSavedTasks = () => {
  const savedTasks = getDataFromLS('tasks') || [];

  const activeTasks = savedTasks.filter(task => !task.completed);
  const completedTasks = savedTasks.filter(task => task.completed);
  const sortedTasks = [...activeTasks, ...completedTasks];

  if (sortedTasks.length > 0) {
    refs.emptyList.classList.add('hidden');
    createTask(sortedTasks);
  } else {
    refs.emptyList.classList.remove('hidden');
  }

  updateTaskCounters();
};
