// Automatic FlutterFlow imports
import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import '/custom_code/actions/index.dart';
import '/flutter_flow/custom_functions.dart';

import 'package:flutter_blue_plus/flutter_blue_plus.dart';

Future disconnectDevice(BTDeviceStruct deviceInfo) async {
  final device = BluetoothDevice.fromId(deviceInfo.id, name: deviceInfo.name);
  try {
    await device.disconnect();
  } catch (e) {
    debugPrint(e.toString());
  }
}
