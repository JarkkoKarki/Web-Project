const fetchData = async (url, options = {}) => {

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    if (json.message) {
      throw new Error(json.message);
    }
    throw new Error(`Error ${response.status} occured`);
  }
  return json;
};

export {fetchData};
