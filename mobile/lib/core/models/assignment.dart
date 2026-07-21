class Assignment {
  final String id;
  final String title;
  final String description;
  final String courseName;
  final DateTime dueDate;
  final String status; // Pending, Submitted, Graded

  Assignment({
    required this.id,
    required this.title,
    required this.description,
    required this.courseName,
    required this.dueDate,
    required this.status,
  });

  factory Assignment.fromJson(Map<String, dynamic> json) => Assignment(
        id: json['_id'] ?? json['id'] ?? '',
        title: json['title'] ?? '',
        description: json['description'] ?? '',
        courseName: json['courseName'] ?? '',
        dueDate: DateTime.parse(json['dueDate'] ?? DateTime.now().toIso8601String()),
        status: json['status'] ?? 'Pending',
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'description': description,
        'courseName': courseName,
        'dueDate': dueDate.toIso8601String(),
        'status': status,
      };
}
