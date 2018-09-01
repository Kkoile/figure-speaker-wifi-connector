'use strict';

var piWifi = require('pi-wifi');

exports.getAvailableNetworks = function () {
    return new Promise(function(resolve, reject) {

        // Mocking
        /*resolve([
            {
                bssid: 'aa:bb:cc:dd:ee:ff',
                frequency: 2462,
                signalLevel: -40,
                flags: '[WPA2-PSK-CCMP][WPS][ESS]',
                ssid: 'MyNetwork' },
            {
                bssid: '11:22:33:44:55:66',
                frequency: 2462,
                signalLevel: -28,
                flags: '[WPA2-PSK-CCMP][ESS]',
                ssid: 'AnotherNetwork' },
            {
                bssid: 'aa:11:bb:22:cc:33',
                frequency: 2462,
                signalLevel: -33,
                flags: '[WPA2-EAP-CCMP-preauth][WPS][ESS]',
                ssid: 'MyEnterpriseNetwork' },
            {
                bssid: 'c0:56:27:44:3b:9c',
                frequency: 2412,
                signalLevel: -59,
                flags: '[WPA-PSK-CCMP+TKIP][WPA2-PSK-CCMP+TKIP][ESS]',
                ssid: 'MyGuestsNetwork'
            }
        ])*/


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