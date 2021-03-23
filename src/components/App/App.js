//core
import React, {useState, useEffect, useMemo} from 'react';

//components
import UserList from '../UserList';
import SelectForm from '../SelectForm';
import SearchFormm from '../SearchForm';
import AddUserForm from '../AddUserForm';
import EditUserForm from '../EditUserForm';

//server
 import usersData from '../../server/response.json'

const App = () => {

  const [filter, setFilter] = useState('');
  const [data, setData] = useState(usersData);

  const filteredUsers = useMemo(() => {
   const filteredData = data.filter(user =>
      user.firstname.toLowerCase().includes(filter.toLowerCase()) 
      || user.surname.toLowerCase().includes(filter.toLowerCase()) 
      || user.email.toLowerCase().includes(filter.toLowerCase())
    );
 return filteredData;
  }, [filter, data]);

  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const sortArray = type => {
        const types = {
          firstname: 'firstname',
          surname: 'surname',
          age: 'birthdate',
        }
          const sortUsers = types[type];
          const collator = new Intl.Collator(undefined, {numeric: true});
          const sortedUsers = [...data].sort((a, b) => collator.compare(a[sortUsers], b[sortUsers]));
          setData(sortedUsers);
    };
    sortArray(sortType);
  }, [sortType, filter]);


  const handleAge = (user) => {
    const userAge = Math.floor(((new Date() - new Date(user.birthdate)) / 1000 / (60 * 60 * 24)) / 365.25);
     return userAge;
     }

     const addUser = user => {
      setData([ ...data, user ])
    }

    const deleteUser = surname => {
       setData(data.filter(user => user.surname !== surname))
    }

    const [editing, setEditing] = useState(false)
    const userAcc = {
      firstname: '',
      surname: '',
      email: '',
      birthdate: '',
      avatar: '',
    };
    const [currentUser, setCurrentUser] = useState(userAcc)

    const updateUser = (birthdate, updatedUser) => {
      setEditing(false)
      setData(data.map(user => (user.birthdate === birthdate ? updatedUser : user)))
    }

    const editRow = (user) => {
      setEditing(true)
      setCurrentUser({firstname: user.firstname,surname: user.surname,email: user.email,birthdate: user.birthdate,avatar: user.avatar })
    }

  return (
    <div className="App">
      <div className="appFilterWrapper" >
        <SelectForm setSortType={setSortType} /> 
        <SearchFormm setFilter={setFilter} filter={filter} /> 
      
      <AddUserForm addUser={addUser} userAcc={userAcc} />
      </div>
      {editing && 
      (<EditUserForm editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser} />)}
                
        <UserList users={filteredUsers} userAge={handleAge} deleteUser={deleteUser}  editRow={editRow} />
    </div>
  );
  }


export default App;
