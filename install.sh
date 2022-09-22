currentDirectory=`pwd`
configDirectory="/ServExpress/configuration/"

read -p "Welcome to the installations of RapideNodeJS !
- Are you ready to install now ?(y/N): " okForInstall

if [[ -n $okForInstall ]]; then
    if [ $okForInstall = 'y' ] || [ $okForInstall = 'yes' ] || [ $okForInstall = 'yes' ]; then
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
        read -p "Do you wan to install the dev version ?(y/N): " okForDevVersion
        if [[ $okForInstallDepencies == 'y' ]] || [[ $okForInstallDepencies == 'yes' ]] || [[ -z $okForInstallDepencies ]] || [[ $okForInstallDepencies == 'Yes' ]]; then
            sudo apt update && apt-get update
            echo '*-- Install of Node JS --*'
            sudo apt install -y nodejs
            echo '*-- Install of python3 --*'
            sudo apt install -y python-is-python3
            if [[ $okForDevVersion == 'y' ]] || [[ $okForDevVersion == 'yes' ]] || [[ $okForDevVersion == 'Yes' ]]; then
                echo '*-- Install Docker && Docker compose --*'
                #Delete docker old version
                sudo apt-get remove docker docker-engine docker.io containerd runc
                sudo apt-get update

                sudo apt-get install -y \
                    ca-certificates \
                    curl \
                    gnupg \
                    lsb-release
                #Add Docker’s official GPG key
                sudo mkdir -p /etc/apt/keyrings
                curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

                #Ad docker ources repository
                echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
                    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
                sudo apt-get update
                sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
            fi
            #Clean apt cache
            sudo apt-get clean && apt-get autoclean
            #Install npm depencies
            npm install
            #Copy the configuration from to the racine project
            cp "${currentDirectory}${configDirectory}.env" "./"
            cp "${currentDirectory}${configDirectory}docker-compose.yml" "./"
            echo "*-- Setup ended --*"
        elif [[ $okForInstallDepencies == 'n' ]] || [[ $okForInstallDepencies == 'no' ]]; then
            echo "# End the command prompt #"
        else
            echo "Bad input"
        fi
    fi
else
    echo "Bad input"
fi