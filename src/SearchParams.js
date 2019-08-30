import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from "./Results";
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA');
  // setLocation is an updater function that we decide to call ourselves
  // anything with "use" is a hook, you can never use a hook in an if statement, for loop, or any conditional -- hooks are in order
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    })

    setPets(animals || []);
  }
  // any async function gaurentees to return a promise

  useEffect(() => { 
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error)
  }, [animal, setBreed, setBreeds]); // dependencies for useEffect to run
  // useEffect takes the place of several lifecycle hooks componentDidMount, componenDidUnmount, componentDidUpdate
  // renders everything first before anything happens in useEffect

  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          Location
          <input 
            id="location" 
            value={location}
            placeholder="Location" 
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;