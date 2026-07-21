import '../models/assignment.dart';
import 'dio_client.dart';

class AssignmentService {
  final DioClient _client;

  AssignmentService(this._client);

  Future<List<Assignment>> getAssignments() async {
    return [];
  }

  Future<bool> submitAssignment(String assignmentId, String submissionUrl) async {
    return true;
  }
}
