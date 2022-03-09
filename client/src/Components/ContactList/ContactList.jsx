import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import ContactDetail from './ContactDetail';
import styled from 'styled-components';

export default function ContactList() {
  const { contacts } = useContext(AppContext);

  const renderContacts = () => {
    return (
      <div>
        <ListTitle>Contacts</ListTitle>
        {contacts?.map((contact) => (
          <ContactDetail key={contact?.id} contact={contact} />
        ))}
      </div>
    );
  };

  return <div>{renderContacts()}</div>;
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
  overflow: hidden;
}
`;
