import React from "react";
import { Card } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";

const DraggableFavourite = ({ property, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "FAVOURITE",
    item: { property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

const Favourites = ({
  favourites,
  handleRemoveFromFavourites,
  handleClearFavourites,
  handleAddToFavourites,
}) => {
  const [, drop] = useDrop({
    accept: "PROPERTY",
    drop: (item) => handleAddToFavourites(item.property),
  });

  return (
    <div ref={drop}>
      <div className="pt-3">
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
        <div className="pt-3">
          <p>No favourites added yet</p>
          <p>
            Drag a item in or Click "Add to favourites" button to save your
            favourites for quick access 😉
          </p>
        </div>
      ) : (
        favourites.map((property) => (
          <DraggableFavourite key={property.id} property={property}>
            <Card key={property.id} className="mb-2">
              <Card.Body>
                <Card.Title>{property.type}</Card.Title>
                <Card.Img
                  class="card-img-top"
                  src={property.picture}
                  alt="property"
                />
                <Card.Text>
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
                </Card.Text>

                <button
                  class="btn btn-danger"
                  onClick={() => handleRemoveFromFavourites(property.id)}
                >
                  Remove from favourites
                </button>
              </Card.Body>
            </Card>
          </DraggableFavourite>
        ))
      )}
    </div>
  );
};

export default Favourites;
