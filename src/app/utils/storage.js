export function getFromStorage(key) {
  const item = localStorage.getItem(key);

  return item && item.length ? JSON.parse(item) : null;
}

export function saveToStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}
