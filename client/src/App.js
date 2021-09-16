import React from 'react';
import axios from 'axios';


class App extends React.Component {

  state= {
    id: '',
    name: ''
  };




  handleChange = ({target}) => {
    const{name, value} = target;
    this.setState({
      [name] : value

    });

  };


  // this allows react forms to send requests to the server
  submit = (event) => {
    event.preventDefault();

    const payload = {
      id: this.state.id,
      name: this.state.name
    };

 

    axios({
      url: 'http://localhost:8080/api/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data has been sent to the server');
      

    })
    .catch(() => {
      console.log('Internal server error');

    });;
  };




  render() {
    console.log('State: ', this.state);

    
    return (
      <div>
        <h2>PHP React App</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
              type="text"
              placeholder="title"
              name="id"
              defaultValue={this.state.id}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea 
              name="name" 
              placeholder="body"
              cols="30" 
              rows="10" 
              defaultValue={this.state.name}
              onChange={this.handleChange}>

            </textarea>
          </div>
          

          <button>Submit</button>
        </form>

      </div>

        

     
    );
  }
}

export default App;
