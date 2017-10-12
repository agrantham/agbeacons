import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beaconData: any; 

  constructor(public navCtrl: NavController,private ibeacon: IBeacon) {

  }

  var logToDom = function (message) {
    var e = document.createElement('label');
    e.innerText = message;

    var br = document.createElement('br');
    var br2 = document.createElement('br');
    document.body.appendChild(e);
    document.body.appendChild(br);
    document.body.appendChild(br2);
    
    window.scrollTo(0, window.document.height);
};

var delegate = new cordova.plugins.locationManager.Delegate();
    
delegate.didDetermineStateForRegion = function (pluginResult) {

    logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
        + JSON.stringify(pluginResult));
};

delegate.didStartMonitoringForRegion = function (pluginResult) {
    console.log('didStartMonitoringForRegion:', pluginResult);

    logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
};

delegate.didRangeBeaconsInRegion = function (pluginResult) {
    logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
};

var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
var identifier = 'beaconOnTheMacBooksShelf';
var minor = 19931;
var major = 24767;
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

cordova.plugins.locationManager.setDelegate(delegate);

// required in iOS 8+
cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
// or cordova.plugins.locationManager.requestAlwaysAuthorization()

cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
    .fail(function(e) { console.error(e); })
    .done();

}
