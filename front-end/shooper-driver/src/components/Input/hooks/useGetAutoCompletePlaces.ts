import { useEffect, useMemo, useRef, useState } from "react";
import { loadScript } from "../../../infra/http/load-script-google";
import debounce from "@mui/material/utils/debounce";

import { InferType } from "yup";

import { placeTypeSchema } from "../schemas/input-schemas";

type PlaceType = InferType<typeof placeTypeSchema>

const autocompleteService = { current: null };

const GOOGLE_MAPS_API_KEY= import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const useGetAutoCompletePlaces = () => {
    
  const [optionsOrigin, setOptionsOrigin] = useState<readonly PlaceType[]>([]);
  const [optionsDestination, setOptionsDestination] = useState<readonly PlaceType[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('')
  const loaded = useRef(false);

 

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const getPlaces = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );



  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any 
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptionsOrigin([])
      return undefined;
    }

    getPlaces({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        setOptionsOrigin(results ?[...results ] : []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, getPlaces]);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any 
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (destinationValue === '') {
      setOptionsDestination([])
      return undefined;
    }

    getPlaces({ input: destinationValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        setOptionsDestination(results ?[...results ] : []);
      }
    });

    return () => {
      active = false;
    };
  }, [getPlaces, destinationValue]);


  return {optionsOrigin, setOptionsOrigin, inputValue, setInputValue, setDestinationValue, destinationValue, optionsDestination, setOptionsDestination}
}
