import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'empty_devices_model.dart';
export 'empty_devices_model.dart';

class EmptyDevicesWidget extends StatefulWidget {
  const EmptyDevicesWidget({
    super.key,
    required this.text,
  });

  final String? text;

  @override
  State<EmptyDevicesWidget> createState() => _EmptyDevicesWidgetState();
}

class _EmptyDevicesWidgetState extends State<EmptyDevicesWidget> {
  late EmptyDevicesModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => EmptyDevicesModel());
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: BoxDecoration(),
      child: Align(
        alignment: AlignmentDirectional(0.0, 0.0),
        child: Text(
          widget!.text!,
          style: FlutterFlowTheme.of(context).labelMedium.override(
                fontFamily: 'Inter',
                letterSpacing: 0.0,
              ),
        ),
      ),
    );
  }
}
