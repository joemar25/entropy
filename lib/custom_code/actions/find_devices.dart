// Automatic FlutterFlow imports
import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'dart:async';

Future<List<BTDeviceStruct>> findDevices() async {
  List<BTDeviceStruct> devices = [];
  try {
    await FlutterBluePlus.startScan(timeout: const Duration(seconds: 5));
    StreamSubscription subscription =
        FlutterBluePlus.scanResults.listen((results) {
      devices.clear();
      for (ScanResult r in results) {
        if (r.device.platformName.isNotEmpty) {
          devices.add(BTDeviceStruct(
            name: r.device.platformName,
            id: r.device.remoteId.toString(),
            rssi: r.rssi,
          ));
        }
      }
      devices.sort((a, b) => b.rssi.compareTo(a.rssi));
    });
    await Future.delayed(const Duration(seconds: 5));
    await subscription.cancel();
    await FlutterBluePlus.stopScan();
  } catch (e) {
    debugPrint(e.toString());
  }
  return devices;
}
