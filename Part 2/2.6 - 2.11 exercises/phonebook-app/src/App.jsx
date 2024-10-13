import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// Component for adding new contacts
const AddContact = ({ nameHandler, numberHandler, action }) => {
  return (
    <form onSubmit={action}>
      <div id='addButton'>
        <label>Name: <input onChange={nameHandler} type='text' required /></label>
        <br />
        <label>Number: <input onChange={numberHandler} type='text' required /></label>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

// Component for searching contacts
const BrowseContacts = ({ action, handler }) => {
  return (
    <form onSubmit={action}>
      <input onChange={handler} type="text" placeholder="Name of contact" required />
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
const AllContacts = ({ contacts }) => {
  return (
    <div>{contacts}</div>
  );
}

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState(null);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    // Fetch all existing contacts from the server
    axios.get('http://localhost:3001/Persons')
      .then(response => {
        setPerson(response.data);
      })
      .catch(error => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

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
    
    const newContact = { name: newName, number: newNumber };

    // Check if the name already exists
    const nameExists = person.some(item => item.name.toLowerCase() === newName.toLowerCase());

    if (nameExists) {
      alert('This contact name already exists!');
    } else {
      // Make the POST request to add the new contact
      axios.post('http://localhost:3001/Persons', newContact)
        .then(() => {
          console.log('Contact added!');
          // Fetch updated contacts
          return axios.get('http://localhost:3001/Persons');
        })
        .then(response => {
          setPerson(response.data); // Update person state with the new list of contacts
        })
        .catch(error => {
          console.error('Error adding contact:', error);
        });

      // Clear input fields after adding the contact
      setNewName('');
      setNewNumber('');
    }
  };

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
