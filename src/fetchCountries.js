
function fetchCountry(searchQuery) {
  const url = `https://restcountries.com/v2/name/${searchQuery}`;
  return fetch(url).then(response => response.json());
}

export default { fetchCountry };