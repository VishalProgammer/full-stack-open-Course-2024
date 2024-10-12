import { useState } from 'react';
import './App.css';

// Component for adding new contacts
const AddContact = (props) => {
  return (
    <form onSubmit={props.action}>
      <div id='addButton'>
        <label>Name: <input onChange={props.nameHandler} type='text' required /></label>
        <br />
        <label>Number: <input onChange={props.numberHandler} type='text' required /></label>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

// Component for searching contacts
const BrowseContacts = (props) => {
  return (
    <form onSubmit={props.action}>
      <input onChange={props.handler} type="text" placeholder="Name of contact" required />
      <button type="submit">Search</button>
    </form>
  );
}

// Component for displaying the search result
const BrowseResult = ({ value }) => {
  return (
    <div>
      {value ? `Number: ${value}` : 'No contact found.'}
    </div>
  );
}

// Component for displaying all contacts
const AllContacts = (props) => {
  return (
    <div>{props.contacts}</div>
  );
}

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState(null);
  const [person, setPerson] = useState([
    { name: 'Krish', number: '1284373', id: 0 },
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  // Handle name input
  const handleName = (event) => {
    setNewName(event.target.value);
  }

  // Handle number input
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  }

  // Handle search input
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  }

  // Handle adding a new contact
  const onSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const nameExists = person.some(item => item.name.toLowerCase() === newName.toLowerCase());

    if (nameExists) {
      alert('This contact name already exists!');
    } else {
      setPerson(prevArray => [...prevArray, newPerson]);
      setNewName(''); // Clear input after adding
      setNewNumber(''); // Clear number input after adding
    }
  }

  // Handle searching for a contact
  const onClickSearch = (event) => {
    event.preventDefault();
    const foundUser = person.find(data => data.name.toLowerCase() === searchInput.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser); // Store the found user
    } else {
      alert("This contact doesn't exist. Try another name!");
      setUser(null); // Reset user if not found
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Search contacts */}
      <BrowseContacts handler={handleSearchInput} action={onClickSearch} />
      
      {/* Display search result */}
      <BrowseResult value={user ? user.number : null} />
      
      <h3>Add New Contact:</h3>
      {/* Add new contact */}
      <AddContact nameHandler={handleName} numberHandler={handleNumber} action={onSubmit} />
      
      <h2>Numbers</h2>
      {/* Display all contacts */}
      <AllContacts contacts={person.map((data, index) => (
        <p key={index}>{data.name} : {data.number}</p>
      ))} />
    </div>
  );
}

export default App;
