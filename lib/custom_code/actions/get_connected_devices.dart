// Automatic FlutterFlow imports
import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import 'package:flutter_blue_plus/flutter_blue_plus.dart';

Future<List<BTDeviceStruct>> getConnectedDevices() async {
  final connectedDevices = FlutterBluePlus.connectedDevices;
  List<BTDeviceStruct> devices = [];
  try {
    for (BluetoothDevice device in connectedDevices) {
      if (await device.connectionState.first ==
          BluetoothConnectionState.connected) {
        final deviceRssi = await device.readRssi();
        devices.add(BTDeviceStruct(
          name: device.platformName,
          id: device.remoteId.toString(),
          rssi: deviceRssi,
        ));
      }
    }
  } catch (e) {
    debugPrint(e.toString());
  }
  return devices;
}
