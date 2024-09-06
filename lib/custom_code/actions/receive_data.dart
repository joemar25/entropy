// Automatic FlutterFlow imports
import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import 'package:flutter_blue_plus/flutter_blue_plus.dart';

Future<String?> receiveData(BTDeviceStruct deviceInfo) async {
  try {
    final device = BluetoothDevice.fromId(deviceInfo.id);
    final services = await device.discoverServices();
    for (BluetoothService service in services) {
      for (BluetoothCharacteristic characteristic in service.characteristics) {
        final isRead = characteristic.properties.read;
        final isNotify = characteristic.properties.notify;
        if (isRead && isNotify) {
          final value = await characteristic.read();
          return String.fromCharCodes(value);
        }
      }
    }
  } catch (e) {
    debugPrint(e.toString());
  }
  return null;
}
