
export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (value && isJsonString(value)) {
    return JSON.parse(value);
  }

  return value;
};

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : value,
  );
};