const continentSelect = document.getElementById('continent-select')
const countryList = document.getElementById('countries-list')

/*
 Calling the queryFetch function, to get the list of all the continents. 
 We are getting the name and the code of the continents.
 Using this information to populate the dropdown in our application.
*/
queryFetch(`
  query {
    continents {
      name
      code
    }
  }
`).then(data => {
  data.data.continents.forEach(continent => {
    const option = document.createElement('option')
    option.value = continent.code
    option.innerText = continent.name
    continentSelect.append(option)
  })
})

/*
  As we change the dropdown, we see the different list of countries
  for each continent.
  For that we are adding the eventListener.
  We are also calling the getContinentCountries method which takes the continentcode
  and displays all the countries for that continent.
*/
continentSelect.addEventListener('change', async e => {
  const continentCode = e.target.value
  const countries = await getContinentCountries(continentCode)
  countryList.innerHTML = ''
  countries.forEach(country => {
    const element = document.createElement('div')
    element.innerText = country.name
    countryList.append(element)
  })
})

/*
 Using this function to get the list of all the country for each continent.
 We are calling the queryFetch method with the query to get each continent and its countries.
 We are passing the continentCode as the variable as the second param for the queryFetch by writing, 
  { code: continentCode }
*/
function getContinentCountries(continentCode) {
  return queryFetch(`
    query getCountries($code: ID!) {
      continent(code: $code) {
        countries {
          name
        }
      }
    }
  `, { code: continentCode }).then(data => {
    return data.data.continent.countries
  })
}

/*
  Function to fetch the continents and countries from the provided URL.
  This funcition takes two parameters,
   1. query : It is the graphQL query. It consists of a query that we want in the frontend
   2. variables: It is used to pass the variable like $code in our example

*/
function queryFetch(query, variables) {
  return fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }).then(res => res.json())
}