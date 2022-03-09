import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import BasicPagination from '../Pagination/Pagination';
import ContactDetail from './ContactDetail';
import styled from 'styled-components';

export default function ContactList() {
  const { contacts, setView, editMode, setEditMode } = useContext(AppContext);

  const renderContacts = () => {
    const toggleView = () => {
      setView('ContactForm');
    };

    return (
      <>
        <Header>
          <ListTitle>Contacts</ListTitle>
          <button className='ui button' onClick={toggleView}>
            Add contact
          </button>
        </Header>
        <List>
          {contacts?.map((contact) => (
            <ContactDetail key={contact?.id} contact={contact} />
          ))}
        </List>
      </>
    );
  };

  return (
    <div>
      {renderContacts()}
      <BasicPagination />
    </div>
  );
}

const ListTitle = styled.h1`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex: auto;
  align-items: center;
  padding: 10px;
  text-align: center;
  flex-direction: row;
  justify-content: center;
}
`;

const Header = styled.div`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const List = styled.ul`
  margin: 0 auto;
  padding: 10px;
  bottom: 10px;
  height: 100%;
  max-height: 500px;
  overflow: hidden;
  overflow-y: scroll;
`;
