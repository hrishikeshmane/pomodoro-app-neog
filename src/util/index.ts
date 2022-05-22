function getFromStorage(key: string, type: "local" | "session", fallback: any) {
  let getJson;
  if (type === "local") {
    getJson = localStorage.getItem(key);
  } else {
    getJson = sessionStorage.getItem(key);
  }
  if (getJson) {
    return JSON.parse(getJson);
  } else {
    return fallback;
  }
}

export { getFromStorage };
