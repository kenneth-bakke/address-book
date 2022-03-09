import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext';
import { statesAbbrev } from '../../utils/states';

export default function ContactForm() {
  const { setView, addContact } = useContext(AppContext);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    // TODO: ADD FORMATTERS FOR VALUES BEFORE SETTING FORM DATA
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(formData);
  };
  return (
    <>
      <Header>
        <ListTitle>Add Contact</ListTitle>
        <button className='ui button' onClick={() => setView('ContactList')}>
          My Contacts
        </button>
      </Header>
      <div
        className='ui form'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Form onSubmit={handleSubmit}>
          <NameInput>
            <input
              type='text'
              required={true}
              autoFocus={true}
              id={'firstName'}
              placeholder={'First Name'}
              onChange={handleChange}
            />
            <input
              type='text'
              required={true}
              id={'lastName'}
              placeholder={'Last Name'}
              onChange={handleChange}
            />
          </NameInput>
          <br />
          <AddressInput>
            <input
              type='text'
              required={true}
              id={'street'}
              placeholder={'Street'}
              onChange={handleChange}
            />
            <input
              type='text'
              required={true}
              id={'city'}
              placeholder={'City'}
              onChange={handleChange}
            />
            <StateSelector
              id={'state'}
              required={true}
              placeholder={'State'}
              onChange={handleChange}
            >
              <option value=''>...Choose a State...</option>
              {statesAbbrev.map((state, i) => (
                <option placeholder={'State'} key={`${state}${i}`}>
                  {state}
                </option>
              ))}
            </StateSelector>
          </AddressInput>
          <br />
          <input
            type='text'
            required={true}
            id={'zipcode'}
            placeholder={'Zipcode'}
            onChange={handleChange}
          />
          <input
            type='text'
            required={true}
            id={'country'}
            placeholder={'Country'}
            onChange={handleChange}
          />
          <br />
          <input
            type='text'
            id={'phoneNumber'}
            placeholder={'(123) 456-7890'}
            onChange={handleChange}
          />
          <input
            type='email' // I know you can do this with Regex but I am not good at Regex full disclosure
            required={true}
            id={'email'}
            placeholder={'name@email.com'}
            onChange={handleChange}
          />
          <button className='ui button'>Submit Changes</button>
        </Form>
      </div>
    </>
  );
}

// |-----Styling-----|
const Header = styled.div`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 250px;
`;

const StateSelector = styled.select``;
const NameInput = styled.div``;
const AddressInput = styled.div``;
