#!/usr/bin/python
#-*- coding: utf-8 -*-

import os
import socket
import time
import subprocess
from dotenv import load_dotenv
#import colorama
#from colorama import Fore, Back, Style
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
load_dotenv()

while(on == 1):
    response_1 = str(input("Enter h or help to see the command : "))
    if response_1 == 'h' or response_1 == 'help':
        print("""
- np - For creating a new page
- dp  - For deleting a page
- x  - Close the command prompt
- kserv - To kill the server
            """)
    elif response_1 == 'np':
        # That part allow the user to create a new page (controller+view+css+url)
        print ("---- New Page ----")
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
                                                ", view name = " + nom_views +
                                                ", controller name = " + nom_controller +
                                                ", css name = " + nom_css +
                                                ", url(s) name = "+str(nom_liens)+" It is good ? (y/N): "))
                    if validation_np == 'yes' or validation_np == 'y':
                        #Stop the while
                        bcl_np=0
                        bcl_vald_np=0
                        #Copy the files from the templates files
                        result_cnt = handFiles.copy('./ServExpress/configuration/template/controller.js','Controller/'+nom_controller+'.js')
                        result_view =  handFiles.copy('./ServExpress/configuration/template/view.ejs','Views/'+nom_views+'.ejs')
                        result_css = handFiles.copy('./ServExpress/configuration/template/base.css','Public/Css/'+nom_css+'.css')
                        handFiles.editJSONUrls('./ServExpress/urls.json',{"name":nom_page,"liens":nom_liens,"Views":nom_views,"Controller":nom_controller,"css":nom_css})

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
                        validation_np = str(input("Summarize actions : Page name = " + nom_page + 
                                                    ", views name = " + nom_page +
                                                    ", controller name = " + nom_page +
                                                    ", url name = " + nom_page +"It is good ? (Y/n): "))
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
                            if handFiles.editJSONUrls('./ServExpress/urls.json',{"name":nom_page,"liens":[nom_page],"views":nom_page+'ejs',"controller":nom_page+'.js'}) != True:
                                print('Error unable to edit the URLS JSON file')

                            if result_cnt == True and result_view == True and result_css == True:
                                print ("All the task have been completed")
                            else:
                                print("Something went wrong")
                        else:
                            print("Wrong entry")
            else:
                print("Wrong entry")
    elif response_1 == 'dp':
        #That part allow the user to delete a page (controller+view+url link in the json file)
        json = handFiles.getJSON('./ServExpress/urls.json')
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
                break
            #Modifies the JSON file as a whole
            if handFiles.editJSON('./ServExpress/urls.json', json) != True:
                print('Error when editing the JSON file, maybe the page name was not there.')
            else:
                print('URLS JSON file edited !')
        else:
            print('abort')
    elif response_1 == 'kserv':
        print("Shutting Down the server...")
        #Kill the server process by using the port define in the URLS JSON
        if os.getenv('DEV') == 'false':
            print(os.system(f"kill $(lsof -t -i:{os.getenv('PORT')})"))
        elif os.getenv('DEV') == 'true':
            print(os.system(f"kill $(lsof -t -i:4445)"))
    elif response_1 == 'x' or response_1 == 'exit':
        on = 0
    else:
        print("Command not found", response_1)
