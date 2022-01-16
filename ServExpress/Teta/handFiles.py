
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
def read(source):
    file = open(source, "r")
    return file.read()
