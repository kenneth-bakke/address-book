import React from 'react';
import Accordion from './Accordion';

export default function ContactDetail({ contact }) {
  return (
    <div>
      <Accordion contact={contact} />
    </div>
  );
}
