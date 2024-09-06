import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_animations.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/widgets/empty_devices/empty_devices_widget.dart';
import '/widgets/strength_indicator/strength_indicator_widget.dart';
import 'dart:math';
import '/custom_code/actions/index.dart' as actions;
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'home_page_model.dart';
export 'home_page_model.dart';

class HomePageWidget extends StatefulWidget {
  const HomePageWidget({
    super.key,
    bool? isBTEnabled,
  }) : this.isBTEnabled = isBTEnabled ?? false;

  final bool isBTEnabled;

  @override
  State<HomePageWidget> createState() => _HomePageWidgetState();
}

class _HomePageWidgetState extends State<HomePageWidget>
    with TickerProviderStateMixin {
  late HomePageModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  final animationsMap = <String, AnimationInfo>{};

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => HomePageModel());

    // On page load action.
    SchedulerBinding.instance.addPostFrameCallback((_) async {
      _model.isBluetoothEnabled = widget!.isBTEnabled;
      safeSetState(() {});
      if (_model.isBluetoothEnabled) {
        _model.isFetchingConnectedDevices = true;
        _model.isFetchingDevices = true;
        safeSetState(() {});
        _model.fetchedConnectedDevices = await actions.getConnectedDevices();
        _model.isFetchingConnectedDevices = false;
        _model.connectedDevices =
            _model.fetchedConnectedDevices!.toList().cast<BTDeviceStruct>();
        safeSetState(() {});
        _model.fetchedDevices = await actions.findDevices();
        _model.isFetchingDevices = false;
        _model.foundDevices =
            _model.fetchedDevices!.toList().cast<BTDeviceStruct>();
        safeSetState(() {});
      }
    });

    animationsMap.addAll({
      'textOnPageLoadAnimation1': AnimationInfo(
        loop: true,
        reverse: true,
        trigger: AnimationTrigger.onPageLoad,
        effectsBuilder: () => [
          FadeEffect(
            curve: Curves.easeInOut,
            delay: 0.0.ms,
            duration: 1000.0.ms,
            begin: 0.5,
            end: 1.0,
          ),
        ],
      ),
      'textOnPageLoadAnimation2': AnimationInfo(
        loop: true,
        reverse: true,
        trigger: AnimationTrigger.onPageLoad,
        effectsBuilder: () => [
          FadeEffect(
            curve: Curves.easeInOut,
            delay: 0.0.ms,
            duration: 1000.0.ms,
            begin: 0.5,
            end: 1.0,
          ),
        ],
      ),
    });
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
        appBar: AppBar(
          backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
          automaticallyImplyLeading: false,
          title: Text(
            FFLocalizations.of(context).getText(
              'eeneklu6' /* Bluetooth */,
            ),
            style: FlutterFlowTheme.of(context).titleLarge.override(
                  fontFamily: 'Inter',
                  letterSpacing: 0.0,
                ),
          ),
          actions: [],
          centerTitle: true,
          elevation: 0.0,
        ),
        body: Padding(
          padding: EdgeInsetsDirectional.fromSTEB(16.0, 10.0, 16.0, 0.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (!widget!.isBTEnabled)
                    Expanded(
                      child: Text(
                        FFLocalizations.of(context).getText(
                          '9srb5bez' /* Enable your device bluetooth t... */,
                        ),
                        style: FlutterFlowTheme.of(context).bodyLarge.override(
                              fontFamily: 'Inter',
                              color: FlutterFlowTheme.of(context).secondaryText,
                              letterSpacing: 0.0,
                            ),
                      ),
                    ),
                  FlutterFlowIconButton(
                    borderColor: FlutterFlowTheme.of(context).primary,
                    borderRadius: 20.0,
                    borderWidth: 1.0,
                    buttonSize: 40.0,
                    fillColor: FlutterFlowTheme.of(context).accent1,
                    icon: Icon(
                      Icons.refresh_rounded,
                      color: FlutterFlowTheme.of(context).primaryText,
                      size: 24.0,
                    ),
                    onPressed: () async {
                      context.goNamed('SplashPage');
                    },
                  ),
                ],
              ),
              Divider(
                thickness: 0.5,
                color: FlutterFlowTheme.of(context).secondaryText,
              ),
              Expanded(
                child: Stack(
                  children: [
                    if (_model.isBluetoothEnabled)
                      Stack(
                        children: [
                          SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                SingleChildScrollView(
                                  primary: false,
                                  child: Column(
                                    mainAxisSize: MainAxisSize.max,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            0.0, 10.0, 0.0, 0.0),
                                        child: Row(
                                          mainAxisSize: MainAxisSize.max,
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Expanded(
                                              child: Text(
                                                FFLocalizations.of(context)
                                                    .getText(
                                                  'wukinpk3' /* Connected Devices */,
                                                ),
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodyLarge
                                                        .override(
                                                          fontFamily: 'Inter',
                                                          letterSpacing: 0.0,
                                                          fontWeight:
                                                              FontWeight.w500,
                                                        ),
                                              ),
                                            ),
                                            if (_model
                                                    .isFetchingConnectedDevices ??
                                                true)
                                              Text(
                                                FFLocalizations.of(context)
                                                    .getText(
                                                  'fa8hkdgd' /* Finding... */,
                                                ),
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodySmall
                                                        .override(
                                                          fontFamily: 'Inter',
                                                          letterSpacing: 0.0,
                                                        ),
                                              ).animateOnPageLoad(animationsMap[
                                                  'textOnPageLoadAnimation1']!),
                                          ],
                                        ),
                                      ),
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            0.0, 16.0, 0.0, 0.0),
                                        child: Builder(
                                          builder: (context) {
                                            final displayConnectedDevcies =
                                                _model.connectedDevices
                                                    .toList();
                                            if (displayConnectedDevcies
                                                .isEmpty) {
                                              return Center(
                                                child: Container(
                                                  width: double.infinity,
                                                  height: 50.0,
                                                  child: EmptyDevicesWidget(
                                                    text:
                                                        'No connected devices',
                                                  ),
                                                ),
                                              );
                                            }

                                            return ListView.builder(
                                              padding: EdgeInsets.zero,
                                              primary: false,
                                              shrinkWrap: true,
                                              scrollDirection: Axis.vertical,
                                              itemCount: displayConnectedDevcies
                                                  .length,
                                              itemBuilder: (context,
                                                  displayConnectedDevciesIndex) {
                                                final displayConnectedDevciesItem =
                                                    displayConnectedDevcies[
                                                        displayConnectedDevciesIndex];
                                                return Padding(
                                                  padding: EdgeInsetsDirectional
                                                      .fromSTEB(
                                                          0.0, 0.0, 0.0, 12.0),
                                                  child: InkWell(
                                                    splashColor:
                                                        Colors.transparent,
                                                    focusColor:
                                                        Colors.transparent,
                                                    hoverColor:
                                                        Colors.transparent,
                                                    highlightColor:
                                                        Colors.transparent,
                                                    onTap: () async {
                                                      context.pushNamed(
                                                        'DevicePage',
                                                        queryParameters: {
                                                          'deviceName':
                                                              serializeParam(
                                                            displayConnectedDevciesItem
                                                                .name,
                                                            ParamType.String,
                                                          ),
                                                          'deviceId':
                                                              serializeParam(
                                                            displayConnectedDevciesItem
                                                                .id,
                                                            ParamType.String,
                                                          ),
                                                          'deviceRssi':
                                                              serializeParam(
                                                            displayConnectedDevciesItem
                                                                .rssi,
                                                            ParamType.int,
                                                          ),
                                                          'hasWriteCharacteristic':
                                                              serializeParam(
                                                            true,
                                                            ParamType.bool,
                                                          ),
                                                        }.withoutNulls,
                                                      );
                                                    },
                                                    child: Container(
                                                      width: double.infinity,
                                                      decoration: BoxDecoration(
                                                        color:
                                                            FlutterFlowTheme.of(
                                                                    context)
                                                                .accent2,
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(16.0),
                                                        border: Border.all(
                                                          color: FlutterFlowTheme
                                                                  .of(context)
                                                              .secondary,
                                                          width: 1.0,
                                                        ),
                                                      ),
                                                      child: Padding(
                                                        padding:
                                                            EdgeInsetsDirectional
                                                                .fromSTEB(
                                                                    16.0,
                                                                    12.0,
                                                                    16.0,
                                                                    12.0),
                                                        child: Row(
                                                          mainAxisSize:
                                                              MainAxisSize.max,
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .spaceBetween,
                                                          children: [
                                                            Column(
                                                              mainAxisSize:
                                                                  MainAxisSize
                                                                      .max,
                                                              crossAxisAlignment:
                                                                  CrossAxisAlignment
                                                                      .start,
                                                              children: [
                                                                Row(
                                                                  mainAxisSize:
                                                                      MainAxisSize
                                                                          .min,
                                                                  crossAxisAlignment:
                                                                      CrossAxisAlignment
                                                                          .end,
                                                                  children: [
                                                                    Padding(
                                                                      padding: EdgeInsetsDirectional.fromSTEB(
                                                                          0.0,
                                                                          0.0,
                                                                          8.0,
                                                                          0.0),
                                                                      child:
                                                                          Text(
                                                                        displayConnectedDevciesItem
                                                                            .name,
                                                                        style: FlutterFlowTheme.of(context)
                                                                            .bodyLarge
                                                                            .override(
                                                                              fontFamily: 'Inter',
                                                                              letterSpacing: 0.0,
                                                                            ),
                                                                      ),
                                                                    ),
                                                                    StrengthIndicatorWidget(
                                                                      key: Key(
                                                                          'Keywn3_${displayConnectedDevciesIndex}_of_${displayConnectedDevcies.length}'),
                                                                      rssi: displayConnectedDevciesItem
                                                                          .rssi,
                                                                      color: valueOrDefault<
                                                                          Color>(
                                                                        () {
                                                                          if (displayConnectedDevciesItem.rssi >=
                                                                              -67) {
                                                                            return FlutterFlowTheme.of(context).success;
                                                                          } else if (displayConnectedDevciesItem.rssi >=
                                                                              -90) {
                                                                            return FlutterFlowTheme.of(context).warning;
                                                                          } else {
                                                                            return FlutterFlowTheme.of(context).error;
                                                                          }
                                                                        }(),
                                                                        FlutterFlowTheme.of(context)
                                                                            .success,
                                                                      ),
                                                                    ),
                                                                  ],
                                                                ),
                                                                Padding(
                                                                  padding: EdgeInsetsDirectional
                                                                      .fromSTEB(
                                                                          0.0,
                                                                          5.0,
                                                                          0.0,
                                                                          0.0),
                                                                  child: Text(
                                                                    displayConnectedDevciesItem
                                                                        .id,
                                                                    style: FlutterFlowTheme.of(
                                                                            context)
                                                                        .labelSmall
                                                                        .override(
                                                                          fontFamily:
                                                                              'Inter',
                                                                          letterSpacing:
                                                                              0.0,
                                                                        ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                            Icon(
                                                              Icons
                                                                  .arrow_forward_ios_rounded,
                                                              color: FlutterFlowTheme
                                                                      .of(context)
                                                                  .primaryText,
                                                              size: 24.0,
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                );
                                              },
                                            );
                                          },
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      0.0, 0.0, 0.0, 50.0),
                                  child: SingleChildScrollView(
                                    primary: false,
                                    child: Column(
                                      mainAxisSize: MainAxisSize.max,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  0.0, 10.0, 0.0, 0.0),
                                          child: Row(
                                            mainAxisSize: MainAxisSize.max,
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              Expanded(
                                                child: Text(
                                                  FFLocalizations.of(context)
                                                      .getText(
                                                    'jxyzgyki' /* Devices */,
                                                  ),
                                                  style: FlutterFlowTheme.of(
                                                          context)
                                                      .bodyLarge
                                                      .override(
                                                        fontFamily: 'Inter',
                                                        letterSpacing: 0.0,
                                                        fontWeight:
                                                            FontWeight.w500,
                                                      ),
                                                ),
                                              ),
                                              if (!_model.isFetchingDevices)
                                                InkWell(
                                                  splashColor:
                                                      Colors.transparent,
                                                  focusColor:
                                                      Colors.transparent,
                                                  hoverColor:
                                                      Colors.transparent,
                                                  highlightColor:
                                                      Colors.transparent,
                                                  onTap: () async {
                                                    _model.isFetchingConnectedDevices =
                                                        true;
                                                    _model.isFetchingDevices =
                                                        true;
                                                    safeSetState(() {});
                                                    _model.fetchedConnectedDevicesCopy =
                                                        await actions
                                                            .getConnectedDevices();
                                                    _model.isFetchingConnectedDevices =
                                                        false;
                                                    _model.connectedDevices = _model
                                                        .fetchedConnectedDevices!
                                                        .toList()
                                                        .cast<BTDeviceStruct>();
                                                    safeSetState(() {});
                                                    _model.findDeviceOut =
                                                        await actions
                                                            .findDevices();
                                                    _model.isFetchingDevices =
                                                        false;
                                                    _model.foundDevices = _model
                                                        .fetchedDevices!
                                                        .toList()
                                                        .cast<BTDeviceStruct>();
                                                    safeSetState(() {});

                                                    safeSetState(() {});
                                                  },
                                                  child: Icon(
                                                    Icons.refresh_rounded,
                                                    color: FlutterFlowTheme.of(
                                                            context)
                                                        .secondaryText,
                                                    size: 22.0,
                                                  ),
                                                ),
                                              if (_model.isFetchingDevices)
                                                Text(
                                                  FFLocalizations.of(context)
                                                      .getText(
                                                    '4qkf2cyv' /* Scanning... */,
                                                  ),
                                                  style: FlutterFlowTheme.of(
                                                          context)
                                                      .bodySmall
                                                      .override(
                                                        fontFamily: 'Inter',
                                                        letterSpacing: 0.0,
                                                      ),
                                                ).animateOnPageLoad(animationsMap[
                                                    'textOnPageLoadAnimation2']!),
                                            ],
                                          ),
                                        ),
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  0.0, 16.0, 0.0, 0.0),
                                          child: Builder(
                                            builder: (context) {
                                              final displayDevices =
                                                  _model.foundDevices.toList();
                                              if (displayDevices.isEmpty) {
                                                return Center(
                                                  child: Container(
                                                    width: double.infinity,
                                                    height: 50.0,
                                                    child: EmptyDevicesWidget(
                                                      text: 'No devices found',
                                                    ),
                                                  ),
                                                );
                                              }

                                              return ListView.builder(
                                                padding: EdgeInsets.zero,
                                                primary: false,
                                                shrinkWrap: true,
                                                scrollDirection: Axis.vertical,
                                                itemCount:
                                                    displayDevices.length,
                                                itemBuilder: (context,
                                                    displayDevicesIndex) {
                                                  final displayDevicesItem =
                                                      displayDevices[
                                                          displayDevicesIndex];
                                                  return Padding(
                                                    padding:
                                                        EdgeInsetsDirectional
                                                            .fromSTEB(0.0, 0.0,
                                                                0.0, 12.0),
                                                    child: InkWell(
                                                      splashColor:
                                                          Colors.transparent,
                                                      focusColor:
                                                          Colors.transparent,
                                                      hoverColor:
                                                          Colors.transparent,
                                                      highlightColor:
                                                          Colors.transparent,
                                                      onTap: () async {
                                                        _model.hasWrite =
                                                            await actions
                                                                .connectDevice(
                                                          displayDevicesItem,
                                                        );
                                                        _model.addToConnectedDevices(
                                                            displayDevicesItem);
                                                        safeSetState(() {});

                                                        context.pushNamed(
                                                          'DevicePage',
                                                          queryParameters: {
                                                            'deviceName':
                                                                serializeParam(
                                                              displayDevicesItem
                                                                  .name,
                                                              ParamType.String,
                                                            ),
                                                            'deviceId':
                                                                serializeParam(
                                                              displayDevicesItem
                                                                  .id,
                                                              ParamType.String,
                                                            ),
                                                            'deviceRssi':
                                                                serializeParam(
                                                              displayDevicesItem
                                                                  .rssi,
                                                              ParamType.int,
                                                            ),
                                                            'hasWriteCharacteristic':
                                                                serializeParam(
                                                              _model.hasWrite,
                                                              ParamType.bool,
                                                            ),
                                                          }.withoutNulls,
                                                        );

                                                        safeSetState(() {});
                                                      },
                                                      child: Container(
                                                        width: double.infinity,
                                                        decoration:
                                                            BoxDecoration(
                                                          color: FlutterFlowTheme
                                                                  .of(context)
                                                              .accent2,
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      16.0),
                                                          border: Border.all(
                                                            color: FlutterFlowTheme
                                                                    .of(context)
                                                                .secondary,
                                                            width: 1.0,
                                                          ),
                                                        ),
                                                        child: Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      12.0,
                                                                      16.0,
                                                                      12.0),
                                                          child: Row(
                                                            mainAxisSize:
                                                                MainAxisSize
                                                                    .max,
                                                            mainAxisAlignment:
                                                                MainAxisAlignment
                                                                    .spaceBetween,
                                                            children: [
                                                              Column(
                                                                mainAxisSize:
                                                                    MainAxisSize
                                                                        .max,
                                                                crossAxisAlignment:
                                                                    CrossAxisAlignment
                                                                        .start,
                                                                children: [
                                                                  Row(
                                                                    mainAxisSize:
                                                                        MainAxisSize
                                                                            .max,
                                                                    crossAxisAlignment:
                                                                        CrossAxisAlignment
                                                                            .end,
                                                                    children: [
                                                                      Padding(
                                                                        padding: EdgeInsetsDirectional.fromSTEB(
                                                                            0.0,
                                                                            0.0,
                                                                            8.0,
                                                                            0.0),
                                                                        child:
                                                                            Text(
                                                                          displayDevicesItem
                                                                              .name,
                                                                          style: FlutterFlowTheme.of(context)
                                                                              .bodyLarge
                                                                              .override(
                                                                                fontFamily: 'Inter',
                                                                                letterSpacing: 0.0,
                                                                              ),
                                                                        ),
                                                                      ),
                                                                      StrengthIndicatorWidget(
                                                                        key: Key(
                                                                            'Keybdj_${displayDevicesIndex}_of_${displayDevices.length}'),
                                                                        rssi: displayDevicesItem
                                                                            .rssi,
                                                                        color: valueOrDefault<
                                                                            Color>(
                                                                          () {
                                                                            if (displayDevicesItem.rssi >=
                                                                                -67) {
                                                                              return FlutterFlowTheme.of(context).success;
                                                                            } else if (displayDevicesItem.rssi >=
                                                                                -90) {
                                                                              return FlutterFlowTheme.of(context).warning;
                                                                            } else {
                                                                              return FlutterFlowTheme.of(context).error;
                                                                            }
                                                                          }(),
                                                                          FlutterFlowTheme.of(context)
                                                                              .success,
                                                                        ),
                                                                      ),
                                                                    ],
                                                                  ),
                                                                  Padding(
                                                                    padding: EdgeInsetsDirectional
                                                                        .fromSTEB(
                                                                            0.0,
                                                                            5.0,
                                                                            0.0,
                                                                            0.0),
                                                                    child: Text(
                                                                      displayDevicesItem
                                                                          .id,
                                                                      style: FlutterFlowTheme.of(
                                                                              context)
                                                                          .labelSmall
                                                                          .override(
                                                                            fontFamily:
                                                                                'Inter',
                                                                            letterSpacing:
                                                                                0.0,
                                                                          ),
                                                                    ),
                                                                  ),
                                                                ],
                                                              ),
                                                              Icon(
                                                                Icons
                                                                    .arrow_forward_ios_rounded,
                                                                color: FlutterFlowTheme.of(
                                                                        context)
                                                                    .primaryText,
                                                                size: 24.0,
                                                              ),
                                                            ],
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  );
                                                },
                                              );
                                            },
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    if (!_model.isBluetoothEnabled)
                      Container(
                        width: double.infinity,
                        height: double.infinity,
                        decoration: BoxDecoration(),
                        child: Align(
                          alignment: AlignmentDirectional(0.0, 0.0),
                          child: Text(
                            FFLocalizations.of(context).getText(
                              'f69t8d2v' /* Turn on bluetooth to connect w... */,
                            ),
                            style: FlutterFlowTheme.of(context)
                                .labelMedium
                                .override(
                                  fontFamily: 'Inter',
                                  letterSpacing: 0.0,
                                ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
