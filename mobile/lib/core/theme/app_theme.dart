import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Brand HSL-tailored Colors
  static const Color primaryLight = Color(0xFF6750A4);
  static const Color onPrimaryLight = Color(0xFFFFFFFF);
  static const Color primaryContainerLight = Color(0xFFEADDFF);
  static const Color onPrimaryContainerLight = Color(0xFF21005D);

  static const Color secondaryLight = Color(0xFF625B71);
  static const Color onSecondaryLight = Color(0xFFFFFFFF);
  static const Color secondaryContainerLight = Color(0xFFE8DEF8);
  static const Color onSecondaryContainerLight = Color(0xFF1D192B);

  static const Color backgroundLight = Color(0xFFFEF7FF);
  static const Color onBackgroundLight = Color(0xFF1D1B20);
  static const Color surfaceLight = Color(0xFFFEF7FF);
  static const Color onSurfaceLight = Color(0xFF1D1B20);
  static const Color outlineLight = Color(0xFF79747E);

  // Dark Theme Colors
  static const Color primaryDark = Color(0xFFD0BCFF);
  static const Color onPrimaryDark = Color(0xFF381E72);
  static const Color primaryContainerDark = Color(0xFF4F378B);
  static const Color onPrimaryContainerDark = Color(0xFFEADDFF);

  static const Color secondaryDark = Color(0xFFCCC2DC);
  static const Color onSecondaryDark = Color(0xFF332D41);
  static const Color secondaryContainerDark = Color(0xFF4A4458);
  static const Color onSecondaryContainerDark = Color(0xFFE8DEF8);

  static const Color backgroundDark = Color(0xFF141218);
  static const Color onBackgroundDark = Color(0xFFE6E1E5);
  static const Color surfaceDark = Color(0xFF141218);
  static const Color onSurfaceDark = Color(0xFFE6E1E5);
  static const Color outlineDark = Color(0xFF938F99);

  // Light Theme Definition
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: const ColorScheme.light(
        primary: primaryLight,
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
        secondary: secondaryDark,
        onSecondary: onSecondaryDark,
        secondaryContainer: secondaryContainerDark,
        onSecondaryContainer: onSecondaryContainerDark,
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
      ),
    );
  }
}
