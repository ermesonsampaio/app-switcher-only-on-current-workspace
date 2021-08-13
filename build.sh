#!/usr/bin/env bash

FILES=$(ls -d locale/**/**/* | grep .mo)
echo $FILES
zip -r extension.zip extension.js metadata.json stylesheet.css $FILES
