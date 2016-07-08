#!/usr/bin/env bash
PROJECT_NAME="whitepage${ENV}"
export HTTP_PORT=80
# init connection to docker machine
eval $(docker-machine env default)

# compose project

# run docker-compose
docker-compose -f docker-compose.yml --p ${PROJECT_NAME} build
docker-compose -f docker-compose.yml --p ${PROJECT_NAME} up
# wait for composer to run
#until docker-compose logs | grep -m 1 "composer"; do : ; done
# attach to composer, listening to exit 0 which finishes build
#docker attach ${PROJECT_NAME}_composer_1
#exit 0;

