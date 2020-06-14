const express = require("express");
const bodyparser = require("body-parser");
const app = express(); 
const path= require("path");

//base de datos o intenta similar xD 
const campeones = [
    {
      "nombre": "Darius",
      "region": "Noxus",
      "tipo": "peleador",
      "costo": "6300",
      "id": 1
    },
    {
      "nombre": "Garen",
      "region": "Demacia",
      "tipo": "Luchador",
      "costo": "450",
      "id": 2
    },
    {
      "nombre": "Katarina",
      "region": "Noxus",
      "tipo": "Asesino",
      "costo": "3600",
      "id": 3
    },
    {
      "nombre": "Cho ' gat",
      "region": "Vacio",
      "tipo": "Tanque",
      "costo": "1450",
      "id": 4
    },
    {
      "nombre": "Riven",
      "region": "Jonnia",
      "tipo": "Luchador",
      "costo": "4800",
      "id": 5
    }
  ];

//configuracion
app.set('json spaces',2);


//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));//carpeta public se manda al navegador

//iniciar servidor
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

// cambio de informacion
app.use(bodyparser. urlencoded({extended: false}));
app.use(bodyparser.json());

//rutas

//GET
app.get('/campeones',(req,res)=>{
    res.json(campeones);
});
//POST
app.post('/campeones',(req,res)=>{
    const {nombre} = req.body;
    const {region} = req.body;
    const {tipo} = req.body;
    const {costo} = req.body;
    campeones.push({
        id: campeones.length + 1,
        nombre: nombre,
        region: region,
        tipo: tipo,
        costo: costo
    });
    res.json('Campeon Creado');
});
//PUT
app.put('/campeones/:id',(req,res)=>{
  const { id } = req.params; //req params para encontrar y
  const { nombre } = req.body;//req body para obtener los datos actualizados
  const { region } = req.body;
  const { tipo } = req.body;
  const { costo } = req.body;

  campeones.forEach((campeon, i)=>{//el foreach va a recorrer cada campeon y cuando lo recorra me da un indice osea por cual recorrido va
    if(campeon.id == id){// si el id que esta reccoriendo es igual al id que el navegador me esta enviando, lo encontro xd
      campeon.nombre = nombre;
      campeon.region = region;
      campeon.tipo = tipo;
      campeon.costo = costo;
    }
  })
  res.json("modificacion exitosa");
});
//DELETE
app.delete('/campeones/:id',(req,res)=>{
  const { id } = req.params;

  campeones.forEach((campeon, i)=>{
    if(campeon.id == id){
      campeones.splice(i, 1);//elimina 1
    }
  });
  res.json('Eliminado satisfactoriamente');
});