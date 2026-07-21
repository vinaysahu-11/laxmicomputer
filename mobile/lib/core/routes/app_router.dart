import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../features/splash/splash_screen.dart';
import '../../features/auth/auth_screens.dart';
import '../../features/student/student_shell.dart';
import '../../features/student/student_screens.dart';
import '../../features/teacher/teacher_shell.dart';
import '../../features/teacher/teacher_screens.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');
final GlobalKey<NavigatorState> _studentShellNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'studentShell');
final GlobalKey<NavigatorState> _teacherShellNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'teacherShell');

class AppRouter {
  static GoRouter get router => GoRouter(
        navigatorKey: _rootNavigatorKey,
        initialLocation: '/',
        routes: <RouteBase>[
          // Splash Route
          GoRoute(
            path: '/',
            builder: (BuildContext context, GoRouterState state) => const SplashScreen(),
          ),

          // Authentication Routes
          GoRoute(
            path: '/login',
            builder: (BuildContext context, GoRouterState state) => const LoginScreen(),
          ),
          GoRoute(
            path: '/forgot-password',
            builder: (BuildContext context, GoRouterState state) => const ForgotPasswordScreen(),
          ),
          GoRoute(
            path: '/otp-verify',
            builder: (BuildContext context, GoRouterState state) {
              final email = state.uri.queryParameters['email'] ?? '';
              return OtpVerificationScreen(email: email);
            },
          ),
          GoRoute(
            path: '/reset-password',
            builder: (BuildContext context, GoRouterState state) {
              final email = state.uri.queryParameters['email'] ?? '';
              return ResetPasswordScreen(email: email);
            },
          ),

          // Student Branch Shell Routes
          StatefulShellRoute.indexedStack(
            parentNavigatorKey: _rootNavigatorKey,
            builder: (context, state, navigationShell) {
              return StudentShell(navigationShell: navigationShell);
            },
            branches: [
              // Branch 0: Home / Dashboard
              StatefulShellBranch(
                navigatorKey: _studentShellNavigatorKey,
                routes: [
                  GoRoute(
                    path: '/student',
                    builder: (context, state) => const StudentDashboardScreen(),
                    routes: [
                      // Sub-pages pushed onto root navigation (to hide bottom bar when wanted)
                      GoRoute(
                        path: 'courses/details',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) {
                          final title = state.uri.queryParameters['title'] ?? 'Course Details';
                          return StudentCourseDetailsScreen(title: title);
                        },
                      ),
                      GoRoute(
                        path: 'materials',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const StudentStudyMaterialsScreen(),
                      ),
                      GoRoute(
                        path: 'assignments',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const StudentAssignmentsScreen(),
                      ),
                      GoRoute(
                        path: 'tests',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const StudentTestsScreen(),
                      ),
                      GoRoute(
                        path: 'exams',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const StudentExamsScreen(),
                      ),
                      GoRoute(
                        path: 'attendance',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const StudentAttendanceScreen(),
                      ),
                    ],
                  ),
                ],
              ),
              // Branch 1: Courses
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/student/courses',
                    builder: (context, state) => const StudentCoursesScreen(),
                  ),
                ],
              ),
              // Branch 2: Classes
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/student/classes',
                    builder: (context, state) => const StudentClassesScreen(),
                  ),
                ],
              ),
              // Branch 3: Alerts / Notifications
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/student/notifications',
                    builder: (context, state) => const StudentNotificationsScreen(),
                  ),
                ],
              ),
              // Branch 4: Profile
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/student/profile',
                    builder: (context, state) => const StudentProfileScreen(),
                  ),
                ],
              ),
              // Branch 5: Results
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/student/results',
                    builder: (context, state) => const StudentResultsScreen(),
                  ),
                ],
              ),
              // Branch 6: Certificates
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/student/certificates',
                    builder: (context, state) => const StudentCertificatesScreen(),
                  ),
                ],
              ),
              // Branch 7: Payments
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/student/payments',
                    builder: (context, state) => const StudentPaymentsScreen(),
                  ),
                ],
              ),
            ],
          ),
          // Settings route pushed on root navigator
          GoRoute(
            path: '/student/settings',
            parentNavigatorKey: _rootNavigatorKey,
            builder: (context, state) => const StudentSettingsScreen(),
          ),

          // Teacher Branch Shell Routes
          StatefulShellRoute.indexedStack(
            parentNavigatorKey: _rootNavigatorKey,
            builder: (context, state, navigationShell) {
              return TeacherShell(navigationShell: navigationShell);
            },
            branches: [
              StatefulShellBranch(
                navigatorKey: _teacherShellNavigatorKey,
                routes: [
                  GoRoute(
                    path: '/teacher',
                    builder: (context, state) => const TeacherDashboardScreen(),
                    routes: [
                      // Sub-pages pushed onto root navigation
                      GoRoute(
                        path: 'classes',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const TeacherClassesScreen(),
                      ),
                      GoRoute(
                        path: 'classes/details',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) {
                          final className = state.uri.queryParameters['className'] ?? 'Class Details';
                          return TeacherClassDetailsScreen(className: className);
                        },
                      ),
                      GoRoute(
                        path: 'students',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const TeacherStudentsScreen(),
                      ),
                      GoRoute(
                        path: 'attendance',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const TeacherAttendanceScreen(),
                      ),
                      GoRoute(
                        path: 'materials',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const TeacherStudyMaterialsScreen(),
                      ),
                      GoRoute(
                        path: 'assignments',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const TeacherAssignmentsScreen(),
                      ),
                      GoRoute(
                        path: 'tests',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const TeacherTestsScreen(),
                      ),
                      GoRoute(
                        path: 'exams',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const TeacherExamsScreen(),
                      ),
                      GoRoute(
                        path: 'results',
                        parentNavigatorKey: _rootNavigatorKey,
                        builder: (context, state) => const TeacherResultsScreen(),
                      ),
                    ],
                  ),
                ],
              ),
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/teacher/notifications',
                    builder: (context, state) => const TeacherNotificationsScreen(),
                  ),
                ],
              ),
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/teacher/profile',
                    builder: (context, state) => const TeacherProfileScreen(),
                  ),
                ],
              ),
              StatefulShellBranch(
                routes: [
                  GoRoute(
                    path: '/teacher/settings',
                    builder: (context, state) => const TeacherSettingsScreen(),
                  ),
                ],
              ),
            ],
          ),
        ],
      );
}
