import json
from functools import wraps

from bson import json_util
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin

from mongo_dal import MongoDal, KisserNotExist, KisserAlreadyExist

app = Flask(__name__, static_folder="dist/")
CORS(app)
mongo_connection = None


def add_cors_preflight_headers(response):
    allow_request = 'api' in request.origin
    if allow_request:
        response.headers['Access-Control-Allow-Origin'] = request.origin
    if request.method == 'OPTIONS':
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        # Allow chrome to access private network ajax requests
        response.headers['Access-Control-Allow-Private-Network'] = 'true'
    return response

def handle_cors(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        if request.method == 'OPTIONS':
            response = Response()
        else:
            response = func(*args, **kwargs)
        response = add_cors_preflight_headers(response)
        return response
    return decorator



@app.errorhandler(404)
@handle_cors
@cross_origin(supports_credentials=True)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
@handle_cors
@cross_origin(supports_credentials=True)
def index():
    return app.send_static_file("index.html")


@app.route('/<path:path>', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def static_proxy(path):
    return app.send_static_file(path)


@app.route('/api/new_kisser', methods=['POST'])
@handle_cors
@cross_origin(supports_credentials=True)
def add_kisser():
    try:
        request_body = request.get_json()
        kisser_name = request_body['kisser_name']
        kisser_gender = request_body['gender']
        kiss_with = request_body['kiss_with']
        mongo_connection.add_kisser(kisser_name=kisser_name, kisser_sex=kisser_gender)
        kisser_id = mongo_connection.get_kisser_id_by_name(kisser_name)
        for kiss in kiss_with:
            mongo_connection.add_kiss(kisser1_id=kisser_id, kisser2_id=kiss)

        return "OK"
    except KisserAlreadyExist as err:
        return str(err)
    except KeyError as err:
        return f"Error - {err}"


@app.route('/api/new_kiss', methods=['POST'])
@handle_cors
@cross_origin(supports_credentials=True)
def add_kiss():
    try:
        request_body = request.get_json()
        kisser1_id = request_body['kisser1'][0]
        kisser2_id = request_body['kisser2'][0]
        mongo_connection.add_kiss(kisser1_id, kisser2_id)
        return "200"
    except KisserNotExist as err:
        return str(err)
    except KeyError as err:
        return f"Error - {err}"


@app.route('/api/get_kisser', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def get_kisser():
    return str(list(mongo_connection.kissers_collection.find(request.get_json())))


@app.route('/api/get_kiss', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def get_kiss():
    return str(list(mongo_connection.kisses_collection.find(request.get_json())))


@app.route('/api/get_all_kissers', methods=["GET"])
@handle_cors
@cross_origin(supports_credentials=True)
def get_all_kissers():
    kissers = list(mongo_connection.kissers_collection.find(request.get_json()))
    return {
        "kissers": json.loads(json_util.dumps(kissers)),
    }


@app.route('/api/get_all_kisses', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def get_all_kisses():
    kissers = list(mongo_connection.kissers_collection.find(request.get_json()))
    kisses = list(mongo_connection.kisses_collection.find(request.get_json()))
    return {
        "kissers": json.loads(json_util.dumps(kissers)),
        "kisses": json.loads(json_util.dumps(kisses))
    }


if __name__ == '__main__':
    mongo_connection = MongoDal()
    app.run(host="0.0.0.0", port=80)
