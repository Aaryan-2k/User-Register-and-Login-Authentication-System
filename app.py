from flask import Flask,render_template,request,jsonify,redirect,flash,url_for
from pymongo import MongoClient
app = Flask(__name__,  static_url_path='/static')
client = MongoClient('mongodb+srv://aaryantyagi17:vAqL9FKNF7ft52uz@test1.e6kgoi4.mongodb.net/') 
db = client['xenon_stack']  
users_collection = db['users']
users_contact=db['contacts']

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username_email = request.form['username_email']
        password = request.form['password']

        # Check if username_email exists as username or email
        user = users_collection.find_one({
            '$or': [
                {'username': username_email},
                {'email': username_email}
            ]
        })

        if user and user['password'] == password:  
            return render_template('succ.html')  # Redirect to a success page after login
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    return render_template('login.html')  # Render the login form

@app.route('/flask_function', methods=['POST'])
def flask_f():
    if request.method == 'POST':
        username = request.form['username']
        existing_username = users_collection.find_one({'username': username})
        if existing_username:
            result={'success':True}
        else:
            result={'success': False}
        return jsonify(result)

@app.route('/')
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        existing_username = users_collection.find_one({'username': username})
        if existing_username:

            return render_template("signup.html")
             

        existing_email = users_collection.find_one({'email': email})
        if existing_email:
            return jsonify({'message': 'Email already exists'}), 409

        new_user = {
            'username': username,
            'email': email,
            'password': password  
        }
        users_collection.insert_one(new_user)
        return render_template('create.html')  # Redirect to a success page or any desired page after signup

    return render_template('signup.html')  # Render the signup form
        
@app.route('/contact',methods=['GET','POST'])
def contact():
    if request.method == 'POST':
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        email = request.form['email']
        phone = request.form['phone']
        query = request.form['query']

        # Store contact information in MongoDB
        contact_data = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'phone': phone,
            'query': query
        }

        # Insert into MongoDB collection
        users_contact.insert_one(contact_data)

        return "Querysubmitted successfully!  "
    return render_template('contactus.html')
if __name__=='__main__':
    app.run(debug=True)