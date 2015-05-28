#!/bin/bash
# This script lints the SDG indicators .json format

out=""
error=0

files="
goals
indicators
targets"

for file in $files
do
  echo "-> Linting $file against scheme..."
  out=$(jsonlint -q  -V tests/schemas/$file-schema.json $file.json 2>&1)
  if [ "$out" != "" ]
  then
    echo "Error:"
    echo "  $out"
    ((error++))
  fi
done


if [ $error -ne 0 ]
 then
    echo "Errors :("
    exit 1
 fi
