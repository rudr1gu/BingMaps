const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'views')));
app.use('/views', express.static(path.join(__dirname,'views')));
app.use('/controller', express.static(path.join(__dirname, 'controller')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/map.html');
})

const port = process.env.PORT || 7200;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});