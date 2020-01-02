import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Category';

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Are you sure want to delete?')
    if(confirmDelete){
      fetch('http://localhost:3000/crud/deleteCategory', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {
    console.log(this.props.items);
    if (this.props.items.length === 0) {
        return (
          <Table responsive hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            <tr>
            <td colSpan="3"  align="center">No Records Found</td>
          </tr>
            </tbody>
          </Table>
        )
    } else {
      let items = this.props.items.map(item => {
        return (
          <tr key={item.id}>
            <td>{item.category}</td>
            <td>{item.is_disabled ? 'Yes' : 'No' }</td>
            <td>
              <div style={{width:"110px"}}>
                <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                {' '}
                <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
              </div>
            </td>
          </tr>
          )
        })
        return (
          <Table responsive hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </Table>
        )
    }
   
  }
}

export default DataTable