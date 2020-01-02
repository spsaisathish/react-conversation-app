import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.state = {
            id: 0,
            category: '',
            is_disabled: ''   
          }; 
    }
  

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud/saveCategory', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: this.state.category,
        is_disabled: this.state.is_disabled
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud/updateCategory', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        category: this.state.category,
        is_disabled: this.state.is_disabled
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  handleOptionChange(event) {
    this.setState({
        is_disabled: event.target.value
    });
  }
  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, category, is_disabled } = this.props.item
      this.setState({ id, category, is_disabled })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} className="form-horizontal">
        <FormGroup>
          <Label for="category" className="control-label col-sm-2">Category</Label>
          <div className="col-sm-10"><Input type="text" name="category" id="category" onChange={this.onChange} value={this.state.category === null ? '' : this.state.category} /></div>
        </FormGroup>
        <FormGroup>
          <Label for="Active" className="control-label col-sm-2">Active</Label>
          <div className="col-sm-10">
                <input type="radio" value="true" name="active" id="activeYes" checked={this.state.is_disabled === true || this.state.is_disabled === 'true'}  onChange={this.handleOptionChange} /> Yes
                &nbsp;<input type="radio" value="false" name="active" id="activeNo" checked={this.state.is_disabled === false || this.state.is_disabled === 'false'} onChange={this.handleOptionChange} /> No            
          </div>
        </FormGroup>
        <FormGroup>
        <div className="col-sm-1"></div> 
        <div className="col-sm-10"><Button className="btn-success">Submit</Button></div>          
        </FormGroup>
      </Form>
    );
  }
}

export default AddEditForm