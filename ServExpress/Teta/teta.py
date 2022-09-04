#!/usr/bin/python
#-*- coding: utf-8 -*-

import os
import socket
import time
import subprocess
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

while(on == 1):

    response_1 = str(input("Enter h or help to see the command : "))
    if response_1 == 'h' or response_1 == 'help':
        print("""
                - np - For creating a new page
                - d  - For deleting a page
                - x  - Close the command prompt
                - kdev - To kill the development server
                - kserv - To kill the server
                """)
    elif response_1 == 'np':
        # That part permet the user to create a new page (controller+view+css+url)
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
                                                ", url(s) name = "+str(nom_liens)+" It is good ? (yes/no) (no) : "))
                    if validation_np == 'yes' or validation_np == 'y':
                        bcl_np=0
                        bcl_vald_np=0
                        #Copy the files from the templates files
                        result_cnt = handFiles.copy('ServExpress/Template/controller.js','ServExpress/Controller/'+nom_controller+'.js')
                        result_view =  handFiles.copy('ServExpress/Template/view.ejs','ServExpress/Views/'+nom_views+'.ejs')
                        result_css = handFiles.copy('ServExpress/Template/base.css','ServExpress/Public/Css/'+nom_css+'.css')
                        handFiles.editJSON('ServExpress/urls.json',{"name":nom_page,"liens":nom_liens,"Views":nom_views,"Controller":nom_controller,"css":nom_css})

                        if result_cnt == True and result_view == True and result_css == True:
                            print ("All the task have been completed")
                        else:
                            print("Something went wrong")
                    elif validation_np == 'no' or validation_np == 'n' or validation_np == '':
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
                                                    ", url name = " + nom_page +"It is good ? (yes/no) (no) : "))
                        if validation_np == 'yes' or validation_np == 'y':
                            bcl_np=0
                            bcl_vald=0
                            bcl_pg=0
                            #Copy the files from the templates files
                            result_cnt = handFiles.copy('ServExpress/Template/controller.js','ServExpress/Controller/'+nom_page+'.js')
                            result_view = handFiles.copy('ServExpress/Template/view.ejs','ServExpress/Views/'+nom_page+'.ejs')
                            result_css = handFiles.copy('ServExpress/Template/base.css','ServExpress/Public/Css/'+nom_page+'.css')
                            handFiles.editJSON('ServExpress/urls.json',{"name":nom_page,"liens":[nom_page],"Views":nom_page,"Controller":nom_page,"css":nom_page})

                            if result_cnt == True and result_view == True and result_css == True:
                                print ("All the task have been completed")
                            else:
                                print("Something went wrong")
                        elif validation_np == 'no' or validation_np == 'n' or validation_np == '':
                            bcl_np=0
                            bcl_vald=0
                            bcl_pg=0
                            print("Abort")
                        else:
                            print("Wrong entry")
            else:
                print("Wrong entry")
    elif response_1 == 'kdev':
        print("Shutting Down the development server...")
        print(os.system("kill $(lsof -t -i:4445)"))
    elif response_1 == 'kserv':
        meta = handFiles.getJSON('ServExpress/meta.json')
        print("Shutting Down the server...")
        print(os.system(f"kill $(lsof -t -i:{meta['server']['port']})"))
    elif response_1 == 'x' or response_1 == 'exit':
        on = 0
    else:
        print("Command not found", response_1)
