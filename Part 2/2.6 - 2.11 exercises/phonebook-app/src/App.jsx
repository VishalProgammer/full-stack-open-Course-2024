import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// Component for adding new contacts
const AddContact = ({ nameHandler, numberHandler, action }) => {
  return (
    <form onSubmit={action}>
      <div id='addContact'>
        <label>Name: <input onChange={nameHandler} type='text' required /></label>
        <br />
        <label>Number: <input onChange={numberHandler} type='text' required /></label>
      </div>
      <div>
        <button id='addBtn' type="submit">Add</button>
      </div>
    </form>
  );
}

// Component for searching contacts
const BrowseContacts = ({ action, handler }) => {
  return (
    <form onSubmit={action}>
      <input id='searchBar' onChange={handler} type="text" placeholder="Name of contact" required />
      <button id='searchBtn' type="submit">Search</button>
      
    </form>
  );
}

// Component for displaying the search result
const BrowseResult = ({name, value }) => {
  return (
    <div>
      <br />
    <fieldset>
        {value ? `${name}: ${value}` : 'No contact found.'}
    </fieldset>
    </div>
  );
}

// Component for displaying all contacts
const AllContacts = ({ contacts }) => {
  return (
    <div id='allContacts'>{contacts}</div>
  );
}

//Notification
const RedNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div >
      <div className='redNotif'>{message}</div>
    </div>
  )
}
const GreenNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div >
      <div className='greenNotif' >{message}</div>
    </div>
  )
}

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState(null);
  const [person, setPerson] = useState([]);
  const [deleteId, setDeleteId] = useState([]);
  const [redNotification, setRedNotification] = useState([]);
  const [greenNotification, setGreenNotification] = useState([]);
  
  const updateContacts = ()=>{
    axios.get('http://localhost:3001/Persons')
    .then(response => {
      setPerson(response.data); // Update the state with the new list of contacts
    })
    .catch(error => {
      setRedNotification('Error adding contact:', error);
      setTimeout(() => {
        setRedNotification(null)
      }, 5000);
    });
  }

  const redMessage  = (message)=>{
    setRedNotification(message);
            setTimeout(()=>{
              setRedNotification(null);
            },5000)
  }

  const greenMessage  = (message)=>{
    setGreenNotification(message);
            setTimeout(()=>{
              setGreenNotification(null);
            },5000)
  }

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
    if (confirm('This contact name already exists. Do you want to replace the number?')) {
      // Find the existing contact by name
      const existingContact = person.find(item => item.name.toLowerCase() === newName.toLowerCase());

      // Make the PUT request to update the existing contact by ID
      axios
        .put(`http://localhost:3001/Persons/${existingContact.id}`, newContact)
        .then(() => {
          console.log('Contact updated!');
          
          updateContacts()// Fetch the updated list of contacts
          greenMessage(`"${existingContact.name}" was updated Successfully`)//show update notification
        })
        .catch(error => {
          redMessage('Got Error updating the Contact!')
        });
    } else {
      // User cancels the operation, do nothing
      return null;
    }
  } else {
    // Make the POST request to add the new contact
    axios
      .post('http://localhost:3001/Persons', newContact)
      .then(() => {
        greenMessage('New Contact added!')
        // Fetch the updated list of contacts
        updateContacts()
      });
  }
};

  
  // Handle searching for a contact
  const onClickSearch = (event) => {
    event.preventDefault();
    const foundUser = person.find(data => data.name.toLowerCase() === searchInput.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser); // Store the found user
    } else {
      redMessage("This contact doesn't exist. Try another name!");
      setUser(null); // Reset user if not found
    }
  }

  return (
    <div id='body'>
      <h1>Phonebook</h1>

      {/* Notifications for the app */}
      <RedNotification message={redNotification}/>
      <GreenNotification message={greenNotification}/>

      {/* Search contacts */}
      <BrowseContacts handler={handleSearchInput} action={onClickSearch} />
      
      {/* Display search result */}
      <BrowseResult name={user ? user.name : null} value={user ? user.number : null} />
      <hr />
      <h3>Add New Contact:</h3>
      {/* Add new contact */}
      <AddContact nameHandler={handleName} numberHandler={handleNumber} action={onSubmit} />
      
      <h2>Numbers</h2>
      {/* Display all contacts */}
      <AllContacts contacts={person.map((data, index) => (
        <div key={index}>
          <p id='contactList' >{data.name} : {data.number}</p>
          <button id='deleteBtn' 

          //delete function
          onClick={() => {
  const confirmDelete = window.confirm(`Do you want to delete '${data.name}' from Contacts?`);
  if (confirmDelete) {
    // Set deleteId
    setDeleteId(data.id);

    setTimeout(() => {
      if (data.id) {
        axios
          .delete(`http://localhost:3001/Persons/${data.id}`)
          .then((response) => {
            console.log('Deleted successfully', response);
             updateContacts();
            //show delete notification
            redMessage(`${data.name} was deleted from the Contact List.`)
          })
          .catch((error) => {
            redMessage('There was an error deleting the contact!')
          });
      }
    }, 0); // Ensures state is set first before making the request
  }
}}> delete </button>
<br />
<br />
        </div>
      ))} />
    </div>
  );
}

export default App;
