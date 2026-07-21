import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../services/dio_client.dart';
import '../services/auth_service.dart';
import '../services/course_service.dart';
import '../services/attendance_service.dart';
import '../services/result_service.dart';
import '../services/assignment_service.dart';
import '../services/notification_service.dart';
import '../services/payment_service.dart';
import '../services/student_service.dart';
import '../services/teacher_service.dart';
import '../utils/local_storage_helper.dart';

// 1. SharedPreferences Provider (To be overridden in main.dart)
final sharedPreferencesProvider = Provider<SharedPreferences>((ref) {
  throw UnimplementedError('SharedPreferences has not been initialized');
});

// 2. Storage Helper Provider
final storageHelperProvider = Provider<LocalStorageHelper>((ref) {
  final prefs = ref.watch(sharedPreferencesProvider);
  return LocalStorageHelper(prefs);
});

// 3. Dio Client Provider
final dioClientProvider = Provider<DioClient>((ref) {
  final storage = ref.watch(storageHelperProvider);
  return DioClient(storage);
});

// 4. Services Providers
final authServiceProvider = Provider<AuthService>((ref) {
  final client = ref.watch(dioClientProvider);
  return AuthService(client);
});

final courseServiceProvider = Provider<CourseService>((ref) {
  final client = ref.watch(dioClientProvider);
  return CourseService(client);
});

final attendanceServiceProvider = Provider<AttendanceService>((ref) {
  final client = ref.watch(dioClientProvider);
  return AttendanceService(client);
});

final resultServiceProvider = Provider<ResultService>((ref) {
  final client = ref.watch(dioClientProvider);
  return ResultService(client);
});

final assignmentServiceProvider = Provider<AssignmentService>((ref) {
  final client = ref.watch(dioClientProvider);
  return AssignmentService(client);
});

final notificationServiceProvider = Provider<NotificationService>((ref) {
  final client = ref.watch(dioClientProvider);
  return NotificationService(client);
});

final paymentServiceProvider = Provider<PaymentService>((ref) {
  final client = ref.watch(dioClientProvider);
  return PaymentService(client);
});

final studentServiceProvider = Provider<StudentService>((ref) {
  final client = ref.watch(dioClientProvider);
  return StudentService(client);
});

final teacherServiceProvider = Provider<TeacherService>((ref) {
  final client = ref.watch(dioClientProvider);
  return TeacherService(client);
});

// 5. Auth State StateNotifier
class AuthState {
  final bool isAuthenticated;
  final String? token;
  final String? role; // student, teacher, admin
  final bool isLoading;

  AuthState({
    this.isAuthenticated = false,
    this.token,
    this.role,
    this.isLoading = false,
  });

  AuthState copyWith({
    bool? isAuthenticated,
    String? token,
    String? role,
    bool? isLoading,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      token: token ?? this.token,
      role: role ?? this.role,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  final LocalStorageHelper _storage;
  final AuthService _authService;

  AuthNotifier(this._storage, this._authService) : super(AuthState()) {
    _initialize();
  }

  void _initialize() {
    final token = _storage.getToken();
    final role = _storage.getUserRole();
    if (token != null && role != null) {
      state = AuthState(isAuthenticated: true, token: token, role: role);
    }
  }

  Future<bool> login(String email, String password, String role) async {
    state = state.copyWith(isLoading: true);
    
    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 800));
    
    // Dummy authentication
    final dummyToken = 'dummy_token_${role}_123456';
    await _storage.setToken(dummyToken);
    await _storage.setUserRole(role);
    
    state = AuthState(isAuthenticated: true, token: dummyToken, role: role);
    return true;
  }

  Future<void> logout() async {
    state = state.copyWith(isLoading: true);
    await _storage.clearSession();
    await _authService.logout();
    state = AuthState(isAuthenticated: false);
  }
}

final authNotifierProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final storage = ref.watch(storageHelperProvider);
  final authService = ref.watch(authServiceProvider);
  return AuthNotifier(storage, authService);
});
