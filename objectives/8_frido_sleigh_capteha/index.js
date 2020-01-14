const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('themodel'));
app.get('/', (req, res) => res.sendFile(__dirname +'/model.json'));

app.listen(port, () => console.log(`CAPTEHA server listening on port ${port}!`));
