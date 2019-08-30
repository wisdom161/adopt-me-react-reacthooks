import React, { Component } from 'react';
// import { stringify } from 'querystring';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';

class Details extends Component {
  state = { loading: true };
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     loading: true,
  //   };
  // }
  
  componentDidMount() {
    // throw new Error('lol') 
    // artificial error that will trigger ErrorBoundary
    pet.animal(this.props.id)
      .then(({animal}) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city},${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      }, console.error);
    // child receives props from it's parents and it can't change them -- they're read only
  }
  // useful for AJAX requests
  render () {
    if(this.state.loading) {
      return <h1>Loading...</h1>
    }
    const { animal, breed, location, description, name, media } = this.state;
    
    return (
      <div className='details'>
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal}-${breed}-${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>
              Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}
  // you cant use hooks with a class component 

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
};

// have to make as a higher order component from above -- if it was wrapped around div details, it would only catch things in carousel but not the inside the class itself