const app = require("./src/app");

const port = process.env.PORT || 3008;
app.set('port', port);

//Asignación de puerto
app.listen(app.get('port'), () => {
    //console.log("Corriendo en puerto" + app.get('port'));
    console.log("Corriendo en puerto: "+app.get('port'));
});