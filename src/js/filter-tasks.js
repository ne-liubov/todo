import { refs } from './refs';
import { getDataFromLS } from './local-storage-api';
import { clearList, createTask } from './tasks';

export const filterTask = filter => {
  const allTasks = getDataFromLS('tasks') || [];

  let filteredTasks = [];

  switch (filter) {
    case 'completed':
      filteredTasks = allTasks.filter(task => task.completed);
      break;
    case 'active':
      filteredTasks = allTasks.filter(task => !task.completed);
      break;
    default:
      filteredTasks = allTasks;

      const activeTasks = allTasks.filter(task => !task.completed);
      const completedTasks = allTasks.filter(task => task.completed);
      filteredTasks = [...activeTasks, ...completedTasks];
  }

  clearList();

  if (filteredTasks.length > 0) {
    refs.emptyList.classList.add('hidden');
    createTask(filteredTasks);
  } else {
    refs.emptyList.classList.remove('hidden');
  }
};
