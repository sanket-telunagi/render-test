import { useState, useEffect } from 'react';
import phoneBookServices from "./services/phonebookService";
import Names from "./Components/Names"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState(0);

  // setting data db getting data from server
  useEffect(()=> {
    // call returns a promise
    phoneBookServices.getAll()
    .then(res => setPersons(res))
  }, [])


  const handleEventChange = (event) => {
    // console.log(event.target.value);
    // setting new name 
    setNewName(event.target.value);
  }

  // (filtered data) if contains required data else false 
  const doesExists = (checkName) => {
    const data = persons.filter((person) => person.name === checkName) ;
    if (data.length === 0) return false;
    return data[0]; 
  }

  // updating phone book 
  const updatePhoneBook = (event) => {
    event.preventDefault() ; // prevent default reloading
  
    const data = doesExists(newName)
    if(data !== false) {
      // confirm returns true or false
      const decision = confirm(`${newName} is alrerady added to the phonebook, replace the old number with new one?`);
      // console.log("decision ", decision)
      if (decision) updateNumber(data)
    }
    else if (data === false) {
      // updating the phonebook by adding newEntry to the server
      const newEntry = {
        name : newName,
        number : newNumber
      }
      phoneBookServices
        .create(newEntry) // adding to the server
        .then((res) => {
          console.table(res);
          setPersons(persons.concat(res)); // concatinating the updated data
        })
    }
  }

  // update phonenumber
  const updateNumber = (existingEntry) => {
    
    // console.log("Existing entry ", existingEntry.id);
    const updatedEntry = {
      ...existingEntry,
      number : newNumber
    }

    // console.log("updated table")
    // console.table(updatedEntry)
    phoneBookServices
      .update(existingEntry.id, updatedEntry)
      .then((res) => {
        // console.log("Updated response...")
        // console.table(res)
        // update the setpersons
        setPersons(persons.map(person => person.id === updatedEntry.id ? updatedEntry : person ))
        // console.table(persons)
      })
  }

  // deleting phone entry 
  const destroyPhoneBookEntry = (id) => {
    
    phoneBookServices
      .destroyPhoneEntry(id)
      .then(res => {
        setPersons(persons.filter((person) => person.id !== id))
        console.table(res)
      })
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNumber(event.target.value)
  }

  return (
    <div >
      <h2>Phonebook</h2>
      <form onSubmit={updatePhoneBook} >
        <div>
          name : <input onChange={handleEventChange} /> <br />
          number : <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {/* displaying all the persons */}
        {
          persons.map(person => <Names key={person.id} name={person.name} number = {person.number} shouldDelete={() => destroyPhoneBookEntry(person.id)}/>)
        }
        
      </ul>
    </div>
  )
}

export default App