## Setup

Please run the following scripts to set up your project

```
# make sure you have npm installed first by running the following script
# npm should come with your homestead box.
npm -v

# install the global dependencies
npm install -g bower grunt grunt-cli

# install project dependency
npm install 
bower install

# you may experience some error when running npm install, if it fails, please try
npm install --no-bin-links

# if it still fails, let me know whats the output.

# verify the project configuration by going into /app/scripts/config.js` and check the api url setup.
# this is exactly why I was suggesting to use `laravel.dev` as our vhost server name

# start up the project
grunt serve
# once you run this command, please keep this ssh session on, and take a look on it constantly as this grunt take will trigger several watcher scripts after you make some change on your code. 

# you can then see the front end running by visiting `http://192.168.10.10:9001` on your host machine browser. 
# please note, `192.168.10.10` is your homestead ip address defined in `~/.homestead/Homestead.yaml` 
```

## Code style
- Try to keep everything moduler, in the angular way, put all business logic in a service and inject it into your controllers, only leave the simpliest page behavior in your controllers.
- For every new big chunk of funcationality, create a new folder in app folder. ie. for dishes related pages, create a folder of `app/dishes` and create subfolders inside it for each of the pages, eg. dishes list page should be placed inside `app/dishes/list`, inside this folder you can then defined your controller and html templates.

## Code structure
- The components folder will contain the actual independent sections for your Angular app.
- The shared folder will contain the individual features that your app will have. These features will ideally be directives that you will want to reuse on multiple pages.

## Naming convention
- Directory / File 
  : Other than the subforders under app, keep it singular
  : in case of CRUD, use the name provided by laravel api i.e, Dish.show, create ...
- Module 
  : component name + subfolder name. i.e, Dish.destroy
  
- Side Note
 : it's also important to keep the names consistent as application gets bigger and bigger when writing components and you need multiple files for the component
 We will consider doing this later if needed 
  i.e, blogView.html, blogServices.js, blogController.js

## TODO
- implement the tests, try to make this project as a test driven project 
- For social login, implement the satellizer cordova plugin https://github.com/sahat/satellizer
