import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _kLocaleStorageKey = '__locale_key__';

class FFLocalizations {
  FFLocalizations(this.locale);

  final Locale locale;

  static FFLocalizations of(BuildContext context) =>
      Localizations.of<FFLocalizations>(context, FFLocalizations)!;

  static List<String> languages() => ['en', 'tl'];

  static late SharedPreferences _prefs;
  static Future initialize() async =>
      _prefs = await SharedPreferences.getInstance();
  static Future storeLocale(String locale) =>
      _prefs.setString(_kLocaleStorageKey, locale);
  static Locale? getStoredLocale() {
    final locale = _prefs.getString(_kLocaleStorageKey);
    return locale != null && locale.isNotEmpty ? createLocale(locale) : null;
  }

  String get languageCode => locale.toString();
  String? get languageShortCode =>
      _languagesWithShortCode.contains(locale.toString())
          ? '${locale.toString()}_short'
          : null;
  int get languageIndex => languages().contains(languageCode)
      ? languages().indexOf(languageCode)
      : 0;

  String getText(String key) =>
      (kTranslationsMap[key] ?? {})[locale.toString()] ?? '';

  String getVariableText({
    String? enText = '',
    String? tlText = '',
  }) =>
      [enText, tlText][languageIndex] ?? '';

  static const Set<String> _languagesWithShortCode = {
    'ar',
    'az',
    'ca',
    'cs',
    'da',
    'de',
    'dv',
    'en',
    'es',
    'et',
    'fi',
    'fr',
    'gr',
    'he',
    'hi',
    'hu',
    'it',
    'km',
    'ku',
    'mn',
    'ms',
    'no',
    'pt',
    'ro',
    'ru',
    'rw',
    'sv',
    'th',
    'uk',
    'vi',
  };
}

class FFLocalizationsDelegate extends LocalizationsDelegate<FFLocalizations> {
  const FFLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) {
    final language = locale.toString();
    return FFLocalizations.languages().contains(
      language.endsWith('_')
          ? language.substring(0, language.length - 1)
          : language,
    );
  }

  @override
  Future<FFLocalizations> load(Locale locale) =>
      SynchronousFuture<FFLocalizations>(FFLocalizations(locale));

  @override
  bool shouldReload(FFLocalizationsDelegate old) => false;
}

Locale createLocale(String language) => language.contains('_')
    ? Locale.fromSubtags(
        languageCode: language.split('_').first,
        scriptCode: language.split('_').last,
      )
    : Locale(language);

final kTranslationsMap = <Map<String, Map<String, String>>>[
  // HomePage
  {
    '9srb5bez': {
      'en': 'Enable your device bluetooth to scan for nearby devices.',
      'tl':
          'Paganahin ang bluetooth ng iyong device upang mag-scan para sa mga kalapit na device.',
    },
    'wukinpk3': {
      'en': 'Connected Devices',
      'tl': 'Mga Nakakonektang Device',
    },
    'fa8hkdgd': {
      'en': 'Finding...',
      'tl': 'Hinahanap...',
    },
    'jxyzgyki': {
      'en': 'Devices',
      'tl': 'Mga device',
    },
    '4qkf2cyv': {
      'en': 'Scanning...',
      'tl': 'Ini-scan...',
    },
    'f69t8d2v': {
      'en': 'Turn on bluetooth to connect with any device',
      'tl': 'I-on ang bluetooth para kumonekta sa anumang device',
    },
    'eeneklu6': {
      'en': 'Bluetooth',
      'tl': 'Bluetooth',
    },
    'qdxsqwuc': {
      'en': 'Home',
      'tl': 'Bahay',
    },
  },
  // SplashPage
  {
    'b4zp2v8u': {
      'en': 'Fetching bluetooth status...',
      'tl': 'Kinukuha ang status ng bluetooth...',
    },
    'p0kxo077': {
      'en': 'Bluetooth',
      'tl': 'Bluetooth',
    },
    '04qubihc': {
      'en': 'Home',
      'tl': 'Bahay',
    },
  },
  // DevicePage
  {
    'vbycgw54': {
      'en':
          'You can send data to the connected device and receive data back from it.',
      'tl':
          'Maaari kang magpadala ng data sa nakakonektang device at tumanggap ng data pabalik mula dito.',
    },
    's51h4vc4': {
      'en': 'Enter data to send...',
      'tl': 'Maglagay ng data na ipapadala...',
    },
    'nkcw8bo7': {
      'en': 'Home',
      'tl': 'Bahay',
    },
  },
  // Onboarding
  {
    'll6ldbmb': {
      'en': 'Welcome',
      'tl': '',
    },
    '45eiu78z': {
      'en': 'Turn on Bluetooth',
      'tl': '',
    },
    'jp8t71vu': {
      'en': 'Go to Splash',
      'tl': '',
    },
    'j24crses': {
      'en': 'Home',
      'tl': 'Bahay',
    },
  },
  // DisplayReceivedData
  {
    '2r668gbs': {
      'en': 'Received data',
      'tl': 'Natanggap na data',
    },
  },
  // Miscellaneous
  {
    'm6tgji4v': {
      'en': 'Bluetooth permission is required to connect with a device.',
      'tl':
          'Kinakailangan ang pahintulot ng Bluetooth upang kumonekta sa isang device.',
    },
    'kna10rrm': {
      'en': 'Bluetooth permission is required to connect with a device.',
      'tl':
          'Kinakailangan ang pahintulot ng Bluetooth para kumonekta sa isang device.',
    },
    'urjl7axa': {
      'en': 'Location permission is required to connect with a device.',
      'tl': '',
    },
    '5eie5kdm': {
      'en':
          'Bluetooth scan permission is required to find nearby Bluetooth devices.',
      'tl': '',
    },
    'j24az3jp': {
      'en':
          'Bluetooth scan pernission is required to find nearby Bluetooth devices.',
      'tl': '',
    },
    '153w1cqd': {
      'en':
          'Bluetooth scan pemission is required to find nearby Bluetooth devices.',
      'tl': '',
    },
    'f5gb131z': {
      'en': '',
      'tl': '',
    },
    'hkp2yhs8': {
      'en': '',
      'tl': '',
    },
    '6ajxwlz4': {
      'en': '',
      'tl': '',
    },
    'sxhjgugb': {
      'en': '',
      'tl': '',
    },
    '2lyz3vp9': {
      'en': '',
      'tl': '',
    },
    'myaejiak': {
      'en': '',
      'tl': '',
    },
    'z04t0awv': {
      'en': '',
      'tl': '',
    },
    'w83h2t6g': {
      'en': '',
      'tl': '',
    },
    '558cll9o': {
      'en': '',
      'tl': '',
    },
    '8dycl67j': {
      'en': '',
      'tl': '',
    },
    'c5durj77': {
      'en': '',
      'tl': '',
    },
    '9vbgp09q': {
      'en': '',
      'tl': '',
    },
    'cr1mj2tf': {
      'en': '',
      'tl': '',
    },
    'yzwwqjat': {
      'en': '',
      'tl': '',
    },
    'dwq6yrmw': {
      'en': '',
      'tl': '',
    },
    'jz2mqewl': {
      'en': '',
      'tl': '',
    },
    'vm8x4j4k': {
      'en': '',
      'tl': '',
    },
    'vscwjgm8': {
      'en': '',
      'tl': '',
    },
    'axonqb7g': {
      'en': '',
      'tl': '',
    },
    '55qt6od5': {
      'en': '',
      'tl': '',
    },
    'vdss5ag0': {
      'en': '',
      'tl': '',
    },
    'lbjmzpme': {
      'en': '',
      'tl': '',
    },
    'rk8p0ef3': {
      'en': '',
      'tl': '',
    },
    'a538bmoj': {
      'en': '',
      'tl': '',
    },
    'tr2uxdrh': {
      'en': '',
      'tl': '',
    },
  },
].reduce((a, b) => a..addAll(b));
