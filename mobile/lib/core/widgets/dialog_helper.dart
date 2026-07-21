import 'package:flutter/material.dart';

class DialogHelper {
  static void showConfirmation({
    required BuildContext context,
    required String title,
    required String content,
    required VoidCallback onConfirm,
    String confirmLabel = 'Confirm',
    String cancelLabel = 'Cancel',
  }) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(title),
          content: Text(content),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text(cancelLabel),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                onConfirm();
              },
              child: Text(confirmLabel),
            ),
          ],
        );
      },
    );
  }
}
