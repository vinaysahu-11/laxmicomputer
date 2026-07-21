class Student {
  final String id;
  final String name;
  final String email;
  final String studentId;
  final String? profilePhoto;

  Student({
    required this.id,
    required this.name,
    required this.email,
    required this.studentId,
    this.profilePhoto,
  });

  factory Student.fromJson(Map<String, dynamic> json) => Student(
        id: json['_id'] ?? json['id'] ?? '',
        name: json['name'] ?? '',
        email: json['email'] ?? '',
        studentId: json['studentId'] ?? '',
        profilePhoto: json['profilePhoto'],
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'studentId': studentId,
        'profilePhoto': profilePhoto,
      };
}
