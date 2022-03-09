import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import baseURL from './api/api.js';
import ContactList from './Components/ContactList/ContactList';
import BasicPagination from './Components/Pagination/Pagination';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [pageCount, setPageCount] = useState(5);
  const [page, setPage] = useState(1);

  // Get contacts based on page number
  useEffect(() => {
    getContacts();
  }, [page]);

  // REST functions
  const getContacts = () => {
    var url = new URL(`${baseURL}contacts`);
    var params = { pageCount: pageCount, page: page };
    setParams(url, params);

    fetch(url)
      .then((res) => res.json())
      .then((people) => setContacts(people))
      .catch((err) => console.error(err));
  };

  const deleteContact = (e, contact) => {
    e.preventDefault();
    let answer = window.confirm(
      `Are you sure you want to remove ${contact.first_name} from your contacts?`
    );
    if (answer) {
      var url = new URL(`${baseURL}contacts/${contact.id}/delete`);
      fetch(url, {
        method: 'DELETE',
      })
        .then(() => getContacts())
        .catch((err) => console.error(err));
    } else {
      return;
    }
  };

  // Helper functions
  // Assigns parameters to the url
  const setParams = (url, params) => {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return url;
  };

  const scrollPage = (e) => {
    // Get aria label for page string and convert it to number
    let ariaLabel = e.target.getAttribute('aria-label');
    let pageNumber = Number(ariaLabel?.slice(-1));
    // If it is not a number, an arrow button was clicked
    if (Number.isNaN(pageNumber)) {
      // Get the value of the data-testid attribute and change page number accordingly
      let dataTestId = e.target.getAttribute('data-testid');
      if (dataTestId === 'NavigateNextIcon') {
        let nextPage = page + 1;
        // Prevent out of bounds
        if (nextPage > 19) {
          return;
        } else {
          setPage(nextPage);
        }
      } else if (dataTestId === 'NavigateBeforeIcon') {
        // Prevent out of bounds
        let prevPage = page - 1;
        if (prevPage < 1) {
          return;
        } else {
          setPage(prevPage);
        }
      } else {
        return;
      }
    } else {
      // If we made it here, then just set it to the page that was clicked
      setPage(pageNumber);
    }
  };

  return (
    <AppContext.Provider value={{ contacts, page, scrollPage, deleteContact }}>
      <ContactList />
      <BasicPagination />
    </AppContext.Provider>
  );
}
