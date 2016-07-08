#!/usr/bin/env bash
PROJECT_NAME="whitepage${ENV}"
export HTTP_PORT=80

# init connection to docker machine
eval $(docker-machine env default)

# run docker-compose
docker-compose -f docker-compose.yml --p ${PROJECT_NAME} down