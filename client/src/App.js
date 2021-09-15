import React from 'react';
import axios from 'axios';

class App extends React.Component {

  // this allows react forms to send requests to the server
  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    });
  }

  render() {
    return (
      <div><h2>PHP React App</h2>
      <form>
        <div className ="form-input">
          <input
          type = "text"
          name = "title"
          placeholder = "Title"
          value = {this.state.title}
          onChange = {this.handleChange}
          />
        </div>
        <div className = "form-input">
          <textarea
          placeholder = "body"
          name = "body"
          cols = "30"
          rows = "10"
          value = {this.state.body}
          onChange = {this.handleChange}
          >
          </textarea>
        </div>
        <button> Submit</button>
      </form>
      </div>
    );
  }
}

export default App;
