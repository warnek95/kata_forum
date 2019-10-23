Voici le projet de forum  

Pour builder le projet puis lancer le projet :  
```sh
$ sudo docker build -t sgforum/backend ./backend  
$ sudo docker-compose up -d  
```

les routes du backend (exposé sur le port 3900) sont les suivantes:  
get  api/messages  
get  api/messages/:topicId  
post api/messages  
get  api/topics  
get  api/topics/:id  
post api/topics  
get  api/users  
get  api/users/:id  