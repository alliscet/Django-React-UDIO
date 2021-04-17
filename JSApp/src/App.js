import React, { Component } from "react";
import './App.css';

//Component for SearchForms
class SearchForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchtext: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({searchtext: event.target.value});
  }

  handleSubmit(event){
    this.props.submittedData(this.state.searchtext);
    event.preventDefault();
  }

  renderForm(type){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          {type}:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
  
  render(){
    return(
      <div>
        {this.renderForm(this.props.id)}
      </div>
    )
  }
  
}

//Main Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchname: '',
      searchmail: ''
    };
  }

  //Fetching from Backend
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/people/');
      const data = await res.json();
      this.setState({
        data,
      });
    } catch (e) {
      console.log(e);
  }
  }

  getName(data){
    this.setState({searchname:data});
  }

  getMail(data){
    this.setState({searchmail:data});
  }

  renderEmailMsg(){
    return(
      <div>
        {this.state.data.map(people=> {
        if(people.name === this.state.searchname){
          return(
          <div>
            Found Email: {people.email}
          </div>
          )
        }
        else{
          return(<div></div>)
        }
      })}
      </div>
    )
  }

  renderNameMsg(){
    return(
      <div>
        {this.state.data.map(people=> {
        if(people.email === this.state.searchmail){
          return(
          <div>
            Found Name: {people.name}
          </div>
          )
        }
        else{
          return(<div></div>)
        }
      })}
      </div>
    )
  }

  renderList(){
    return(
      <ul>
        <h1>People Search</h1>
        {this.state.data.map(people=> {
          return(
            <li>
              {people.name} : {people.email}
            </li>
          )
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderList()}
        <SearchForm submittedData = {this.getName.bind(this)} id = 'Name' />
        <SearchForm submittedData = {this.getMail.bind(this)} id = 'Email' />
        {this.renderEmailMsg()}
        {this.renderNameMsg()}
      </div>
    );
  }
}

export default App;
