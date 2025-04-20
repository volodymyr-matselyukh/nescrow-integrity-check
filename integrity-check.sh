#!/bin/sh

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color


RESULT=$(echo $(npx ts-node integrityCheck.ts))

if [[ $RESULT -eq 1 ]]; then
    echo "${GREEN}All good! Platform balance is greater than or equal to investors deposit.${NC}"
else
    echo "${RED}Integrity check failed! Platform balance is less than investors deposit.${NC}"
fi