import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/providers.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _progressController;

  @override
  void initState() {
    super.initState();
    _progressController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..forward();
    _navigate();
  }

  @override
  void dispose() {
    _progressController.dispose();
    super.dispose();
  }

  void _navigate() async {
    await Future.delayed(const Duration(seconds: 2));
    if (!mounted) return;

    final authState = ref.read(authNotifierProvider);
    if (authState.isAuthenticated) {
      if (authState.role == 'student') {
        context.go('/student');
      } else if (authState.role == 'teacher') {
        context.go('/teacher');
      } else {
        context.go('/login');
      }
    } else {
      context.go('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Stack(
          children: [
            // Top abstract light grid background pattern
            Positioned(
              top: -100,
              left: 0,
              right: 0,
              child: Image.network(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDx_JxcCJ-xe5iuCZ70T2x_T5X4cb1OVvyY0HfKvaqhbULj0IuvvL8vos3U2YbUmxMKWn4jnzIAAYpoxx0K2Rmua9W_5lNHLQWRD_fJmd24a66anjuZsNYYMtysTiAa81VbqRKLMzyVLeqX7hf00bAWYF3X_URQbW8MjOMrlshd5AmwfVeyRRVQaOdv_O-VNjey2MtSe99DHxRrRxvmqr_MQhNuM3r4-UB33sEwFT6GIqqIUrVJrCnuUX_YEXq36MUndv0mrof59ln8',
                height: 350.0,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) => const SizedBox(),
                color: Colors.white.withOpacity(0.05),
                colorBlendMode: BlendMode.dstATop,
              ),
            ),
            
            // Center Logo & Branding content
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Outer soft circle frame
                    Container(
                      padding: const EdgeInsets.all(24.0),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: theme.colorScheme.primary.withOpacity(0.06),
                            blurRadius: 40.0,
                            spreadRadius: 8.0,
                          ),
                        ],
                      ),
                      child: Container(
                        width: 96.0,
                        height: 96.0,
                        decoration: BoxDecoration(
                          color: theme.colorScheme.primary,
                          borderRadius: BorderRadius.circular(24.0),
                          boxShadow: [
                            BoxShadow(
                              color: theme.colorScheme.primary.withOpacity(0.3),
                              blurRadius: 16.0,
                              offset: const Offset(0, 8),
                            ),
                          ],
                        ),
                        child: const Icon(
                          Icons.school,
                          size: 48.0,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 36.0),
                    // Title
                    const Text(
                      'Laxmi Computer\nEducation',
                      style: TextStyle(
                        fontSize: 28.0,
                        fontWeight: FontWeight.w800,
                        color: Color(0xFF1E293B),
                        height: 1.25,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 12.0),
                    // Subtitle tagline
                    const Text(
                      'Empowering Minds, Shaping Digital\nFutures',
                      style: TextStyle(
                        fontSize: 15.0,
                        color: Color(0xFF64748B),
                        fontWeight: FontWeight.w500,
                        height: 1.4,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    
                    const SizedBox(height: 80.0),
                    
                    // Initialization text
                    Text(
                      'INITIALIZING ACADEMY',
                      style: TextStyle(
                        fontSize: 11.5,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.5,
                        color: theme.colorScheme.primary,
                      ),
                    ),
                    const SizedBox(height: 12.0),
                    
                    // Linear progress indicator
                    Container(
                      width: 240.0,
                      height: 5.0,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10.0),
                        color: theme.colorScheme.primary.withOpacity(0.12),
                      ),
                      child: AnimatedBuilder(
                        animation: _progressController,
                        builder: (context, child) {
                          return Align(
                            alignment: Alignment.centerLeft,
                            child: Container(
                              width: 240.0 * _progressController.value,
                              height: 5.0,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10.0),
                                color: theme.colorScheme.primary,
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            // Bottom ISO certification tag
            Positioned(
              bottom: 24,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.verified_user_outlined,
                    size: 16.5,
                    color: const Color(0xFF64748B).withOpacity(0.9),
                  ),
                  const SizedBox(width: 6.0),
                  const Text(
                    'ISO 9001:2015 Certified Institute',
                    style: TextStyle(
                      fontSize: 12.0,
                      color: Color(0xFF64748B),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
