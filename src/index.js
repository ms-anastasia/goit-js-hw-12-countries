import countryTemplate from '../templates/countries.hbs';
import countryList from '../templates/countryList.hbs';
import './styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = {
cardContainer: document.querySelector ('.js-card-container'),
formInput: document.querySelector ('.form-input')
}

refs.formInput.addEventListener('input', debounce(onInput, 1000))

function onInput(e) {
    e.preventDefault()
    const searchQuery = refs.formInput.value;
    clearContainer();
    API.fetchCountry(searchQuery).then(renderCountry).catch(fetchError)
 }

function renderCountry(country) {
    if (country.length === 1) {
        refs.cardContainer.innerHTML = countryTemplate(country)
    }
    else if (country.length <= 10) {
        refs.cardContainer.innerHTML = countryList(country)
    }
    else if (country.length > 10) {
        alert({
            text: '! Too many matches found. Please, enter a more specific query!',
            addClass: 'notify',
            maxOpen: 1,
            maxStrategy: 'close',
            delay: 2000,
        });
     }
}
function fetchError(error) {
    alert({
        text: '! Information not found! Please, enter correct data',
        addClass: 'notify',
        maxOpen: 1,
        maxStrategy: 'close',
        delay: 2000,
    });
}
function clearContainer() {
    refs.cardContainer.innerHTML = '';
}