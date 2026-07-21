import '../models/result.dart';
import 'dio_client.dart';

class ResultService {
  final DioClient _client;

  ResultService(this._client);

  Future<List<Result>> getStudentResults() async {
    return [];
  }

  Future<bool> publishResult(String studentId, String courseName, double percentage, String grade) async {
    return true;
  }
}
