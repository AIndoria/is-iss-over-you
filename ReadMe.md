# Is-Iss-Over-You

Checks if the International Space Station is visible from your location or not.

## Getting Started

Ideally, the ISS is set to visible to your location if

* ISS is above horizon @ ~10% accounting for mountains, trees, and/or other objects.
* See TODO

### Prerequisites

You'll need a modern browser which supports getting your current location as well as HTML5 canvas support.


### TODO:

* Check if the weather is clear as one of hte conditions of ISS visibility.
* Check if the Chinese blew up the ISS as another condition for ISS visibility. Parse the four word from Wikipedia.
* Add a curve to the stars(Start at y=canvas.height) and when the x or y value<=0, add another star with y=canvas.height and random x value;
* Add Persistent cookies(valid until browser close) so the user isn't prompted for location every refresh.