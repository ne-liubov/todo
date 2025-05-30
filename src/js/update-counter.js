import { getDataFromLS } from './local-storage-api';
import { refs } from './refs';

export const updateTaskCounters = () => {
  const tasks = getDataFromLS('tasks') || [];

  const allCount = tasks.length;
  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = allCount - completedCount;

  refs.allCount.textContent = allCount;
  refs.completedCount.textContent = completedCount;
  refs.activeCount.textContent = activeCount;
};
