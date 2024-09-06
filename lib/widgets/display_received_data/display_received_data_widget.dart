import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/instant_timer.dart';
import '/custom_code/actions/index.dart' as actions;
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'display_received_data_model.dart';
export 'display_received_data_model.dart';

class DisplayReceivedDataWidget extends StatefulWidget {
  const DisplayReceivedDataWidget({
    super.key,
    this.device,
  });

  final BTDeviceStruct? device;

  @override
  State<DisplayReceivedDataWidget> createState() =>
      _DisplayReceivedDataWidgetState();
}

class _DisplayReceivedDataWidgetState extends State<DisplayReceivedDataWidget> {
  late DisplayReceivedDataModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => DisplayReceivedDataModel());

    // On component load action.
    SchedulerBinding.instance.addPostFrameCallback((_) async {
      _model.receivedDataTimer = InstantTimer.periodic(
        duration: Duration(milliseconds: 1000),
        callback: (timer) async {
          _model.receivedData = await actions.receiveData(
            widget!.device!,
          );
          _model.data = _model.receivedData;
          safeSetState(() {});
        },
        startImmediately: true,
      );
    });
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Received data',
          style: FlutterFlowTheme.of(context).titleMedium.override(
                fontFamily: 'Inter',
                color: FlutterFlowTheme.of(context).primaryText,
                letterSpacing: 0.0,
                fontWeight: FontWeight.w600,
              ),
        ),
        Padding(
          padding: EdgeInsetsDirectional.fromSTEB(0.0, 10.0, 0.0, 0.0),
          child: Text(
            valueOrDefault<String>(
              _model.data,
              '-',
            ),
            style: FlutterFlowTheme.of(context).bodyLarge.override(
                  fontFamily: 'Inter',
                  letterSpacing: 0.0,
                  lineHeight: 1.4,
                ),
          ),
        ),
      ],
    );
  }
}
