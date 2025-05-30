import { refs } from './refs';

const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');

const applyTheme = theme => {
  if (theme === 'light') {
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  } else {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  }
};

// светлая тема - по умолчанию
const sevedTheme = localStorage.getItem('theme') || 'light';
applyTheme(sevedTheme);

const onToggleTheme = () => {
  // проверка активности светлой темы
  const isCurrentlyLight = document.body.classList.contains('theme-light');

  let newTheme;
  if (isCurrentlyLight) {
    newTheme = 'dark';
  } else {
    newTheme = 'light';
  }

  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
};

refs.themeToggleBtn.addEventListener('click', onToggleTheme);
