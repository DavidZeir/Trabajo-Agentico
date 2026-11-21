# Escritorio .NET

Lo que hace falta saber en las aplicaciones de escritorio hechas con .NET, como las de C#.

## En cada computador

- **El SDK de .NET, en su última versión:** Desde su página, o con `winget install --id Microsoft.DotNet.SDK.[versión] -e`, con el número de la última, que muestra `winget search Microsoft.DotNet.SDK`. Se instala desde un PowerShell como administrador, abierto desde el menú Inicio.

## Copias de trabajo

### Alistar

- Comprueba los recursos locales que la aplicación necesita en ejecución, como modelos o ejecutables auxiliares. MSBuild puede compilar correctamente aunque un recurso declarado con `None Update` o un comodín falte en el disco. En una copia nueva, verifica el archivo tanto en el proyecto como en la salida que usará la aplicación.
- Cuando el proyecto de pruebas referencia la aplicación y sus auxiliares, restaurar el proyecto de pruebas con `dotnet restore` puede cubrir toda la cadena. Compruébalo en una copia sin restauraciones previas con `dotnet build --no-restore` y `dotnet test --no-restore`. Para esta comprobación, pide un informe TRX nuevo y verifica que indique pruebas ejecutadas. En una copia sin restaurar, el comando de pruebas puede devolver código 0 sin haber ejecutado ninguna.

### Iniciar

- En una aplicación WPF de instancia única, la identidad por copia debe aplicarse al bloqueo de instancia y al canal que activa la ventana. El comando puede consultar ese canal para identificar el PID de WPF, comprobar si la ventana está lista y cerrar solo ese proceso. Una segunda invocación debe preservar el registro de la instancia abierta. Un diálogo de primer uso puede estar esperando una respuesta aunque la ventana principal todavía no esté visible. Si el servidor recrea la tubería después de cada consulta, prueba el cierre mientras otra consulta termina. En Windows, durante ese intervalo el cliente puede recibir que la tubería no existe aunque el proceso siga abierto.
- Asigna el perfil y los registros de prueba desde el comienzo del proceso. Si una biblioteca nativa extrae archivos con nombres fijos en la carpeta temporal de Windows, dale una carpeta temporal propia a cada proceso. Revisa también las preferencias que escriben fuera del perfil, como el inicio automático de Windows, tanto al guardarlas como al completar el primer uso.
- Si la aplicación registra atajos globales, ten en cuenta también los que solo registra durante una operación. Una combinación puede parecer libre mientras la otra copia está en reposo. Prueba ambas en uso simultáneo y contrasta los registros de cada proceso cuando dos ventanas visualmente iguales puedan superponerse.

## Pruebas de interfaz

Todo cambio de interfaz en una aplicación de escritorio .NET se prueba de extremo a extremo con Computer Use en la aplicación en ejecución. Recorre la parte que cambió como lo haría el usuario y comprueba que lo que ve en pantalla y el resultado que obtiene coinciden con lo previsto. Esta comprobación complementa las pruebas automáticas del Verificador.
