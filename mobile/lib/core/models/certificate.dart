class Certificate {
  final String id;
  final String title;
  final String courseName;
  final String issueDate;
  final String certificateNumber;

  Certificate({
    required this.id,
    required this.title,
    required this.courseName,
    required this.issueDate,
    required this.certificateNumber,
  });

  factory Certificate.fromJson(Map<String, dynamic> json) => Certificate(
        id: json['_id'] ?? json['id'] ?? '',
        title: json['title'] ?? '',
        courseName: json['courseName'] ?? '',
        issueDate: json['issueDate'] ?? '',
        certificateNumber: json['certificateNumber'] ?? '',
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'courseName': courseName,
        'issueDate': issueDate,
        'certificateNumber': certificateNumber,
      };
}
