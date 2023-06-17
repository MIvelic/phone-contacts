import React from 'react';
import { fetchContactList, createNewContact, deleteContact, fetchCountryList } from './api/contactList';
import Table from './Table';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactList: [],
      countryList: []
    }
  }

  componentDidMount() {
    fetchContactList.then((response) => {
      this.setState({
        contactList: response
      })
    })

    fetchCountryList.then((response) => {
      this.setState({
        countryList: response
      })
    })
  }

  updateContactList = (newContact, action) => {
    if (action === 'Create') {
      this.setState({
        contactList: [...this.state.contactList, newContact]
      })
    }
    if (action === 'Delete') {
      this.setState({
        contactList: this.state.contactList.filter((contact) => contact !== newContact )
      })
    }
  }

  render() {
    const { contactList, countryList } = this.state;

    return (
      <div>
        <div className="containers">
          <Table data={contactList !== [] ? contactList : []}
                 countryList={countryList}
                 createNewContact={createNewContact}
                 updateContactList={this.updateContactList}
                 deleteContact={deleteContact}/>
        </div>
      </div>
    )
  }
}

export default (App);
