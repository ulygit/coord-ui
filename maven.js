#!/usr/local/bin/node
'use strict';

if ( ! process.env.M2_REPO) {
  console.error('ERROR: M2_REPO environment variable is undefined. ' + 
	       'Point it to your local maven repository ' + 
	       '(usually ~/.m2/repository).');
  process.exit(1);
}

var workingDir = process.env.PWD + '/';
var config = require(workingDir + 'maven-config.json');
var maven = require('maven-deploy');
maven.config(config);
maven.deploy('release', false);
