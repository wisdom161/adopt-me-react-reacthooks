import React, { Component } from 'react';

class Carousel extends Component {
  state = {
    photos: [],
    active: 0,
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index
    });
  };
  // event listeners and functions being passed into children need to be arrow function to ensure the correct context of this. otherwise you have to bind it.
  // this is the reason why for componentDidMount and render don't need to be bound
  
  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active": ""}
              alt="animal thumbnail"
              />
          ))}
        </div>
      </div>
    );
  };
};

export default Carousel;