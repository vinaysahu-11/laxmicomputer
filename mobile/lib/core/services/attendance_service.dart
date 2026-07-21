import '../models/attendance.dart';
import 'dio_client.dart';

class AttendanceService {
  final DioClient _client;

  AttendanceService(this._client);

  Future<List<Attendance>> getStudentAttendance() async {
    return [];
  }

  Future<bool> markAttendance(String studentId, String status, DateTime date, String course) async {
    return true;
  }
}
