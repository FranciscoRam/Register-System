# Sistema de registro y autentificacion con nodejs y base de datos en mysql

**NOTA:** Es necesario que tengan instalado **npm**, y
junto con mysql, si son de windows **mysql workbench**, de linux pueden instalar mariadb desde consola y manejar la base de datos desde ahi, para agregar una base de datos "un archivo .sql", se usa el comando.

```sql
use database;
source pwd
```

**database:** Es el nombre de la base de datos en este caso se uso una llamada RaitesFimee.


**pwd:** hace referencia a la ubicacion del archivo .sql

La base de datos contendra una tabla como la siguiente.

```sql
create table users(
	id int primary key auto_increment,
	email varchar(255) not null,
	nombre varchar(255) not null,
	password varchar(255) not null
)
```

## Youtube

[Video de avance](https://www.youtube.com/watch?v=c_8iWQeudVk&feature=youtu.be)
[Video de proyecto finalizado](https://www.youtube.com/watch?v=JNfEejIJg1I&t=3s)