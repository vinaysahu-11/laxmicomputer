class NotificationModel {
  final String id;
  final String title;
  final String content;
  final String category;
  final DateTime createdAt;

  NotificationModel({
    required this.id,
    required this.title,
    required this.content,
    required this.category,
    required this.createdAt,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) => NotificationModel(
        id: json['_id'] ?? json['id'] ?? '',
        title: json['title'] ?? '',
        content: json['content'] ?? '',
        category: json['category'] ?? 'all',
        createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'content': content,
        'category': category,
        'createdAt': createdAt.toIso8601String(),
      };
}
