
# api-comparison-app

This is a simple app with a React interface to compare a REST-based API and a GraphQL-based API using the same basic CRUD.

## Using the app
#### Requirements
* Node.js and npm are needed to run this app.
```bash
sudo apt-get install nodejs
sudo apt-get install npm
```
* (Optional) Tmux to start the app using the tmux shell script
```bash
sudo apt-get install tmux
```


#### Running the app
You can start the React app, and both APIs at the same time by runnint with tmux-shell script with: 
```bash
./tmux-shell.sh
```
or
```bash
bash tmux-shell.sh
```

Otherwise, you can start each one individually by going to its own directory and running:
```bash
npm run start
```

----------------------------------------
The GraphQL API comes with its own interface, available at http://localhost:4000/