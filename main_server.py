from mongo_dal import MongoDal, KisserNotExist, KisserAlreadyExist
from flask import Flask, request, jsonify
from flask_cors import CORS
import consts
import json
from bson import json_util

app = Flask(__name__)
CORS(app)
mongo_connection = None


@app.route('/')
def index():
    return "Hello world"


@app.route('/new_kisser', methods=['POST'])
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


@app.route('/new_kiss', methods=['POST'])
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


@app.route('/get_kisser', methods=['GET'])
def get_kisser():
    return str(list(mongo_connection.kissers_collection.find(request.get_json())))


@app.route('/get_kiss', methods=['GET'])
def get_kiss():
    return str(list(mongo_connection.kisses_collection.find(request.get_json())))


@app.route('/get_all_kissers', methods=["GET"])
def get_all_kissers():
    kissers = list(mongo_connection.kissers_collection.find(request.get_json()))
    return {
        "kissers": json.loads(json_util.dumps(kissers)),
    }


@app.route('/get_all_kisses', methods=['GET'])
def get_all_kisses():
    kissers = list(mongo_connection.kissers_collection.find(request.get_json()))
    kisses = list(mongo_connection.kisses_collection.find(request.get_json()))
    return {
        "kissers": json.loads(json_util.dumps(kissers)),
        "kisses": json.loads(json_util.dumps(kisses))
    }


if __name__ == '__main__':
    mongo_connection = MongoDal()
    app.run(host=consts.HUB_SERVICE[consts.HOST_KEY], port=consts.HUB_SERVICE[consts.PORT_KEY])
