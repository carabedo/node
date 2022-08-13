# node

# Instalacion:

Instalamos node 16.x en linux/wsl :

```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

Probemos que todo este funcionando:

```
node --version
```

Deberiamos ver la version 16.X

### Hola mundo:

Vamos a crear nuestro primer sitio web, en una carpeta nueva creamos un archivo `hola.js` y copiamos lo siguiente:

```
//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola mundo!\n');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Y ahora corremos este script:

```
node hola.js
```

Vemos en consola que nos dice que nuestro sitio esta en http://127.0.0.1:3000 

# Express Framework

Lo que hicimos recien no es lo mas practico, vamos a usar una libreria para poder desarrollar nuestro sitio de una manera mas sencilla y productiva.

```
sudo npm install express-generator -g
```

Ahora vamos a crear nuestro primer proyecto de express:

```
express primer_proyecto
```

Esto genera una carpeta llamada `primer_proyecto` con todo lo necesario:

```
│   app.js      
│   package.json          
└───bin      
└───public         
└───routes     
└───views              
```

Ingresemos en la carpeta del proyecto usando `cd primer_proyecto`, si intentamos levantar el servidor con `npm start` veremos un monton de errores, lo que sucede es que nuestro simple proyecto utiliza librerias de node que todavia no instalamos, para eso usamos:

```
npm install
```
Luego de haber instalado todo ya podemos levantar nuestro sitio con:

```
npm start
```

Vamos a http://127.0.0.1:3000:


![](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment/express_default_screen.png)

# Express 