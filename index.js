//Dependencia que viene nativa del sistema para los sistemas de archivos (File System)
const fs = require('fs');

// Dependencia nativa para poder llamar los métodos http en la página
const http = require('http');

// Dependencia para poder usar los métodos de URL existentes
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

/////////////////////////////////////////////77

// FILES CLASS

//Código que de bloqueo (Blocking), manera Síincrona (Syncronous way)

//Como leer una fila de .txt (puede ser otro tipo de fila tambien)

//se declara una variable que constiene la función de fileReadSync, la cual lee de manera síncrona en el código un documento que se especifique
//La función cuenta con 2 argumentos, el archivo que se va a leer (en forma de ruta del archivo) y la tipografia que maneja (en esste caso utf-8)

/*const textLoreFnaf = fs.readFileSync('./txt/lore.txt', 'utf-8')

console.log(textLoreFnaf);


//Como generar una fila de .txt (puede ser otro tipo de fila tambien)

//se declara una variable que constiene un string que se vaya a guardar en el documento
//con la función de fs de writeFileSync, se va a ejecutar de manera síncrona en el documento
//La función cuenta con 2 argumentos, el archivo que se va a escribir (en forma de ruta del archivo) y la tipografia que maneja (en esste caso utf-8)

const textGenerator = `Existen copys de fnaf como estos: ${textLoreFnaf}\nEste copy fue generado el ${Date.now()}`

fs.writeFileSync('./txt/output.txt',textGenerator)

console.log('File written');

// Código sin bloqueo (Non-Blocking) , lectura asíncrona (Asyncronous way)

//Como leer una fila de .txt (puede ser otro tipo de fila tambien)

//se declara la función de fileRead, la cual lee de manera asíncrona en el código un documento que se especifique
//La función cuenta con 3 argumentos, el archivo que se va a leer (en forma de ruta del archivo), la tipografia que maneja (en esste caso utf-8) y un callback que se ejecutará en segundo plano que tiene los parámetros err, que hacen refetecia al error si llega a haber uno en el código; y data, el cual hace referencia a la informaci+on contenida en el documento

fs.readFile('./txt/lore.txt', 'utf-8', (err,data) =>{
        console.log(data);
})

//Primero se ejecutará este console log, y después la función de arriba

console.log('reading data'); 

//Como escribir una fila de .txt (puede ser otro tipo de fila tambien)

//se declara la función de writeFile, la cual lee de manera asíncrona en el código un documento que se especifique
//La función cuenta con 4 argumentos, el archivo que se va a escribir (en forma de ruta del archivo),el contenido que se le va a escribir al documento, la tipografia que maneja (en esste caso utf-8) y un callback que se ejecutará en segundo plano que tiene el parámetros err, que hacen refetecia al error si llega a haber uno en el código

fs.writeFile('./txt/final.txt', `Random stuff`, 'utf-8', (err) =>{
    if (err) throw err;
    console.log('The file was saved sussefully :D')
})

//Priero se ejecutará este este comando que el anterior

console.log('writting data') 

//Callback Hell

//El callback Hell el nombre que se le pone cuando en una función llegan a haber demasiados callbacks que dificultan la lectura y comprensión de código, el callback hell se caracteriza por tener una estructura triangular como se puede observar, pero se puede evitar con las promesas, o con las funciones Async/Await

fs.readFile('./txt/tuna.txt', 'utf-8', (err,data1) =>{
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2) =>{
        console.log(data2);
        fs.readFile('./txt/lore.txt', 'utf-8', (err,data3) =>{
            console.log(data3);
            fs.writeFile('./txt/final.txt', `Random stuff \n${data2}\n${data3}`, 'utf-8',(err) =>{
                if (err) throw err;
                console.log('The file was saved sussefully :D')
            })
        })
    })
})*/

////////////////////////////////////

// SERVER WEB CLASS

// Primer servidor web que acepte request y responses

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProducts = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObject = JSON.parse(data);

//const slugs = dataObject.map((e) => slugify(e.productName), { lower: true });
//console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardHTML = dataObject
      .map((element) => replaceTemplate(tempCard, element))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHTML);

    //res.end('This is the overview')
    res.end(output);

    //Products Page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProducts, product);
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    //NOT FOUND
  } else {
    //Se declara que se ca a escribir un header y que el estado será de no encontrado (error 404)
    res.writeHead(404, {
      //Define el tipo de contenido que se va a enviar a la aplicación, en este caso texto formato HTML
      'Content-type': 'text/html',
      //Se puede crear tambíen headers personalizados y el programa los leerá
      'my-own-header': 'hello-World',
    });
    //Este string se parsea como código HTML mostrando "You can't stay here" y los <h1></h1> quedan como formato
    res.end("<h1>You can't stay here</h1>");
  }
});

//Para que el servidor pueda escuchar los llamados del puerto se usa la función .listen
//La función vuenta con 3 parámetros, el numero del puerto donde se escucha, el servidor donde se va a ejecutar el llamado (en este caso nuestra IP de servidor local) y un callback que manda el mensaje cuando se conecta exitosamente al servidor.

server.listen(5000, '127.0.0.1', () => {
  console.log('litening to request on port 5000');
});
