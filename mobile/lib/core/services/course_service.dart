import '../models/course.dart';
import 'dio_client.dart';

class CourseService {
  final DioClient _client;

  CourseService(this._client);

  Future<List<Course>> getCourses() async {
    return [];
  }

  Future<Course?> getCourseById(String id) async {
    return null;
  }

  Future<List<Course>> getFeaturedCourses() async {
    return [];
  }
}
