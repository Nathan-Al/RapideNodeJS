import json
import os

def copy (source,destination):
    file_src = open(source, 'r')
    file_dest = open(destination, "x")
    if file_dest.write(file_src.read()):
        file_dest.close()
        return True
    else:
        return False
def creer (file):
    try:
        open(file, "x")
    except:
        return False
def edit (source,content):
    result = False
    file = open(source, "a")
    if file.write(content):
        result = True
    file.close()
    return result
# Function to get datas in a file
def read(source):
    file = open(source, "r+")
    return file.read()
def delete(source):
    try:
        if os.path.exists(source):
            os.remove(source)
            return True
        else:
            return False
    except:
        print('Delete file error')
        return False
# Function for editing JSON File
def editJSONUrls (source, content):
    # try:
    result = False
    data_source = getJSON(source)
    #Get the array name
    keys = list(content)
    data_source['route']['user'][keys[0]] = content[keys[0]]
    data_source = json.dumps(data_source, indent=2)
    file_destination = open(source, "w")

    if file_destination.write(data_source):
        result = True
    file_destination.close()
    return result
    # except:
    #     return False
def editJSON (destination, content):
    try:
        result = False
        data_destination = json.dumps(content, indent=2)
        file_destination = open(destination, "w")

        if file_destination.write(data_destination):
            result = True
        file_destination.close()
        return result
    except:
        return False
def getJSON (source):
    return json.loads(read(source))
