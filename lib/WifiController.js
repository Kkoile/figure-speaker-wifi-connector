'use strict';

var iwlist = require('wireless-tools/iwlist');
var child_process = require('child_process');
var fs = require('fs');

exports.getAvailableNetworks = function () {
    return new Promise(function(resolve, reject) {
        iwlist.scan({ iface : 'wlan0', show_hidden : true }, function(err, aNetworks) {
            if (err) {
                return reject(err);
            }
            return resolve(aNetworks);
        });
    });
};

exports.connectToNetwork = function (oNetwork) {
    return new Promise(function(resolve, reject) {
        var sConfPath = '/etc/wpa_supplicant/wpa_supplicant.conf';
        fs.readFile(sConfPath, 'UTF-8', function(oErr, sData) {
            if (oErr) {
                console.error(oErr);
                return reject(oErr);
            }
            var iNetwork = sData.split("network=").length;
            sData += '\n';
            sData += 'network={\n';
            sData += '  ssid="' + oNetwork.ssid + '"\n';
            sData += '  psk="' + oNetwork.password + '"\n';
            sData += '  priority=' + iNetwork + '\n';
            sData += '}\n';
            sData += '\n';

            fs.writeFile(sConfPath, sData, 'UTF-8', function(oErr) {
                if (oErr) {
                    console.error(oErr);
                    return reject(oErr);
                }
                var process = child_process.spawn('systemctl', ['restart', 'autohotspot'], {
                    stdio: ['inherit']
                });
                process.stderr.on('data', function (data) {
                    console.error(data.toString());
                    return reject();
                });
                process.on('close', function (code) {
                    resolve();
                });
            });
        });
    });
};