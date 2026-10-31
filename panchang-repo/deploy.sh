#!/bin/sh
npm install && npx netlify-cli login && npx netlify-cli deploy --prod
