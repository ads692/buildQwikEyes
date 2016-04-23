from flask import *
from pymongo import MongoClient
from flask.ext.login import login_user,LoginManager
app = Flask(__name__)


#Setting Session type and secret key
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'mongodb'

#app.debug=True #To run in debug mode

#Creating a Login Manager class
login_manager = LoginManager()
login_manager.init_app(app)

#Creating a class User
class User():

	def __init__(self, username):
		self.username = username
		self.email = None

	def is_authenticated(self):
		return True

	def is_active(self):
		return True

	def is_anonymous(self):
		return False

	def get_id(self):
		return self.username

	@staticmethod
	def validate_login(password1, password):
		if(password1==password):
			return True
		else:
			return False

#End of class User

# main interface
@app.route("/")
def main():
	return render_template('index.html')

# Register Interface
@app.route('/register/', methods = ['POST'])
def register():

	#collection = db.userdb
	client=MongoClient('mongodb://test:test@ds015730.mlab.com:15730/qwikeyes')
	db= client.qwikeyes
	if request.method == 'POST':
		firstname = request.args['fname']
		lastname = request.args['lname']
		username = request.args['uname']
		password = request.args['pwd']
		postData = { 'firstname': firstname, 'lastname': lastname,'username':username,"password":password}
		status = db.userdb.insert_one(postData)
	return json.dumps({'message':username})

@app.route('/login/', methods = ['POST'])
def login():
	client=MongoClient('mongodb://test:test@ds015730.mlab.com:15730/qwikeyes')
	db = client.qwikeyes
	coll = db['userdb']
	if request.method == 'POST':
		user = db.userdb.find_one({"username": request.args['uname']})
		if user and User.validate_login(user['password'],request.args['pwd']):
			user_obj = User(user['username'])
			login_user(user_obj)
			flash("Logged in successfully!", category='success')
			return json.dumps({'message':'Success'})
		flash("Wrong username or password!", category='error')
	return json.dumps({'message':'Failure'})

if __name__ == "__main__":
	app.run()