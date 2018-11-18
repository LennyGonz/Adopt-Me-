import React from "react";
import { Link } from "@reach/router";

class Pet extends React.Component {
  render() {
    // destructuring ==> so instead of doing 'this.name' we do 'name'
    const { name, animal, breed, media, location, id } = this.props;

    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    const hero = photos[0] ? photos[0].value : "http://placecorgi.com/300/300";
    // Hero image --> if photos[0] exists then make it photos[0].value --> IF IT DOESN'T exist then we're gonna use a placeholder image

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </Link>
    );
  }
}

export default Pet;
