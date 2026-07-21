import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/providers.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_button.dart';
import '../../core/widgets/profile_card.dart';

// ----------------------------------------------------
// 1. TEACHER DASHBOARD SCREEN (Screenshot 16)
// ----------------------------------------------------
class TeacherDashboardScreen extends ConsumerWidget {
  const TeacherDashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.menu, color: Color(0xFF0F172A)),
          onPressed: () {},
        ),
        title: const Text(
          'Tech Academy',
          style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.w800, fontSize: 18.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.search, color: Color(0xFF0F172A)),
            onPressed: () {},
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Welcome Card Banner
            Container(
              padding: const EdgeInsets.all(20.0),
              decoration: BoxDecoration(
                color: const Color(0xFF005C9E),
                borderRadius: BorderRadius.circular(16.0),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Welcome back,\nProfessor Rivera!',
                    style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold, color: Colors.white, height: 1.25),
                  ),
                  const SizedBox(height: 10.0),
                  const Text(
                    'Your students have submitted 12 new assignments today. You have 4 classes scheduled for this afternoon.',
                    style: TextStyle(fontSize: 13.0, color: Colors.white70, height: 1.4),
                  ),
                  const SizedBox(height: 20.0),
                  Row(
                    children: [
                      Expanded(
                        child: SizedBox(
                          height: 38.0,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white,
                              foregroundColor: const Color(0xFF005C9E),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                              elevation: 0,
                            ),
                            onPressed: () => context.push('/teacher/classes'),
                            child: const Text('Start Lesson', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12.0),
                      Expanded(
                        child: SizedBox(
                          height: 38.0,
                          child: OutlinedButton(
                            style: OutlinedButton.styleFrom(
                              foregroundColor: Colors.white,
                              side: const BorderSide(color: Colors.white54, width: 1.5),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                            ),
                            onPressed: () => context.push('/teacher/results'),
                            child: const Text('View Gradebook', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.5)),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 20.0),

            // Performance / Pending / Engagement Horizontal Stats
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    _buildStatIndicator(
                      icon: Icons.people_outline,
                      iconBgColor: const Color(0xFFE8F2FF),
                      iconColor: const Color(0xFF005C9E),
                      label: 'Average Attendance',
                      value: '94.2%',
                      bottomWidget: ClipRRect(
                        borderRadius: BorderRadius.circular(3.0),
                        child: const LinearProgressIndicator(
                          value: 0.942,
                          minHeight: 4.5,
                          backgroundColor: Color(0xFFF1F5F9),
                          valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF005C9E)),
                        ),
                      ),
                    ),
                    const Divider(color: Color(0xFFF1F5F9), height: 28.0),
                    _buildStatIndicator(
                      icon: Icons.assignment_outlined,
                      iconBgColor: Colors.red.shade50,
                      iconColor: Colors.red.shade700,
                      label: 'Pending Grading',
                      value: '28',
                      bottomWidget: const Text('Due in 2 days', style: TextStyle(fontSize: 11.5, color: Colors.red, fontWeight: FontWeight.bold)),
                    ),
                    const Divider(color: Color(0xFFF1F5F9), height: 28.0),
                    _buildStatIndicator(
                      icon: Icons.star_outline,
                      iconBgColor: Colors.amber.shade50,
                      iconColor: Colors.amber.shade700,
                      label: 'Class Engagement',
                      value: 'High',
                      bottomWidget: Row(
                        children: const [
                          Icon(Icons.arrow_upward, size: 12.0, color: Colors.green),
                          SizedBox(width: 3.0),
                          Text('12% from last week', style: TextStyle(fontSize: 11.5, color: Colors.green, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 20.0),

            // Recent Activity Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Recent Activity', style: TextStyle(fontSize: 16.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                TextButton(
                  onPressed: () {},
                  child: const Text('See All', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                ),
              ],
            ),
            const SizedBox(height: 8.0),
            
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    _buildActivityItem(
                      avatarIcon: Icons.description_outlined,
                      title: 'Sarah Chen submitted "Advanced Python Basics"',
                      time: '12 minutes ago',
                    ),
                    const Divider(color: Color(0xFFF1F5F9), height: 24.0),
                    _buildActivityItem(
                      avatarIcon: Icons.forum_outlined,
                      title: 'New question in Data Structures forum',
                      time: '1 hour ago',
                    ),
                    const Divider(color: Color(0xFFF1F5F9), height: 24.0),
                    _buildActivityItem(
                      avatarIcon: Icons.verified_outlined,
                      title: 'Final grades for UI/UX Design published',
                      time: '2 hours ago',
                    ),
                    const Divider(color: Color(0xFFF1F5F9), height: 24.0),
                    _buildActivityItem(
                      avatarIcon: Icons.person_add_alt,
                      title: '3 new students joined Web Development Course',
                      time: 'Yesterday',
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 24.0),

            // Today's Schedule Section
            const Text(
              "Today's Schedule",
              style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
            ),
            const SizedBox(height: 12.0),

            // Vertical schedule timeline matching mockup
            _buildScheduleCard(
              time: '09:00 AM - 10:30 AM',
              title: 'Intro to Computer Science',
              subtitle: 'Lab 204 \u2022 Year 1 Students',
              showAvatars: true,
            ),
            const SizedBox(height: 12.0),
            _buildScheduleCard(
              time: '11:00 AM - 12:00 PM',
              title: 'Curriculum Planning',
              subtitle: 'Staff Room \u2022 Weekly Sync',
              showAvatars: false,
              isActive: false,
            ),
            const SizedBox(height: 12.0),
            _buildScheduleCard(
              time: '02:00 PM - 03:30 PM',
              title: 'Advanced Algorithm Analysis',
              subtitle: 'Auditorium A \u2022 Year 3 Students',
              showButton: true,
            ),
            
            const SizedBox(height: 24.0),

            // Upcoming Classes Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Upcoming Classes', style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A))),
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.chevron_left, size: 20.0),
                      onPressed: () {},
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                    ),
                    const SizedBox(width: 8.0),
                    IconButton(
                      icon: const Icon(Icons.chevron_right, size: 20.0),
                      onPressed: () {},
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12.0),

            SizedBox(
              height: 232.0,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _buildUpcomingClassCard(
                    context,
                    tag: 'WEB DEV',
                    title: 'Full-Stack Bootcamp',
                    starts: 'Starts Tomorrow \u2022 10:00 AM',
                    students: '42 Students',
                    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
                  ),
                  const SizedBox(width: 14.0),
                  _buildUpcomingClassCard(
                    context,
                    tag: 'SECURITY',
                    title: 'Cybersecurity Intro',
                    starts: 'Starts Friday \u2022 11:30 AM',
                    students: '38 Students',
                    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfmrE-1jgZinp1e9XXf8Mo9gfR-8SeYx5SJWKIaW5zNKt93HtIR3mkUmoRGlIKPMu0RUYzJ2XcpjFKNWGhWk2zKGauofOaU6Cjhlqu3gHTdVufT4oprmGpxYm0gHeQUPJDZn4fsvMyO9G5QG7bE2YmGYcHlwFt4SPiyE1VptH8UVBPEVM6_Q6Jxnd3fNFqQ_2FViUevRdqUGGIjJp154tnwJhJSBU9z6PRoR36sruXy_hwKN5yu_zcllyyvnrlJyWSC8P0hUCFBNv',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 48.0),
          ],
        ),
      ),
    );
  }

  Widget _buildStatIndicator({required IconData icon, required Color iconBgColor, required Color iconColor, required String label, required String value, required Widget bottomWidget}) {
    return Row(
      children: [
        CircleAvatar(
          radius: 20,
          backgroundColor: iconBgColor,
          child: Icon(icon, color: iconColor, size: 20.0),
        ),
        const SizedBox(width: 14.0),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
              const SizedBox(height: 2.0),
              Text(value, style: const TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
              const SizedBox(height: 6.0),
              bottomWidget,
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildActivityItem({required IconData avatarIcon, required String title, required String time}) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CircleAvatar(
          radius: 16,
          backgroundColor: const Color(0xFFF1F5F9),
          child: Icon(avatarIcon, size: 16.0, color: const Color(0xFF64748B)),
        ),
        const SizedBox(width: 12.0),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 13.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A), height: 1.3)),
              const SizedBox(height: 3.0),
              Text(time, style: const TextStyle(fontSize: 11.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildScheduleCard({required String time, required String title, required String subtitle, bool showAvatars = false, bool showButton = false, bool isActive = true}) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Timeline Dot Indicator
        Padding(
          padding: const EdgeInsets.only(top: 8.0, right: 14.0),
          child: Container(
            width: 10.0,
            height: 10.0,
            decoration: BoxDecoration(
              color: isActive ? const Color(0xFF005C9E) : const Color(0xFFCBD5E1),
              shape: BoxShape.circle,
            ),
          ),
        ),
        Expanded(
          child: Card(
            elevation: 0,
            color: const Color(0xFFF1F5F9).withOpacity(0.6),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
            child: Padding(
              padding: const EdgeInsets.all(14.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(time, style: const TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                  const SizedBox(height: 3.0),
                  Text(title, style: const TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                  const SizedBox(height: 2.0),
                  Text(subtitle, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                  if (showAvatars) ...[
                    const SizedBox(height: 8.0),
                    Row(
                      children: const [
                        CircleAvatar(radius: 10, backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I')),
                        SizedBox(width: 4.0),
                        CircleAvatar(radius: 10, backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH')),
                        SizedBox(width: 4.0),
                        CircleAvatar(
                          radius: 10,
                          backgroundColor: Color(0xFFCBD5E1),
                          child: Text('+20', style: TextStyle(fontSize: 8.0, fontWeight: FontWeight.bold, color: Color(0xFF475569))),
                        ),
                      ],
                    ),
                  ],
                  if (showButton) ...[
                    const SizedBox(height: 12.0),
                    SizedBox(
                      height: 34.0,
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF005C9E),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6.0)),
                          elevation: 0,
                        ),
                        onPressed: () {},
                        child: const Text('Join Online', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.0)),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildUpcomingClassCard(BuildContext context, {required String tag, required String title, required String starts, required String students, required String imageUrl}) {
    return Container(
      width: 200.0,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: const Color(0xFFE2E8F0)),
        borderRadius: BorderRadius.circular(16.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Stack(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(16.0)),
                child: Image.network(
                  imageUrl,
                  height: 90.0,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
              Positioned(
                top: 8,
                left: 8,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 3.0),
                  decoration: BoxDecoration(color: const Color(0xFF005C9E), borderRadius: BorderRadius.circular(4.0)),
                  child: Text(tag, style: const TextStyle(fontSize: 8.0, fontWeight: FontWeight.bold, color: Colors.white)),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                const SizedBox(height: 2.0),
                Text(starts, style: const TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
                const SizedBox(height: 6.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.people_outline, size: 12.0, color: Color(0xFF64748B)),
                        const SizedBox(width: 4.0),
                        Text(students, style: const TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
                      ],
                    ),
                    GestureDetector(
                      onTap: () {},
                      child: Row(
                        children: const [
                          Text('Details ', style: TextStyle(fontSize: 11.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                          Icon(Icons.arrow_forward, size: 10.0, color: Color(0xFF005C9E)),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ----------------------------------------------------
// 2. MY CLASSES SCREEN (Screenshot 17)
// ----------------------------------------------------
class TeacherClassesScreen extends StatefulWidget {
  const TeacherClassesScreen({Key? key}) : super(key: key);

  @override
  State<TeacherClassesScreen> createState() => _TeacherClassesScreenState();
}

class _TeacherClassesScreenState extends State<TeacherClassesScreen> {
  String _activeTab = 'Live';

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.menu, color: Color(0xFF0F172A)),
          onPressed: () {},
        ),
        title: const Text(
          'Tech Academy',
          style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.w800, fontSize: 18.0),
        ),
        centerTitle: true,
        actions: [
          const Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
              ),
            ),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 4.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'My Classes',
                  style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                ),
                const SizedBox(height: 4.0),
                const Text(
                  'Manage your upcoming teaching schedule and attendance.',
                  style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B)),
                ),
              ],
            ),
          ),

          // Tab Switcher Live / Online / Offline
          Container(
            margin: const EdgeInsets.all(16.0),
            height: 40.0,
            decoration: BoxDecoration(color: const Color(0xFFE2E8F0).withOpacity(0.6), borderRadius: BorderRadius.circular(8.0)),
            child: Row(
              children: ['Live', 'Online', 'Offline'].map((tab) {
                final isSelected = _activeTab == tab;
                return Expanded(
                  child: InkWell(
                    onTap: () => setState(() => _activeTab = tab),
                    child: Container(
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: isSelected ? Colors.white : Colors.transparent,
                        borderRadius: BorderRadius.circular(6.0),
                        boxShadow: isSelected
                            ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4, offset: const Offset(0, 2))]
                            : null,
                      ),
                      child: Text(
                        tab,
                        style: TextStyle(
                          fontSize: 13.0,
                          fontWeight: FontWeight.bold,
                          color: isSelected ? const Color(0xFF005C9E) : const Color(0xFF64748B),
                        ),
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          // Cards List
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              children: [
                _buildClassActionCard(
                  tag: 'LIVE NOW',
                  tagColor: Colors.red,
                  tagBgColor: Colors.red.shade50,
                  batch: 'BCA 4th Sem',
                  title: 'Advanced Java Programming',
                  subtitle: 'Section A \u2022 42 Students',
                  time: '10:00 AM - 11:30 AM',
                  buttonText: 'Start Class',
                  buttonBgColor: const Color(0xFF005C9E),
                  buttonTextColor: Colors.white,
                  isOutlinedButton: false,
                ),
                const SizedBox(height: 14.0),
                _buildClassActionCard(
                  tag: 'OFFLINE',
                  tagColor: const Color(0xFF64748B),
                  tagBgColor: const Color(0xFFF1F5F9),
                  batch: 'B.Tech 2nd Year',
                  title: 'Data Structures & Algo',
                  subtitle: 'Section C \u2022 58 Students',
                  time: 'Lab 4, Block B (Starts in 45m)',
                  buttonText: 'Mark Attendance',
                  buttonBgColor: Colors.white,
                  buttonTextColor: const Color(0xFF005C9E),
                  isOutlinedButton: true,
                  onPressed: () => context.push('/teacher/attendance'),
                ),
                const SizedBox(height: 14.0),
                _buildClassActionCard(
                  tag: 'ONLINE',
                  tagColor: const Color(0xFF005C9E),
                  tagBgColor: const Color(0xFFE8F2FF),
                  batch: 'MCA 1st Sem',
                  title: 'Database Management',
                  subtitle: 'Section B \u2022 35 Students',
                  time: 'Google Meet / Zoom',
                  buttonText: 'View Resources',
                  buttonBgColor: const Color(0xFF475569),
                  buttonTextColor: Colors.white,
                  isOutlinedButton: false,
                ),
                const SizedBox(height: 14.0),
                _buildClassActionCard(
                  tag: 'UPCOMING',
                  tagColor: const Color(0xFF64748B),
                  tagBgColor: const Color(0xFFF1F5F9),
                  batch: 'BCA 4th Sem',
                  title: 'Mobile App Development',
                  subtitle: 'Section A \u2022 40 Students',
                  time: '02:00 PM - 03:30 PM',
                  buttonText: 'Prepare Material',
                  buttonBgColor: const Color(0xFF0088FF),
                  buttonTextColor: Colors.white,
                  isOutlinedButton: false,
                ),
                const SizedBox(height: 48.0),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildClassActionCard({
    required String tag,
    required Color tagColor,
    required Color tagBgColor,
    required String batch,
    required String title,
    required String subtitle,
    required String time,
    required String buttonText,
    required Color buttonBgColor,
    required Color buttonTextColor,
    required bool isOutlinedButton,
    VoidCallback? onPressed,
  }) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                  decoration: BoxDecoration(color: tagBgColor, borderRadius: BorderRadius.circular(6.0)),
                  child: Text(
                    tag,
                    style: TextStyle(fontSize: 9.0, fontWeight: FontWeight.bold, color: tagColor),
                  ),
                ),
                Text(
                  batch,
                  style: const TextStyle(fontSize: 11.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 12.0),
            Text(
              title,
              style: const TextStyle(fontSize: 16.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
            ),
            const SizedBox(height: 3.0),
            Text(
              subtitle,
              style: const TextStyle(fontSize: 12.5, color: Color(0xFF64748B)),
            ),
            const Divider(color: Color(0xFFF1F5F9), height: 24.0),
            Row(
              children: [
                const Icon(Icons.schedule, size: 16.0, color: Color(0xFF64748B)),
                const SizedBox(width: 8.0),
                Expanded(
                  child: Text(
                    time,
                    style: const TextStyle(fontSize: 13.0, color: Color(0xFF0F172A), fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16.0),
            SizedBox(
              height: 40.0,
              child: isOutlinedButton
                  ? OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: buttonTextColor,
                        side: BorderSide(color: buttonTextColor, width: 1.5),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                      ),
                      icon: const Icon(Icons.person, size: 16.0),
                      label: Text(buttonText, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                      onPressed: onPressed ?? () {},
                    )
                  : ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: buttonBgColor,
                        foregroundColor: buttonTextColor,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                        elevation: 0,
                      ),
                      icon: const Icon(Icons.slideshow_outlined, size: 16.0),
                      label: Text(buttonText, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                      onPressed: onPressed ?? () {},
                    ),
            ),
          ],
        ),
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

// ----------------------------------------------------
// 4. STUDENTS LIST SCREEN (Screenshot 18)
// ----------------------------------------------------
class TeacherStudentsScreen extends StatefulWidget {
  const TeacherStudentsScreen({Key? key}) : super(key: key);

  @override
  State<TeacherStudentsScreen> createState() => _TeacherStudentsScreenState();
}

class _TeacherStudentsScreenState extends State<TeacherStudentsScreen> {
  String _selectedFilter = 'All Batches';

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.menu, color: Color(0xFF0F172A)),
          onPressed: () {},
        ),
        title: const Text(
          'Tech Academy',
          style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.w800, fontSize: 18.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.search, color: Color(0xFF0F172A)),
            onPressed: () {},
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
              ),
            ),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Search Input Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Container(
              height: 46.0,
              decoration: BoxDecoration(color: Colors.white, border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(10.0)),
              child: const TextField(
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.search, color: Color(0xFF94A3B8)),
                  hintText: 'Search students by name or roll number',
                  hintStyle: TextStyle(fontSize: 13.5, color: Color(0xFF94A3B8)),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                ),
              ),
            ),
          ),

          // Horizontal Filter Chips
          SizedBox(
            height: 38.0,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              children: ['All Batches', 'Batch 2024', 'Top Performers'].map((filter) {
                final isSelected = _selectedFilter == filter;
                return GestureDetector(
                  onTap: () => setState(() => _selectedFilter = filter),
                  child: Container(
                    margin: const EdgeInsets.only(right: 10.0),
                    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                    decoration: BoxDecoration(
                      color: isSelected ? const Color(0xFF005C9E) : Colors.white,
                      border: Border.all(color: isSelected ? const Color(0xFF005C9E) : const Color(0xFFE2E8F0)),
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                    child: Text(
                      filter,
                      style: TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.bold,
                        color: isSelected ? Colors.white : const Color(0xFF64748B),
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 16.0),

          // Students List Roster
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              children: [
                _buildStudentRowCard('Alex Rivera', 'Roll: #20240812', '92%', Colors.green, true),
                _buildStudentRowCard('Sarah Chen', 'Roll: #20240905', '88%', Colors.blue, true),
                _buildStudentRowCard('Jordan Smith', 'Roll: #20240722', '74%', Colors.red, false),
                _buildStudentRowCard('Maria Garcia', 'Roll: #20240830', '95%', Colors.green, true),
                _buildStudentRowCard('Kevin Lee', 'Roll: #20241012', '82%', Colors.blue, false),
                _buildStudentRowCard('Priya Sharma', 'Roll: #20241101', '98%', Colors.green, true),
                const SizedBox(height: 48.0),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStudentRowCard(String name, String roll, String att, Color attColor, bool isOnline) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10.0),
      decoration: BoxDecoration(color: Colors.white, border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(12.0)),
      child: ListTile(
        leading: Stack(
          children: [
            const CircleAvatar(
              radius: 20,
              backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I'),
            ),
            if (isOnline)
              Positioned(
                bottom: 0,
                right: 0,
                child: Container(
                  width: 10.0,
                  height: 10.0,
                  decoration: BoxDecoration(color: Colors.green, shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 1.5)),
                ),
              ),
          ],
        ),
        title: Text(name, style: const TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
        subtitle: Text(roll, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            const Text('Attendance', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
            const SizedBox(height: 2.0),
            Text(att, style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: attColor)),
          ],
        ),
      ),
    );
  }
}

// ----------------------------------------------------
// 5. MARK ATTENDANCE SCREEN (Screenshot 19)
// ----------------------------------------------------
class TeacherAttendanceScreen extends StatefulWidget {
  const TeacherAttendanceScreen({Key? key}) : super(key: key);

  @override
  State<TeacherAttendanceScreen> createState() => _TeacherAttendanceScreenState();
}

class _TeacherAttendanceScreenState extends State<TeacherAttendanceScreen> {
  // Map to store attendance state per student ID
  // values: 0 = Present, 1 = Absent, 2 = Late
  final Map<String, int> _attendanceState = {
    '20240812': 0,
    '20240813': 0,
    '20240814': 0,
    '20240815': 0,
  };

  void _markAllPresent() {
    setState(() {
      _attendanceState.keys.forEach((k) => _attendanceState[k] = 0);
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    // Compute Summary counts
    int countP = _attendanceState.values.where((v) => v == 0).length;
    int countA = _attendanceState.values.where((v) => v == 1).length;
    int countL = _attendanceState.values.where((v) => v == 2).length;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF0F172A)),
          onPressed: () => context.pop(),
        ),
        title: const Text(
          'Attendance',
          style: TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 17.0),
        ),
        centerTitle: true,
        actions: [
          const Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
              ),
            ),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Batch Details Hero Card
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('BATCH DETAILS', style: TextStyle(fontSize: 10.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold, letterSpacing: 0.8)),
                          const SizedBox(height: 6.0),
                          const Text(
                            'CS-204: Full Stack Web Dev',
                            style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                          ),
                          const SizedBox(height: 3.0),
                          const Text(
                            'Lab Room 302 \u2022 Morning Session',
                            style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B)),
                          ),
                          const Divider(color: Color(0xFFF1F5F9), height: 24.0),
                          Row(
                            children: [
                              const Icon(Icons.people_outline, size: 16.0, color: Color(0xFF64748B)),
                              const SizedBox(width: 6.0),
                              const Text('42 Students Enrolled', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.w600)),
                              const Spacer(),
                              GestureDetector(
                                onTap: _markAllPresent,
                                child: Row(
                                  children: const [
                                    Icon(Icons.check, size: 14.0, color: Colors.blue),
                                    SizedBox(width: 4.0),
                                    Text('Mark All Present', style: TextStyle(fontSize: 12.0, color: Colors.blue, fontWeight: FontWeight.bold)),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12.0),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 8.0),
                      decoration: BoxDecoration(color: const Color(0xFFE8F2FF), borderRadius: BorderRadius.circular(8.0)),
                      child: Column(
                        children: const [
                          Text('AUGUST', style: TextStyle(fontSize: 8.5, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                          SizedBox(height: 2.0),
                          Text('12', style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Search Field
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Container(
              height: 44.0,
              decoration: BoxDecoration(color: Colors.white, border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(10.0)),
              child: const TextField(
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.search, color: Color(0xFF94A3B8), size: 20.0),
                  hintText: 'Search student name or ID...',
                  hintStyle: TextStyle(fontSize: 13.0, color: Color(0xFF94A3B8)),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                ),
              ),
            ),
          ),

          const SizedBox(height: 16.0),

          // Students Roster Sheet
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              children: [
                _buildAttendanceSelectorRow('Alex Rivera', 'ID: 20240812', '20240812'),
                _buildAttendanceSelectorRow('Beth Moore', 'ID: 20240813', '20240813'),
                _buildAttendanceSelectorRow('Cody Williams', 'ID: 20240814', '20240814'),
                _buildAttendanceSelectorRow('Diana Prince', 'ID: 20240815', '20240815'),
                const SizedBox(height: 48.0),
              ],
            ),
          ),

          // Summary & Submit Row Container
          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Summary', style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                    Row(
                      children: [
                        Text('$countP P ', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0, color: Colors.blue)),
                        const SizedBox(width: 8.0),
                        Text('$countA A ', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0, color: Colors.red)),
                        const SizedBox(width: 8.0),
                        Text('$countL L', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0, color: Colors.amber)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 12.0),
                SizedBox(
                  height: 44.0,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF005C9E),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                      elevation: 0,
                    ),
                    icon: const Icon(Icons.send, size: 16.0),
                    label: const Text('Submit Attendance', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5)),
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Attendance registered successfully!')),
                      );
                      context.pop();
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAttendanceSelectorRow(String name, String idLabel, String studentId) {
    int activeVal = _attendanceState[studentId] ?? 0;
    return Container(
      margin: const EdgeInsets.only(bottom: 12.0),
      padding: const EdgeInsets.all(12.0),
      decoration: BoxDecoration(color: Colors.white, border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(12.0)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              const CircleAvatar(
                radius: 16,
                backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I'),
              ),
              const SizedBox(width: 10.0),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(name, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                    Text(idLabel, style: const TextStyle(fontSize: 11.5, color: Color(0xFF64748B))),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12.0),
          Row(
            children: [
              _buildSwitchButton(studentId, 0, 'Present', activeVal == 0),
              const SizedBox(width: 8.0),
              _buildSwitchButton(studentId, 1, 'Absent', activeVal == 1),
              const SizedBox(width: 8.0),
              _buildSwitchButton(studentId, 2, 'Late', activeVal == 2),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSwitchButton(String studentId, int value, String label, bool isSelected) {
    Color selectedBgColor = const Color(0xFFE8F2FF);
    Color textColor = const Color(0xFF64748B);
    Color borderColor = const Color(0xFFE2E8F0);

    if (isSelected) {
      textColor = const Color(0xFF005C9E);
      borderColor = const Color(0xFF005C9E);
    }

    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _attendanceState[studentId] = value),
        child: Container(
          height: 34.0,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: isSelected ? selectedBgColor : Colors.white,
            border: Border.all(color: borderColor, width: 1.2),
            borderRadius: BorderRadius.circular(6.0),
          ),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12.0,
              fontWeight: FontWeight.bold,
              color: textColor,
            ),
          ),
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

// ----------------------------------------------------
// 7. ASSIGNMENT MANAGEMENT SCREEN (Screenshot 20)
// ----------------------------------------------------
class TeacherAssignmentsScreen extends StatelessWidget {
  const TeacherAssignmentsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.menu, color: Color(0xFF0F172A)),
          onPressed: () {},
        ),
        title: const Text(
          'Tech Academy',
          style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.w800, fontSize: 18.0),
        ),
        centerTitle: true,
        actions: [
          const Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
              ),
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'Assignment Management',
                  style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                ),
                const SizedBox(height: 4.0),
                const Text(
                  'Track progress, grade submissions, and create new learning tasks.',
                  style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B)),
                ),
                const SizedBox(height: 16.0),

                // Search Box
                Container(
                  height: 44.0,
                  decoration: BoxDecoration(color: Colors.white, border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(10.0)),
                  child: const TextField(
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.search, color: Color(0xFF94A3B8), size: 20.0),
                      hintText: 'Search assignments...',
                      hintStyle: TextStyle(fontSize: 13.0, color: Color(0xFF94A3B8)),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                    ),
                  ),
                ),
                const SizedBox(height: 20.0),

                // Assignment Item 1: Active
                _buildAssignmentTaskCard(
                  tag: 'ACTIVE',
                  tagColor: const Color(0xFF005C9E),
                  tagBgColor: const Color(0xFFE8F2FF),
                  title: 'Data Structures & Algorithms',
                  desc: 'Implementation of binary search trees and balanced tree rotations in Python.',
                  submissionsLabel: 'Submission Status',
                  submissionsRatio: '28 / 40',
                  progressVal: 28 / 40,
                  buttonText: 'Review Submissions',
                  buttonBgColor: const Color(0xFF005C9E),
                  buttonTextColor: Colors.white,
                  isOutlined: false,
                ),
                const SizedBox(height: 14.0),

                // Assignment Item 2: Pending
                _buildAssignmentTaskCard(
                  tag: 'PENDING REVIEW',
                  tagColor: const Color(0xFF64748B),
                  tagBgColor: const Color(0xFFF1F5F9),
                  title: 'Web Components Mastery',
                  desc: 'Build a custom design system using shadow DOM and reactive templates.',
                  submissionsLabel: 'Submission Status',
                  submissionsRatio: '40 / 40',
                  progressVal: 1.0,
                  buttonText: 'Grade Now',
                  buttonBgColor: const Color(0xFF475569),
                  buttonTextColor: Colors.white,
                  isOutlined: false,
                ),
                const SizedBox(height: 14.0),

                // Assignment Item 3: Draft
                _buildAssignmentTaskCard(
                  tag: 'DRAFT',
                  tagColor: const Color(0xFF005C9E),
                  tagBgColor: const Color(0xFFE8F2FF),
                  title: 'Cloud Infrastructure Lab',
                  desc: 'Setting up auto-scaling groups and load balancers on AWS.',
                  submissionsLabel: 'Submission Status',
                  submissionsRatio: '0 / 40',
                  progressVal: 0.0,
                  buttonText: 'Edit Draft',
                  buttonBgColor: Colors.white,
                  buttonTextColor: const Color(0xFF005C9E),
                  isOutlined: true,
                ),
                const SizedBox(height: 80.0),
              ],
            ),
          ),
          Positioned(
            bottom: 24,
            right: 24,
            child: FloatingActionButton(
              backgroundColor: const Color(0xFF005C9E),
              foregroundColor: Colors.white,
              shape: const CircleBorder(),
              onPressed: () {},
              child: const Icon(Icons.add, size: 28.0),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAssignmentTaskCard({
    required String tag,
    required Color tagColor,
    required Color tagBgColor,
    required String title,
    required String desc,
    required String submissionsLabel,
    required String submissionsRatio,
    required double progressVal,
    required String buttonText,
    required Color buttonBgColor,
    required Color buttonTextColor,
    required bool isOutlined,
  }) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Align(
              alignment: Alignment.centerLeft,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                decoration: BoxDecoration(color: tagBgColor, borderRadius: BorderRadius.circular(6.0)),
                child: Text(tag, style: TextStyle(fontSize: 8.5, fontWeight: FontWeight.bold, color: tagColor)),
              ),
            ),
            const SizedBox(height: 12.0),
            Text(title, style: const TextStyle(fontSize: 16.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
            const SizedBox(height: 4.0),
            Text(desc, style: const TextStyle(fontSize: 12.5, color: Color(0xFF64748B), height: 1.4)),
            const SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(submissionsLabel, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.w500)),
                Text(submissionsRatio, style: const TextStyle(fontSize: 12.0, color: Color(0xFF0F172A), fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 6.0),
            ClipRRect(
              borderRadius: BorderRadius.circular(3.0),
              child: LinearProgressIndicator(
                value: progressVal,
                minHeight: 5.0,
                backgroundColor: const Color(0xFFF1F5F9),
                valueColor: AlwaysStoppedAnimation<Color>(progressVal == 1.0 ? const Color(0xFF475569) : const Color(0xFF005C9E)),
              ),
            ),
            const SizedBox(height: 20.0),
            SizedBox(
              height: 40.0,
              child: isOutlined
                  ? OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: buttonTextColor,
                        side: BorderSide(color: buttonTextColor, width: 1.5),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                      ),
                      icon: const Icon(Icons.edit, size: 16.0),
                      label: Text(buttonText, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                      onPressed: () {},
                    )
                  : ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: buttonBgColor,
                        foregroundColor: buttonTextColor,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                        elevation: 0,
                      ),
                      icon: const Icon(Icons.assignment_turned_in_outlined, size: 16.0),
                      label: Text(buttonText, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                      onPressed: () {},
                    ),
            ),
          ],
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
              name: 'Alex Rivera',
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
