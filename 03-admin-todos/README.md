# Dev

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Crear una copia de `.env.template` y renombrarla a `.env`
3. Reemplazar las variables de entorno.
4. Ejecutar `npm install` para instalar las dependencias.
5. Ejecutar `npm run dev` para ejecutar el proyecto
6. Ejecutar comandos de Prisma

```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el **SEED** para [crear la base de datos local](http://localhost:3000/api/seed)

## Nota: Usuario por defecto

**Usuario**: test1@gmail.com
**Contraseña**: 123456

# Prisma Commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage
