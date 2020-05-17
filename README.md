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

_Si vamos a trabajar con postgres, no hay que modificar el ENGINE. El puerto lo podemos dejar vacío para el puerto por defecto.
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

_Creamos un usuario administrador del sistema. Django nos preguntará por los datos necesarios tras ejecutar el siguiente comando:_

```
py manage.py createsuperuser
```

_Ya solamente nos queda iniciar el servidor. Navegamos a WLOG/wlog y escribimos el siguiente comando_

```
py manage.py runserver
```

_Esto iniciará el servidor Django en modo Debug. Podemos cambiarlo a modo producción en el fichero settings.py, pero debemos
tener en cuenta que tendremos que servir los ficheros estáticos con otro servidor de nuestra elección (Nginx, IIS...) ya que Django
no lo hace por motivos de seguridad. También será necesario que configuremos los ALLOWED_HOSTS en el fichero manage.py_

## Ejecutando las pruebas ⚙️

_Para ejecutar las pruebas unitarias, basta con ejecutar un simple comando desde WLOG/wlog_

_Las pruebas unitarias están diseñadas para comprobar que la estructura de la BD es correcta y podemos crear objetos de todas las clases_

```
py manage.py test
```

## Producción 📦

_Para desplegar la aplicación Django en producción debemos:_

_1.Configurar el modo DEBUG = False en WLOG/wlog/wlog/manage.py_

_2.Configurar los ALLOWED_HOSTS en WLOG/wlog/wlog/manage.py_

_3.Servir los ficheros estáticos con otro servidor de nuestra elección. [Desplegar archivos estáticos en Django](https://docs.djangoproject.com/en/3.0/howto/static-files/deployment/)_


# WLOGAPI

En este apartado explicaremos cómo instalar la API complentaria WLOGAPI, que nos permitirá hacer operaciones CRUD sobre nuestros Post desde cualquier lugar.

### Instalación de la API WLOGAPI 🔧

_Una vez tenemos instalado Node.js en nuestro sistema, procederemos a instalar las dependencias de la API y configurarla
para que pueda correr correctamente_

_Sitúate en la carpeta de tu sistema local donde quieras instalar WLOG y clona el repositorio (si no lo has hecho ya). El punto final del comando hará que se descargue en esa misma carpeta_

```
git clone https://github.com/elotrofausto/WLOG.git .
```

_Instalamos las dependencias de Node. Navega a WLOGAPI/ con una consola de comandos y escribe:_

```
npm i
```

_El comando anterior descargará e instalará las dependencias de la API. Ahora falta configurar la conexión a la base de datos. Edita el fichero WLOGAPI/config/default.json y añade los parámetros de conexión(los mismos que has utilizado en la aplicación principal)_

_Sólo falta iniciar el servidor de nuestra API con el siguiente comando. Navega con una consola hasta WLOGAPI/ y escribe:_

```
node index.js
```

_Para producción, deberíamos utilizar herramientas como pm2 o crear tareas de windows que inicien la API_

## Autores ✒️

_Este es un proyecto final de grado superior de DAW (Desarrollo de Aplicaciones Web) para Ilerna_

_Autor:_
* **Alberto Fausto** - *Trabajo Inicial* - [elotrofausto](https://github.com/elotrofausto/)

# Manual de Usuario ☕

El siguiente manual de usuario explica cómo gestionar el sistema WLOG. Hay que recordar que WLOG está hecho por y para desarrolladores, por lo que se requieren unos mínimos conocimientos de programación para modificar las plantillas y estilos de la aplicación.

## Accediendo a la aplicación

En modo debug, Django iniciará por defecto la aplicación en [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## WLOG Admin (Nivel usuario)

Podemos acceder al panel de administración desde [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) con las credenciales del superusuario que creamos durante la instalación. Desde este panel de administración, vamos a poder gestionar de forma muy sencilla:

-Los usuarios
-Grupos de usuarios
-Posts
-Páginas
-Productos

Una vez empecemos a crear contenido este aparecerá en nuestra web. Podemos comprobarlo accediendo a [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## Configuraciones avanzadas (Nivel Programador)

El sistema puede ser modificado para adaptarlo a las necesidades de cada usuario adminsitrador. A continuación citamos los cambios más importantes que se pueden aplicar junto con la ruta de los ficheros donde se realizan. Para todos estos apartados hacen falta conocimientos de programación en Python y del Framework Django.

-Configuración -> WLOG/wlog/wlog/settings.py
-Modelos de la BD-> WLOG/wlog/blog/models.py
-Url -> WLOG/wlog/wlog/urls.py y WLOG/wlog/blog/urls.py
-Panel de Administración -> WLOG/wlog/blog/admin.py
-Plantillas -> WLOG/wlog/templates

