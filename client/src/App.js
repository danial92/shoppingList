import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // This brings bootstrap in our project
import Navbar from './components/navbar';
import ShoppingList from './components/shoppingList';
import ItemModal from './components/modal';
import { Container } from 'reactstrap';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    );
  }
}

export default App;
