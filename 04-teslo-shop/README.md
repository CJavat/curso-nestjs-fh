# Descripción

## Dev

1. Clonar el directorio.
2. Hacer una copia de `.env.template` y renombrarlo a `.env`.
3. Configurar variables de entorno.
4. Levantar DB `docker compose up -d`.
5. Instalar dependencias `npm install`.
6. Correr las migraciones de Prisma

```
npx prisma migrate dev
```

7. Ejecutar el Seed `npm run seed`.
8. Correr el proyecto `npm run dev`.

## Prod
