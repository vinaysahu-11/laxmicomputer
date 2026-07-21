class Result {
  final String id;
  final String courseName;
  final String examName;
  final double percentage;
  final String grade;

  Result({
    required this.id,
    required this.courseName,
    required this.examName,
    required this.percentage,
    required this.grade,
  });

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        id: json['_id'] ?? json['id'] ?? '',
        courseName: json['courseName'] ?? '',
        examName: json['examName'] ?? '',
        percentage: (json['percentage'] ?? 0).toDouble(),
        grade: json['grade'] ?? 'F',
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'courseName': courseName,
        'examName': examName,
        'percentage': percentage,
        'grade': grade,
      };
}
