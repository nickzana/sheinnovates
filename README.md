# GrammarQuery - She Innovates Hackathon 2022 Submission

## Architecture
GrammarQuery relies on a reactive architecture in order to coordinate the state
and flow of the application. The `index.js` contains our `State` class, which is
a data structure to hold the current values needed by the application, and
propagate changes based on those values. The `PageElements` class contains the
UI and DOM logic. It subscribes to changes in the global `State` object, and
hooks the interactive elements of the DOM to their `State` values.

## Technical Details
GrammarQuery relies on no external libraries or frameworks for the front-end
application. As noted in the Architecture section, GrammarQuery bootstraps its
own application flow. We chose a reactive model in order to concisely handle the
asynchronous aspect of the buttons and API calls.

## Getting Started
In order to build GrammerQuery, you need an API key. This API key can be
obtained at [RapidAPI](https://rapidapi.com/grammarbot/api/grammarbot).

Then, this API key must be placed into a `KEY.js` file in the root of the
project directory.

Copy `KEY.js.example` to `KEY.js` and replace the `API_KEY` variable with your
own API key.

## Many Thanks To
* [RapidAPI](https://rapidapi.com/grammarbot/api/grammarbot) for their GrammarBot Grammar Checker API.
* [MaxPixel](https://www.maxpixel.net/Perched-Beak-Bill-Animal-Parrot-Branch-Bird-5978099)
  for the Creative Commons Zero (CC0) licensed iconography used as the
  GrammarQuery logo.
