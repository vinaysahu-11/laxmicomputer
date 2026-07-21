class AppConstants {
  static const String appName = 'Laxmi Computer LMS';
  
  // API URLs
  static const String apiBaseUrl = 'http://localhost:5000/api';
  static const int connectTimeout = 5000;
  static const int receiveTimeout = 3000;

  // Local Storage Keys
  static const String keyToken = 'auth_token';
  static const String keyUserRole = 'user_role';
  static const String keyThemeMode = 'theme_mode';
  static const String keyLanguage = 'language_code';

  // Navigation Keys
  static const String roleAdmin = 'admin';
  static const String roleTeacher = 'teacher';
  static const String roleStudent = 'student';
}
