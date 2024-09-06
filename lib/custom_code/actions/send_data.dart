// Automatic FlutterFlow imports
import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import 'package:flutter_blue_plus/flutter_blue_plus.dart';

Future sendData(BTDeviceStruct deviceInfo, String data) async {
  try {
    final device = BluetoothDevice.fromId(deviceInfo.id);
    final services = await device.discoverServices();
    for (BluetoothService service in services) {
      for (BluetoothCharacteristic characteristic in service.characteristics) {
        final isWrite = characteristic.properties.write;
        if (isWrite) {
          await characteristic.write(data.codeUnits);
        }
      }
    }
  } catch (e) {
    debugPrint(e.toString());
  }
}
