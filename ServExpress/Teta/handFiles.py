import json

def copy (source,destination):
    file_src = open(source, 'r')
    file_dest = open(destination, "x")
    if file_dest.write(file_src.read()):
        file_dest.close()
        return True
    else:
        return False
def creer ():
    print("Creer")
def edit (source,content):
    result = False
    file = open(source, "a")
    if file.write(content):
        result = True
    file.close()
    return result
# Function to get datas in a file
def read(source):
    file = open(source, "r")
    return file.read()
# Function for editing JSON File
def editJSON (source, content):
    result = False
    data_source = json.loads(read(source))
    data_source['route'].append(content)
    data_source = json.dumps(data_source, indent=2)
    file_destination = open(source, "w")

    if file_destination.write(data_source):
        result = True
    file_destination.close()
    return result
def getJSON (source):
    result = ''
    data_source = json.loads(read(source))
    return data_source
