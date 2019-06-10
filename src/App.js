import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';

const query = `
  query {
    listRestaurants {
      items {
        id name description location
      }
    }
  }
`

function App() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchData = async ()  => {
    const data = await API.graphql(graphqlOperation(query));
    setRestaurants(data.data.listRestaurants.items)
    }
    fetchData();
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>        
      </header>
      <body>
        {restaurants.map((restaurant, index) => 
            <div key={index}>{restaurant.name}</div>
        )}
      </body>

    </div>
  );
}

export default App;
