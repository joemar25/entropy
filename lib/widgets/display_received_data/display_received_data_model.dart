import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/instant_timer.dart';
import '/custom_code/actions/index.dart' as actions;
import 'display_received_data_widget.dart' show DisplayReceivedDataWidget;
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class DisplayReceivedDataModel
    extends FlutterFlowModel<DisplayReceivedDataWidget> {
  ///  Local state fields for this component.

  String? data;

  ///  State fields for stateful widgets in this component.

  InstantTimer? receivedDataTimer;
  // Stores action output result for [Custom Action - receiveData] action in DisplayReceivedData widget.
  String? receivedData;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    receivedDataTimer?.cancel();
  }
}
