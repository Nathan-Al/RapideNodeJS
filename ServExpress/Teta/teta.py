#!/usr/bin/python
#-*- coding: utf-8 -*-

import os
import sys
import socket
import time
import subprocess
from dotenv import load_dotenv
from colorama import init
from termcolor import colored
import handFiles
import handString

print("---------------    ---------------")
print("Welcome in the Teta command prompt")
print("If you want to quit enter x or exit")
print("---------------    ---------------")

on = 1

# Create page var
nom_page = ''
nom_views = ''
nom_controller = ''
nom_css = ''
nom_liens = []
veri_page = False
veri_views = False
veri_controller = False
veri_css = False
veri_liens = False
json_link = './ServExpress/urls.json'
load_dotenv()

# That part allow the user to create a new page (controller+view+css+url)
def newPage():
    bcl_np=1
    bcl_ln=1
    bcl_vald_np=1

    while(bcl_np == 1):
        response_np = str(input("Do you want to have different name for the page name,view,controller,css,url ? yes or y/no ? (no) : "))
        if response_np == 'y' or response_np == 'yes':
            nom_page = handString.nettoyageCharactere(str(input("Give the page name ? : ")))
            nom_controller = handString.nettoyageCharactere(str(input("Give the controller name : ")))
            nom_views = handString.nettoyageCharactere(str(input("Give the view name : ")))
            nom_css = handString.nettoyageCharactere(str(input("Give the css name : ")))

            while(bcl_ln == 1):
                response_lien = str(input("Do you want to have multiple url ? (yes/no) (no) : "))
                if response_lien == 'yes' or response_lien == 'y':
                    response_liens = handString.nettoyageCharactere(str(input("Give the urls name (url1,url2) : ")))
                    response_liens = handString.nettoyageCharactere(response_liens)
                    if response_liens.find(',') > 0:
                        nom_liens = response_liens.split(',')
                    else:
                        print("Only one url have been detect")
                        nom_liens = list(response_liens)
                    bcl_ln=0
                elif response_lien == 'no' or response_lien == 'n' or response_lien == '':
                    nom_liens = list(input("Give the url name : "))
                    bcl_ln=0
                else:
                    print("Wrong entry")
            while(bcl_vald_np == 1):
                validation_np = str(input("Summarize actions : Page name = " + nom_page +
                                            ",\n view name = " + nom_views +
                                            ",\n controller name = " + nom_controller +
                                            ",\n css name = " + nom_css +
                                            ",\n url(s) name = "+str(nom_liens)+" It is good ? (y/N): "))
                if validation_np == 'yes' or validation_np == 'y':
                    #Stop the while
                    bcl_np=0
                    bcl_vald_np=0
                    #Copy the files from the templates files
                    result_cnt = handFiles.copy('./ServExpress/configuration/template/controller.js','Controller/'+nom_controller+'.js')
                    result_view =  handFiles.copy('./ServExpress/configuration/template/view.ejs','Views/'+nom_views+'.ejs')
                    result_css = handFiles.copy('./ServExpress/configuration/template/base.css','Public/Css/'+nom_css+'.css')
                    if handFiles.editJSONUrls('./ServExpress/urls.json', {nom_page:{"link":nom_liens,"views":nom_views+'.ejs',"controller":nom_controller+'.js'}}) != True:
                        print ("The JSON files couldn't not be edited")
                    if result_cnt == True and result_view == True and result_css == True:
                        print ("All the task have been completed")
                    else:
                        print("Something went wrong")
                elif validation_np == 'no' or validation_np == 'n' or validation_np == '':
                    #Stop the while
                    bcl_np=0
                    bcl_ln=0
                    bcl_vald_np=0
                    print("Abort")
        elif response_np == 'n' or response_np == 'no' or response_np == '':
            bcl_pg=1
            bcl_vald=1
            nom_page = handString.nettoyageCharactere(str(input("What do you want to name the page ? : ")))
            while(bcl_pg == 1):
                if nom_page != '':
                    validation_np = str(input("Summarize actions :"+ 
                                                "\n Page name = " + nom_page + 
                                                ",\n views name = " + nom_page +
                                                ",\n controller name = " + nom_page +
                                                ",\n url name = " + nom_page +"\n it is good ? (Y/n): "))
                    if validation_np == 'no' or validation_np == 'n':
                        #Stop the while
                        bcl_np=0
                        bcl_vald=0
                        bcl_pg=0
                        print("Abort")
                        
                    elif validation_np == 'yes' or validation_np == 'y' or validation_np == '':
                        # Stop the while
                        bcl_np=0
                        bcl_vald=0
                        bcl_pg=0

                        #Copy the files from the templates files
                        result_cnt = handFiles.copy('./ServExpress/configuration/template/controller.js','Controller/'+nom_page+'.js')
                        result_view = handFiles.copy('./ServExpress/configuration/template/view.ejs','Views/'+nom_page+'.ejs')
                        result_css = handFiles.copy('./ServExpress/configuration/template/base.css','Public/Css/'+nom_page+'.css')
                        if handFiles.editJSONUrls(json_link, {nom_page:{"link":[nom_page],"views":nom_page+'.ejs',"controller":nom_page+'.js'}}) != True:
                            print('Error unable to edit the URLS JSON file')
                        if result_cnt == True and result_view == True and result_css == True:
                            print ("All the files have been create")
                        else:
                            print("Something went wrong all the task or some of them have not been done.")
                    else:
                        print("Wrong entry")
        else:
            print("Wrong entry")

#That part allow the user to delete a page (controller+view+url link in the json file)
def deletePage():
    json = handFiles.getJSON(json_link)
    print('------------------------------')
    for x in json['route']['user']:
        print('Page name : '+x)
    print('------------------------------')

    name_page_to_delete = str(input("What is the name of the page you want to delete ? : "))
    confirmation = str(input("You want to delete the page - "+name_page_to_delete+" - It's that correct ? (y/N): "))
    if confirmation == 'y' or confirmation == 'yes':
        #Call a externe function to delete the file
        if handFiles.delete('./Views/'+json['route']['user'][name_page_to_delete]['views']) != True:
            print('Error deleting the views.')
        if handFiles.delete('./Controller/'+json['route']['user'][name_page_to_delete]['controller']) != True:
            print('Error deleting the controller.')
        try:
            json['route']['user'].pop(name_page_to_delete)
        except:
            print('Page not found in URLS JSON file')
            return
        #Modifies the JSON file as a whole
        if handFiles.editJSON(json_link, json) != True:
            print('Error when editing the JSON file, maybe the page name was not there.')
        else:
            print('URLS JSON file edited !')
        print('Page successfully delete !')
    else:
        print('abort')
#List all the page that exist by there name
def listPage():
    json = handFiles.getJSON(json_link)
    print(colored('------------------------------','yellow'))
    for x in json['route']['user']:
        print('Page name : ', x)
        print('link : ', json['route']['user'][x]['link'])
        print('views : ', json['route']['user'][x]['views'])
        print('Controller : ', json['route']['user'][x]['controller'])
        print('- - - -')
    print(colored('------------------------------','yellow'))

#Kill the server process by using the port define in the URLS JSON or the dev port
def killServer():
    if os.getenv('DEV') == 'false':
        if os.system("lsof -t -i:"+os.getenv('PORT')) != 256:
            print('kill -production')
            try:
                print(os.system("kill $(lsof -t -i:"+os.getenv('PORT')+")"))
            except:
                print('ERROR can\'t kill the process at port'+os.getenv('PORT'))
        else:
            print('No process run for the port ['+os.getenv('PORT')+'] trying to kill the dev server')
            if print(os.system("kill $(lsof -t -i:4445)")) !='':
                print('sucess')
    elif os.getenv('DEV') == 'true':
        print('kill -development')
        if os.system("lsof -t -i:4445") != 256:
            try:
                print(os.system("kill $(lsof -t -i:4445)"))
                print(os.system('pkill -f nodemon'))
            except:
                print('ERROR can\'t kill the process at port 4445')
        else:
            print('No process run for the port 4445 ')

if len(sys.argv) > 1:
    if sys.argv[1] == 'np':
        newPage()
    elif sys.argv[1] == 'dp':
        deletePage()
    elif sys.argv[1] == 'lp':
        listPage()
    elif sys.argv[1] == 'kserv':
        killServer()
    else:
        print('Wrong argument')
else:
    while(on == 1):
        response_1 = str(input("Enter h or help to see the command : "))
        if response_1 == 'h' or response_1 == 'help':
            print(colored('------------------------------','yellow'))
            print(""\
                "- np - For creating a new page \n"
                "- dp - For deleting a page \n"
                "- lp - List all the page \n"
                "- x  - Close the command prompt \n"
                "- kserv - To kill the server")
            print(colored('------------------------------','yellow'))
        elif response_1 == 'np':
            print (colored('---- New Page ----','yellow'))
            newPage()
        elif response_1 == 'dp':
            deletePage()
        elif response_1 == 'lp':
            listPage()
        elif response_1 == 'kserv':
            print('Shutting Down the server...')
            killServer()
        elif response_1 == 'x' or response_1 == 'exit':
            on = 0
        else:
            print(colored('Command not found','red'), response_1)
