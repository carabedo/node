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

express-locallibrary-tutorial
 └───   app.js
 └───   /bin
        └─── www
 └───   package.json
 └───   package-lock.json
 └───   /node_modules
        └───[about 6700 subdirectories and files]
 └───   /public
 └───   /images
 └───   /javascripts
 └───   /stylesheets
        └───style.css
 └───    /routes
        └───index.js
        └───users.js
└───    /views
        └───error.pug
        └───index.pug
        └───layout.pug
        
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

# Vistas/Templates


Express te permite configurar varios motores de vista/plantillas, incluidos EJS, Hbs, Pug (ahora llamado Jade), Twig y Vash, **Jade** es la opcion por default. Pero...que es una vista? Que es un template? Bueno si sabemos algo basico de web development vimos que podemos diseñar nuestras paginas con html css, luego le dimos interactividad con js, creando paginas super complejas! Pero todo eso estaba del lado del cliente, es decir estaba todo incluido el codigo en el navegador del usuario, hay veces que necesitamos realizar procedimientos del lado del servidor (pensemos en un sitio que maneja datos sensibles, homebanking, mails).

Generalmente los datos del sitio con miles de usuarios se guardan en bases de datos y y nuestro sitio en este caso (express) se encarga de solicitar los datos necesarios de acuerdo a la interaccion del usuario con el sitio (por ejemplo, cuando un usuario se logea y quiere ver sus mails). En este sentido no es practico generar un html/css/js especifico para cada usuario, necesitamos que se generen de manera automatica y dinamica. 

Esta es la finalidad de las templates y las vistas, las vistas podemos pensarlas como funciones que administran las peticiones del cliente y permiten generar a partir de templates el codigo html que se enviara al navegador. Incluso estas vistas pueden hacer consultas a la base de datos e incluirlas en el html de respuesta al cliente.


