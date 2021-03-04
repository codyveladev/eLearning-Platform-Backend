const express = require('express');
const app = express();

//Start on localhost 
const PORT = 8080;
app.use(express.json());



app.get('/', ((req,res) => {
    res.send('hello world')
}));

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})