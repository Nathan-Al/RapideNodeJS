#!/bin/bash
#Bash script used for lauching different test before lauching the server
#Verify if the port choose by the user is usable
#Verify if the server is not already running
#Lauch the server in devlopment mod or production

##Get the variable from .env
export $(grep -v '^#' .env | xargs -d '\n')

if command -v node &> /dev/null; then
    if portExist=$(lsof -t -i:4445) || portExist=$(lsof -t -i:4445) ; then
        echo "" \
        "!!! The selected port or the port 4445 is already in use, choose another port or kill the server before trying to run it again !!! \n"\
        "You can use the 'Teta' command line for that.\n" \
        "npm run teta -> kserv \n" \
        "--- End ---"
    else
        if [ "$DEV" = true ]; then
            nodemon ServExpress/index.js dev
        elif [ "$DEV" = false ]; then
            node ServExpress/index.js
        fi
    fi
else
    echo "Node dosen't exist and need to be installed"
fi
