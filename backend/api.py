from parse import *
from flask import Flask, config, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import json
import os

from bot import ZoomBot

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

LOCAL_FILE = "./backend/local.json"
GLOBAL_FILE = "./backend/global.json"

STATUS_OK = {"STATUS": "OK"}
STATUS_ERR = {"STATUS": "ERROR"}


def to_json(meetingName, meetingId, meetingCode, settings):
    return {
        "meetingName": meetingName,
        "meetingId": meetingId,
        "meetingCode": meetingCode,
        "settings": settings
    }


def global_to_json(announcements, faqs, textCommands, queueCommands, wakeWord):
    return {
        "announcements": announcements,
        "faqs": faqs,
        "textCommands": textCommands,
        "queueCommands": queueCommands,
        "wakeWord": wakeWord
    }


@app.put('/api/global')
def add_global_settings():
    record = json.loads(request.data)
    print(record)  #debugging
    with open(GLOBAL_FILE, "r") as f:
        if os.path.getsize(GLOBAL_FILE) != 0:
            data = json.load(f)
        else:
            data = {}
    with open(GLOBAL_FILE, "w") as f:
        data["settings"] = global_to_json(record["announcements"],
                                          record["faqs"],
                                          record["textCommands"],
                                          record["queueCommands"],
                                          record["wakeWord"])
        json.dump(data, f, indent=4, sort_keys=True)
    return (STATUS_OK)


@app.put('/api/local/')
def create_meeting():
    record = json.loads(request.data)
    print(record)  #debugging
    with open(LOCAL_FILE, "r") as f:
        if os.path.getsize(LOCAL_FILE) != 0:
            data = json.load(f)
        else:
            data = {}
    with open(LOCAL_FILE, "w") as f:
        data[record["meetingId"]] = to_json(record["meetingName"],
                                            record["meetingId"],
                                            record["meetingCode"],
                                            record["settings"])
        json.dump(data, f, indent=4, sort_keys=True)
    return (STATUS_OK)


@app.get('/api/local/all')
def get_all_meetings():
    if os.path.getsize(LOCAL_FILE) == 0:
        return (STATUS_ERR)
    with open(LOCAL_FILE, "r") as f:
        data = json.load(f)
    return data


@app.get('/api/local/')
def get_meeting():
    record = json.loads(request.data)
    print(record)  #debugging
    if os.path.getsize(LOCAL_FILE) == 0:
        return (STATUS_ERR)
    with open(LOCAL_FILE, "r") as f:
        data = json.load(f)
    try:
        added = data[record["meetingId"]]
    except KeyError:
        return (STATUS_ERR)
    else:
        added = data[record["meetingId"]]
        return added


@app.delete('/api/local/<meetingId>')
def delete_meeting(meetingId):
    if os.path.getsize(LOCAL_FILE) == 0:
        return (STATUS_ERR)
    with open(LOCAL_FILE, "r") as f:
        data = json.load(f)
        try:
            deleted = data[meetingId]
        except KeyError:
            return (STATUS_ERR)
    with open(LOCAL_FILE, "w") as f:
        data.pop(meetingId)
        json.dump(data, f, indent=4, sort_keys=True)
    return (STATUS_OK)


@app.post('/api/local/')
def update_meeting():
    record = json.loads(request.data)
    print(record)  #debugging
    if os.path.getsize(LOCAL_FILE) == 0:
        return (STATUS_ERR)
    with open(LOCAL_FILE, "r") as f:
        data = json.load(f)
    with open(LOCAL_FILE, "w") as f:
        data[record['meetingId']] = record
        json.dump(data, f, indent=4, sort_keys=True)
    return (STATUS_OK)



BOT = None
LAST_FETCH =[None, None]
ACTIVE = True

@app.post('/initiateBot')
def initiateBot():
    global BOT
    data = json.loads(request.data)
    meeting_id = data["meetingId"]
    BOT = ZoomBot()

    BOT.add_bot_to_meeting(meeting_id, "")

@app.route('/api/queue')
def queue():
    global BOT, LAST_FETCH

    user, message = BOT.fetch_latest_message()

    print("outside if")
    print(user, message, LAST_FETCH)
    if user != LAST_FETCH[0] or message != LAST_FETCH[1]:
        print("inside if")
        LAST_FETCH = [user, message]
        queue = handle_message(user, message)

        if not queue is None:
            return queue
        else:
            return (STATUS_OK)
    return (STATUS_OK)

def handle_message(user, message):
    global BOT
    print("I am indisdflsdj")
    # Fancy handling.. if it's a queue then we have variables <queue_name> and <to_enqueue> that can be used to send data to frontend
    output = return_command_output(BOT.meeting_id, command_parse(message, "!")[0], command_parse(message, "!")[1])
    if isinstance(output, str):
        print("I am here")
        BOT.send_message(user, output)
    else:
        print("I am in else")
        queue_name = output[0]
        to_enqueue = output[1]
        return ({'queue_name': queue_name, 'queue_data': {"text" : to_enqueue}})

if __name__ == "__main__":
    socketio.run(app)