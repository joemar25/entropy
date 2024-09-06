// Automatic FlutterFlow imports
import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import 'package:flutter_blue_plus/flutter_blue_plus.dart';

Future<bool> isBluetoothEnabled() async {
  await Future.delayed(const Duration(milliseconds: 100));
  final state = await FlutterBluePlus.instance.state.first;
  if (state == BluetoothState.on) {
    return true;
  }
  return false;
}
