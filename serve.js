const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

let state;
{
  try {
    state = require('./state.js').default;
  } catch (e) {
    if (e.code === 'ENOENT') state = {};
    else throw e;
  }
}

let ducks;
{
  ducks = {};

  for (const event of state.events) {

    switch (event.kind) {

      case 'duck born': {
        ducks[event.id] =
          { id: event.id
          , name: event.name
          // , image: `static/${event.id}.png`
          , image: `https://placekitten.com/512/512?image=${Math.floor(Math.random() * 16) + 1}`
          , history: []
          , status:
            { kind: 'new'
            , time: event.time
            }
          };
      } break;

      case 'duck found': {
        ducks[event.id].status =
          { kind: 'found'
          , by: event.by
          , time: event.time
          };
      } break;

      case 'duck hidden': {
        ducks[event.id].status =
          { kind: 'hidden'
          , by: event.by
          , hint: event.hint
          , time: event.time
          };
      } break;

      default:
        throw Error(`Unknown event kind '${event.kind}'`);

    }

    ducks[event.id].history.push(event);

  }
}

// Patch ejs.renderFile to be synchronous
let renderFile;
{
  const result = Symbol('result');
  // ejs.renderFile returns a Promise even though its implementation is synchronous.
  // Dunno what's up with that. Patch that behaviour here.
  ejs.promiseImpl = function(body) {
    body(val => { this[result] = val; }, val => { throw val; });
  };
  renderFile = (...args) => ejs.renderFile(...args)[result];
}

const app = express();

app.get('/', (req, res) => {
  const html = renderFile('./templates/index.ejs', { ducks });
  res.send(html);
});

app.get('/found/:duckId', (req, res) => {
  const duckId = req.params.duckId;
  const duck = duckId in ducks ? ducks[duckId] : null;
  const html = renderFile('./templates/found.ejs', { duckId, duck });
  res.send(html);
});

app.use('/static', express.static('static'))

app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.listen(process.env.UMN_DUCKS_PORT || 8017);
