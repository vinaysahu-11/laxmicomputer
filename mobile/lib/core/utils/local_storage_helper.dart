import 'package:shared_preferences/shared_preferences.dart';
import '../constants/app_constants.dart';

class LocalStorageHelper {
  final SharedPreferences _prefs;

  LocalStorageHelper(this._prefs);

  // Authentication Token
  Future<bool> setToken(String token) async {
    return await _prefs.setString(AppConstants.keyToken, token);
  }

  String? getToken() {
    return _prefs.getString(AppConstants.keyToken);
  }

  Future<bool> removeToken() async {
    return await _prefs.remove(AppConstants.keyToken);
  }

  // Selected User Role (admin, teacher, student)
  Future<bool> setUserRole(String role) async {
    return await _prefs.setString(AppConstants.keyUserRole, role);
  }

  String? getUserRole() {
    return _prefs.getString(AppConstants.keyUserRole);
  }

  Future<bool> removeUserRole() async {
    return await _prefs.remove(AppConstants.keyUserRole);
  }

  // Theme Settings (light, dark, system)
  Future<bool> setThemeMode(String themeMode) async {
    return await _prefs.setString(AppConstants.keyThemeMode, themeMode);
  }

  String getThemeMode() {
    return _prefs.getString(AppConstants.keyThemeMode) ?? 'system';
  }

  // Language Locale Code
  Future<bool> setLanguageCode(String languageCode) async {
    return await _prefs.setString(AppConstants.keyLanguage, languageCode);
  }

  String getLanguageCode() {
    return _prefs.getString(AppConstants.keyLanguage) ?? 'en';
  }

  // Clear Session Data on Log Out
  Future<void> clearSession() async {
    await removeToken();
    await removeUserRole();
  }
}
