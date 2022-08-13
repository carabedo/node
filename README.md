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
## Templates

Express te permite configurar varios motores de vista/plantillas, incluidos EJS, Hbs, Pug (ahora llamado Jade), Twig y Vash, **Jade** es la opcion por default. Pero...que es una vista? Que es un template? Bueno si sabemos algo basico de web development vimos que podemos diseñar nuestras paginas con html css, luego le dimos interactividad con js, creando paginas super complejas! Pero todo eso estaba del lado del cliente, es decir estaba todo incluido el codigo en el navegador del usuario, hay veces que necesitamos realizar procedimientos del lado del servidor (pensemos en un sitio que maneja datos sensibles, homebanking, mails).

Generalmente los datos del sitio con miles de usuarios se guardan en bases de datos y y nuestro sitio en este caso (express) se encarga de solicitar los datos necesarios de acuerdo a la interaccion del usuario con el sitio (por ejemplo, cuando un usuario se logea y quiere ver sus mails). En este sentido no es practico generar un html/css/js especifico para cada usuario, necesitamos que se generen de manera automatica y dinamica. 

Esta es la finalidad de las templates y las vistas, las vistas podemos pensarlas como funciones que administran las peticiones del cliente y permiten generar a partir de templates el codigo html que se enviara al navegador. Incluso estas vistas pueden hacer consultas a la base de datos e incluirlas en el html de respuesta al cliente.

Miremos la carpeta `primer_proyecto\views` vemos que hay tres archivos:

```
└───    /views
        └───error.pug
        └───index.pug
        └───layout.pug
```

Si abrimos `index.pug`

```
extends layout

block content
  h1= title
  p Welcome to #{title}
```

Estamos viendo una plantilla que usa `pug` un metalenguaje que nos permite crear html de una manera mas sencilla, notar que esta template extiende una plantilla llamada layout, tambien vemos que dentro de una identacion estamos maquetando html. Hay una variable asiganda a una etiqueta `h1` y luego esta misma variable es insertada en un texto asociado a otra etiqueta `p`. Cambiemos el texto:

```
extends layout

block content
  h1= title
  p Bienvenido a mi primer_proyecto en node usando #{title} y pug como metalenguaje de HTML!
  ul 
    li me gusta
    li pero no entiendo mucho!
```

Veamos http://127.0.0.1:3000

Sencillo no?

Ejemplo de lo que se puede hacer con pugjs:

Con HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Pug</title>
    <script type="text/javascript">
      if (foo) bar(1 + 5);
    </script>
  </head>
  <body>
    <h1>Pug - node template engine</h1>
    <div id="container" class="col">
      <p>You are amazing</p>
      <p>
        Pug is a terse and simple templating language with a strong focus on
        performance and powerful features.
      </p>
    </div>
  </body>
</html>
```
Con pugjs:

```pug
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5);
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

Mas informacion sobre pugjs https://github.com/pugjs/pug

## Rutas

Veamos que hay en la carpeta `routes`:

```
 └───    /routes
        └───index.js
        └───users.js
```

Cada archivo representa la respuesta del servidor a http://127.0.0.1:3000/ y a http://127.0.0.1:3000/users/ respectivamente. 

Veamos `index.js`:

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

Pongamos atencion a:

```js
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
```

Estamos definiendo un callback que se encarga de responder cuando nuestro servidor recibe un requests GET en `/`, cual es la respuesta? El output de la funcion render. Esta funcion renderea el template `index.jade` que vimos hace un rato y ademas al hacerlo usa la variable `title` con su valor `Express`.

Para practicar cambiemos la respuesta en `\users`, vamos a `routers\users.js`:

```js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
```

Cambiemos un par de cosas:

A la funcion get, le podemos agregar una ruta especifica `/saludos/` y en vez de responder con un string, vamos a renderear un template. 

Entonces quedaria asi:

```js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/saludos/', function(req, res, next) {
  res.render('saludos_vista', { title: 'Creando Vista' });
});

module.exports = router;
```
Ahora nos falta crear la vista en la carpeta \views\ , creamos un archivo llamado `saludos_vista.jade` y copiamos esto:

```pug
extends layout

block content
  h1= title
  p Bienvenido a mi primer vista en express usando pug como metalenguaje de HTML!
  ul 
    li me gusta
    li voy entendiendo!
```

Para ver los cambios tenemos que cerrar el servidor con `crtl+c` y volverlo a levantar con `npm start`.

### Creando rutas

Recien modificamos una ruta, pero que pasa si queremos agregar una ruta al sitio, por ejemplo `\about` podemos probar de crear un archivo `about.js` en rutas y ver que no funciona. Lo que falta es agregarla en la `app.js`.

