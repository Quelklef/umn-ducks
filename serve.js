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
          , image: `/static/ducks/${event.id}.png`
          , history: []
          , status:
            { kind: 'new'
            , since: event.since
            }
          };
      } break;

      case 'duck found': {
        ducks[event.id].status =
          { kind: 'found'
          , by: event.by
          , since: event.since
          };
      } break;

      case 'duck hidden': {
        ducks[event.id].status =
          { kind: 'hidden'
          , by: event.by
          , hint: event.hint
          , since: event.since
          , href: event.href
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


// Don't do this at home, kids
global.htmlInject = process.env.UMN_DUCKS_HTML_INJECT || '';


// "testing"
{
  console.log("Checking...");
  renderFile('./templates/index.ejs', { ducks });
  for (const duck of Object.values(ducks)) {
    console.log(duck.id);
    renderFile('./templates/duck.ejs', { duckId: duck.id, duck });
    if (!fs.existsSync('./' + duck.image))
      throw Error(`Missing image for ${duck.id}`);
  }
  console.log("Ok.");
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
