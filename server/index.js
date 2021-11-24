const express = require("express")
const path = require('path')
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
    
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../style.css'))
    
  })


app.get('/visualizer.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../visualizer.js'))
    
});

app.get('/mic.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../mic.js'))
    
});

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`Docked at port ${port}`)
})