import 'package:dio/dio.dart';
import '../constants/app_constants.dart';
import '../utils/local_storage_helper.dart';

class DioClient {
  final Dio _dio;
  final LocalStorageHelper _storageHelper;

  DioClient(this._storageHelper) : _dio = Dio() {
    _dio
      ..options.baseUrl = AppConstants.apiBaseUrl
      ..options.connectTimeout = const Duration(milliseconds: AppConstants.connectTimeout)
      ..options.receiveTimeout = const Duration(milliseconds: AppConstants.receiveTimeout)
      ..options.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        final token = _storageHelper.getToken();
        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onResponse: (response, handler) {
        return handler.next(response);
      },
      onError: (DioException error, handler) {
        // Handle global error logs or token expiration (e.g. 401 triggers logout)
        if (error.response?.statusCode == 401) {
          _storageHelper.clearSession();
        }
        return handler.next(error);
      },
    ));
  }

  Dio get dio => _dio;
}
