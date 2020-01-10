const express=require('express');
// cargando libreria
const app=express();
// constante que inicia la frame work
app.use(express.json());


const port=process.env.PORT ||3000;
// definimos nuestro puerto
app.listen(port);
// para que escuche en ese puerto

console.log("API escuchando en el puerto BIP BIP "+port);

/* (hasta 05/10)
app.get("/apitechu/v1/hello",
// ruta o path donde se dirige el get
function(req,res){
  console.log("GET /apitechu/v1/hello");

  res.send({"msg":"Hola desde API TechU!"});
}
// funcion ordenadora

);

app.get("/apitechu/v1/users",
function(req,res){
  console.log("GET /apitechu/v1/users");
  console.log(req.query);
  console.log(req.query.$count);
  console.log(req.query.$top);

// res.sendFile('usuarios.json', {root:__dirname});

var users=require('./usuarios.json');
var output;
if (req.query.$top && req.query.$count) {
  output={count:users.length, users:users.slice(0,req.query.$top)};
}
/* else (
  if (req.query.$top) {
    output={users.slice(0,req.query.$top)};
    else if (req.query.$count) {
      output={"count":users.length,"users":users};
      else {
        output=users;
      }
    }
  }
)
}
var usersTop=users.slice(0,req.query.$top);
//console.log(usersTop);
res.send(output);
}



); (a partir de 08/10)*/
app.get("/apitechu/v1/users",
 function (req, res) {
   console.log("GET /apitechu/v1/users");

   var result = {};
   var users = require('./usuarios.json');

   if (req.query.$count == "true") {
     console.log("Count needed");
     result.count = users.length;
   }

   result.users = req.query.$top ?
     users.slice(0, req.query.$top) : users;

     res.send(result);
   }
)

app.post("/apitechu/v1/users",
function (req, res) {
  console.log("POST /apitechu/v1/users");

  console.log(req.headers);
  console.log(req.headers.first_name);
  console.log(req.headers.last_name);
  console.log(req.headers.email);

  var newUser={
    "first_name":req.headers.first_name,
    "last_name":req.headers.last_name,
    "email":req.headers.email
  };
  var users=require("./usuarios.json");
  users.push (newUser);

  writeUserDataToFile(users);

  res.send("Usuario añadido con éxito");
}
);

//funciones del 09/10

/*app.delete("/apitechu/v1/users/:id",
function (req, res) {
  console.log("DELETE /apitechu/v1/users/:id");
  console.log("La id enviada es: "+ req.params.id);



  var users=require("./usuarios.json");

for (var i=0; i<users.length;i++){
  if (users[i].id==req.params.id){
   users.splice(i,1);

   console.log("id encontrado= "+req.params.id);
   break;
  }
  console.log(users[i]);
}

  //users.splice(req.params.id - 1,1);
  writeUserDataToFile(users);
  console.log("Usuario borrado");
  res.send(users);
}
)*/

 app.delete("/apitechu/v1/users/:id",
function (req, res) {
  console.log("DELETE /apitechu/v1/users/:id");
  console.log("La id enviada es: "+ req.params.id);



  var users=require("./usuarios.json");

users.forEach(function(valor,indice){
  if (valor.id==req.params.id){
    console.log(valor);
    users.splice(indice,1);

  }
  console.log(users[indice].id);
});

   console.log("id encontrado= "+req.params.id)




  //users.splice(req.params.id - 1,1);
  writeUserDataToFile(users);
  console.log("Usuario borrado");
  res.send(users);
}
)







//funciones del 09/10

app.post("/apitechu/v1/monstruo/:p1/:p2",
function(req,res){
  console.log("POST /apitechu/v1/monstruo/:p1/:p2");

  console.log("Parametros");
  console.log(req.params);

  console.log("Query String");
  console.log(req.query);

  console.log("Headers");
  console.log(req.headers);

  console.log("Body");
  console.log(req.body);
}
);

function writeUserDataToFile (data) {
 const fs=require('fs');

 var jsonUserData=JSON.stringify(data);

fs.writeFile("./usuarios.json",jsonUserData, "utf8",
function(err){
  if (err){
  console.log(err);
} else {
  console.log("Datos escritos en el fichero");
}
}
);
}


function writeUserDataToFileLogin (data) {
 const fs=require('fs');

 var jsonUserData=JSON.stringify(data);

fs.writeFile("./prueba.json",jsonUserData, "utf8",
function(err){
  if (err){
  console.log(err);
} else {
  console.log("Datos escritos en el fichero prueba.json");
}
}
);
}


app.post("/apitechu/v1/login",
function(req,res){
  console.log("POST /apitechu/v1/login");

  console.log("Body");
  console.log(req.body);
  var loginemail=false;
  var loginpassword=false;
  var users=require('./prueba.json');

  for (user of users){
    console.log("comparando ("+user.email+") con ("+req.body.email+")");
    if(user.email==req.body.email){
      console.log("existe el email");
      loginemail=true;
      if (user.password==req.body.password){
        console.log("contraseña correcta");
        loginpassword=true;
        user.logged=true;
        var idUsuario=user.id;
        break;
      }else{
        console.log("contraseña incorrecta");
        break;
      }


    }
  }

  if (loginemail&&loginpassword) {
    writeUserDataToFileLogin(users);
    res.send({"mensaje":"Login correcto","idUsuario":idUsuario});
  }else{
    res.send({"mensaje":"Login incorrecto"});
  }






}
);

app.post("/apitechu/v1/logout/",
function(req,res){
  console.log("POST /apitechu/v1/logout/");

  console.log("Body");
  console.log(req.body);
  var logoutemail=false;
  var logintrue=false;
  var users=require('./prueba.json');

  for (user of users){
    console.log("buscando el id: "+req.body.id);
    if(user.id==req.body.id){
      console.log("encontrado el id: "+req.body.id);
      logoutemail=true;
      if (user.logged){
        console.log("el usuario sí estaba logeado");
        logintrue=true;
        delete user.logged;
        break;
      }else{
        console.log("el usuario no estaba logeado");
        break;
      }


    }
  }

  if (logoutemail&&logintrue) {
    writeUserDataToFileLogin(users);
    res.send({"mensaje":"Logout correcto","idUsuario":req.body.id});
  }else{
    res.send({"mensaje":"Logout incorrecto"});
  }






}
);
