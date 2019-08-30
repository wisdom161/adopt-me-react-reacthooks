// mostly code from reactjs.org/docs/error-boundaries.html

import React, { Component } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    redirect: false
  }

  static getDerivedStateFromError () {
    return { hasError: true};
  }
  componentDidCatch(error, info) {
    console.error("Error boundary caught error", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError)
      setTimeout(() => this.setState({redirect: true}), 5000);
  }
  // this will run everytime it gets new state or props 
  render () {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if(this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link> to go back to homepage or wait 5 seconds.
        </h1>
      )
    }
    return this.props.children
    // always have to return something for a render method - it has to pass through if no errors are found
  }
}

export default ErrorBoundary;