import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import List from './components/List';

const getLocalStorage = () => {
  // let list = localStorage.getItem('list');
  // if (list) {
  //   return (list = JSON.parse(localStorage.getItem('list')));
  // } else {
  //   return [];
  // }
  return JSON.parse(localStorage.getItem('list')) || [];
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    status: false,
    msg: '',
    type: '',
  });

  // Function to set details of the alert
  const showAlert = (status = false, msg = '', type = '') => {
    setAlert({ status, msg, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, 'please enter value', 'danger');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      setIsEditing(false);
      setEditID(null);
      setName('');
      showAlert(true, 'item edited', 'success');
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
      showAlert(true, 'item added to the list', 'success');
    }
  };

  // Function to edit single item from the list
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  // Function to remove single item from the list
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, 'item removed', 'danger');
  };

  // Function to clear the list items
  const clearList = () => {
    setList([]);
    showAlert(true, 'empty list', 'danger');
  };

  useEffect(() => {
    // Store the list in local storage everytime there is change in the list
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <main className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.status && (
          <Alert {...alert} removeAlert={showAlert} list={list} />
        )}

        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g. eggs"
            className="grocery"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
