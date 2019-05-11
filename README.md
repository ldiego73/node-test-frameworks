# Database

```
URL         =   employees.cjfufruyxcg4.us-west-2.rds.amazonaws.com
DB          =   employees
username    =   employees
password    =   employees
```

# Data test

https://github.com/datacharmer/test_db

### Habilitar puerto de salida en la instancia

```
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```

### Ingresar a la instancia

```
sudo ssh -i aws-key.pem ubuntu@54.212.118.128
```

### Iniciar servicios

```
pm2 start src/server.js --name "api-express" -i max
pm2 start src/server.js --name "api-fastify" -i max
pm2 start src/server.js --name "api-hapi" -i max
pm2 start src/server.js --name "api-koa" -i max
pm2 start src/server.js --name "api-restify" -i max

```