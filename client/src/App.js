import React from 'react';
import axios from 'axios';



class App extends React.Component {

  state= {
    id: '',
    name: '',
    posts: []
  };

  componentDidMount = () => {
    this.getSalesPost();
  };

  getSalesPost = () => {
    axios.get('http://localhost:8080/api')
    .then((response) => {
      const data = response.data;
      this.setState({posts: data});
      console.log('Data has been receieved');

    })
    .catch(() => {
      alert('Error retrieving data');

    });;
    
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
    

      this.getSalesPost();
      

    })
    .catch(() => {
      console.log('Internal server error');

    });;
  };


 





  displaySalesPost = (posts) => {

    if (!posts.length) return null;

    return posts.map((post, index) =>(

      <div key={index} className="sales-post__display">
        <h3>{post.id}</h3>
        <p>{post.name}</p>
      </div>

    ));
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


        <div className="sales-">
          {this.displaySalesPost(this.state.posts)}
        </div>

      </div>

        

     
    );
  }
}

export default App;
