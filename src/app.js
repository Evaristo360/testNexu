const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const routerApi = require('./routes');

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send('403');
});

routerApi(app);

app.listen(port,()=>{
    console.log("Port ==> ", port);
});
