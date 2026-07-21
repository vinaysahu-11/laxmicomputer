class Teacher {
  final String id;
  final String name;
  final String email;
  final String teacherId;
  final String? profilePhoto;

  Teacher({
    required this.id,
    required this.name,
    required this.email,
    required this.teacherId,
    this.profilePhoto,
  });

  factory Teacher.fromJson(Map<String, dynamic> json) => Teacher(
        id: json['_id'] ?? json['id'] ?? '',
        name: json['name'] ?? '',
        email: json['email'] ?? '',
        teacherId: json['teacherId'] ?? '',
        profilePhoto: json['profilePhoto'],
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'teacherId': teacherId,
        'profilePhoto': profilePhoto,
      };
}
