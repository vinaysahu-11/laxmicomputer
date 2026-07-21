import '../models/teacher.dart';
import 'dio_client.dart';

class TeacherService {
  final DioClient _client;

  TeacherService(this._client);

  Future<List<Teacher>> getTeachers() async {
    return [];
  }

  Future<Teacher?> getTeacherById(String id) async {
    return null;
  }
}
