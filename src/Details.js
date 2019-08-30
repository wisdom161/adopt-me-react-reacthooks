import React, { Component } from 'react';
import pet from '@frontendmasters/pet';
import { navigate } from '@reach/router';
import Modal from './Modal';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';


class Details extends Component {
  state = { loading: true, showModal: false };
  
  componentDidMount() {
    // throw new Error('err') 
    // artificial error that will trigger ErrorBoundary
    pet.animal(this.props.id)
      .then(({animal}) => {
        this.setState({
          url: animal.url,
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
  toggleModal = () => this.setState({ showModal: !this.state.showModal })
  adopt = () => navigate(this.state.url)

  render () {
    if(this.state.loading) {
      return <h1>Loading...</h1>
    }
    const { animal, breed, location, description, name, media, showModal } = this.state;
    
    return (
      <div className='details'>
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal}-${breed}-${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button 
              onClick={this.toggleModal} 
              style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
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