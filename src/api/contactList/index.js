export const fetchContactList =

  fetch('https://648846e80e2469c038fd6316.mockapi.io/api/v1/contacts/contact', {
    method: 'GET',
    headers: {'content-type':'application/json'},
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });

export const createNewContact = (newContact) => {

  fetch('https://648846e80e2469c038fd6316.mockapi.io/api/v1/contacts/contact', {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(newContact)
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

export const deleteContact = (contactId) => {

  fetch('https://648846e80e2469c038fd6316.mockapi.io/api/v1/contacts/contact/' + contactId, {
    method: 'DELETE',
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

export const fetchCountryList =

  fetch('https://restcountries.com/v2/all ', {
    method: 'GET',
    headers: {'content-type':'application/json'},
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });