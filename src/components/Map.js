import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import pothole from "../assets/img/pothole.jpg";

const center = { lat: 19.0522, lng: 72.9005 };
const potholeLocations = [
  {lat:19.042095,lng:72.894223},

{lat:19.042060,lng:72.894105},

{lat:19.042558,lng:72.893615},

{lat:19.042404,lng:72.893569},

{lat:19.042859,lng:72.893533},

{lat:19.043005,lng:72.893542},

{lat:19.043108,lng:72.893542},

{lat:19.043108,lng:72.893542},

{lat:19.043750,lng:72.893543},

{lat:19.043750,lng:72.893543},

{lat:19.044287,lng:72.893532},

{lat:19.044449,lng:72.893500},

{lat:19.044571,lng:72.893435},

{lat:19.045352,lng:72.893746},

{lat:19.045494,lng:72.893918},

{lat:19.045666,lng:72.895098},

{lat:19.045702,lng:72.895933},

{lat:19.045717,lng:72.896041},

{lat:19.045746,lng:72.896329},

{lat:19.045745,lng:72.896344},

{lat:19.045748,lng:72.896362},

{lat:19.045784,lng:72.89672},

{lat:19.045784,lng:72.896832},

{lat:19.045821,lng:72.897131},

{lat:19.045992,lng:72.87285},

{lat:19.045992,lng:72.87285}
  // Add more pothole locations here as needed
];

function Map() {
  const navigate = useNavigate();

  

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDnyb11tWZluAFYBaG8sEVYpu2L6nwIWPE",
    libraries: ["places"],
  });

  const handleGoback = () =>{
    navigate('/')
  }

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [generatedPoints, setGeneratedPoints] = useState([]);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const numRandomPoints = potholeLocations.length; // Specify the number of random points to generate

  // Function to generate random points between the origin and destination
  function generateRandomPoints(origin, numPoints) {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const randomLat = origin.lat + 1*0.02; // Adjust the range as needed
      const randomLng = origin.lng + 1 * 0.02; // Adjust the range as needed
      points.push({ lat: randomLat, lng: randomLng });
    }
    return points;
  }

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const renderPotholeMarkers = () => {
    return potholeLocations.map((location, index) => (
      <Marker
        key={index}
        position={location}
        icon={{
          url: pothole, // Corrected URL format
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      />
    ));
  };


  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setButtonClicked(true);
    if (
      results &&
      results.routes[0] &&
      results.routes[0].legs[0] &&
      results.routes[0].legs[0].start_location
    ) {
      const newGeneratedPoints = generateRandomPoints(
        {
          lat: results.routes[0].legs[0].start_location.lat(),
          lng: results.routes[0].legs[0].start_location.lng(),
        },
        numRandomPoints
      );
      setGeneratedPoints(newGeneratedPoints); // Update the state variable
      console.log(newGeneratedPoints);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
    setButtonClicked(false);
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}

          {/* Add pothole markers to the map */}
          {buttonClicked && renderPotholeMarkers()}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <ButtonGroup>
              <Button colorScheme="pink" type="submit" onClick={handleGoback}>
                Go Back
              </Button>
            </ButtonGroup>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default Map;
