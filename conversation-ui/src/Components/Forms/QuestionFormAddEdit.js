import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleTopicDropdownChange = this.handleTopicDropdownChange.bind(this);
        this.state = {
            categoryList: [],
            topicList: [],
            id: 0,
            category_id: '',
            topic_id : '',
            question : '',
            is_disabled: ''   
          }; 
    }
  

  onChange = e => {
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value})
  }
  getCategory(){
    fetch('http://localhost:3000/crud/getCategoryList')
    .then(response => response.json())
    .then(items => {
      if(Array.isArray(items)) {        
        let options = items.map((data) => 
                <option 
                    key={data.id}
                    value={data.id}
                >
                    {data.category}
                </option>
);
        this.setState({
          categoryList: options
        });        
      } else {
        console.log('failure')
      }
    })   
    .catch(err => console.log(err))
  }
  getTopic(selectedCategoryId){
    fetch('http://localhost:3000/crud/getTopicList')
    .then(response => response.json())
    .then(items => {
      if(Array.isArray(items)) {
        if (selectedCategoryId) {
          items = items.filter(item => item.category_id == selectedCategoryId);
        }
        let options = items.map((data) => 
                <option 
                    key={data.id}
                    value={data.id}
                >
                    {data.topic}
                </option>
);
        this.setState({
          topicList: options,
          selected:''
        });        
      } else {
        console.log('failure')
      }
    })   
    .catch(err => console.log(err))
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud/saveQuestion', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({          
        category_id: this.state.category_id,
        topic_id:this.state.topic_id,
        question: this.state.question,
        is_disabled: this.state.is_disabled
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
          window.location.reload();
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud/updateQuestion', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        category_id: this.state.category_id,
        topic_id:this.state.topic_id,
        question: this.state.question,
        is_disabled: this.state.is_disabled
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          console.log(item)
          this.props.updateState(item[0])
          this.props.toggle();
          window.location.reload();
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

  handleDropdownChange(e) {
    this.setState({ 
      category_id: e.target.value 
    });
    this.getTopic(e.target.value);

  }

  handleTopicDropdownChange(e) {
    this.setState({ 
      topic_id: e.target.value 
    });
  }
  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, category_id, topic_id, question, is_disabled } = this.props.item
      this.setState({ id, category_id, topic_id, question, is_disabled })
    }
    this.getCategory();
    this.getTopic();
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} className="form-horizontal">
         <FormGroup>
          <Label for="category" className="control-label col-sm-2">Category</Label>
          <div className="col-sm-10">
            <select name="category" className="form-control" onChange={this.handleDropdownChange} value={this.state.category_id}>
                <option>Select Category</option>
                {this.state.categoryList}
            </select>
            </div>
        </FormGroup>
        <FormGroup>
          <Label for="topic" className="control-label col-sm-2">Topic</Label>
          <div className="col-sm-10">
            <select name="topic" className="form-control" onChange={this.handleTopicDropdownChange} value={this.state.topic_id}>
                <option>Select Topic</option>
                {this.state.topicList}
            </select>
            </div>
        </FormGroup>
        <FormGroup>
          <Label for="question" className="control-label col-sm-2">Question</Label>
          <div className="col-sm-10"><textarea className="form-control" name="question" id="question" onChange={this.onChange} value={this.state.question === null ? '' : this.state.question} /></div>
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