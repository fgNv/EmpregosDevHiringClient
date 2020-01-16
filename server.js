const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
 
app.use(express.static(path.join('dist', 'EmpregosDevHiringClient')));
 
app.get('/*', (req, res) => {
res.sendFile(path.join('dist', 'EmpregosDevHiringClient','index.html'), { root: '.' });
});
 
app.listen(process.env.PORT || 8080);