#!/bin/bash

# This file is for you: edit it to call your unit test suite. Note that the same
# file will be called if you run it locally as if you run it on CI.

set -eu

cd $(git rev-parse --show-toplevel)

# Replace the following line with something like:
#
#   rails test:unit
#   python manage.py test
#   npm run test
#
# or whatever is appropriate to your project.  You should *only* run your fast
# tests from here. If you want to run other test suites, see the predefined
# tasks in scripts/test.mk.

echo "Unit tests are not yet implemented. See scripts/test/unit.sh for more."
