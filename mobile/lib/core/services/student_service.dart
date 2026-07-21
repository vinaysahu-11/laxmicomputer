import '../models/student.dart';
import 'dio_client.dart';

class StudentService {
  final DioClient _client;

  StudentService(this._client);

  Future<List<Student>> getStudents() async {
    return [];
  }

  Future<Student?> getStudentById(String id) async {
    return null;
  }
}
