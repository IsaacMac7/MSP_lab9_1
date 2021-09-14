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
      <div><h2>PHP React App</h2></div>
    );
  }
}

export default App;
