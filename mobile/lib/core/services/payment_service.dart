import '../models/fee.dart';
import 'dio_client.dart';

class PaymentService {
  final DioClient _client;

  PaymentService(this._client);

  Future<List<Fee>> getFees() async {
    return [];
  }

  Future<bool> payFee(String invoiceId, double amount) async {
    return true;
  }
}
