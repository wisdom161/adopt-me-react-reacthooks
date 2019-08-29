import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import SearchParams from './SearchParams';

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Router >
        <SearchParams />
      
      </Router>
    </div>

  );
};

render(<App/>, document.getElementById('root'));
