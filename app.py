from flask import Flask,request,render_template,url_for,send_from_directory
import os
import random
import itertools
import logging
import sys

#initialize our flask app object
app = Flask(__name__)
name = "Nancy" #name of the user

basepath = os.path.dirname(__file__)
imagepaths = []


app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

if basepath == "":
    basepath = "."
print basepath
base_img_path = "images/"


#set the root directort of the site to render the template for the page
@app.route('/')
def homepage():
    #render the homepage with the name we specified in a variable
    return render_template('index.html', name = name)

#TODO: add file upload ability

#the route for getting a random image from the images folder
@app.route('/image')
def random_image():
    #return a random image url
    url =  url_for('static', filename = 'images/'+iterator.next())
    return url

#the route for getting a random image from the images folder
@app.route('/update')
def update_image():
    #check if it's a file and then add is to the image paths if it is using a python list comprehension
    imagepaths = [img for img in os.listdir(basepath +'/static/' + base_img_path) if img.endswith(".jpeg") or img.endswith(".jpg") or img.endswith(".png") or img.endswith(".PNG")or img.endswith(".gif")]
    #set up debug mode so the server will automatically reload
    print "imagepaths:" + str(imagepaths)
    iterator = itertools.cycle(imagepaths)
    return "array update sucessfully"

#code to run the app
if __name__ == '__main__':
    #get all the image paths before the app runs
    #check if it's a file and then add is to the image paths if it is using a python list comprehension
    imagepaths = [img for img in os.listdir(basepath +'/static/' + base_img_path) if img.endswith(".jpeg") or img.endswith(".jpg") or img.endswith(".png") or img.endswith(".PNG")or img.endswith(".gif")]
    #set up debug mode so the server will automatically reload
    print "imagepaths:" + str(imagepaths)
    iterator = itertools.cycle(imagepaths)
    app.debug = True
    app.run()#run with the debug flag on
