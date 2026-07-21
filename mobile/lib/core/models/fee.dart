class Fee {
  final String id;
  final String invoiceId;
  final String course;
  final double amount;
  final String status; // Paid, Pending, Overdue
  final String date;
  final String dueDate;

  Fee({
    required this.id,
    required this.invoiceId,
    required this.course,
    required this.amount,
    required this.status,
    required this.date,
    required this.dueDate,
  });

  factory Fee.fromJson(Map<String, dynamic> json) => Fee(
        id: json['_id'] ?? json['id'] ?? '',
        invoiceId: json['invoiceId'] ?? '',
        course: json['course'] ?? '',
        amount: (json['amount'] ?? 0).toDouble(),
        status: json['status'] ?? 'Pending',
        date: json['date'] ?? '',
        dueDate: json['dueDate'] ?? '',
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'invoiceId': invoiceId,
        'course': course,
        'amount': amount,
        'status': status,
        'date': date,
        'dueDate': dueDate,
      };
}
