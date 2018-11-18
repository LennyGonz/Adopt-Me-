import React from "react";
import pf from "petfinder-client";
import { Consumer } from "./SearchContext";
import Pet from "./Pet";
import SearchBox from "./SearchBox";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

// This is a class component
class Results extends React.Component {
  state = {
    pets: []
  };
  componentDidMount() {
    // By pointing to the search function we ensure that it searches once the component renders
    this.search();
  }
  search = () => {
    // this function allows you to search whenever, rather than just WHEN the component Mounts the 1 time. SO everytime we hit the submit button we "Search"
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets;
        // if it exists
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          // Check if it's an array -- And if I find multiple pets, then just assign it to be whatever it came back from the API with,
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          }
          // If it's just 1 animal, wrap it that one animal in an array
          else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          // If we don't find anything return an empty array
          pets = [];
        }
        // we give setState an object of things to update in state
        this.setState({
          pets
        });
      });
  };
  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(" ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}

/* 
We want to, inside of ComponentDidMount, to use animal: animal.context
We want to read from context inside a LIFECYCLE METHOD
And so far we can only read from context inside the render method, SO WHAT DO WE DO

We have to wrap the thing we export (in this case "the thing is: Results") with Consumer AND
pass that in as PROPS to Results

Normally we wouldn't use 'function' but by using it... it will show up on the callstack in case 
we need to debug

*/
