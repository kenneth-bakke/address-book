import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext';

export default function Accordion({ contact }) {
  const { deleteContact } = useContext(AppContext);
  const [isActive, setIsActive] = useState(false);
  const toggleRow = () => {
    setIsActive(!isActive);
  };

  return (
    <div className='accordion'>
      <AccordionItem>
        <AccordionTitle onClick={toggleRow}>
          <h3>{`${contact.first_name} ${contact.last_name}`}</h3>
          <h3>{isActive ? '-' : '+'}</h3>
        </AccordionTitle>
        {isActive && (
          <div>
            <Phone>
              <span>
                <h3>Phone</h3>
                <Detail>{contact.phone_number}</Detail>
              </span>
            </Phone>
            <Email>
              <span>
                <h3>Email</h3>
                <Detail>{contact.email_address}</Detail>
              </span>
            </Email>
            <Address>
              <h3>Address</h3>
              <Detail>
                {contact.address.street_number} {contact.address.street_name},
              </Detail>
              <Detail>
                {contact.address.city} {contact.address.state}{' '}
                {contact.address.zipcode},
              </Detail>
              <Detail>{contact.address.country}</Detail>
            </Address>
            <button
              className='ui button'
              onClick={(e) => deleteContact(e, contact)}
            >
              Remove contact
            </button>
          </div>
        )}
      </AccordionItem>
    </div>
  );
}

const AccordionItem = styled.div`
  margin: 0 auto;
  padding: 10px;
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
  display: flex;
  flex: auto;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: flex-start;
  width: 100%;
  max-width: 200px;
`;

const AccordionTitle = styled.div`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex: auto;
  align-items: baseline;
  justify-content: space-between;
`;

// const AccordionContent = styled.div``;
const Phone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-around;
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-around;
`;

const Address = styled.div`
  margin: 0;
  padding: 3px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-around;
  white-space: pre;
  text-align: left;
`;

const Detail = styled.h4`
  margin: 0;
`;
