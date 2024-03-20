import {useEffect, useState} from "react";

import Places from "./Places.jsx";
import Error from "../Error.jsx";

export default function AvailablePlaces({onSelectPlace}) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  const [updateErrorHandling, setUpdateErrorHandling] = useState(false);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        async function fetchAvailablePlaces() {
          const response = await fetch("http://localhost:3000/places");
          const resData = await response.json();

          if (!response.ok) {
            throw new TypeError("Failed to fetch user-places");
          }
          return resData.places;
        }
        const places = await fetchAvailablePlaces();

        setAvailablePlaces(places);
      } catch (error) {
        console.log(error);
        setError({
          message: error.message || "There is some problem",
        });
        setUpdateErrorHandling(true);
      }
    }
    fetchPlaces();
  }, []);

  function closeErrorHandlingButton() {
    setUpdateErrorHandling(false);
  }

  if (updateErrorHandling) {
    return (
      <Error
        title="There is an error"
        message={error.message}
        onConfirm={closeErrorHandlingButton}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
