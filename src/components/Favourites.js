import React from "react";
import { Card } from "react-bootstrap";

const Favourites = ({
  favourites,
  handleRemoveFromFavourites,
  handleClearFavourites,
}) => {
  return (
    <div>
      <div>
        <h2>Favourites</h2>
        {favourites.length > 0 && (
          <button
            onClick={handleClearFavourites}
            class="border-0 bg-transparent"
          >
            <img src="images/bin2.png" alt="clear all" />
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <p>No favourites added yet</p>
      ) : (
        favourites.map((property) => (
          <Card key={property.id} className="mb-2">
            <Card.Body>
              <Card.Title>{property.type}</Card.Title>
              <img class="card-img-top" src={property.picture} alt="property" />

              <p>Type: {property.type}</p>
              <p>Price: {property.price}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Tenure: {property.tenure}</p>
              <p>Location: {property.location}</p>
              <p>URL: {property.url}</p>
              <p>
                Added date: {property.added.month} {property.added.day}{" "}
                {property.added.year}
              </p>

              <button
                class="btn btn-danger"
                onClick={() => handleRemoveFromFavourites(property.id)}
              >
                Remove from favourites
              </button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Favourites;
