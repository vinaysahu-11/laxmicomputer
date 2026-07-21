import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Brand HSL-tailored Colors
  static const Color primaryBlue = Color(0xFF0066AE);
  static const Color onPrimaryLight = Color(0xFFFFFFFF);
  static const Color primaryContainerLight = Color(0xFFE8F2FF);
  static const Color onPrimaryContainerLight = Color(0xFF001C38);

  static const Color secondaryLight = Color(0xFF4A6572);
  static const Color onSecondaryLight = Color(0xFFFFFFFF);
  static const Color secondaryContainerLight = Color(0xFFF1F5F9);
  static const Color onSecondaryContainerLight = Color(0xFF0F172A);

  static const Color backgroundLight = Color(0xFFF8FAFC);
  static const Color onBackgroundLight = Color(0xFF0F172A);
  static const Color surfaceLight = Color(0xFFFFFFFF);
  static const Color onSurfaceLight = Color(0xFF0F172A);
  static const Color outlineLight = Color(0xFFCBD5E1);

  // Dark Theme Colors (Fallback if user toggles)
  static const Color primaryDark = Color(0xFF90CAF9);
  static const Color onPrimaryDark = Color(0xFF0D47A1);
  static const Color primaryContainerDark = Color(0xFF1565C0);
  static const Color onPrimaryContainerDark = Color(0xFFE3F2FD);

  static const Color backgroundDark = Color(0xFF0F172A);
  static const Color onBackgroundDark = Color(0xFFF8FAFC);
  static const Color surfaceDark = Color(0xFF1E293B);
  static const Color onSurfaceDark = Color(0xFFF8FAFC);
  static const Color outlineDark = Color(0xFF334155);

  // Light Theme Definition
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: const ColorScheme.light(
        primary: primaryBlue,
        onPrimary: onPrimaryLight,
        primaryContainer: primaryContainerLight,
        onPrimaryContainer: onPrimaryContainerLight,
        secondary: secondaryLight,
        onSecondary: onSecondaryLight,
        secondaryContainer: secondaryContainerLight,
        onSecondaryContainer: onSecondaryContainerLight,
        background: backgroundLight,
        onBackground: onBackgroundLight,
        surface: surfaceLight,
        onSurface: onSurfaceLight,
        outline: outlineLight,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: IconThemeData(color: primaryBlue),
      ),
    );
  }

  // Dark Theme Definition
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: const ColorScheme.dark(
        primary: primaryDark,
        onPrimary: onPrimaryDark,
        primaryContainer: primaryContainerDark,
        onPrimaryContainer: onPrimaryContainerDark,
        background: backgroundDark,
        onBackground: onBackgroundDark,
        surface: surfaceDark,
        onSurface: onSurfaceDark,
        outline: outlineDark,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: IconThemeData(color: primaryDark),
      ),
    );
  }
}
