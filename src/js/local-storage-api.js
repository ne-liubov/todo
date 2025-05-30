export const addDataToLS = (key, value) => {
  try {
    const normalaizeValue = JSON.stringify(value);
    localStorage.setItem(key, normalaizeValue);
  } catch (error) {
    console.log(error);
  }
};

export const getDataFromLS = key => {
  try {
    const value = localStorage.getItem(key);
    // если value=null, то верни undefined, а если нет, то распарсь
    return value === null ? undefined : JSON.parse(value);
  } catch (error) {
    console.log(error);
  }
};

export const removeFromLS = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};