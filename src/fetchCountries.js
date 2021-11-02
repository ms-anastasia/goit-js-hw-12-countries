
function fetchCountry(searchQuery) {
  const url = `https://restcountries.com/v2/name/${searchQuery}`;
  return fetch(url).then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                return response.json();
            })
}
export default { fetchCountry };