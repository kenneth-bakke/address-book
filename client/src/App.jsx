import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import baseURL from './api/api.js';
import ContactList from './Components/ContactList/ContactList';
import BasicPagination from './Components/Pagination/Pagination';
import { tableBodyClasses } from '@mui/material';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [pageCount, setPageCount] = useState(5);
  const [page, setPage] = useState(1);

  // On initial render, get first 5 contacts
  useEffect(() => {
    getContacts();
  }, [page]);

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
      // delete contact request
      console.log('Yes');
    } else {
      console.log('No');
    }
  };

  const setParams = (url, params) => {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return url;
  };

  const scrollPage = (e) => {
    let ariaLabel = e.target.getAttribute('aria-label');
    if (ariaLabel) {
      let pageNumber = Number(ariaLabel.slice(-1));
      setPage(pageNumber);
    } else {
    }
  };

  return (
    <AppContext.Provider value={{ contacts, page, scrollPage, deleteContact }}>
      <ContactList />
      <BasicPagination />
    </AppContext.Provider>
  );
}
