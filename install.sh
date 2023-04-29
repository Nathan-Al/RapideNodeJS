#!/bin/bash

if [ "$EUID" -gt 0 ]; then
    echo "# The script must be run with root privileges ! #"
else
    currentDirectory=`pwd`
    configDirectory="/ServExpress/configuration/"

    read -p "Welcome to the installations of RapideNodeJS !
    - Are you ready to install now ?(y/N): " okForInstall

    if [[ $okForInstall == "y" ]] || [[ $okForInstall == "yes" ]] || [ "$okForInstall" == "Yes" ]; then
        printf '%s\n\t' \
        "Then let's start !" \
        "The application need to install some dependencies and package" \
        "The list of package that gonna be instal can be seen in the -package.json-" \
        "List of dependencies that will be install :" \
        "- Node JS" \
        "- Python" \
        "*** The dev version add ***" \
        "- Docker"
        echo ""

        read -p "Are you ok with that ? (Y/n): " okForInstallDepencies
        read -p "Do you want to install the dev version ?(y/N): " okForDevVersion
        if [[ $okForInstallDepencies == "y" ]] || [[ $okForInstallDepencies == "yes" ]] || [ -z $okForInstallDepencies ] || [[ $okForInstallDepencies == "Yes" ]]; then
            sudo apt update && sudo apt-get update
            echo '*-- Install of Node JS --*'
            sudo bash nodesource_setup.sh
            curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
            sudo bash nodesource_setup.sh
            sudo apt install -y nodejs
            sudo rm nodesource_setup.sh
            echo '*-- Install of python3 --*'
            sudo apt install -y python-is-python3 && sudo apt install pip
            pip install python-dotenv
            pip install colorama
            pip install termcolor
            if [[ $okForDevVersion == "y" ]] || [[ $okForDevVersion == "yes" ]] || [[ $okForDevVersion == "Yes" ]]; then
                echo '*-- Install Docker && Docker compose --*'
                #Delete docker old version
                sudo apt-get -y remove docker docker-engine docker.io containerd runc
                sudo apt-get -y update

                sudo apt-get install -y \
                    ca-certificates \
                    curl \
                    gnupg \
                    lsb-release
                #Add Docker’s official GPG key
                sudo mkdir -p /etc/apt/keyrings
                curl -fsSLy https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

                #Ad docker apt
                sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
                #GPG docker key
                curl -fsSLy https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -y -
                #Ad docker sources repository
                sudo add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
                sudo apt-get -y update
                sudo apt install -y docker; sudo apt install -y docker-compose
                adduser ${USER} docker
            fi
            #Clean apt cache
            sudo apt-get clean && apt-get autoclean
            #Install npm depencies
            npm install
            #Copy the configuration from to the racine project
            cp "${currentDirectory}${configDirectory}.env" "./"
            cp "${currentDirectory}${configDirectory}docker-compose.yml" "./"
            #Apply rule for files
            sudo chmod +x ./ServExpress/start.sh
            echo "*-- Setup ended --*"
            exit
        elif [[ $okForInstallDepencies == "n" ]] || [[ $okForInstallDepencies == "no" ]]; then
            echo "# End the command prompt #"
        else
            echo "Bad input"
        fi
    else
        echo "# End the command prompt #"
    fi
fi
