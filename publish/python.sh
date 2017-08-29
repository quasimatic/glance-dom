#!/usr/bin/env bash

read -d '' usage <<- EOF
usage: ./publish.sh [options]
options:
        --twine PACKAGENAME VERSION     Use twine to avoid sending credentials in plain text
        --test                          Use test servers
EOF

TEST=0  # default is to not use test servers

while [[ $# -gt 0 ]]; do
    key="$1"
    case "$key" in
        # This is a flag type option. Will catch either -f or --foo
        --test)
        TEST=1
        ;;
        # This is an arg value type option. Will catch -o value or --output-file value
        --twine)
        shift # past the key and to the value
        PACKAGE="$1"
        shift
        VERSION="$1"
        ;;
        *)
        # Do whatever you want with extra options
        echo "Unknown option '$key'"
        echo "$usage"
        exit 1
        ;;
    esac
    # Shift after checking all the cases to get the next option
    shift
done

# Does python exist?
command -v python >/dev/null 2>&1 || { echo >&2 "I require python but it's not installed. Aborting."; exit 1; }

# Does pip exist?
command -v pip >/dev/null 2>&1 || { echo >&2 "I require pip but it's not installed. Aborting."; exit 1; }

function is_success {
    if [[ "$1" != *"$2"* ]]; then
        echo "Ouput did not contain" "$2"
        exit 1
    fi
}

# Install latest twine (used to not send pypi credentials in plain text)
if [[ -n ${PACKAGE} ]]; then
    echo "INSTALLING TWINE"
    OUTPUT="$(pip install -U twine)"
#    is_success "${OUTPUT}" "Successfully"
fi

echo "HERE"

# Test package THIS ONLY WORKS WITH SETUPTOOLS
#OUTPUT="$(python setup.py test)"
#is_success "${OUTPUT}" "OK"

# Build dist
OUTPUT="$(python setup.py sdist)"
is_success "${OUTPUT}" "Creating"

# Register package
if [[ ${TEST} -eq 1 ]]; then
    echo "USING TEST"
    OUTPUT="$(python setup.py register -r https://testpypi.python.org/pypi)"
    echo "${OUTPUT}"
else
    echo "NOT USING TEST"
    OUTPUT="$(python setup.py register)"
fi
is_success "${OUTPUT}" "OK"

# Upload package
echo "Uploading package"
if [[ -z ${PACKAGE} ]]; then
    if [[ ${TEST} -eq 1 ]]; then
        echo "USING TEST AND NOT TWINE"
        #OUTPUT="$(python setup.py sdist upload -r pypitest)"
    else
        echo "NOT USING TEST AND NOT TWINE"
        #OUTPUT="$(python setup.py sdist upload)"
    fi
else
    if [[ ${TEST} -eq 1 ]]; then
        echo "USING TEST AND TWINE"
        OUTPUT="$(twine upload -r pypitest dist/${PACKAGE}-${VERSION}.tar.gz)"
    else
        echo "NOT USING TEST AND TWINE"
#        OUTPUT="$(twine upload dist/${PACKAGEN}-${VERSION}.tar.gz)"
    fi
fi
is_success "${OUTPUT}" "OK"

exit 0
