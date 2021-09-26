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
        const duck =
          { id: event.id
          , name: event.name
          , image: `static/${event.id}.png`
          , history: []
          , status: null
          };
        ducks[event.id] = duck;
      } break;

      default:
        throw Error(`Unknown event kind '${event.kind}'`);

    }
  }
}

let render;
{
  const templates = {};
  render = function(name, data) {
    if (!(name in templates)) {
      const text = fs.readFileSync(`./templates/${name}.ejs`, 'utf-8');
      templates[name] = ejs.compile(text);
    }
    const template = templates[name];
    return template(data);
  }
}

const app = express();

app.get('/', (req, res) => {
  const html = render('index', { ducks });
  res.send(html);
});

app.get('/found/:duckId', (req, res) => {
  const duckId = req.params.duckId;
  const duck = duckId in ducks ? ducks[duckId] : null;
  const html = render('found', { duckId, duck });
  res.send(html);
});

app.use('/static', express.static('static'))

app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.listen(process.env.UMN_DUCKS_PORT || 8017);
