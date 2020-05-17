# WLOG
Plataforma ligera de blogging pensada para desarrolladores. Hecha con Python + Django

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos WLOG y WLOGAPI 📋

_Antes de clonar el repositorio, deberías satisfacer las siguientes dependencias:_

[Postgres 12.3](https://www.postgresql.org/download/), [Python 3.8.3](https://www.python.org/downloads/) y [Node.js 12.16.3](https://nodejs.org/es/)

### Instalación de la aplicación principal WLOG 🔧

_Una vez tenemos instalado Postgres y Python en nuestro sistema, procederemos a instalar las dependencias del proyecto y configurarlo
para que pueda correr correctamente_

_Sitúate en la carpeta de tu sistema local donde quieras instalar WLOG y clona el repositorio. El punto final del comando hará que se
descargue en esa misma carpeta_

```
git clone https://github.com/elotrofausto/WLOG.git .
```

_Es conveniente instalar virtualenv y crear un entorno de Python aislado para nuestro proyecto_

```
py -m pip install virtualenvwrapper-win
mkvirtualenv <env_name>
```

_Activammos nuestro virtualenv e instalamos las dependencias en el mismo en lugar de en la instalación global de Python_
```
workon <env_name>
(<env_name>)$ pip install -r WLOG/requirements.txt
```

_Configuramos la conexión a la base de datos en el archivo WLOG/wlog/wlog/settings.py_
_#Si vamos a trabajar con postgres, no hay que modificar el ENGINE. El puerto lo podemos dejar vacío para el puerto por defecto.
Un ejemplo de configuración sería el siguiente_

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'nombre_de_bd',
        'USER': 'usuario_bd',
        'PASSWORD': 'password_secreta',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

_Ahora debemos hacer que Django cree y persista los modelos en nuestra base de datos. Navegamos a WLOG/wlog(donde encontraremos el fichero manage.py) y escribimos los siguientes comandos. Si algo falla, debemos comprobar la conexión con la BD._

```
py manage.py makemigrations
py manage.py migrate
```

_Ya solamente nos queda iniciar el servidor. Navegamos a WLOG/wlog y escribimos el siguiente comando_

```
py manage.py runserver
```

_Esto iniciará el servidor Django en modo Debug. Podemos cambiarlo a modo producción en el fichero settings.py, pero debemos
tener en cuenta que tendremos que servir los ficheros estáticos con otro servidor de nuestra elección (Nginx, IIS...) ya que Django
no lo hace por motivos de seguridad. También será necesario que configuremos los ALLOWED_HOSTS en el fichero manage.py_

## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - El framework web usado
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [ROME](https://rometools.github.io/rome/) - Usado para generar RSS


## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

_Este es un proyecto final de grado superior de DAW (Desarrollo de Aplicaciones Web) para Ilerna_

_Autor:_
* **Alberto Fausto** - *Trabajo Inicial* - [elotrofausto](https://github.com/elotrofausto/)

## Manual de Usuario ☕

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.


