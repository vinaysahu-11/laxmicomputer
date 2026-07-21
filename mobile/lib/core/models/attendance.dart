class Attendance {
  final String id;
  final DateTime date;
  final String status; // Present, Absent, Late
  final String course;

  Attendance({
    required this.id,
    required this.date,
    required this.status,
    required this.course,
  });

  factory Attendance.fromJson(Map<String, dynamic> json) => Attendance(
        id: json['_id'] ?? json['id'] ?? '',
        date: DateTime.parse(json['date'] ?? DateTime.now().toIso8601String()),
        status: json['status'] ?? 'Absent',
        course: json['course'] ?? '',
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'date': date.toIso8601String(),
        'status': status,
        'course': course,
      };
}
