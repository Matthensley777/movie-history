"use strict";

let dom = require('./dom');
let events = require('./events');
let apiKeys = require('./apiKeys');


apiKeys.retrieveKeys();
events.myLinks();
events.pressEnter();