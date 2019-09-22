#! /bin/bash

cd "$(dirname "$0")" || exit

echo "\x1B[93m

 _      ___      ___      __ NOW.SH
| | /| / / | /| / / | /| / /
| |/ |/ /| |/ |/ /| |/ |/ /
|__/|__/ |__/|__/ |__/|__/


\x1B[0m"

CONFIRM_MESSAGE=$(printf "<%s> \n\n🤖 DEPLOY %s? \n\n(Enter/Esc)" "$(pwd)" "")

read -p "${CONFIRM_MESSAGE}" -n 1 -r KEY

DIST_DIR="./dist-web"

if [[ $KEY = "" ]]; then
    yarn build:h5 && mv ./dist ./dist-web
    cp -fr ./serverless/now/* ${DIST_DIR}
    cd ${DIST_DIR} || exit
    pwd
    echo ''
    echo ''
    now -A now.json
else
    echo "CANCEL"
fi


