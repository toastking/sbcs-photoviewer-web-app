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
