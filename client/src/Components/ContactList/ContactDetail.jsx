import React, { useContext } from 'react';
import Accordion from './Accordion';
import styled from 'styled-components';
import ContactForm from '../ContactForm/ContactForm';
import AppContext from '../../AppContext';

export default function ContactDetail({ contact }) {
  const { editMode } = useContext(AppContext);
  return (
    <Contact>
      <Accordion contact={contact} />
    </Contact>
  );
}

// |-----Styling-----|
const Contact = styled.li`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  clear: both;
  width: 100%;
  height: 100%;
`;
