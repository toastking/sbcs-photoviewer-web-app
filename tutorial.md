# SBCS Web Tutorial

 In this tutorial we will be making a rotating photo gallery, similar to a digital picture frame.  We will be using the Flask framework, Python, jQuery, Bootstrap, and hosting our app on Microsoft's Azure cloud service.  

 Let's start at the beginning.

## How the Web Works
 Most connections on websites are transmitted using the Hypertext Transfer Protocol (HTTP). A    client sends HTTP *requests* to a server and the server responds with an HTTP *response*.  Flask is a python framework that allows us to write a web server to communicate with our client (the web browser) using HTTP.

## Folder Setup
 Flask is a very minimal framework so we have to set up our folders ourselves.
The folder setup is as follows:

        ./photoapp
        ./templates
          index.html
        ./static
          ./images
          main.js
          style.css
        app.py

- photoapp is the main folder for our project
- templates is where we store the Jinja templates that we will render using Flask
- static is where the css, javascript, and images are stored on the server
- app.py is our python file that will be used to run our server

## Setting up virtualenv

**This part is very important!**

Python uses a package manager called *pip*.  By default it installs all packaged globally, throughout your whole system.  We don't want every project to have every library though.
We use something called virtualenv to prevent this.  Virtualenv makes a sandbox for your project.  Anything installed stays in that project.

To set it up follow the first part of the tutorial on the [virtualenv website](http://docs.python-guide.org/en/latest/dev/virtualenvs/).

After we have our virtual environment set up and activated we want to install the packages we want using *pip install* on the command line:

```
pip install flask
pip install gunicorn
```

Then we want to output the requirements of our project to a file called *requirements.txt*.  We're going to need it later for when we deploy our app to the cloud.

```
pip freeze > requirements.txt
```

## Setting up a Minimal Flask server
Flask is a *microframework*, it has very simple syntax.  The routing is based off making annotations with paths and then specifying the HTTP method you want to use (GET,POST,PUT,DELETE).

Here's the code for our minimal Flask web app:

```python
from flask import Flask #import the Flask library

app = Flask(__name__) #set up our flask app using the name global

#set up our root route (/)
@app.route('/')
def home():
  return "Hello Flask!"

#set up the code to run our app from command line
if __name__ == '__main__':
  app.debug = True #set it to debug mode so the server reloads on code updates
  app.run() #run our app

```

To run the app open up command line and change directory to the **photoapp** folder.  Then type *python app.py* and go to the localhost IP address in your web browser to see your work.  

## Rendering a real HTML page
The minimal server is all fine and dandy, it prints hello world in our browser.  We want to do more though, we want to use Flask to give us customized web pages.  To do that we'll have to make an Jinja template.  A Jinja template is an html file with code or variables from our server inserted into it between curly braces ("{{ }}").  On the backend code (our Flask server) we call the *render_template()* method to turn our template into a static html page that the browser can understand.

So, let's make an html page, called index.html since it's our homepage, and put it in the *./static* folder of our app.  Make a basic page and then insert a variable called **name** into the page between curly braces:

```html
<!doctype html>
<head>
<title>PhotoApp</title>
</head>
<body>
{% if name %}
<h1><span id = "greeting">Hello</span> {{name}}...</h1>
{% else %}
<h1>Hello...</h1>
{% endif %}
</body>
```

See how I surrounded the variable part with a conditional?  Jinja is a very powerful templating language and it allows for conditionals, loops, etc.  I added the conditional to have a fallback case incase the backend doesn't supply the variable properly for some reason.

Now let's add the code on the backend to render our template:

- First change our *import* statement to also load the render_template library
- Then add a variable for the *name* (I called mine name)
- Lastly change your home() method to return *render_template('index.html', name = name)*

So here's what your code should look like now:

```python
from flask import Flask,render_template #import the Flask library

app = Flask(__name__) #set up our flask app using the name global
name = "Matt" #our name variable
#set up our root route (/)
@app.route('/')
def home():
  return render_template('index.html', name = name)

#set up the code to run our app from command line
if __name__ == '__main__':
  app.debug = True #set it to debug mode so the server reloads on code updates
  app.run() #run our app
```

Now when you run the app it should render the name you specified in the backend file.

## Adding the images
This is the largest section of our project.  We're going to add the images to our images folder on the backend server. We're going to add another route to the backend to load and return the paths to image files. Then we're going to add jQuery code to the front end to poll our server and get images at a refresh rate of 5s.

### Adding images to the folder
Download some images from the internet, I prefer using cats as placeholder images.  You can also use images from [placehold.it](https://placehold.it/).  Place the images in the ./static/images folder of your project.  This is because the images are static resources, they don't change.

### Add the images to index.html
We're going to load the images by querying the server using jQuery to get the paths to our images.  We're going to add an image to our index.html file and then assign the *src* attribute dynamically using Javascript.

### Load the filepaths to the images on the backend
Using the *os* module in Python we can get information about the computer's filesystem.  In this case we're going to use it to get the filepaths of all our images in the *./static/images* folder on our web server.  

-First **import os** at the top of the app.py file
-Then we're going to create an array called imagepaths to hold our the image paths as strings
-Also create a variable for the baseurl of our image folder path to make things easier later on
-Inside of the conditional at the end of the file (the one where app.run is called), add code to loop through all the files in the images folder. Use **os.listdir(imagefolderpath)**, you can use file.endswith(".jpg") to see if it's the right file type.

Here's what our code looks like now:

```python
from flask import Flask,render_template #import the Flask library
import os

app = Flask(__name__) #set up our flask app using the name global
name = "Matt" #our name variable
imagepaths = [] #image paths
base_img_path = "./static/images/"

#set up our root route (/)
@app.route('/')
def home():
  return render_template('index.html', name = name)

#set up the code to run our app from command line
if __name__ == '__main__':
  #use a python list  comprehension to build our array of file paths
  imagepaths = [img for img in os.listdir(base_img_path) if img.endswith(".jpeg") or img.endswith(".jpg") or img.endswith(".png")]

  app.debug = True #set it to debug mode so the server reloads on code updates
  app.run() #run our app
```

### Return a random image from the array
To make our photos change we're going to make a route in our app to return a random image path from the image list we just made. (In Python we call arrays *lists* because we're cool like that) To do that we're going to do the following:
- **import random** at the top of the code, we're going to use the random.choice(list) method to return a random list item
- Next, create a new route for '/image' in our app.  This will return a random image url when the frontend queries our backend.
- Inside of the method for the image route we will return a random url by returning **random.choice(imagepaths)**

Here's what our new route looks like:

```python
@app.route('/image')
def random_image():
    print base_img_path+random.choice(imagepaths)
    #return a random image url
    return base_img_path + random.choice(imagepaths)
```

### Get the image url on the frontend
Now it's time to dive into some jQuery!  We're going to add a file called *main.js* to our static folder.  Then we're going to add the jQuery library to our project.  Inside main.js we'll write our jQuery code poll the backend and add the image. [Polling](https://en.wikipedia.org/wiki/Polling_(computer_science)) is an efficient way of running an operation periodically.

- Make the main.js file inside your ./static folder
- Add the jQuery library to the *<head>* part of index.html by getting the script tag from the [Google CDN](https://developers.google.com/speed/libraries/)
- Inside your main.js initialize your jQuery to run on *document.load()*
- Then get the image using the $("#slide")
- Use [*setTimeout()*](http://stackoverflow.com/questions/6835835/jquery-simple-polling-example) and [*.ajax*](http://learn.jquery.com/ajax/) functions to poll the /image route on our backend.
- Once you get the image url use *.attr('src',response)* to set the image src for the image on our index.html.

Here's what our main.js looks like:

```javascript
//use the shorthand for document ready
$(function(){
  console.log("document loaded!");

  var slideImage = $("#slide"); //get the image

//make the ajax request to the server to get the image urls
(function poll(){
  //poll for data with a 6 second timout
    $.ajax({
        url:"/image",
        type:"GET",
        dataType:"text",
        success: function(text){
          console.log(text);
          slideImage.attr("src",text);
        },
        complete: setTimeout(poll, 6000),
        timeout: 2000
      });
})();
});

```

## Uploading the Project to the Cloud
Now we want to deploy our app to the cloud so other people can look at it and see how cool we are.  We're going to use Heroku because it's easy to connect with Github.

You can see the tutorial for deploying Python apps to Heroku on the [their website](https://devcenter.heroku.com/articles/getting-started-with-python#introduction)

We have our requirements.txt from earlier in the project.  Now we need to make a Procfile.  

The Procfile tells the gunicorn web server how to run our app the Heroku VM (aka the cloud).

Here's what our procfile should look like (if you named your main file app.py):

```
web: gunicorn app:app --log-file=-
```

Then we can deploy our app by connecting heroku to our [github project](https://devcenter.heroku.com/articles/github-integration) or by using the [heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-python#deploy-the-app).
