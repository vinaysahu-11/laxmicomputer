import '../models/student.dart';
import '../models/teacher.dart';
import 'dio_client.dart';

class AuthService {
  final DioClient _client;

  AuthService(this._client);

  Future<dynamic> login(String email, String password) async {
    // Placeholder login API call
    return null;
  }

  Future<void> logout() async {
    // Placeholder logout API call
  }

  Future<Student?> fetchCurrentStudent() async {
    // Placeholder fetch student profile API call
    return null;
  }

  Future<Teacher?> fetchCurrentTeacher() async {
    // Placeholder fetch teacher profile API call
    return null;
  }

  Future<bool> requestOtp(String email) async {
    return true;
  }

  Future<bool> verifyOtp(String email, String otp) async {
    return true;
  }

  Future<bool> resetPassword(String email, String password) async {
    return true;
  }
}
