from flask import Flask, render_template

app = Flask(__name__, static_folder='Static', template_folder='Templates')

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/home')
def home():
    return render_template("home.html")

@app.route('/dashboard')
def dashboard():
    return render_template("home.html")

@app.route('/summary')
def summary():
    return render_template('summary.html')

@app.route('/payment')
def payment():
    return render_template('payment.html')

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/travel-history')
def travel_history():
    return render_template('travel-history.html')

@app.route('/saved-trips')
def saved_trips():
    return render_template('saved-trips.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)