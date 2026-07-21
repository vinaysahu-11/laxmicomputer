import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/providers.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_button.dart';
import '../../core/widgets/profile_card.dart';
import '../student/student_screens.dart'; // Reuse NavigationTile

// 1. Teacher Dashboard Screen
class TeacherDashboardScreen extends ConsumerWidget {
  const TeacherDashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Teacher Dashboard', showBackButton: false),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const ProfileCard(
              name: 'Dr. Sarah Jenkins',
              email: 'teacher@laxmi.com',
              idLabel: 'Teacher ID',
              idValue: 'TCH-2026-001',
            ),
            const SizedBox(height: 24.0),
            const Text(
              'Teacher Quick Nav',
              style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12.0),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 12.0,
              crossAxisSpacing: 12.0,
              childAspectRatio: 1.5,
              children: [
                _buildGridCard(context, 'My Classes', Icons.meeting_room, '/teacher/classes'),
                _buildGridCard(context, 'Students List', Icons.people_outline, '/teacher/students'),
                _buildGridCard(context, 'Mark Attendance', Icons.calendar_month, '/teacher/attendance'),
                _buildGridCard(context, 'Study Material', Icons.description, '/teacher/materials'),
                _buildGridCard(context, 'Assignments', Icons.assignment, '/teacher/assignments'),
                _buildGridCard(context, 'Tests & Quiz', Icons.quiz, '/teacher/tests'),
                _buildGridCard(context, 'Term Exams', Icons.badge, '/teacher/exams'),
                _buildGridCard(context, 'Result Ledger', Icons.grade, '/teacher/results'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGridCard(BuildContext context, String label, IconData icon, String route) {
    final theme = Theme.of(context);
    return Card(
      elevation: 0,
      color: theme.colorScheme.surfaceVariant.withOpacity(0.3),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
        side: BorderSide(color: theme.colorScheme.outline.withOpacity(0.1)),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12.0),
        onTap: () => context.push(route),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, color: theme.colorScheme.secondary, size: 28.0),
              const SizedBox(height: 8.0),
              Text(
                label,
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// 2. My Classes Screen
class TeacherClassesScreen extends StatelessWidget {
  const TeacherClassesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'My Classes'),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          NavigationTile(
            title: 'Batch A - Full Stack Web Dev',
            icon: Icons.computer,
            onTap: () => context.push('/teacher/classes/details?className=Batch%20A'),
          ),
          NavigationTile(
            title: 'Batch B - Tally Prime GST',
            icon: Icons.account_balance_wallet,
            onTap: () => context.push('/teacher/classes/details?className=Batch%20B'),
          ),
        ],
      ),
    );
  }
}

// 3. Class Details Screen
class TeacherClassDetailsScreen extends StatelessWidget {
  final String className;

  const TeacherClassDetailsScreen({Key? key, required this.className}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: className),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Class Details & Schedule',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12.0),
            Text('Viewing statistics and active rosters for $className.'),
            const SizedBox(height: 24.0),
            const Text(
              'Roster List Placeholder',
              style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            const Text(
              'This is a placeholder page for listing all students enrolled in this class session. Premium layout will replace this.',
              style: TextStyle(height: 1.4),
            ),
          ],
        ),
      ),
    );
  }
}

// 4. Students Screen
class TeacherStudentsScreen extends StatelessWidget {
  const TeacherStudentsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Students List'),
      body: Center(
        child: Text(
          'Student Directory & Profiles (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 5. Attendance Screen
class TeacherAttendanceScreen extends StatelessWidget {
  const TeacherAttendanceScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Mark Attendance'),
      body: Center(
        child: Text(
          'Mark Daily Student Attendance Sheet (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 6. Study Materials Screen
class TeacherStudyMaterialsScreen extends StatelessWidget {
  const TeacherStudyMaterialsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Upload Materials'),
      body: Center(
        child: Text(
          'Upload E-Books, PDF Notes, and Video Lectures (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 7. Assignments Screen
class TeacherAssignmentsScreen extends StatelessWidget {
  const TeacherAssignmentsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Assignments'),
      body: Center(
        child: Text(
          'Create and Grade Student Assignments (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 8. Tests Screen
class TeacherTestsScreen extends StatelessWidget {
  const TeacherTestsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Quizzes & Tests'),
      body: Center(
        child: Text(
          'Manage Practice Tests and MCQs (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 9. Exams Screen
class TeacherExamsScreen extends StatelessWidget {
  const TeacherExamsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Term Exams'),
      body: Center(
        child: Text(
          'Manage Final Certification & Term Exams (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 10. Results Screen
class TeacherResultsScreen extends StatelessWidget {
  const TeacherResultsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Result Ledger'),
      body: Center(
        child: Text(
          'Input Grades & Publish Exam Results (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 11. Notifications Screen
class TeacherNotificationsScreen extends StatelessWidget {
  const TeacherNotificationsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Notifications'),
      body: Center(
        child: Text(
          'Send Board Notices & Alerts (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 12. Profile Screen
class TeacherProfileScreen extends ConsumerWidget {
  const TeacherProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Teacher Profile', showBackButton: false),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const ProfileCard(
              name: 'Dr. Sarah Jenkins',
              email: 'teacher@laxmi.com',
              idLabel: 'Teacher ID',
              idValue: 'TCH-2026-001',
            ),
            const SizedBox(height: 32.0),
            CustomButton(
              text: 'Log Out',
              backgroundColor: Theme.of(context).colorScheme.error,
              textColor: Theme.of(context).colorScheme.onError,
              onPressed: () async {
                await ref.read(authNotifierProvider.notifier).logout();
                if (context.mounted) {
                  context.go('/login');
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}

// 13. Settings Screen
class TeacherSettingsScreen extends StatelessWidget {
  const TeacherSettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Settings', showBackButton: false),
      body: Center(
        child: Text(
          'Teacher Portal Settings & Configurations (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}
