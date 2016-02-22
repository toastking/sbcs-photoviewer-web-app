from flask import Flask,session,request,render_template,url_for

#initialize our flask app object
app = Flask(__name__)
name = "Nancy"
#set the root directort of the site to render the template for the page
@app.route('/')
def homepage():
    #render the homepage with the name we specified in a variable
    return render_template('index.html', name = name)

#TODO: add file upload ability

#code to run the app
if __name__ == '__main__':
    app.run()#run with the debug flag on
