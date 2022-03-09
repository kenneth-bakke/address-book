import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext';
import { statesAbbrev } from '../../utils/states';

export default function ContactForm() {
  const {
    setView,
    addContact,
    editContact,
    editMode,
    setEditMode,
    formData,
    setFormData,
    selectedContact,
  } = useContext(AppContext);

  useEffect(() => {
    if (editMode) {
      setFormData(selectedContact);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    let properties = [
      'first_name',
      'last_name',
      'phone_number',
      'email_address',
    ];
    if (properties.includes(id)) {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    } else {
      let address = { ...formData.address };
      address[id] = value;
      setFormData((prevState) => ({
        ...prevState,
        address,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editMode ? editContact() : addContact();
    setFormData({});
    e.target.reset();
  };

  const navToContactList = () => {
    setView('ContactList');
    setEditMode(false);
  };

  return (
    <>
      <Header>
        <ListTitle>{editMode ? 'Edit Contact' : 'Add Contact'}</ListTitle>
        <button className='ui button' onClick={navToContactList}>
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
              id={'first_name'}
              placeholder={'First Name'}
              defaultValue={editMode ? selectedContact.first_name : null}
              onChange={handleChange}
            />
            <input
              type='text'
              required={true}
              id={'last_name'}
              placeholder={'Last Name'}
              defaultValue={editMode ? selectedContact.last_name : null}
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
              defaultValue={
                editMode
                  ? JSON.stringify(
                      selectedContact.address.street_number +
                        ' ' +
                        selectedContact.address.street_name
                    )
                  : null
              }
              onChange={handleChange}
            />
            <input
              type='text'
              required={true}
              id={'city'}
              placeholder={'City'}
              defaultValue={editMode ? selectedContact.address.city : null}
              onChange={handleChange}
            />
            <StateSelector
              id={'state'}
              required={true}
              placeholder={'State'}
              defaultValue={editMode ? selectedContact.address.state : null}
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
            defaultValue={editMode ? selectedContact.address.zipcode : null}
            onChange={handleChange}
          />
          <input
            type='text'
            required={true}
            id={'country'}
            placeholder={'Country'}
            defaultValue={editMode ? selectedContact.address.country : null}
            onChange={handleChange}
          />
          <br />
          <input
            type='text'
            id={'phone_number'}
            placeholder={'(123) 456-7890'}
            defaultValue={editMode ? selectedContact.phone_number : null}
            onChange={handleChange}
          />
          <input
            type='email' // I know you can do this with Regex but I am not good at Regex full disclosure
            required={true}
            id={'email_address'}
            placeholder={'name@email.com'}
            defaultValue={editMode ? selectedContact.email_address : null}
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
