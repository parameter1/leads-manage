#!/bin/bash
set -e
./scripts/deploy-notify-start.sh

yarn global add @base-cms/travis-rancher-deployer
deploy-to-rancher "limit0/leads-manage:${TRAVIS_TAG}" leads-manage

./scripts/deploy-notify.sh
