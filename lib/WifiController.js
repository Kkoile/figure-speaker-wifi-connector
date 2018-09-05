'use strict';

var piWifi = require('pi-wifi');

exports.getAvailableNetworks = function () {
    return new Promise(function(resolve, reject) {

        piWifi.scan(function(err, aNetworks) {
            if (err) {
                return reject(err);
            }
            return resolve(aNetworks);
        });
    });
};

exports.connectToNetwork = function (oNetwork) {
    return new Promise(function(resolve, reject) {
        piWifi.connectTo(oNetwork, function(err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
};