#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t "leads-manage:$1" .
docker tag "leads-manage:$1" "limit0/leads-manage:$1"
docker push "limit0/leads-manage:$1"
