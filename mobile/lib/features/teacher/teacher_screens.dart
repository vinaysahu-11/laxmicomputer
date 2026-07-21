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
                  onPressed: () => context.push('/teacher/classes/details?className=Web%20Development'),
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

// ----------------------------------------------------
// 3. ACTIVE CLASS DETAILS / WEBDEMO PAGE (Screenshot 3)
// ----------------------------------------------------
class TeacherClassDetailsScreen extends StatefulWidget {
  final String className;

  const TeacherClassDetailsScreen({Key? key, required this.className}) : super(key: key);

  @override
  State<TeacherClassDetailsScreen> createState() => _TeacherClassDetailsScreenState();
}

class _TeacherClassDetailsScreenState extends State<TeacherClassDetailsScreen> {
  String _subTab = 'Students';

  @override
  Widget build(BuildContext context) {
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
          'Computer Academy',
          style: TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 16.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(Icons.settings, color: Color(0xFF64748B)), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Hero Header Card
            Container(
              height: 130.0,
              width: double.infinity,
              margin: const EdgeInsets.all(16.0),
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16.0),
                image: const DecorationImage(
                  image: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH'),
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(Colors.black45, BlendMode.darken),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                    decoration: BoxDecoration(color: const Color(0xFF0088FF), borderRadius: BorderRadius.circular(4.0)),
                    child: const Text('Active Term  Class ID: WEB-2024-A', style: TextStyle(fontSize: 9.0, fontWeight: FontWeight.bold, color: Colors.white)),
                  ),
                  const SizedBox(height: 6.0),
                  Text(widget.className, style: const TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
            ),

            // Live Alert Box
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16.0),
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16.0),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Row(
                children: [
                  CircleAvatar(radius: 20.0, backgroundColor: Colors.red.shade50, child: const Icon(Icons.videocam, color: Colors.red)),
                  const SizedBox(width: 14.0),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Class is starting in 5 minutes', style: TextStyle(fontSize: 14.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                        SizedBox(height: 2.0),
                        Text('Session: Responsive Design Patterns & Grid Layouts', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12.0),
            
            // Buttons Row
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                children: [
                  Expanded(
                    child: SizedBox(
                      height: 40.0,
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF005C9E),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                          elevation: 0,
                        ),
                        icon: const Icon(Icons.play_arrow, size: 18.0),
                        label: const Text('Start Meeting', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                        onPressed: () {},
                      ),
                    ),
                  ),
                  const SizedBox(width: 8.0),
                  Container(
                    height: 40.0,
                    width: 44.0,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: IconButton(icon: const Icon(Icons.link, color: Color(0xFF005C9E), size: 20.0), onPressed: () {}),
                  ),
                ],
              ),
            ),

            // Tab switchers (Students, Attendance, Assignments)
            Container(
              margin: const EdgeInsets.all(16.0),
              height: 40.0,
              decoration: BoxDecoration(color: const Color(0xFFE2E8F0).withOpacity(0.4), borderRadius: BorderRadius.circular(8.0)),
              child: Row(
                children: ['Students', 'Attendance', 'Assignments'].map((t) {
                  final act = _subTab == t;
                  return Expanded(
                    child: InkWell(
                      onTap: () => setState(() => _subTab = t),
                      child: Container(
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: act ? const Color(0xFF0088FF) : Colors.transparent,
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                        child: Text(
                          t,
                          style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold, color: act ? Colors.white : const Color(0xFF64748B)),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),

            // Class Insights
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Card(
                elevation: 0,
                color: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('CLASS INSIGHTS', style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: Color(0xFF64748B), letterSpacing: 0.8)),
                      const SizedBox(height: 12.0),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: const [
                          Text('Average Progress', style: TextStyle(fontSize: 13.0, color: Color(0xFF64748B))),
                          Text('78%', style: TextStyle(fontSize: 13.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                        ],
                      ),
                      const SizedBox(height: 6.0),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(2.0),
                        child: const LinearProgressIndicator(
                          value: 0.78,
                          minHeight: 4.0,
                          backgroundColor: Color(0xFFF1F5F9),
                          valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF005C9E)),
                        ),
                      ),
                      const Divider(color: Color(0xFFF1F5F9), height: 28.0),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: const [
                          Text('Active Students', style: TextStyle(fontSize: 13.0, color: Color(0xFF64748B))),
                          Text('24 / 28', style: TextStyle(fontSize: 13.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                        ],
                      ),
                      const Divider(color: Color(0xFFF1F5F9), height: 28.0),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Pending Grades', style: TextStyle(fontSize: 13.0, color: Color(0xFF64748B))),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 2.0),
                            decoration: BoxDecoration(color: Colors.red.shade50, borderRadius: BorderRadius.circular(4.0)),
                            child: Text('12', style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: Colors.red.shade700)),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),

            const SizedBox(height: 16.0),

            // Student Performance Table List
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Student Performance', style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                  IconButton(icon: const Icon(Icons.filter_list_outlined, size: 20.0), onPressed: () {}),
                ],
              ),
            ),
            const SizedBox(height: 8.0),

            // Students Search Box
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Container(
                height: 44.0,
                decoration: BoxDecoration(color: Colors.white, border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(10.0)),
                child: const TextField(
                  decoration: InputDecoration(
                    prefixIcon: Icon(Icons.search, color: Color(0xFF94A3B8), size: 18.0),
                    hintText: 'Search students...',
                    hintStyle: TextStyle(fontSize: 12.5, color: Color(0xFF94A3B8)),
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                  ),
                ),
              ),
            ),

            const SizedBox(height: 12.0),

            // Table Roster Performance items
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16.0),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: const Color(0xFFE2E8F0)),
                borderRadius: BorderRadius.circular(12.0),
              ),
              child: Column(
                children: [
                  _buildStudentPerformanceRow('Alex Rivera', 'arivera@academy.edu', 0.95, '95%', Colors.blue),
                  const Divider(color: Color(0xFFF1F5F9), height: 1.0),
                  _buildStudentPerformanceRow('Jordan Chen', 'jchen@academy.edu', 0.62, '62%', Colors.red),
                  const Divider(color: Color(0xFFF1F5F9), height: 1.0),
                  _buildStudentPerformanceRow('Sarah Miller', 'smiller@academy.edu', 0.88, '88%', Colors.blue),
                  const Divider(color: Color(0xFFF1F5F9), height: 1.0),
                  // Pagination footer
                  Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Showing 3 of 28 students', style: TextStyle(fontSize: 11.5, color: Color(0xFF64748B))),
                        Row(
                          children: [
                            TextButton(onPressed: () {}, child: const Text('Previous', style: TextStyle(fontSize: 12.0))),
                            const SizedBox(width: 6.0),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF005C9E),
                                foregroundColor: Colors.white,
                                elevation: 0,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6.0)),
                              ),
                              onPressed: () {},
                              child: const Text('Next', style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold)),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24.0),

            // Active Assignments
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Active Assignments', style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                  TextButton(onPressed: () {}, child: const Text('View All >', style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold))),
                ],
              ),
            ),
            const SizedBox(height: 8.0),

            _buildAssignmentPreviewCard(
              tag: 'UIUX DESIGN',
              tagColor: Colors.blue.shade700,
              tagBgColor: Colors.blue.shade50,
              title: 'Lab 4: Responsive Navbar',
              desc: 'Implement a mobile-first responsive navigation bar using Flexbox and CSS media queries.',
              due: 'Due in 2 days',
              submissions: '8 / 28 Submitted',
            ),
            const SizedBox(height: 12.0),
            _buildAssignmentPreviewCard(
              tag: 'JAVASCRIPT',
              tagColor: Colors.amber.shade700,
              tagBgColor: Colors.amber.shade50,
              title: 'Final Project: Data Dashboard',
              desc: 'Create a complex data dashboard using Chart.js and an external REST API for real-time...',
              due: 'Due Oct 24',
              submissions: '2 / 28 Submitted',
            ),

            const SizedBox(height: 80.0),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF005C9E),
        foregroundColor: Colors.white,
        shape: const CircleBorder(),
        onPressed: () {},
        child: const Icon(Icons.add, size: 28.0),
      ),
    );
  }

  Widget _buildStudentPerformanceRow(String name, String email, double progress, String percentage, Color color) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 18,
            backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I'),
          ),
          const SizedBox(width: 12.0),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                Text(email, style: const TextStyle(fontSize: 11.5, color: Color(0xFF64748B))),
              ],
            ),
          ),
          const SizedBox(width: 16.0),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(percentage, style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: color)),
              const SizedBox(height: 4.0),
              SizedBox(
                width: 70.0,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(2.0),
                  child: LinearProgressIndicator(
                    value: progress,
                    minHeight: 3.5,
                    backgroundColor: const Color(0xFFF1F5F9),
                    valueColor: AlwaysStoppedAnimation<Color>(color),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAssignmentPreviewCard({required String tag, required Color tagColor, required Color tagBgColor, required String title, required String desc, required String due, required String submissions}) {
    return Card(
      elevation: 0,
      color: Colors.white,
      margin: const EdgeInsets.symmetric(horizontal: 16.0),
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
                  child: Text(tag, style: TextStyle(fontSize: 9.0, fontWeight: FontWeight.bold, color: tagColor)),
                ),
                Text(due, style: const TextStyle(fontSize: 11.5, color: Colors.red, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 12.0),
            Text(title, style: const TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
            const SizedBox(height: 4.0),
            Text(desc, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B), height: 1.35)),
            const Divider(color: Color(0xFFF1F5F9), height: 24.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: const [
                    CircleAvatar(radius: 8, backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I')),
                    SizedBox(width: 4.0),
                    CircleAvatar(radius: 8, backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH')),
                    SizedBox(width: 4.0),
                    CircleAvatar(radius: 8, backgroundColor: Color(0xFFCBD5E1), child: Text('+16', style: TextStyle(fontSize: 6.0, fontWeight: FontWeight.bold, color: Color(0xFF475569)))),
                  ],
                ),
                Text(submissions, style: const TextStyle(fontSize: 12.0, color: Color(0xFF475569), fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// 4. Students Screen
class TeacherStudentsScreen extends StatefulWidget {
  const TeacherStudentsScreen({Key? key}) : super(key: key);

  @override
  State<TeacherStudentsScreen> createState() => _TeacherStudentsScreenState();
}

class _TeacherStudentsScreenState extends State<TeacherStudentsScreen> {
  String _selectedFilter = 'All Batches';

  @override
  Widget build(BuildContext context) {
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

// ----------------------------------------------------
// 6. STUDY MATERIALS SCREEN (Screenshot 1)
// ----------------------------------------------------
class TeacherStudyMaterialsScreen extends StatefulWidget {
  const TeacherStudyMaterialsScreen({Key? key}) : super(key: key);

  @override
  State<TeacherStudyMaterialsScreen> createState() => _TeacherStudyMaterialsScreenState();
}

class _TeacherStudyMaterialsScreenState extends State<TeacherStudyMaterialsScreen> {
  String _activeFilter = 'All';

  @override
  Widget build(BuildContext context) {
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
              children: const [
                Text('RESOURCE CENTER', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E), letterSpacing: 0.8)),
                SizedBox(height: 4.0),
                Text(
                  'Study Materials',
                  style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                ),
              ],
            ),
          ),

          // Search Field
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Container(
              height: 44.0,
              decoration: BoxDecoration(color: Colors.white, border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(10.0)),
              child: const TextField(
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.search, color: Color(0xFF94A3B8), size: 18.0),
                  hintText: 'Search materials...',
                  hintStyle: TextStyle(fontSize: 13.0, color: Color(0xFF94A3B8)),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                ),
              ),
            ),
          ),

          // Filter Button
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Container(
              height: 38.0,
              decoration: BoxDecoration(color: const Color(0xFFE2E8F0).withOpacity(0.5), borderRadius: BorderRadius.circular(8.0)),
              child: InkWell(
                onTap: () {},
                borderRadius: BorderRadius.circular(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Icon(Icons.filter_list, size: 16.0, color: Color(0xFF64748B)),
                    SizedBox(width: 6.0),
                    Text('Filter', style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 12.0),

          // All, Notes, PDFs, Videos Switchers
          SizedBox(
            height: 34.0,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              children: ['All', 'Notes', 'PDFs', 'Videos'].map((f) {
                final act = _activeFilter == f;
                return GestureDetector(
                  onTap: () => setState(() => _activeFilter = f),
                  child: Container(
                    margin: const EdgeInsets.only(right: 8.0),
                    padding: const EdgeInsets.symmetric(horizontal: 20.0),
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: act ? const Color(0xFF005C9E) : Colors.transparent,
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                    child: Text(
                      f,
                      style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold, color: act ? Colors.white : const Color(0xFF64748B)),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 14.0),

          // Materials List
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              children: [
                _buildMaterialItemCard('Introduction to Python Algorithms', 'CS Batch 2024', 'Core', 'Uploaded: Oct 12, 2023', 'Download', Colors.red, Icons.picture_as_pdf_outlined),
                _buildMaterialItemCard('Web Development Roadmap - Q4', 'Web Dev Batch', 'Elective', 'Uploaded: Nov 05, 2023', 'Play Video', Colors.blue, Icons.videocam_outlined),
                _buildMaterialItemCard('Database Management Lecture Notes', 'CS Batch 2023', 'Revised', 'Uploaded: Oct 30, 2023', 'View Notes', Colors.indigo, Icons.description_outlined),
                _buildMaterialItemCard('Operating Systems Fundamentals', 'CS Batch 2024', 'Academic', 'Uploaded: Aug 15, 2023', 'Download', Colors.red, Icons.picture_as_pdf_outlined),
                _buildMaterialItemCard('Advanced CSS Techniques & Animation', 'Web Dev Batch', 'Design', 'Uploaded: Dec 01, 2023', 'Play Video', Colors.blue, Icons.videocam_outlined),
                _buildMaterialItemCard('Networking Protocols Cheat Sheet', 'General', 'Quick View', 'Uploaded: Sep 22, 2023', 'View Notes', Colors.indigo, Icons.description_outlined),
                const SizedBox(height: 64.0),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF005C9E),
        foregroundColor: Colors.white,
        shape: const CircleBorder(),
        onPressed: () {},
        child: const Icon(Icons.add, size: 28.0),
      ),
    );
  }

  Widget _buildMaterialItemCard(String title, String tag1, String tag2, String date, String actionLabel, Color avatarBgColor, IconData icon) {
    return Card(
      elevation: 0,
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 12.0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: 20,
                  backgroundColor: avatarBgColor.withOpacity(0.1),
                  child: Icon(icon, color: avatarBgColor, size: 20.0),
                ),
                const SizedBox(width: 14.0),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: const TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                      const SizedBox(height: 6.0),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 3.0),
                            decoration: BoxDecoration(color: const Color(0xFFE8F2FF), borderRadius: BorderRadius.circular(4.0)),
                            child: Text(tag1, style: const TextStyle(fontSize: 9.5, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                          ),
                          const SizedBox(width: 6.0),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 3.0),
                            decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(4.0)),
                            child: Text(tag2, style: const TextStyle(fontSize: 9.5, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                IconButton(icon: const Icon(Icons.more_vert, color: Color(0xFF94A3B8)), onPressed: () {}),
              ],
            ),
            const Divider(color: Color(0xFFF1F5F9), height: 28.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.calendar_today_outlined, size: 13.0, color: Color(0xFF94A3B8)),
                    const SizedBox(width: 6.0),
                    Text(date, style: const TextStyle(fontSize: 11.5, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                  ],
                ),
                GestureDetector(
                  onTap: () {},
                  child: Text(actionLabel, style: const TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                ),
              ],
            ),
          ],
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

// ----------------------------------------------------
// 8. TESTS & EXAMS SCREEN (Screenshot 2)
// ----------------------------------------------------
class TeacherTestsScreen extends StatelessWidget {
  const TeacherTestsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: const Padding(
          padding: EdgeInsets.only(left: 16.0),
          child: CircleAvatar(
            radius: 14,
            backgroundImage: NetworkImage(
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
            ),
          ),
        ),
        title: const Text(
          'Computer Academy',
          style: TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 16.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(Icons.settings, color: Color(0xFF64748B)), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Tests & Exams',
              style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
            ),
            const SizedBox(height: 4.0),
            const Text(
              'Manage your curriculum assessments, track student performance, and schedule upcoming certifications.',
              style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B), height: 1.35),
            ),
            const SizedBox(height: 18.0),

            // Top Buttons (Create Online/Offline Test)
            Row(
              children: [
                Expanded(
                  child: SizedBox(
                    height: 40.0,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF005C9E),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                        elevation: 0,
                      ),
                      icon: const Icon(Icons.computer, size: 16.0),
                      label: const Text('Create Online Test', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.0)),
                      onPressed: () {},
                    ),
                  ),
                ),
                const SizedBox(width: 8.0),
                Expanded(
                  child: SizedBox(
                    height: 40.0,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF0088FF),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                        elevation: 0,
                      ),
                      icon: const Icon(Icons.description, size: 16.0),
                      label: const Text('Create Offline Test', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.0)),
                      onPressed: () {},
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20.0),

            // Overall Performance Chart Card
            Card(
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
                        const Text('Overall Performance', style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
                          decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(6.0)),
                          child: Row(
                            children: const [
                              Icon(Icons.calendar_today, size: 12.0, color: Color(0xFF64748B)),
                              SizedBox(width: 4.0),
                              Text('Last 30 Days', style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20.0),

                    // Custom bar chart rendering matching mockup
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        _buildChartBar('Python\nBasic', 100, const Color(0xFFE2E8F0)),
                        _buildChartBar('Data\nStructures', 70, const Color(0xFFE2E8F0)),
                        _buildChartBar('React\nMastery', 140, const Color(0xFF005C9E)),
                        _buildChartBar('Backend\nDev', 90, const Color(0xFFE2E8F0)),
                        _buildChartBar('UI\nDesign', 120, const Color(0xFFE8F2FF)),
                        _buildChartBar('Cyber\nSecurity', 110, const Color(0xFFE2E8F0)),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 14.0),

            // Class Average & Top Score Cards
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('CLASS AVERAGE', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B), letterSpacing: 0.5)),
                            SizedBox(height: 4.0),
                            Text('78.4%', style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A))),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: const [
                            Text('\u2193 2.1% from last month', style: TextStyle(fontSize: 11.5, color: Colors.red, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ],
                    ),
                    const Divider(color: Color(0xFFF1F5F9), height: 28.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('TOP SCORE', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B), letterSpacing: 0.5)),
                            SizedBox(height: 4.0),
                            Text('98.5%', style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A))),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: const [
                            Text('Batch: CS-2024-Alpha', style: TextStyle(fontSize: 11.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 20.0),

            // Upcoming Assessments Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Upcoming Assessments', style: TextStyle(fontSize: 16.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                TextButton(
                  onPressed: () {},
                  child: const Text('View All Schedule', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.0)),
                ),
              ],
            ),
            const SizedBox(height: 8.0),

            _buildUpcomingAssessmentCard(
              isOnline: true,
              batch: 'Batch: CS-2024-Delta',
              title: 'Advanced Algorithms Final',
              date: 'June 24, 2024 \u2022 10:00 AM - 12:00 PM',
              icon: Icons.computer_outlined,
            ),
            const SizedBox(height: 12.0),
            _buildUpcomingAssessmentCard(
              isOnline: false,
              batch: 'Batch: UX-Design-B2',
              title: 'System Architecture Midterm',
              date: 'June 28, 2024 \u2022 02:00 PM - 04:00 PM',
              icon: Icons.architecture,
            ),
            const SizedBox(height: 12.0),
            _buildUpcomingAssessmentCard(
              isOnline: true,
              batch: 'Batch: Cloud-Masters',
              title: 'AWS Certified Practitioner Mock',
              date: 'July 02, 2024 \u2022 09:00 AM - 11:30 AM',
              icon: Icons.cloud_queue,
            ),

            const SizedBox(height: 64.0),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF005C9E),
        foregroundColor: Colors.white,
        shape: const CircleBorder(),
        onPressed: () {},
        child: const Icon(Icons.add, size: 28.0),
      ),
    );
  }

  Widget _buildChartBar(String label, double height, Color barColor) {
    return Column(
      children: [
        Container(
          width: 32.0,
          height: height,
          decoration: BoxDecoration(
            color: barColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(6.0)),
          ),
        ),
        const SizedBox(height: 8.0),
        Text(
          label,
          style: const TextStyle(fontSize: 8.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold, height: 1.2),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildUpcomingAssessmentCard({required bool isOnline, required String batch, required String title, required String date, required IconData icon}) {
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
              children: [
                CircleAvatar(
                  radius: 18,
                  backgroundColor: const Color(0xFFE8F2FF),
                  child: Icon(icon, color: const Color(0xFF005C9E), size: 18.0),
                ),
                const SizedBox(width: 12.0),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 2.0),
                            decoration: BoxDecoration(
                              color: isOnline ? const Color(0xFFE8F2FF) : const Color(0xFFF1F5F9),
                              borderRadius: BorderRadius.circular(4.0),
                            ),
                            child: Text(
                              isOnline ? 'ONLINE' : 'OFFLINE',
                              style: TextStyle(fontSize: 8.0, fontWeight: FontWeight.bold, color: isOnline ? const Color(0xFF005C9E) : const Color(0xFF64748B)),
                            ),
                          ),
                          const SizedBox(width: 8.0),
                          Text(batch, style: const TextStyle(fontSize: 10.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
                        ],
                      ),
                      const SizedBox(height: 6.0),
                      Text(title, style: const TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                      const SizedBox(height: 2.0),
                      Text(date, style: const TextStyle(fontSize: 11.5, color: Color(0xFF64748B))),
                    ],
                  ),
                ),
              ],
            ),
            const Divider(color: Color(0xFFF1F5F9), height: 24.0),
            Align(
              alignment: Alignment.centerLeft,
              child: SizedBox(
                height: 34.0,
                width: 110.0,
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Color(0xFFCBD5E1)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6.0)),
                    foregroundColor: const Color(0xFF0F172A),
                  ),
                  onPressed: () {},
                  child: const Text('Manage Test', style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold)),
                ),
              ),
            ),
          ],
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

// ----------------------------------------------------
// 10. RESULTS DASHBOARD SCREEN (Screenshot 4)
// ----------------------------------------------------
class TeacherResultsScreen extends StatelessWidget {
  const TeacherResultsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: const Padding(
          padding: EdgeInsets.only(left: 16.0),
          child: CircleAvatar(
            radius: 14,
            backgroundImage: NetworkImage(
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
            ),
          ),
        ),
        title: const Text(
          'Computer Academy',
          style: TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 16.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(Icons.settings, color: Color(0xFF64748B)), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Results Dashboard',
              style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
            ),
            const SizedBox(height: 4.0),
            const Text(
              'Semester Fall 2023 \u2022 Academic Performance Review',
              style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B)),
            ),
            const SizedBox(height: 16.0),

            // Download reports button
            SizedBox(
              height: 40.0,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF005C9E),
                  foregroundColor: Colors.white,
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                ),
                icon: const Icon(Icons.download, size: 18.0),
                label: const Text('Download Result Reports', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.5)),
                onPressed: () {},
              ),
            ),
            const SizedBox(height: 20.0),

            // Performance Trends Line-Chart mockup card
            Card(
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
                        Row(
                          children: const [
                            Icon(Icons.show_chart, color: Color(0xFF005C9E), size: 18.0),
                            SizedBox(width: 6.0),
                            Text('Performance Trends', style: TextStyle(fontSize: 14.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          ],
                        ),
                        Container(
                          height: 26.0,
                          decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(6.0)),
                          child: Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10.0),
                                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(5.0)),
                                child: const Text('Monthly', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                              ),
                              const Padding(
                                padding: EdgeInsets.symmetric(horizontal: 10.0),
                                child: Text('Quarterly', style: TextStyle(fontSize: 10.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24.0),

                    // Curve Mockup
                    SizedBox(
                      height: 100.0,
                      child: CustomPaint(
                        painter: _CurveChartPainter(),
                      ),
                    ),
                    const SizedBox(height: 12.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text('Jan', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('Feb', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('Mar', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('Apr', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('May', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                      ],
                    ),
                    const SizedBox(height: 16.0),
                    Row(
                      children: [
                        _buildSummaryMiniPill('Average GPA', '3.82', const Color(0xFFE8F2FF), const Color(0xFF005C9E)),
                        const SizedBox(width: 8.0),
                        _buildSummaryMiniPill('Passing Rate', '94%', const Color(0xFFF8FAFC), const Color(0xFF475569)),
                        const SizedBox(width: 8.0),
                        _buildSummaryMiniPill('Distinctions', '24', const Color(0xFFE8F2FF), const Color(0xFF005C9E)),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16.0),

            // Upload Results Card
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.upload_file_outlined, color: Color(0xFF005C9E), size: 18.0),
                        SizedBox(width: 6.0),
                        Text('Upload Results', style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                      ],
                    ),
                    const SizedBox(height: 14.0),
                    Container(
                      height: 100.0,
                      decoration: BoxDecoration(
                        color: const Color(0xFFF8FAFC),
                        borderRadius: BorderRadius.circular(12.0),
                        border: Border.all(color: const Color(0xFFCBD5E1), style: BorderStyle.solid),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(Icons.cloud_upload_outlined, size: 28.0, color: Color(0xFF64748B)),
                          SizedBox(height: 6.0),
                          Text('Drag & Drop CSV', style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          SizedBox(height: 2.0),
                          Text('or click to browse files', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                    const SizedBox(height: 12.0),
                    Row(
                      children: const [
                        Expanded(child: Divider(color: Color(0xFFE2E8F0))),
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10.0),
                          child: Text('OR', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        ),
                        Expanded(child: Divider(color: Color(0xFFE2E8F0))),
                      ],
                    ),
                    const SizedBox(height: 12.0),
                    SizedBox(
                      height: 38.0,
                      child: OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Color(0xFFCBD5E1)),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                          foregroundColor: const Color(0xFF005C9E),
                        ),
                        icon: const Icon(Icons.edit_note, size: 18.0),
                        label: const Text('Manual Entry', style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold)),
                        onPressed: () {},
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16.0),

            // Top Performers Card
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('TOP PERFORMERS', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B), letterSpacing: 0.5)),
                    const SizedBox(height: 12.0),
                    _buildTopPerformerRow('JD', 'Jane Doe', 'Algorithms \u2022 98%', '1st'),
                    const Divider(color: Color(0xFFF1F5F9), height: 16.0),
                    _buildTopPerformerRow('MS', 'Mark Smith', 'Database Systems \u2022 96%', '2nd'),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16.0),

            // Student Performance List Table Card
            Card(
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
                        const Text('Student Performance List', style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                        IconButton(icon: const Icon(Icons.search, size: 18.0), onPressed: () {}),
                      ],
                    ),
                    const SizedBox(height: 14.0),

                    // Table Columns Headers
                    Row(
                      children: const [
                        Expanded(flex: 3, child: Text('STUDENT NAME', style: TextStyle(fontSize: 9.5, fontWeight: FontWeight.bold, color: Color(0xFF94A3B8)))),
                        Expanded(flex: 2, child: Text('ID', style: TextStyle(fontSize: 9.5, fontWeight: FontWeight.bold, color: Color(0xFF94A3B8)))),
                        Expanded(flex: 3, child: Text('COURSE', style: TextStyle(fontSize: 9.5, fontWeight: FontWeight.bold, color: Color(0xFF94A3B8)))),
                      ],
                    ),
                    const Divider(color: Color(0xFFE2E8F0), height: 16.0),

                    // Table rows
                    _buildPerformanceTableRow('Alex Rivera', '#CS-2023-01', 'Machine Learning'),
                    const Divider(color: Color(0xFFF1F5F9), height: 16.0),
                    _buildPerformanceTableRow('Sarah Jenkins', '#CS-2023-05', 'Web Architecture'),
                    const Divider(color: Color(0xFFF1F5F9), height: 16.0),
                    _buildPerformanceTableRow('Michael Chen', '#CS-2023-12', 'Operating Systems'),
                    const Divider(color: Color(0xFFF1F5F9), height: 16.0),
                    _buildPerformanceTableRow('Elena Rodriguez', '#CS-2023-14', 'Cloud Computing'),
                    
                    const Divider(color: Color(0xFFE2E8F0), height: 24.0),
                    GestureDetector(
                      onTap: () {},
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Text('View All Results', style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                          SizedBox(width: 4.0),
                          Icon(Icons.arrow_forward, size: 12.0, color: Color(0xFF005C9E)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 64.0),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF005C9E),
        foregroundColor: Colors.white,
        shape: const CircleBorder(),
        onPressed: () {},
        child: const Icon(Icons.add, size: 28.0),
      ),
    );
  }

  Widget _buildSummaryMiniPill(String title, String val, Color bgColor, Color textColor) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 8.0),
        decoration: BoxDecoration(color: bgColor, borderRadius: BorderRadius.circular(8.0)),
        child: Column(
          children: [
            Text(title, style: const TextStyle(fontSize: 9.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
            const SizedBox(height: 2.0),
            Text(val, style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: textColor)),
          ],
        ),
      ),
    );
  }

  Widget _buildTopPerformerRow(String initial, String name, String details, String rank) {
    return Row(
      children: [
        CircleAvatar(
          radius: 18,
          backgroundColor: const Color(0xFFE8F2FF),
          child: Text(initial, style: const TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
        ),
        const SizedBox(width: 12.0),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
              Text(details, style: const TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
            ],
          ),
        ),
        Text(rank, style: const TextStyle(fontSize: 14.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
      ],
    );
  }

  Widget _buildPerformanceTableRow(String name, String id, String course) {
    return Row(
      children: [
        Expanded(
          flex: 3,
          child: Text(name, style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
        ),
        Expanded(
          flex: 2,
          child: Text(id, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
        ),
        Expanded(
          flex: 3,
          child: Text(course, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
        ),
      ],
    );
  }
}

class _CurveChartPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF005C9E)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.5;

    final path = Path()
      ..moveTo(0, size.height * 0.7)
      ..quadraticBezierTo(size.width * 0.25, size.height * 0.5, size.width * 0.4, size.height * 0.6)
      ..quadraticBezierTo(size.width * 0.6, size.height * 0.8, size.width * 0.75, size.height * 0.3)
      ..quadraticBezierTo(size.width * 0.9, size.height * 0.1, size.width, size.height * 0.4);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ----------------------------------------------------
// 11. ALERTS & NOTIFICATIONS SCREEN (Screenshot 5)
// ----------------------------------------------------
class TeacherNotificationsScreen extends StatefulWidget {
  const TeacherNotificationsScreen({Key? key}) : super(key: key);

  @override
  State<TeacherNotificationsScreen> createState() => _TeacherNotificationsScreenState();
}

class _TeacherNotificationsScreenState extends State<TeacherNotificationsScreen> {
  String _notifFilter = 'All';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: const Padding(
          padding: EdgeInsets.only(left: 16.0),
          child: CircleAvatar(
            radius: 14,
            backgroundImage: NetworkImage(
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
            ),
          ),
        ),
        title: const Text(
          'Computer Academy',
          style: TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 16.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(Icons.settings, color: Color(0xFF64748B)), onPressed: () {}),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Alerts & Notifications',
                  style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                ),
                SizedBox(height: 4.0),
                Text(
                  'Stay updated with institute policies and class schedules.',
                  style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B)),
                ),
              ],
            ),
          ),

          // Filters Switcher List
          SizedBox(
            height: 36.0,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              children: ['All', 'Institute Notices', 'Class Announcements'].map((filter) {
                final act = _notifFilter == filter;
                return GestureDetector(
                  onTap: () => setState(() => _notifFilter = filter),
                  child: Container(
                    margin: const EdgeInsets.only(right: 8.0),
                    padding: const EdgeInsets.symmetric(horizontal: 18.0),
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: act ? const Color(0xFF005C9E) : const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                    child: Text(
                      filter,
                      style: TextStyle(
                        fontSize: 12.0,
                        fontWeight: FontWeight.bold,
                        color: act ? Colors.white : const Color(0xFF64748B),
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16.0),

          // Scrollable Notifications Feed
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              children: [
                // Section: Institute Notices
                Row(
                  children: const [
                    Icon(Icons.campaign_outlined, color: Color(0xFF005C9E), size: 20.0),
                    SizedBox(width: 8.0),
                    Text('Institute Notices', style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                  ],
                ),
                const SizedBox(height: 10.0),

                // Card 1
                _buildActionNotificationCard(
                  type: 'POLICY UPDATE',
                  tagColor: Colors.blue,
                  time: '2h ago',
                  title: 'Revised Examination Protocol for 2024',
                  desc: 'The academic council has updated the grading weightage...',
                  avatarIcon: Icons.shield_outlined,
                  actionWidgets: Row(
                    children: const [
                      Text('Read Full Document', style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                      SizedBox(width: 14.0),
                      Text('Dismiss', style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                    ],
                  ),
                ),
                const SizedBox(height: 12.0),

                // Card 2
                _buildActionNotificationCard(
                  type: 'EVENT',
                  tagColor: const Color(0xFF64748B),
                  time: 'Yesterday',
                  title: 'Annual Tech Symposium - Faculty Briefing',
                  desc: 'Mandatory meeting for all department heads and instructor...',
                  avatarIcon: Icons.calendar_today_outlined,
                ),

                const SizedBox(height: 24.0),

                // Section: System Alerts
                Row(
                  children: const [
                    Icon(Icons.report_problem_outlined, color: Colors.red, size: 18.0),
                    SizedBox(width: 8.0),
                    Text('System Alerts', style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                  ],
                ),
                const SizedBox(height: 10.0),

                _buildSystemAlertCard(
                  title: 'Server Maintenance',
                  desc: 'Learning Management System (LMS) will be offline tonight from 12 AM to 4 AM EST.',
                  hasWarningLeftBorder: true,
                  icon: Icons.warning_amber_outlined,
                  iconColor: Colors.red,
                ),
                const SizedBox(height: 12.0),
                _buildSystemAlertCard(
                  title: 'Backup Successful',
                  desc: 'Course materials for \'Python for Data Science\' have been backed up to the cloud.',
                  hasWarningLeftBorder: false,
                  icon: Icons.cloud_done_outlined,
                  iconColor: Colors.green,
                ),

                const SizedBox(height: 24.0),

                // Section: Class Updates
                Row(
                  children: const [
                    Icon(Icons.people_outline, color: Color(0xFF005C9E), size: 18.0),
                    SizedBox(width: 8.0),
                    Text('Class Updates', style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                  ],
                ),
                const SizedBox(height: 10.0),

                Card(
                  elevation: 0,
                  color: const Color(0xFFE8F2FF),
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
                              padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 3.0),
                              decoration: BoxDecoration(color: const Color(0xFF005C9E), borderRadius: BorderRadius.circular(4.0)),
                              child: const Text('BATCH B-12', style: TextStyle(fontSize: 8.5, fontWeight: FontWeight.bold, color: Colors.white)),
                            ),
                            const Text('New Submissions', style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                          ],
                        ),
                        const SizedBox(height: 12.0),
                        const Text(
                          '12 students submitted \'Neural Networks Part 1\' assignment.',
                          style: TextStyle(fontSize: 13.0, color: Color(0xFF0F172A), fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 12.0),
                        SizedBox(
                          height: 36.0,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF005C9E),
                              foregroundColor: Colors.white,
                              elevation: 0,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                            ),
                            onPressed: () {},
                            child: const Text('Grade Now', style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 24.0),

                // Past Announcements Table
                Card(
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
                            const Text('Past Announcements', style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                            Row(
                              children: const [
                                Text('Filter by Date', style: TextStyle(fontSize: 11.0, color: Color(0xFF005C9E), fontWeight: FontWeight.bold)),
                                SizedBox(width: 4.0),
                                Icon(Icons.calendar_today_outlined, size: 12.0, color: Color(0xFF005C9E)),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 16.0),

                        // Headers
                        Row(
                          children: const [
                            Expanded(flex: 2, child: Text('DATE', style: TextStyle(fontSize: 9.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold))),
                            Expanded(flex: 3, child: Text('CATEGORY TITLE', style: TextStyle(fontSize: 9.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold))),
                            Expanded(flex: 3, child: Text('RECIPIENT', style: TextStyle(fontSize: 9.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold))),
                          ],
                        ),
                        const Divider(color: Color(0xFFE2E8F0), height: 16.0),

                        // Row 1
                        _buildPastAnnouncementRow('Oct 24, 2023', 'Update', 'Midterm Results Published', 'Advanced Java Batch', Colors.blue),
                        const Divider(color: Color(0xFFF1F5F9), height: 16.0),
                        // Row 2
                        _buildPastAnnouncementRow('Oct 22, 2023', 'Alert', 'Lab Session Rescheduled', 'Cloud Arch Class', Colors.indigo),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 80.0),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF005C9E),
        foregroundColor: Colors.white,
        shape: const CircleBorder(),
        onPressed: () {},
        child: const Icon(Icons.message_outlined, size: 24.0),
      ),
    );
  }

  Widget _buildActionNotificationCard({
    required String type,
    required Color tagColor,
    required String time,
    required String title,
    required String desc,
    required IconData avatarIcon,
    Widget? actionWidgets,
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
                Row(
                  children: [
                    CircleAvatar(
                      radius: 16,
                      backgroundColor: tagColor.withOpacity(0.08),
                      child: Icon(avatarIcon, color: tagColor, size: 16.0),
                    ),
                    const SizedBox(width: 8.0),
                    Text(type, style: TextStyle(fontSize: 9.5, fontWeight: FontWeight.bold, color: tagColor)),
                  ],
                ),
                Text(time, style: const TextStyle(fontSize: 10.5, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 12.0),
            Text(title, style: const TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
            const SizedBox(height: 4.0),
            Text(desc, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B), height: 1.35)),
            if (actionWidgets != null) ...[
              const Divider(color: Color(0xFFF1F5F9), height: 24.0),
              actionWidgets,
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildSystemAlertCard({required String title, required String desc, required bool hasWarningLeftBorder, required IconData icon, required Color iconColor}) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          left: BorderSide(color: hasWarningLeftBorder ? Colors.red : Colors.transparent, width: 4.0),
          top: const BorderSide(color: Color(0xFFE2E8F0)),
          bottom: const BorderSide(color: Color(0xFFE2E8F0)),
          right: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: iconColor, size: 20.0),
            const SizedBox(width: 12.0),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                  const SizedBox(height: 2.0),
                  Text(desc, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B), height: 1.35)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPastAnnouncementRow(String date, String tag, String title, String recipient, Color tagColor) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          flex: 2,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(date, style: const TextStyle(fontSize: 11.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
              const SizedBox(height: 4.0),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 2.0),
                decoration: BoxDecoration(color: tagColor.withOpacity(0.08), borderRadius: BorderRadius.circular(4.0)),
                child: Text(tag, style: TextStyle(fontSize: 8.0, fontWeight: FontWeight.bold, color: tagColor)),
              ),
            ],
          ),
        ),
        Expanded(
          flex: 3,
          child: Text(title, style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
        ),
        Expanded(
          flex: 3,
          child: Text(recipient, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
        ),
      ],
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
