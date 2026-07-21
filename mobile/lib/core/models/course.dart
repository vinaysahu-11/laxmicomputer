class Course {
  final String id;
  final String title;
  final String description;
  final String category;
  final double price;
  final String duration;
  final String instructor;
  final String mode; // online, offline, hybrid
  final String? thumbnail;

  Course({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.price,
    required this.duration,
    required this.instructor,
    required this.mode,
    this.thumbnail,
  });

  factory Course.fromJson(Map<String, dynamic> json) => Course(
        id: json['_id'] ?? json['id'] ?? '',
        title: json['title'] ?? '',
        description: json['description'] ?? '',
        category: json['category'] ?? '',
        price: (json['price'] ?? 0).toDouble(),
        duration: json['duration'] ?? '',
        instructor: json['instructor'] ?? '',
        mode: json['mode'] ?? 'offline',
        thumbnail: json['thumbnail'],
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'description': description,
        'category': category,
        'price': price,
        'duration': duration,
        'instructor': instructor,
        'mode': mode,
        'thumbnail': thumbnail,
      };
}
