import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'core/providers/providers.dart';
import 'core/routes/app_router.dart';
import 'core/theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Pre-initialize SharedPreferences
  final sharedPreferences = await SharedPreferences.getInstance();

  runApp(
    ProviderScope(
      overrides: [
        // Override the placeholder SharedPreferences provider
        sharedPreferencesProvider.overrideWithValue(sharedPreferences),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Read the GoRouter configuration from core routes
    final router = AppRouter.router;

    return MaterialApp.router(
      title: 'Laxmi Computer LMS',
      debugShowCheckedModeBanner: false,
      
      // Routing configuration
      routerConfig: router,
      
      // Theme settings
      themeMode: ThemeMode.system, // Dynamically links to local OS mode, ready to configure theme providers
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
    );
  }
}
