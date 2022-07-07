# AIM Backend Challenge

## Endpoint de la api

https://5u88gkdny8.execute-api.sa-east-1.amazonaws.com/dev

## Rutas de la api

POST /developers
GET /developers/:username
GET /developers/search/:language

## Consideraciones importantes

- Elegí TypeScript en vez de Ruby on Rails por varias razones: Lo conozco y lo he usado más que Ruby on Rails, me ayuda a evitar varios errores al ser fuertemente tipado y porque sirve como complemento a la documentación del código. Además quería probar como funcionaba en una aplicación Serverless.
- Elegí una infraestructura Serverless (alojada en AWS) porque permite enfocarse en escribir la lógica del negocio, en vez de administrar los servidores. Además, porque es inherentemente escalable. Tal vez habría sido más fácil crear una instancia EC2 en AWS con una base de datos local, pero preferí aprovechar esta instancia para poner en práctica mis conocimientos Serverless.
- Se eligió como base de datos DynamoDB (NoSQL), que se complementa muy bien con la infraestructura Serverless (menor latencia, buena integración). Además, como se tienen claros los patrones de acceso a los datos, es más eficiente y escalable que una base de datos SQL. 
- Hay mucho que mejorar con más tiempo. Se pueden hacer más y mejores tests (no alcancé a hacer tests de integración), mejorar detalles del código, mejorar velocidad de respuesta y la robustez de la API, mejorar la documentación, entre muchas cosas más. Pero dado que se pedía no superar las 5 horas de programando (honestamente creo que le dediqué un poco más que eso), me parece que se llegó a un muy buen resultado.
- Soy partidario de que el código se "autoexplique" en vez de comentar demasiado. Por esto, solo hago comentarios donde no es evidente lo que hace el código.
- En los tests unitarios de la función que crea "Developers" en la base de datos, se hacen llamados a la API de Github. Si se hacen muchos tests, se puede exceder la tasa límite de requests a la API de Github y por eso pueden fallar. Lo ideal habría sido simular las llamadas a la API de Github en los tests unitarios, pero por el límite de tiempo, no lo pude hacer.

## Supuestos que se usaron

- Para calcular la "proficiency" de un lenguaje de programación, se calculó la cantidad de repositorios en los que el usuario usa el lenguaje, y se dividió por la cantidad de repositorios que el usuario tiene. Finalmente, se multiplicó por 100 para expresarlo como porcentaje.
- La ruta de search quedó como "GET /developers/search/:language".
- Por cada lenguaje de programación de los usuarios registrados en la API, se crea un registro en la base de datos. Para prevenir que se creen demasiados registros y me llegue un cobro sorpresa de AWS, el límite de lenguajes que puede tener un usuario para registrarse es de 25. Si tiene más, la llamada a la API muestra un error. Esto es fácilmente modificable.

## Explicación general y estructura del código

- Como sugiere AWS en su documentación para las aplicaciones Serverless, en cada función Lambda se divide el código en tres partes: la lógica del "handler", que recibe el evento de API Gateway; la lógica del negocio, que recibe los parámetros que le entrega el handler y los procesa; y los servicios externos, que se encargan de hacer llamados a la API de Github y a la base de datos. Esta separación permite crear tests unitarios más facilmente y separa las responsabilidades. En el archivo template.yaml se encuentra la configuración de la aplicación Serverless.
- Dentro de la carpeta "src". hay una carpeta por cada ruta de la API. El punto de entrada de cada ruta es el archivo handler.ts. Luego, cada archivo handler.ts llama a businessLogic.ts. Este archivo llama a los archivos que están en la carpeta "services". El archivo types.d.ts dentro de cada ruta contiene exclusivamente definiciones de los tipos usados.
- Para simular la base de datos en los testeos unitarios, se usó una librería llamada "aws-sdk-client-mock".
- La base de datos sigue el patrón de diseño "Single Table", como lo sugiere AWS en su documentación. Dentro de esta única tabla, hay 2 tipos de registros: los registros de los datos personales de cada usuario, y los registros de los lenguajes de programación de cada usuario, con su proficiency. Como parte de este patrón de diseño, algunos atributos de los registros pueden representar a más de una entidad (por ejemplo, en un mismo atributo está el lenguaje y su proficiency). El signo @ sirve como separador cuando un atributo tiene más de un parámetro.
- El endpoint de la API indicado al principio de este README apunta hacia la API en stage "dev". Para "deployear" la aplicación en producción, simplemente se debe cambiar el parámetro stage a "prod" al momento de ejecutar el comando "sam deploy".