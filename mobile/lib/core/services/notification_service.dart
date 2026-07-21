import '../models/notification.dart';
import 'dio_client.dart';

class NotificationService {
  final DioClient _client;

  NotificationService(this._client);

  Future<List<NotificationModel>> getNotifications() async {
    return [];
  }
}
