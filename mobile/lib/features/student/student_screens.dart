import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/providers.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_button.dart';
import '../../core/widgets/profile_card.dart';

// Helper component for simple card-styled navigations
class NavigationTile extends StatelessWidget {
  final String title;
  final IconData icon;
  final VoidCallback onTap;

  const NavigationTile({
    Key? key,
    required this.title,
    required this.icon,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      elevation: 0,
      color: theme.colorScheme.surfaceVariant.withOpacity(0.4),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
        side: BorderSide(color: theme.colorScheme.outline.withOpacity(0.1)),
      ),
      child: ListTile(
        leading: Icon(icon, color: theme.colorScheme.primary),
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16.0),
        onTap: onTap,
      ),
    );
  }
}

// 1. Student Dashboard Screen
class StudentDashboardScreen extends ConsumerWidget {
  const StudentDashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Student Dashboard', showBackButton: false),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const ProfileCard(
              name: 'Rahul Sharma',
              email: 'student@laxmi.com',
              idLabel: 'Roll Number',
              idValue: 'STU-2026-001',
            ),
            const SizedBox(height: 24.0),
            const Text(
              'Quick Academics Nav',
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
                _buildGridCard(context, 'My Courses', Icons.menu_book, '/student/courses'),
                _buildGridCard(context, 'Classes', Icons.meeting_room, '/student/classes'),
                _buildGridCard(context, 'Study Material', Icons.description, '/student/materials'),
                _buildGridCard(context, 'Assignments', Icons.assignment, '/student/assignments'),
                _buildGridCard(context, 'Tests & Quiz', Icons.quiz, '/student/tests'),
                _buildGridCard(context, 'Main Exams', Icons.badge, '/student/exams'),
                _buildGridCard(context, 'My Attendance', Icons.calendar_month, '/student/attendance'),
                _buildGridCard(context, 'Results', Icons.grade, '/student/results'),
                _buildGridCard(context, 'Certificates', Icons.workspace_premium, '/student/certificates'),
                _buildGridCard(context, 'Fees & Invoices', Icons.payments, '/student/payments'),
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
              Icon(icon, color: theme.colorScheme.primary, size: 28.0),
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

// 2. My Courses Screen
class StudentCoursesScreen extends StatelessWidget {
  const StudentCoursesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'My Courses'),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          NavigationTile(
            title: 'DCA (Diploma in Computer Applications)',
            icon: Icons.computer,
            onTap: () => context.push('/student/courses/details?title=DCA'),
          ),
          NavigationTile(
            title: 'Tally Prime with GST',
            icon: Icons.account_balance_wallet,
            onTap: () => context.push('/student/courses/details?title=Tally%20Prime'),
          ),
          NavigationTile(
            title: 'Basic Computer Course',
            icon: Icons.mouse,
            onTap: () => context.push('/student/courses/details?title=Basic%20Computer'),
          ),
        ],
      ),
    );
  }
}

// 3. Course Details Screen
class StudentCourseDetailsScreen extends StatelessWidget {
  final String title;

  const StudentCourseDetailsScreen({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: CustomAppBar(title: title),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              height: 160.0,
              decoration: BoxDecoration(
                color: theme.colorScheme.primaryContainer,
                borderRadius: BorderRadius.circular(16.0),
              ),
              child: Center(
                child: Icon(Icons.menu_book, size: 64.0, color: theme.colorScheme.onPrimaryContainer),
              ),
            ),
            const SizedBox(height: 24.0),
            Text(
              title,
              style: const TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            Text(
              'Course Status: Active • Instructor: Prof. Rajesh Kumar',
              style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontSize: 14.0),
            ),
            const SizedBox(height: 24.0),
            const Text(
              'Description Placeholder',
              style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            const Text(
              'This is a placeholder page for the full course syllabus, lecture schedule, and active materials. Premium layout will replace this.',
              style: TextStyle(height: 1.4),
            ),
          ],
        ),
      ),
    );
  }
}

// 4. Classes Screen
class StudentClassesScreen extends StatelessWidget {
  const StudentClassesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Classes'),
      body: Center(
        child: Text(
          'Classes & Schedules Screen (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 5. Study Materials Screen
class StudentStudyMaterialsScreen extends StatelessWidget {
  const StudentStudyMaterialsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Study Materials'),
      body: Center(
        child: Text(
          'Study E-Books & Video Lectures (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 6. Assignments Screen
class StudentAssignmentsScreen extends StatelessWidget {
  const StudentAssignmentsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Assignments'),
      body: Center(
        child: Text(
          'Pending & Submitted Assignments (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 7. Tests & Quizzes Screen
class StudentTestsScreen extends StatelessWidget {
  const StudentTestsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Tests & Quizzes'),
      body: Center(
        child: Text(
          'Online Quizzes and Practice Tests (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 8. Main Exams Screen
class StudentExamsScreen extends StatelessWidget {
  const StudentExamsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Main Term Exams'),
      body: Center(
        child: Text(
          'Mid Term & Annual Certification Exams (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 9. Attendance Screen
class StudentAttendanceScreen extends StatelessWidget {
  const StudentAttendanceScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'My Attendance'),
      body: Center(
        child: Text(
          'Monthly Attendance Statistics & Calendar (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 10. Results Screen
class StudentResultsScreen extends StatelessWidget {
  const StudentResultsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Exam Results'),
      body: Center(
        child: Text(
          'Mark Sheets & Term Results (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 11. Certificates Screen
class StudentCertificatesScreen extends StatelessWidget {
  const StudentCertificatesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'My Certificates'),
      body: Center(
        child: Text(
          'Course Completion Certificates (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 12. Fee Payments Screen
class StudentPaymentsScreen extends StatelessWidget {
  const StudentPaymentsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Fee Invoices & Payments'),
      body: Center(
        child: Text(
          'Pending Invoices & Online Fee Payments (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 13. Notifications Screen
class StudentNotificationsScreen extends StatelessWidget {
  const StudentNotificationsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Notifications'),
      body: Center(
        child: Text(
          'Academic Announcements & Alerts (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}

// 14. Profile Screen
class StudentProfileScreen extends ConsumerWidget {
  const StudentProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'My Profile', showBackButton: false),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const ProfileCard(
              name: 'Rahul Sharma',
              email: 'student@laxmi.com',
              idLabel: 'Roll Number',
              idValue: 'STU-2026-001',
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

// 15. Settings Screen
class StudentSettingsScreen extends StatelessWidget {
  const StudentSettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Settings', showBackButton: false),
      body: Center(
        child: Text(
          'LMS Theme & Language Settings (Placeholder)',
          style: TextStyle(color: Theme.of(context).colorScheme.outline),
        ),
      ),
    );
  }
}
