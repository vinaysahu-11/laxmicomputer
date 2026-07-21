import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/providers.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_button.dart';
import '../../core/widgets/profile_card.dart';

// ----------------------------------------------------
// 1. STUDENT DASHBOARD SCREEN (Screenshot 3)
// ----------------------------------------------------
class StudentDashboardScreen extends ConsumerWidget {
  const StudentDashboardScreen({Key? key}) : super(key: key);

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
          style: TextStyle(
            color: Color(0xFF005C9E),
            fontWeight: FontWeight.w800,
            fontSize: 20.0,
            letterSpacing: -0.5,
          ),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications_none, color: Color(0xFF0F172A)),
            ),
            onPressed: () => context.push('/student/notifications'),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0, left: 8.0),
            child: CircleAvatar(
              radius: 16,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I',
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Hello Rahul Header Banner Card
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Container(
                padding: const EdgeInsets.all(20.0),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF005C9E), Color(0xFF0077C7)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16.0),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Hello, Rahul!',
                      style: TextStyle(
                        fontSize: 24.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 6.0),
                    Text(
                      "You're making great progress in your Python Mastery course. Keep it up!",
                      style: TextStyle(
                        fontSize: 13.5,
                        color: Colors.white.withOpacity(0.9),
                        height: 1.4,
                      ),
                    ),
                    const SizedBox(height: 24.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text(
                          'Overall Curriculum Progress',
                          style: TextStyle(
                            fontSize: 12.0,
                            fontWeight: FontWeight.w600,
                            color: Colors.white70,
                          ),
                        ),
                        Text(
                          '74%',
                          style: TextStyle(
                            fontSize: 13.0,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8.0),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4.0),
                      child: LinearProgressIndicator(
                        value: 0.74,
                        minHeight: 6.0,
                        backgroundColor: Colors.white24,
                        valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Today's Classes Header Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    "Today's Classes",
                    style: TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  TextButton(
                    onPressed: () => context.push('/student/classes'),
                    child: const Text(
                      'View Schedule',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0),
                    ),
                  ),
                ],
              ),
            ),
            
            // Horizontal scrollable Today's Classes
            SizedBox(
              height: 148.0,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                children: [
                  _buildClassCard(
                    context,
                    title: 'Advanced Python Logic',
                    time: '09:00 AM - 10:30 AM',
                    details: 'Lab 04 • Mr. Vikram Singh',
                  ),
                  _buildClassCard(
                    context,
                    title: 'Database Systems Design',
                    time: '11:00 AM - 12:30 PM',
                    details: 'Hall A • Dr. Sarah Jenkins',
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 16.0),

            // Featured/Most Recent Card
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Card(
                elevation: 0,
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16.0),
                  side: const BorderSide(color: Color(0xFFE2E8F0)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    ClipRRect(
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(16.0)),
                      child: Image.network(
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
                        height: 160.0,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Container(
                          height: 160.0,
                          color: Colors.grey.shade300,
                          child: const Icon(Icons.broken_image),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFE8F2FF),
                                  borderRadius: BorderRadius.circular(6.0),
                                ),
                                child: const Text(
                                  'Most Recent',
                                  style: TextStyle(
                                    fontSize: 11.0,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFF005C9E),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8.0),
                              const Text(
                                'Last viewed: 2 hours ago',
                                style: TextStyle(
                                  fontSize: 12.0,
                                  color: Color(0xFF64748B),
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12.0),
                          const Text(
                            'Full-Stack Web Development',
                            style: TextStyle(
                              fontSize: 18.0,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF0F172A),
                            ),
                          ),
                          const SizedBox(height: 6.0),
                          const Text(
                            'Module 7: Responsive Layouts with Tailwind CSS and Flexbox Systems.',
                            style: TextStyle(
                              fontSize: 13.5,
                              color: Color(0xFF475569),
                              height: 1.4,
                            ),
                          ),
                          const SizedBox(height: 16.0),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xFF005C9E),
                                  foregroundColor: Colors.white,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                  elevation: 0,
                                ),
                                onPressed: () => context.push('/student/courses/details?title=Full-Stack%20Web%20Dev'),
                                child: const Text(
                                  'Continue Module 7',
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                              ),
                              Row(
                                children: const [
                                  Icon(Icons.schedule, size: 16.0, color: Color(0xFF64748B)),
                                  SizedBox(width: 4.0),
                                  Text(
                                    '45m left',
                                    style: TextStyle(
                                      fontSize: 13.0,
                                      color: Color(0xFF64748B),
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16.0),

            // Attendance Summary Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Card(
                elevation: 0,
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16.0),
                  side: const BorderSide(color: Color(0xFFE2E8F0)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      Stack(
                        alignment: Alignment.center,
                        children: const [
                          SizedBox(
                            width: 68.0,
                            height: 68.0,
                            child: CircularProgressIndicator(
                              value: 0.90,
                              strokeWidth: 6.0,
                              backgroundColor: Color(0xFFF1F5F9),
                              valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF005C9E)),
                            ),
                          ),
                          Text(
                            '90%',
                            style: TextStyle(
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF0F172A),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(width: 20.0),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text(
                              'Attendance Summary',
                              style: TextStyle(
                                fontSize: 16.0,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF0F172A),
                              ),
                            ),
                            SizedBox(height: 4.0),
                            Text(
                              "You've attended 45/50 sessions this semester.",
                              style: TextStyle(
                                fontSize: 13.0,
                                color: Color(0xFF64748B),
                                height: 1.3,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            
            const SizedBox(height: 16.0),

            // Student Services Grid Title
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              child: Text(
                'Student Services',
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
            ),
            
            // Student Services Grid
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 12.0,
                crossAxisSpacing: 12.0,
                childAspectRatio: 1.8,
                children: [
                  _buildServiceCard(
                    context,
                    title: 'Assignments',
                    status: '3 pending',
                    icon: Icons.assignment_outlined,
                    statusColor: Colors.red.shade700,
                    route: '/student/assignments',
                  ),
                  _buildServiceCard(
                    context,
                    title: 'Study Material',
                    status: '12 new files',
                    icon: Icons.description_outlined,
                    statusColor: const Color(0xFF005C9E),
                    route: '/student/materials',
                  ),
                  _buildServiceCard(
                    context,
                    title: 'Results',
                    status: 'Term 1 declared',
                    icon: Icons.star_outline,
                    statusColor: const Color(0xFF005C9E),
                    route: '/student/results',
                  ),
                  _buildServiceCard(
                    context,
                    title: 'Payments',
                    status: 'Paid for August',
                    icon: Icons.credit_card,
                    statusColor: Colors.green.shade700,
                    route: '/student/payments',
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24.0),

            // Upcoming Exams Title
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: Text(
                'Upcoming Exams',
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
            ),
            
            // Upcoming Exams List
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  _buildExamTile(
                    context,
                    day: '15',
                    month: 'OCT',
                    title: 'Data Structures Mid-Term',
                    subtitle: 'Weightage: 30% • 02:00 PM',
                    color: const Color(0xFFEF4444),
                    route: '/student/exams',
                  ),
                  const SizedBox(height: 12.0),
                  _buildExamTile(
                    context,
                    day: '22',
                    month: 'OCT',
                    title: 'C++ Programming Final',
                    subtitle: 'Weightage: 50% • 10:00 AM',
                    color: const Color(0xFF64748B),
                    route: '/student/exams',
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 32.0),
          ],
        ),
      ),
    );
  }

  Widget _buildClassCard(BuildContext context, {required String title, required String time, required String details}) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(right: 12.0),
      child: Container(
        width: 250.0,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12.0),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Stack(
          children: [
            Positioned(
              top: 0,
              bottom: 0,
              left: 0,
              width: 4.0,
              child: Container(
                decoration: BoxDecoration(
                  color: theme.colorScheme.primary,
                  borderRadius: const BorderRadius.horizontal(left: Radius.circular(12.0)),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(14.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Icon(Icons.video_camera_front_outlined, color: theme.colorScheme.primary, size: 20.0),
                      const SizedBox(width: 8.0),
                      Text(
                        time,
                        style: const TextStyle(
                          fontSize: 12.5,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF64748B),
                        ),
                      ),
                    ],
                  ),
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 14.5,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF0F172A),
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    details,
                    style: const TextStyle(
                      fontSize: 12.0,
                      color: Color(0xFF64748B),
                      fontWeight: FontWeight.w500,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(
                    height: 28.0,
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFE8F2FF),
                        foregroundColor: theme.colorScheme.primary,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(6.0),
                        ),
                        elevation: 0,
                        padding: EdgeInsets.zero,
                      ),
                      onPressed: () {},
                      child: const Text(
                        'Join Online',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11.5),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildServiceCard(BuildContext context,
      {required String title, required String status, required IconData icon, required Color statusColor, required String route}) {
    return Card(
      elevation: 0,
      color: const Color(0xFFF8FAFC),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
        side: const BorderSide(color: Color(0xFFE2E8F0)),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12.0),
        onTap: () => context.push(route),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, color: const Color(0xFF64748B), size: 22.0),
              const SizedBox(height: 8.0),
              Text(
                title,
                style: const TextStyle(
                  fontSize: 13.5,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 2.0),
              Text(
                status,
                style: TextStyle(
                  fontSize: 11.5,
                  fontWeight: FontWeight.bold,
                  color: statusColor,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildExamTile(BuildContext context,
      {required String day, required String month, required String title, required String subtitle, required Color color, required String route}) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
        side: const BorderSide(color: Color(0xFFE2E8F0)),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12.0),
        onTap: () => context.push(route),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Row(
            children: [
              Container(
                width: 52.0,
                height: 52.0,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      day,
                      style: TextStyle(
                        fontSize: 18.0,
                        fontWeight: FontWeight.bold,
                        color: color,
                      ),
                    ),
                    Text(
                      month,
                      style: TextStyle(
                        fontSize: 10.0,
                        fontWeight: FontWeight.bold,
                        color: color,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 14.0),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 14.5,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF0F172A),
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4.0),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 12.0,
                        color: Color(0xFF64748B),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.arrow_forward_ios, size: 14.0, color: Color(0xFF94A3B8)),
            ],
          ),
        ),
      ),
    );
  }
}

// ----------------------------------------------------
// 2. MY COURSES SCREEN (Screenshot 5)
// ----------------------------------------------------
class StudentCoursesScreen extends StatefulWidget {
  const StudentCoursesScreen({Key? key}) : super(key: key);

  @override
  State<StudentCoursesScreen> createState() => _StudentCoursesScreenState();
}

class _StudentCoursesScreenState extends State<StudentCoursesScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        title: const Text(
          'My Courses',
          style: TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 18.0),
        ),
        centerTitle: true,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(116.0),
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: Row(
                  children: [
                    Expanded(
                      child: Container(
                        height: 42.0,
                        padding: const EdgeInsets.symmetric(horizontal: 12.0),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                        child: Row(
                          children: const [
                            Icon(Icons.search, color: Color(0xFF64748B), size: 20.0),
                            SizedBox(width: 8.0),
                            Expanded(
                              child: TextField(
                                decoration: InputDecoration(
                                  hintText: 'Search your courses...',
                                  hintStyle: TextStyle(color: Color(0xFF94A3B8), fontSize: 13.5),
                                  border: InputBorder.none,
                                  isDense: true,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 10.0),
                    Container(
                      height: 42.0,
                      width: 42.0,
                      decoration: BoxDecoration(
                        color: const Color(0xFFF1F5F9),
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: IconButton(
                        icon: const Icon(Icons.tune, color: Color(0xFF64748B), size: 20.0),
                        onPressed: () {},
                      ),
                    ),
                  ],
                ),
              ),
              TabBar(
                controller: _tabController,
                indicatorColor: theme.colorScheme.primary,
                labelColor: theme.colorScheme.primary,
                unselectedLabelColor: const Color(0xFF64748B),
                labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5),
                tabs: const [
                  Tab(text: 'Ongoing'),
                  Tab(text: 'Completed'),
                  Tab(text: 'Wishlist'),
                ],
              ),
            ],
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildOngoingList(context),
          const Center(child: Text('Completed Courses Placeholder')),
          const Center(child: Text('Wishlist Courses Placeholder')),
        ],
      ),
    );
  }

  Widget _buildOngoingList(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        _buildCourseListItem(
          context,
          title: 'Advanced React & Modern State Management',
          category: 'WEB DEV',
          instructor: 'Dr. David Reynolds',
          progress: 0.65,
          thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
        ),
        _buildCourseListItem(
          context,
          title: 'Data Science Fundamentals with Python',
          category: 'PYTHON',
          instructor: 'Prof. Maria Wong',
          progress: 0.22,
          thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQS9JpkRiEURqAExqyf9RwAz61xGess61Tt0gaRxOGf02kdqqQI0wr3ING71sB3DAAvFbBRLr1Dy50jdn6m-04p05USBvDETcf--7srWbB90QXcd_nUdmLOSLM6RFkFIcdA7upxsmHUU0gxD_L7cuVnEZXlMkh8yDDm6K6qCO8_lQDTGrmM_DjmXaKITD7O1bADo_miHrJ0kMAGEslDd2GdgAGRbYSQ6q951dFdCZhIlkvwrvs9z8_Eo816fpf0jUROIa3SIdNgi',
        ),
        _buildCourseListItem(
          context,
          title: 'Introduction to Machine Learning Models',
          category: 'AI / ML',
          instructor: 'Dr. Sarah Jenkins',
          progress: 0.89,
          thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwfVGQrnBDkybLOGtMG50XoM9-n_v-XAFJ7be_7vkWH_xaULvMLilfoFS-jEzAGGJ41M3cUcEcGxnA-ZyUo115yHSTuQP8Z6N8kFql7ZVxnAdY99iWA7sZyLzyNVvdo6a26jVl113mzpmF6DKBnngMAoiA8NsVjKXh_sTS3Bfd7hlym9GTKhybKW2S8jLJmfpje3qxudWz2gKAud9lS7BKNWVh7gLDogDUQ2lNOAY_TzmI0RbOcXpwvbogz6ap22kplXMFLJHO34EF',
        ),
        _buildCourseListItem(
          context,
          title: 'Cloud Architecture & AWS Essentials',
          category: 'CLOUD',
          instructor: 'Mark Kaplan',
          progress: 0.05,
          thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfmrE-1jgZinp1e9XXf8Mo9gfR-8SeYx5SJWKIaW5zNKt93HtIR3mkUmoRGlIKPMu0RUYzJ2XcpjFKNWGhWk2zKGauofOaU6Cjhlqu3gHTdVufT4oprmGpxYm0gHeQUPJDZn4fsvMyO9G5QG7bE2YmGYcHlwFt4SPiyE1VptH8UVBPEVM6_Q6Jxnd3fNFqQ_2FViUevRdqUGGIjJp154tnwJhJSBU9z6PRoR36sruXy_hwKN5yu_zcllyyvnrlJyWSC8P0hUCFBNv',
        ),
      ],
    );
  }

  Widget _buildCourseListItem(BuildContext context,
      {required String title, required String category, required String instructor, required double progress, required String thumbnailUrl}) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Card(
        elevation: 0,
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
          side: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(16.0)),
              child: Image.network(
                thumbnailUrl,
                height: 140.0,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) => Container(height: 140.0, color: Colors.grey.shade300),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(6.0),
                    ),
                    child: Text(
                      category,
                      style: TextStyle(
                        fontSize: 10.5,
                        fontWeight: FontWeight.bold,
                        color: theme.colorScheme.primary,
                      ),
                    ),
                  ),
                  const SizedBox(height: 10.0),
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 16.5,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 6.0),
                  Row(
                    children: [
                      const CircleAvatar(
                        radius: 8,
                        backgroundImage: NetworkImage(
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuA8R1xHQ-91rAG8uSNBeP8yHYKUvREHaA3Y1l6XtLnborfK6wjOzXjAi2caaJ_X1b-mJph9n-PbvdvgxzvtAq5yuieoLhJ7SiVs7Jtc3jio2RV9s0MnkMwab22sJQ95FUfyCoTnB8V38MckRy-3SwqSYd1sqHAk3HdBZWNRYJceiCjGUO5NCHsAk2iQmSthYtrngxxh1ERVkhh958px_EA90kE-nk6RwPh78o32g8vMihc_OpVq3n0jjmGvKmQHOuufg_svTA6TNi8c',
                        ),
                      ),
                      const SizedBox(width: 6.0),
                      Text(
                        instructor,
                        style: const TextStyle(
                          fontSize: 12.0,
                          color: Color(0xFF64748B),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16.0),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Progress',
                        style: TextStyle(fontSize: 12.0, color: const Color(0xFF64748B), fontWeight: FontWeight.w600),
                      ),
                      Text(
                        '${(progress * 100).toInt()}%',
                        style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6.0),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4.0),
                    child: LinearProgressIndicator(
                      value: progress,
                      minHeight: 5.0,
                      backgroundColor: const Color(0xFFF1F5F9),
                      valueColor: AlwaysStoppedAnimation<Color>(theme.colorScheme.primary),
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  CustomButton(
                    text: progress == 0.05 ? 'Start First Lesson' : (progress > 0.80 ? 'Almost Done!' : 'Continue Learning'),
                    onPressed: () => context.push('/student/courses/details?title=${Uri.encodeComponent(title)}'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ----------------------------------------------------
// 3. COURSE DETAILS SCREEN (Screenshot 4)
// ----------------------------------------------------
class StudentCourseDetailsScreen extends StatefulWidget {
  final String title;

  const StudentCourseDetailsScreen({Key? key, required this.title}) : super(key: key);

  @override
  State<StudentCourseDetailsScreen> createState() => _StudentCourseDetailsScreenState();
}

class _StudentCourseDetailsScreenState extends State<StudentCourseDetailsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 20.0, color: Color(0xFF0F172A)),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Tech Academy',
          style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.w800, fontSize: 18.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined, color: Color(0xFF0F172A)),
            onPressed: () {},
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0, left: 8.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I',
              ),
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48.0),
          child: Container(
            color: Colors.white,
            child: TabBar(
              controller: _tabController,
              indicatorColor: theme.colorScheme.primary,
              labelColor: theme.colorScheme.primary,
              unselectedLabelColor: const Color(0xFF64748B),
              labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5),
              tabs: const [
                Tab(text: 'Overview'),
                Tab(text: 'Syllabus'),
                Tab(text: 'Materials'),
              ],
            ),
          ),
        ),
      ),
      body: Stack(
        children: [
          TabBarView(
            controller: _tabController,
            children: [
              _buildOverviewTab(context),
              const Center(child: Text('Syllabus Chapters Placeholder')),
              const Center(child: Text('Materials & Notes Placeholder')),
            ],
          ),
          Positioned(
            bottom: 24,
            right: 24,
            child: FloatingActionButton(
              backgroundColor: theme.colorScheme.primary,
              foregroundColor: Colors.white,
              shape: const CircleBorder(),
              onPressed: () {},
              child: const Icon(Icons.play_arrow, size: 28.0),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildOverviewTab(BuildContext context) {
    final theme = Theme.of(context);
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Card(
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16.0),
            ),
            clipBehavior: Clip.antiAlias,
            child: Stack(
              children: [
                Image.network(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
                  height: 180.0,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
                Container(
                  height: 180.0,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.black.withOpacity(0.6), Colors.transparent],
                      begin: Alignment.bottomCenter,
                      end: Alignment.topCenter,
                    ),
                  ),
                ),
                Positioned(
                  top: 12.0,
                  left: 12.0,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary,
                      borderRadius: BorderRadius.circular(4.0),
                    ),
                    child: const Text(
                      'WEB DEVELOPMENT',
                      style: TextStyle(
                        fontSize: 9.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
                Positioned(
                  bottom: 16.0,
                  left: 16.0,
                  right: 16.0,
                  child: Text(
                    widget.title,
                    style: const TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 16.0),

          const Text(
            'About this Course',
            style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
          const SizedBox(height: 8.0),
          const Text(
            'Master the complexities of React and elevate your front-end development skills to a professional level. This intensive course dives deep into advanced patterns like Compound Components, Render Props, and Higher-Order Components, while focusing heavily on measuring and optimizing application performance.',
            style: TextStyle(fontSize: 13.5, color: Color(0xFF475569), height: 1.45),
          ),
          
          const SizedBox(height: 16.0),

          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 10.0,
            crossAxisSpacing: 10.0,
            childAspectRatio: 2.2,
            children: [
              _buildSpecCard(Icons.schedule, '24 Hours'),
              _buildSpecCard(Icons.trending_up, 'Advanced'),
              _buildSpecCard(Icons.language, 'English'),
              _buildSpecCard(Icons.workspace_premium_outlined, 'Certificate'),
            ],
          ),
          
          const SizedBox(height: 24.0),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text(
                'Curriculum',
                style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
              ),
              Text(
                '12 Modules • 48 Lessons',
                style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 12.0),
          _buildCurriculumPanel(
            context,
            index: '01',
            title: 'Foundation & Core Principles',
            lessons: [
              'Introduction to Advanced React (12:45 • Completed)',
              'Understanding the Reconciliation Engine (24:10 • In Progress)',
              'Fiber Architecture Deep Dive (18:22 • Lock)',
            ],
          ),
          const SizedBox(height: 8.0),
          _buildCurriculumPanel(
            context,
            index: '02',
            title: 'Advanced Patterns & Hooks',
            lessons: [],
            isLocked: true,
          ),
          
          const SizedBox(height: 24.0),

          const Text(
            'Your Instructor',
            style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
          const SizedBox(height: 12.0),
          Card(
            elevation: 0,
            color: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12.0),
              side: const BorderSide(color: Color(0xFFE2E8F0)),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const CircleAvatar(
                        radius: 24,
                        backgroundImage: NetworkImage(
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuA8R1xHQ-91rAG8uSNBeP8yHYKUvREHaA3Y1l6XtLnborfK6wjOzXjAi2caaJ_X1b-mJph9n-PbvdvgxzvtAq5yuieoLhJ7SiVs7Jtc3jio2RV9s0MnkMwab22sJQ95FUfyCoTnB8V38MckRy-3SwqSYd1sqHAk3HdBZWNRYJceiCjGUO5NCHsAk2iQmSthYtrngxxh1ERVkhh958px_EA90kE-nk6RwPh78o32g8vMihc_OpVq3n0jjmGvKmQHOuufg_svTA6TNi8c',
                        ),
                      ),
                      const SizedBox(width: 12.0),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text(
                              'Dr. Marcus Chen',
                              style: TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                            ),
                            SizedBox(height: 2.0),
                            Text(
                              'Principal Architect @ Tech Corp',
                              style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.w500),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12.0),
                  const Text(
                    '"Teaching is not just about sharing knowledge. It\'s about building the logic systems that empower students to innovate."',
                    style: TextStyle(fontSize: 12.5, fontStyle: FontStyle.italic, color: Color(0xFF475569), height: 1.4),
                  ),
                  const SizedBox(height: 16.0),
                  Row(
                    children: [
                      Expanded(
                        child: SizedBox(
                          height: 36.0,
                          child: OutlinedButton(
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Color(0xFFE2E8F0)),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6.0)),
                            ),
                            onPressed: () {},
                            child: const Text('Follow', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12.0),
                      Container(
                        height: 36.0,
                        width: 44.0,
                        decoration: BoxDecoration(
                          border: Border.all(color: const Color(0xFFE2E8F0)),
                          borderRadius: BorderRadius.circular(6.0),
                        ),
                        child: IconButton(
                          icon: Icon(Icons.email_outlined, size: 18.0, color: theme.colorScheme.primary),
                          onPressed: () {},
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          
          const SizedBox(height: 24.0),

          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: const Color(0xFF005C9E),
              borderRadius: BorderRadius.circular(16.0),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'Course Progress',
                  style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.w600, color: Colors.white70),
                ),
                const SizedBox(height: 8.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    Text(
                      '18%',
                      style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    Text(
                      '9/48 Lessons',
                      style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: Colors.white70),
                    ),
                  ],
                ),
                const SizedBox(height: 12.0),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4.0),
                  child: const LinearProgressIndicator(
                    value: 0.18,
                    minHeight: 5.0,
                    backgroundColor: Colors.white24,
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  ),
                ),
                const SizedBox(height: 16.0),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFF005C9E),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                    elevation: 0,
                    padding: const EdgeInsets.symmetric(vertical: 12.0),
                  ),
                  onPressed: () {},
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Icon(Icons.play_arrow_outlined, size: 18.0),
                      SizedBox(width: 6.0),
                      Text('Continue Learning', style: TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 24.0),

          const Text(
            'RESOURCES',
            style: TextStyle(fontSize: 11.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B), letterSpacing: 1.0),
          ),
          const SizedBox(height: 10.0),
          _buildResourceTile(Icons.picture_as_pdf_outlined, 'Course Syllabus PDF', hasDownload: true),
          _buildResourceTile(Icons.code_outlined, 'Starter Project Repo', hasLink: true),
          _buildResourceTile(Icons.assignment_turned_in_outlined, 'Practice Assignments', hasArrow: true),
          
          const SizedBox(height: 64.0),
        ],
      ),
    );
  }

  Widget _buildSpecCard(IconData icon, String label) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9).withOpacity(0.5),
        borderRadius: BorderRadius.circular(10.0),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 18.0, color: const Color(0xFF005C9E)),
          const SizedBox(width: 8.0),
          Text(
            label,
            style: const TextStyle(fontSize: 13.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
          ),
        ],
      ),
    );
  }

  Widget _buildCurriculumPanel(BuildContext context, {required String index, required String title, required List<String> lessons, bool isLocked = false}) {
    final theme = Theme.of(context);
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
        side: const BorderSide(color: Color(0xFFE2E8F0)),
      ),
      child: ExpansionTile(
        leading: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
          decoration: BoxDecoration(
            color: const Color(0xFFF1F5F9),
            borderRadius: BorderRadius.circular(16.0),
          ),
          child: Text(
            index,
            style: const TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B)),
          ),
        ),
        title: Text(
          title,
          style: const TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
        ),
        trailing: isLocked
            ? const Icon(Icons.lock_outline, size: 18.0, color: Color(0xFF94A3B8))
            : const Icon(Icons.keyboard_arrow_down, size: 20.0, color: Color(0xFF64748B)),
        childrenPadding: const EdgeInsets.all(12.0),
        children: isLocked
            ? []
            : lessons.map((les) {
                final isCompleted = les.contains('Completed');
                final isInProgress = les.contains('In Progress');
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6.0),
                  child: Row(
                    children: [
                      Icon(
                        isCompleted ? Icons.check_circle : (isInProgress ? Icons.play_circle_outline : Icons.lock_outline),
                        size: 18.0,
                        color: isCompleted ? Colors.green.shade600 : (isInProgress ? theme.colorScheme.primary : Colors.grey.shade400),
                      ),
                      const SizedBox(width: 8.0),
                      Expanded(
                        child: Text(
                          les,
                          style: TextStyle(
                            fontSize: 13.0,
                            color: isCompleted ? const Color(0xFF64748B) : const Color(0xFF0F172A),
                            fontWeight: isInProgress ? FontWeight.bold : FontWeight.normal,
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
      ),
    );
  }

  Widget _buildResourceTile(IconData icon, String label, {bool hasDownload = false, bool hasLink = false, bool hasArrow = false}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8.0),
      padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 12.0),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(10.0),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Icon(icon, size: 20.0, color: const Color(0xFF64748B)),
          const SizedBox(width: 12.0),
          Expanded(
            child: Text(
              label,
              style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
            ),
          ),
          if (hasDownload) const Icon(Icons.download, size: 18.0, color: Color(0xFF64748B)),
          if (hasLink) const Icon(Icons.link, size: 18.0, color: Color(0xFF64748B)),
          if (hasArrow) const Icon(Icons.arrow_forward_ios, size: 14.0, color: Color(0xFF64748B)),
        ],
      ),
    );
  }
}

// ----------------------------------------------------
// 4. MY SCHEDULE SCREEN (Screenshot 7)
// ----------------------------------------------------
class StudentClassesScreen extends StatefulWidget {
  const StudentClassesScreen({Key? key}) : super(key: key);

  @override
  State<StudentClassesScreen> createState() => _StudentClassesScreenState();
}

class _StudentClassesScreenState extends State<StudentClassesScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

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
            icon: const Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications_none, color: Color(0xFF0F172A)),
            ),
            onPressed: () => context.push('/student/notifications'),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0, left: 8.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I',
              ),
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(104.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'My Schedule',
                      style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                    ),
                    SizedBox(height: 4.0),
                    Text(
                      'Manage your daily learning sessions and upcoming workshops.',
                      style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B)),
                    ),
                  ],
                ),
              ),
              TabBar(
                controller: _tabController,
                indicatorColor: theme.colorScheme.primary,
                labelColor: theme.colorScheme.primary,
                unselectedLabelColor: const Color(0xFF64748B),
                labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5),
                tabs: const [
                  Tab(text: 'Online'),
                  Tab(text: 'Offline'),
                  Tab(text: 'Live \u2022'),
                ],
              ),
            ],
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildOnlineSchedule(context),
          const Center(child: Text('Offline Classes Placeholder')),
          const Center(child: Text('Live Webinars Placeholder')),
        ],
      ),
    );
  }

  Widget _buildOnlineSchedule(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        // Live now Class Card
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(16.0)),
                child: Image.network(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
                  height: 140.0,
                  fit: BoxFit.cover,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                          decoration: BoxDecoration(
                            color: Colors.red.shade50,
                            borderRadius: BorderRadius.circular(6.0),
                          ),
                          child: Row(
                            children: [
                              Container(
                                width: 6.0,
                                height: 6.0,
                                decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
                              ),
                              const SizedBox(width: 6.0),
                              const Text(
                                'Live Now',
                                style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Colors.red),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8.0),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                          decoration: const BoxDecoration(
                            color: Color(0xFFE8F2FF),
                            borderRadius: BorderRadius.all(Radius.circular(6.0)),
                          ),
                          child: const Text(
                            'Web Engineering',
                            style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E)),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12.0),
                    const Text(
                      'Advanced React Patterns & State Management',
                      style: TextStyle(fontSize: 17.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 10.0),
                    Row(
                      children: const [
                        Icon(Icons.person_outline, size: 16.0, color: Color(0xFF64748B)),
                        SizedBox(width: 6.0),
                        Text(
                          'Dr. Sarah Chen',
                          style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B), fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6.0),
                    Row(
                      children: const [
                        Icon(Icons.schedule, size: 16.0, color: Color(0xFF64748B)),
                        SizedBox(width: 6.0),
                        Text(
                          '10:00 AM - 11:30 AM',
                          style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B), fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16.0),
                    CustomButton(
                      text: 'Join Now',
                      backgroundColor: const Color(0xFF005C9E),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        
        const SizedBox(height: 12.0),
        
        // Item 2 (Zoom class)
        _buildScheduleItem(
          title: 'Statistical Modeling with Python',
          timeTag: '2 PM Today',
          category: 'Data Science',
          instructor: 'Prof. Marcus Thorne',
          location: 'Zoom Room 4',
          buttonText: 'Set Reminder',
          onButtonPress: () {},
        ),
        
        const SizedBox(height: 12.0),

        // Item 3 (Offline class)
        _buildScheduleItem(
          title: 'User Research Methodologies',
          timeTag: '4:30 PM Today',
          category: 'UX Design',
          instructor: 'Elena Rodriguez',
          location: 'Offline (Lab 204)',
          buttonText: 'View Location',
          onButtonPress: () {},
        ),
        
        const SizedBox(height: 16.0),

        // Workshop Banner
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
                'Workshop: AI in Design',
                style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              const SizedBox(height: 6.0),
              const Text(
                'Guest session by industrial experts on Generative UI.',
                style: TextStyle(fontSize: 13.0, color: Colors.white70, height: 1.4),
              ),
              const SizedBox(height: 16.0),
              Row(
                children: const [
                  Icon(Icons.calendar_month, size: 16.0, color: Colors.white70),
                  SizedBox(width: 6.0),
                  Text('Tomorrow, 11:00 AM', style: TextStyle(fontSize: 13.0, color: Colors.white, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 16.0),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: const Color(0xFF005C9E),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                  elevation: 0,
                ),
                onPressed: () {},
                child: const Text('Register', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        
        const SizedBox(height: 16.0),

        // Item 5 (Cloud)
        _buildScheduleItem(
          title: 'AWS Solutions Architecture',
          timeTag: 'Next Week',
          category: 'Cloud Computing',
          instructor: 'Dr. James Wilson',
          location: 'Mon, 9:00 AM',
          buttonText: 'Enroll Now',
          onButtonPress: () {},
          isFilled: false,
        ),
        
        const SizedBox(height: 24.0),

        // Weekly Progress Box
        Container(
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: const Color(0xFFF1F5F9).withOpacity(0.5),
            borderRadius: BorderRadius.circular(16.0),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Your Progress This Week',
                style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 6.0),
              Row(
                children: [
                  Container(width: 8.0, height: 8.0, decoration: const BoxDecoration(color: Color(0xFF005C9E), shape: BoxShape.circle)),
                  const SizedBox(width: 6.0),
                  const Text('88% Attendance', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 16.0),
              _buildProgressRow('Hours Studied', '24.5 hrs', 0.65),
              const SizedBox(height: 12.0),
              _buildProgressRow('Assignments Done', '12 / 15', 0.8),
              const SizedBox(height: 12.0),
              _buildProgressRow('Upcoming Tests', '3 Pending', 0.3, isError: true),
            ],
          ),
        ),
        
        const SizedBox(height: 32.0),
      ],
    );
  }

  Widget _buildScheduleItem({
    required String title,
    required String timeTag,
    required String category,
    required String instructor,
    required String location,
    required String buttonText,
    required VoidCallback onButtonPress,
    bool isFilled = true,
  }) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.0),
        side: const BorderSide(color: Color(0xFFE2E8F0)),
      ),
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
                  decoration: const BoxDecoration(
                    color: Color(0xFFE8F2FF),
                    borderRadius: BorderRadius.all(Radius.circular(6.0)),
                  ),
                  child: Text(
                    category,
                    style: const TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E)),
                  ),
                ),
                Text(
                  timeTag,
                  style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 12.0),
            Text(
              title,
              style: const TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
            ),
            const SizedBox(height: 8.0),
            Row(
              children: [
                const Icon(Icons.person_outline, size: 15.0, color: Color(0xFF64748B)),
                const SizedBox(width: 6.0),
                Text(instructor, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.w600)),
              ],
            ),
            const SizedBox(height: 4.0),
            Row(
              children: [
                const Icon(Icons.location_on_outlined, size: 15.0, color: Color(0xFF64748B)),
                const SizedBox(width: 6.0),
                Text(location, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.w600)),
              ],
            ),
            const SizedBox(height: 16.0),
            SizedBox(
              height: 38.0,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: isFilled ? const Color(0xFFE8F2FF) : Colors.white,
                  foregroundColor: const Color(0xFF005C9E),
                  side: isFilled ? null : const BorderSide(color: Color(0xFFCBD5E1)),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                  elevation: 0,
                ),
                onPressed: onButtonPress,
                child: Text(buttonText, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressRow(String label, String value, double progress, {bool isError = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(fontSize: 12.5, color: Color(0xFF64748B), fontWeight: FontWeight.w500)),
            Text(value, style: const TextStyle(fontSize: 13.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
          ],
        ),
        const SizedBox(height: 6.0),
        ClipRRect(
          borderRadius: BorderRadius.circular(4.0),
          child: LinearProgressIndicator(
            value: progress,
            minHeight: 5.0,
            backgroundColor: const Color(0xFFE2E8F0),
            valueColor: AlwaysStoppedAnimation<Color>(isError ? Colors.red : const Color(0xFF005C9E)),
          ),
        ),
      ],
    );
  }
}

// ----------------------------------------------------
// 5. STUDY MATERIALS SCREEN (Screenshot 6)
// ----------------------------------------------------
class StudentStudyMaterialsScreen extends StatefulWidget {
  const StudentStudyMaterialsScreen({Key? key}) : super(key: key);

  @override
  State<StudentStudyMaterialsScreen> createState() => _StudentStudyMaterialsScreenState();
}

class _StudentStudyMaterialsScreenState extends State<StudentStudyMaterialsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

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
            icon: const Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications_none, color: Color(0xFF0F172A)),
            ),
            onPressed: () => context.push('/student/notifications'),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0, left: 8.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I',
              ),
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(164.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Study Materials',
                      style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                    ),
                    SizedBox(height: 4.0),
                    Text(
                      'Access all your course resources, research papers, and video recordings in one high-performance digital library.',
                      style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B), height: 1.35),
                    ),
                  ],
                ),
              ),
              // Search & Filter
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                child: Row(
                  children: [
                    Expanded(
                      child: Container(
                        height: 40.0,
                        padding: const EdgeInsets.symmetric(horizontal: 12.0),
                        decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(8.0)),
                        child: Row(
                          children: const [
                            Icon(Icons.search, color: Color(0xFF64748B), size: 18.0),
                            SizedBox(width: 8.0),
                            Expanded(
                              child: TextField(
                                decoration: InputDecoration(
                                  hintText: 'Search by topic, professor, or file name',
                                  hintStyle: TextStyle(color: Color(0xFF94A3B8), fontSize: 12.5),
                                  border: InputBorder.none,
                                  isDense: true,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 10.0),
                    Container(
                      height: 40.0,
                      decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(8.0)),
                      child: TextButton.icon(
                        icon: const Icon(Icons.tune, color: Color(0xFF64748B), size: 18.0),
                        label: const Text('Filters', style: TextStyle(color: Color(0xFF64748B), fontSize: 13.0, fontWeight: FontWeight.bold)),
                        onPressed: () {},
                      ),
                    ),
                  ],
                ),
              ),
              TabBar(
                controller: _tabController,
                indicatorColor: theme.colorScheme.primary,
                labelColor: theme.colorScheme.primary,
                unselectedLabelColor: const Color(0xFF64748B),
                labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0),
                tabs: const [
                  Tab(text: 'Notes'),
                  Tab(text: 'PDFs'),
                  Tab(text: 'Videos'),
                  Tab(text: 'Recorded'),
                ],
              ),
            ],
          ),
        ),
      ),
      body: Stack(
        children: [
          TabBarView(
            controller: _tabController,
            children: [
              _buildNotesTab(context),
              const Center(child: Text('PDF Library (Placeholder)')),
              const Center(child: Text('Videos Section (Placeholder)')),
              const Center(child: Text('Recorded Sessions (Placeholder)')),
            ],
          ),
          Positioned(
            bottom: 24,
            right: 24,
            child: FloatingActionButton(
              backgroundColor: theme.colorScheme.primary,
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

  Widget _buildNotesTab(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        // Resource 1: Algorithms (Large Card)
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(16.0)),
                child: Image.network(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
                  height: 130.0,
                  fit: BoxFit.cover,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 2.0),
                          decoration: const BoxDecoration(color: Color(0xFFE8F2FF), borderRadius: BorderRadius.all(Radius.circular(4.0))),
                          child: const Text('NEW', style: TextStyle(fontSize: 9.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                        ),
                        const SizedBox(width: 8.0),
                        const Icon(Icons.description, size: 14.0, color: Color(0xFF005C9E)),
                        const SizedBox(width: 4.0),
                        const Text(
                          'HANDWRITTEN NOTES',
                          style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: Color(0xFF005C9E)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10.0),
                    const Text(
                      'Advanced Algorithms: Master Class Notes',
                      style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 6.0),
                    const Text(
                      'Detailed lecture notes from Professor Williams covering Big O notation, dynamic programming, and graph theory.',
                      style: TextStyle(fontSize: 13.0, color: Color(0xFF64748B), height: 1.4),
                    ),
                    const SizedBox(height: 16.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: const [
                            Icon(Icons.attachment, size: 15.0, color: Color(0xFF94A3B8)),
                            SizedBox(width: 3.0),
                            Text('12.4 MB', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
                            SizedBox(width: 12.0),
                            Icon(Icons.visibility_outlined, size: 15.0, color: Color(0xFF94A3B8)),
                            SizedBox(width: 3.0),
                            Text('1.2k', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                          ],
                        ),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.bookmark_border, size: 20.0, color: Color(0xFF64748B)),
                              onPressed: () {},
                            ),
                            ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF005C9E),
                                foregroundColor: Colors.white,
                                elevation: 0,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6.0)),
                                padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
                              ),
                              icon: const Icon(Icons.download, size: 16.0),
                              label: const Text('Download', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.0)),
                              onPressed: () {},
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        
        const SizedBox(height: 12.0),

        // Resource 2: System Design
        _buildDocumentListItem(
          title: 'System Design v2.4',
          description: 'Complete architectural guide for building scalable cloud applications.',
          specText: 'PDF \u2022 4.8 MB',
          iconColor: Colors.red.shade100,
          iconRef: Icons.picture_as_pdf,
          iconForeground: Colors.red.shade700,
        ),
        
        const SizedBox(height: 12.0),

        // Resource 3: Recorded Video
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Stack(
                alignment: Alignment.center,
                children: [
                  Image.network(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfmrE-1jgZinp1e9XXf8Mo9gfR-8SeYx5SJWKIaW5zNKt93HtIR3mkUmoRGlIKPMu0RUYzJ2XcpjFKNWGhWk2zKGauofOaU6Cjhlqu3gHTdVufT4oprmGpxYm0gHeQUPJDZn4fsvMyO9G5QG7bE2YmGYcHlwFt4SPiyE1VptH8UVBPEVM6_Q6Jxnd3fNFqQ_2FViUevRdqUGGIjJp154tnwJhJSBU9z6PRoR36sruXy_hwKN5yu_zcllyyvnrlJyWSC8P0hUCFBNv',
                    height: 140.0,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  Container(
                    width: 44.0,
                    height: 44.0,
                    decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
                    child: const Icon(Icons.play_arrow, color: Color(0xFF005C9E)),
                  ),
                  Positioned(
                    bottom: 8,
                    right: 8,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 4.0, vertical: 2.0),
                      color: Colors.black.withOpacity(0.8),
                      child: const Text('42:15', style: TextStyle(color: Colors.white, fontSize: 10.0)),
                    ),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 2.0),
                      decoration: const BoxDecoration(color: Color(0xFFF1F5F9), borderRadius: BorderRadius.all(Radius.circular(4.0))),
                      child: const Text('RECORDED', style: TextStyle(fontSize: 9.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                    ),
                    const SizedBox(height: 8.0),
                    const Text('Intro to React Native', style: TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                    const SizedBox(height: 4.0),
                    const Text('Session 12: Building responsive layouts with Flex...', style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B))),
                    const SizedBox(height: 12.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('2.1k views \u2022 2 days ago', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                        TextButton(
                          onPressed: () {},
                          child: const Text('Watch Now', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        
        const SizedBox(height: 12.0),

        // Resource 4: DB management
        _buildDocumentListItem(
          title: 'DB Management Tips',
          description: 'Quick reference for SQL optimization and indexing strategies.',
          specText: 'Note \u2022 120 KB',
          iconColor: Colors.blue.shade50,
          iconRef: Icons.sticky_note_2,
          iconForeground: Colors.blue.shade700,
        ),
        
        const SizedBox(height: 12.0),

        // Resource 5: Python Card
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Stack(
                children: [
                  Image.network(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQS9JpkRiEURqAExqyf9RwAz61xGess61Tt0gaRxOGf02kdqqQI0wr3ING71sB3DAAvFbBRLr1Dy50jdn6m-04p05USBvDETcf--7srWbB90QXcd_nUdmLOSLM6RFkFIcdA7upxsmHUU0gxD_L7cuVnEZXlMkh8yDDm6K6qCO8_lQDTGrmM_DjmXaKITD7O1bADo_miHrJ0kMAGEslDd2GdgAGRbYSQ6q951dFdCZhIlkvwrvs9z8_Eo816fpf0jUROIa3SIdNgi',
                    height: 100.0,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  Positioned(
                    bottom: 8,
                    left: 8,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 2.0),
                      color: Colors.black.withOpacity(0.6),
                      child: const Text('Class of Aug 12, 2024', style: TextStyle(color: Colors.white, fontSize: 10.0)),
                    ),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.all(12.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Python for Data Science', style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          SizedBox(height: 2.0),
                          Text('Dr. Sarah Chen', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                    TextButton.icon(
                      icon: const Icon(Icons.arrow_forward, size: 16.0),
                      label: const Text('View', style: TextStyle(fontWeight: FontWeight.bold)),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        
        const SizedBox(height: 20.0),
        
        // Load More button
        Center(
          child: Column(
            children: [
              SizedBox(
                width: 200.0,
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Color(0xFFE2E8F0)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)),
                  ),
                  onPressed: () {},
                  child: const Text('Load More Materials', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                ),
              ),
              const SizedBox(height: 8.0),
              const Text('Showing 6 of 124 items', style: TextStyle(fontSize: 12.0, color: Color(0xFF94A3B8))),
            ],
          ),
        ),
        
        const SizedBox(height: 64.0),
      ],
    );
  }

  Widget _buildDocumentListItem({
    required String title,
    required String description,
    required String specText,
    required Color iconColor,
    required IconData iconRef,
    required Color iconForeground,
  }) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.0),
        side: const BorderSide(color: Color(0xFFE2E8F0)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 44.0,
              height: 44.0,
              decoration: BoxDecoration(color: iconColor, shape: BoxShape.circle),
              child: Icon(iconRef, color: iconForeground, size: 20.0),
            ),
            const SizedBox(width: 14.0),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(title, style: const TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                      const Icon(Icons.more_vert, size: 18.0, color: Color(0xFF64748B)),
                    ],
                  ),
                  const SizedBox(height: 4.0),
                  Text(description, style: const TextStyle(fontSize: 12.5, color: Color(0xFF64748B))),
                  const SizedBox(height: 12.0),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(specText, style: const TextStyle(fontSize: 11.5, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                      Row(
                        children: [
                          Icon(Icons.bookmark_border, size: 16.0, color: Colors.grey.shade600),
                          const SizedBox(width: 14.0),
                          Icon(Icons.download, size: 16.0, color: Colors.grey.shade600),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ----------------------------------------------------
// 6. MY ASSIGNMENTS SCREEN (Screenshot 8)
// ----------------------------------------------------
class StudentAssignmentsScreen extends StatefulWidget {
  const StudentAssignmentsScreen({Key? key}) : super(key: key);

  @override
  State<StudentAssignmentsScreen> createState() => _StudentAssignmentsScreenState();
}

class _StudentAssignmentsScreenState extends State<StudentAssignmentsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

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
            icon: const Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications_none, color: Color(0xFF0F172A)),
            ),
            onPressed: () => context.push('/student/notifications'),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0, left: 8.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I',
              ),
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(104.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'My Assignments',
                      style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                    ),
                    SizedBox(height: 4.0),
                    Text(
                      'Keep track of your coursework progress and upcoming deadlines.',
                      style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B)),
                    ),
                  ],
                ),
              ),
              TabBar(
                controller: _tabController,
                indicatorColor: theme.colorScheme.primary,
                labelColor: theme.colorScheme.primary,
                unselectedLabelColor: const Color(0xFF64748B),
                labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5),
                tabs: const [
                  Tab(text: 'All Tasks'),
                  Tab(text: 'Pending'),
                  Tab(text: 'Completed'),
                ],
              ),
            ],
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildAllAssignments(context),
          const Center(child: Text('Pending Assignments Placeholder')),
          const Center(child: Text('Completed Assignments Placeholder')),
        ],
      ),
    );
  }

  Widget _buildAllAssignments(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        // Pending task details card
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
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
                      decoration: const BoxDecoration(color: Color(0xFFE8F2FF), borderRadius: BorderRadius.all(Radius.circular(6.0))),
                      child: const Text('Web Development', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                    ),
                    Row(
                      children: const [
                        Icon(Icons.schedule, size: 14.0, color: Colors.red),
                        SizedBox(width: 4.0),
                        Text('Due in 2 days', style: TextStyle(fontSize: 12.0, color: Colors.red, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 12.0),
                const Text(
                  'Build a Responsive Dashboard with React',
                  style: TextStyle(fontSize: 17.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                ),
                const SizedBox(height: 8.0),
                const Text(
                  'Create a fully functional dashboard using React and Tailwind CSS. Must include a sidebar, data visualization using Chart.js, and a responsive grid layout for desktop and mobile devices.',
                  style: TextStyle(fontSize: 13.0, color: Color(0xFF64748B), height: 1.45),
                ),
                const SizedBox(height: 16.0),
                Row(
                  children: const [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('ASSIGNED DATE', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                          SizedBox(height: 2.0),
                          Text('Oct 12, 2023', style: TextStyle(fontSize: 12.5, color: Color(0xFF0F172A), fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('WEIGHT', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                          SizedBox(height: 2.0),
                          Text('25% of Total Grade', style: TextStyle(fontSize: 12.5, color: Color(0xFF0F172A), fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12.0),
                const Text('SUBMISSION TYPE', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                const SizedBox(height: 2.0),
                const Text('GitHub Link / ZIP', style: TextStyle(fontSize: 12.5, color: Color(0xFF0F172A), fontWeight: FontWeight.bold)),
                const SizedBox(height: 20.0),
                Row(
                  children: [
                    Expanded(
                      child: SizedBox(
                        height: 38.0,
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF005C9E),
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                            elevation: 0,
                          ),
                          icon: const Icon(Icons.file_upload, size: 18.0),
                          label: const Text('Upload Assignment', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                          onPressed: () {},
                        ),
                      ),
                    ),
                    const SizedBox(width: 14.0),
                    TextButton(
                      onPressed: () {},
                      child: const Text('View Instructions', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13.0)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        
        const SizedBox(height: 16.0),

        // Overall progress stats card
        Container(
          padding: const EdgeInsets.all(20.0),
          decoration: BoxDecoration(
            color: const Color(0xFF005C9E),
            borderRadius: BorderRadius.circular(16.0),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text('OVERALL PROGRESS', style: TextStyle(fontSize: 11.0, color: Colors.white70, fontWeight: FontWeight.bold, letterSpacing: 1.0)),
              const SizedBox(height: 6.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text('84%', style: TextStyle(fontSize: 32.0, fontWeight: FontWeight.bold, color: Colors.white)),
                  Text('Grade Average', style: TextStyle(fontSize: 12.5, color: Colors.white70, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 12.0),
              ClipRRect(
                borderRadius: BorderRadius.circular(4.0),
                child: const LinearProgressIndicator(
                  value: 0.84,
                  minHeight: 5.0,
                  backgroundColor: Colors.white24,
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                ),
              ),
              const SizedBox(height: 16.0),
              Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(12.0),
                      decoration: BoxDecoration(color: Colors.white.withOpacity(0.12), borderRadius: BorderRadius.circular(8.0)),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Completed', style: TextStyle(fontSize: 11.0, color: Colors.white70)),
                          SizedBox(height: 4.0),
                          Text('12', style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Colors.white)),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 12.0),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(12.0),
                      decoration: BoxDecoration(color: Colors.white.withOpacity(0.12), borderRadius: BorderRadius.circular(8.0)),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Upcoming', style: TextStyle(fontSize: 11.0, color: Colors.white70)),
                          SizedBox(height: 4.0),
                          Text('3', style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Colors.white)),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        
        const SizedBox(height: 16.0),

        // Graded Assignment Item
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
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
                      decoration: const BoxDecoration(color: Color(0xFFF1F5F9), borderRadius: BorderRadius.all(Radius.circular(6.0))),
                      child: const Text('Python Basics', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                    ),
                    Row(
                      children: const [
                        Icon(Icons.check_circle, size: 14.0, color: Colors.green),
                        SizedBox(width: 4.0),
                        Text('Graded', style: TextStyle(fontSize: 12.0, color: Colors.green, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 10.0),
                const Text('Data Structures Optimization', style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                const SizedBox(height: 10.0),
                Row(
                  children: const [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Mark', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8))),
                          SizedBox(height: 2.0),
                          Text('95/100', style: TextStyle(fontSize: 15.0, color: Color(0xFF005C9E), fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Submitted', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8))),
                          SizedBox(height: 2.0),
                          Text('Oct 05', style: TextStyle(fontSize: 13.0, color: Color(0xFF475569), fontWeight: FontWeight.w600)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14.0),
                // Teacher Feedback
                Container(
                  padding: const EdgeInsets.all(12.0),
                  decoration: BoxDecoration(color: const Color(0xFFF1F5F9).withOpacity(0.6), borderRadius: BorderRadius.circular(8.0)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text('TEACHER FEEDBACK', style: TextStyle(fontSize: 9.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
                      SizedBox(height: 4.0),
                      Text(
                        '"Excellent use of list comprehensions. Your time complexity analysis was spot on. Consider edge cases for empty inputs in the next iteration."',
                        style: TextStyle(fontSize: 12.0, color: Color(0xFF475569), fontStyle: FontStyle.italic, height: 1.35),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12.0),
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Color(0xFFE2E8F0)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                  ),
                  onPressed: () {},
                  child: const Text('Download Marked Work', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                ),
              ],
            ),
          ),
        ),
        
        const SizedBox(height: 16.0),

        // Submitted Item (Pending Review)
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
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
                      decoration: const BoxDecoration(color: Color(0xFFF1F5F9), borderRadius: BorderRadius.all(Radius.circular(6.0))),
                      child: const Text('UI/UX Design', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                    ),
                    Row(
                      children: const [
                        Icon(Icons.watch_later_outlined, size: 14.0, color: Colors.orange),
                        SizedBox(width: 4.0),
                        Text('Submitted (Pending Review)', style: TextStyle(fontSize: 11.5, color: Colors.orange, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 10.0),
                const Text('Mobile App Hi-Fi Prototypes', style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                const SizedBox(height: 10.0),
                Row(
                  children: const [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Mark', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8))),
                          SizedBox(height: 2.0),
                          Text('-- / 100', style: TextStyle(fontSize: 15.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Submitted', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8))),
                          SizedBox(height: 2.0),
                          Text('Oct 10', style: TextStyle(fontSize: 13.0, color: Color(0xFF475569), fontWeight: FontWeight.w600)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14.0),
                // Attachment reference
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 10.0),
                  decoration: BoxDecoration(border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(8.0)),
                  child: Row(
                    children: [
                      const Icon(Icons.insert_drive_file_outlined, size: 18.0, color: Color(0xFF64748B)),
                      const SizedBox(width: 8.0),
                      const Expanded(
                        child: Text(
                          'prototype_final_v2.fig',
                          style: TextStyle(fontSize: 13.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Text('Preview', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.5)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        
        const SizedBox(height: 24.0),

        // Assignment History Title
        const Text(
          'Assignment History',
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
        ),
        const SizedBox(height: 12.0),
        
        // Table list of History
        Container(
          decoration: BoxDecoration(color: Colors.white, border: Border.all(color: const Color(0xFFE2E8F0)), borderRadius: BorderRadius.circular(12.0)),
          child: Column(
            children: [
              _buildTableHeader(),
              _buildTableRow('Database Mgmt', 'SQL Query Optimization Challenge', 'GRADED', Colors.green),
              _buildTableRow('System Admin', 'Linux Server Configuration Lab', 'GRADED', Colors.green),
              _buildTableRow('Cloud Computing', 'AWS Architecture Diagram', 'SUBMITTED', Colors.blue),
            ],
          ),
        ),
        
        const SizedBox(height: 32.0),
      ],
    );
  }

  Widget _buildTableHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 12.0),
      decoration: const BoxDecoration(color: Color(0xFFF8FAFC), borderRadius: BorderRadius.vertical(top: Radius.circular(12.0))),
      child: Row(
        children: const [
          Expanded(flex: 3, child: Text('Subject', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold))),
          Expanded(flex: 5, child: Text('Assignment Name', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold))),
          Expanded(flex: 3, child: Text('Status', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold), textAlign: TextAlign.right)),
        ],
      ),
    );
  }

  Widget _buildTableRow(String subject, String name, String status, Color statusColor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 14.0),
      decoration: const BoxDecoration(border: Border(top: BorderSide(color: Color(0xFFE2E8F0)))),
      child: Row(
        children: [
          Expanded(
            flex: 3,
            child: Text(
              subject,
              style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600, color: Color(0xFF0F172A)),
            ),
          ),
          Expanded(
            flex: 5,
            child: Text(
              name,
              style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B)),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Expanded(
            flex: 3,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 2.0),
              decoration: BoxDecoration(color: statusColor.withOpacity(0.1), borderRadius: BorderRadius.circular(4.0)),
              child: Text(
                status,
                style: TextStyle(fontSize: 9.5, fontWeight: FontWeight.bold, color: statusColor),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ----------------------------------------------------
// 7. TESTS & EXAMS SCREEN (Screenshot 9)
// ----------------------------------------------------
class StudentTestsScreen extends StatefulWidget {
  const StudentTestsScreen({Key? key}) : super(key: key);

  @override
  State<StudentTestsScreen> createState() => _StudentTestsScreenState();
}

class _StudentTestsScreenState extends State<StudentTestsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

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
            icon: const Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications_none, color: Color(0xFF0F172A)),
            ),
            onPressed: () => context.push('/student/notifications'),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0, left: 8.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I',
              ),
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(80.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                child: Text(
                  'Tests & Exams',
                  style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                ),
              ),
              TabBar(
                controller: _tabController,
                indicatorColor: theme.colorScheme.primary,
                labelColor: theme.colorScheme.primary,
                unselectedLabelColor: const Color(0xFF64748B),
                labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5),
                tabs: const [
                  Tab(text: 'Upcoming'),
                  Tab(text: 'Completed'),
                  Tab(text: 'Results'),
                ],
              ),
            ],
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildUpcomingExams(context),
          const Center(child: Text('Completed Tests Placeholder')),
          const Center(child: Text('Exam Result Ledger Placeholder')),
        ],
      ),
    );
  }

  Widget _buildUpcomingExams(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        // Card 1: Test In Progress
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Stack(
            children: [
              Positioned(
                top: 0,
                bottom: 0,
                left: 0,
                width: 4.0,
                child: Container(
                  decoration: const BoxDecoration(color: Color(0xFF005C9E), borderRadius: BorderRadius.horizontal(left: Radius.circular(16.0))),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                          decoration: const BoxDecoration(color: Color(0xFFE8F2FF), borderRadius: BorderRadius.all(Radius.circular(6.0))),
                          child: const Text('In Progress', style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                        ),
                        Row(
                          children: const [
                            Icon(Icons.schedule, size: 15.0, color: Color(0xFF475569)),
                            SizedBox(width: 4.0),
                            Text('45:00 Remaining', style: TextStyle(fontSize: 12.0, color: Color(0xFF475569), fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 12.0),
                    const Text('Mid-Term: Advanced Algorithms', style: TextStyle(fontSize: 16.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                    const SizedBox(height: 6.0),
                    const Text('Units 1-4: Complexity analysis, sorting, and graph theory. Mandatory for Year 2.', style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B))),
                    const SizedBox(height: 14.0),
                    Row(
                      children: [
                        _buildExamBadge(Icons.analytics_outlined, '50 Marks'),
                        const SizedBox(width: 10.0),
                        _buildExamBadge(Icons.timer_outlined, '90 Mins'),
                        const SizedBox(width: 10.0),
                        _buildExamBadge(Icons.wifi, 'Online'),
                      ],
                    ),
                    const SizedBox(height: 16.0),
                    CustomButton(
                      text: 'Resume Test',
                      backgroundColor: const Color(0xFF005C9E),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        
        const SizedBox(height: 12.0),

        // Card 2: Python Frameworks Quiz
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 40.0,
                      height: 40.0,
                      decoration: const BoxDecoration(color: Color(0xFFF1F5F9), shape: BoxShape.circle),
                      child: const Icon(Icons.sticky_note_2_outlined, color: Color(0xFF64748B)),
                    ),
                    const SizedBox(width: 12.0),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Python Frameworks Quiz', style: TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          SizedBox(height: 2.0),
                          Text('Starts in 2 days \u2022 Jan 15, 10:00 AM', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12.0),
                SizedBox(
                  height: 32.0,
                  width: 100.0,
                  child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Color(0xFFE2E8F0)),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6.0)),
                      padding: EdgeInsets.zero,
                    ),
                    onPressed: () {},
                    child: const Text('Details', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.0, color: Color(0xFF0F172A))),
                  ),
                ),
              ],
            ),
          ),
        ),
        
        const SizedBox(height: 12.0),

        // Card 3: Database Lab
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 40.0,
                      height: 40.0,
                      decoration: const BoxDecoration(color: Color(0xFFF1F5F9), shape: BoxShape.circle),
                      child: const Icon(Icons.school_outlined, color: Color(0xFF64748B)),
                    ),
                    const SizedBox(width: 12.0),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Database Management (Lab)', style: TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          SizedBox(height: 2.0),
                          Text('Venue: Lab 304 \u2022 Jan 18, 02:30 PM', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12.0),
                SizedBox(
                  height: 32.0,
                  width: 110.0,
                  child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Color(0xFFE2E8F0)),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6.0)),
                      padding: EdgeInsets.zero,
                    ),
                    onPressed: () {},
                    child: const Text('Hall Ticket', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.0, color: Color(0xFF0F172A))),
                  ),
                ),
              ],
            ),
          ),
        ),
        
        const SizedBox(height: 16.0),

        // Upcoming Schedule Section
        Container(
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(color: const Color(0xFFE2E8F0).withOpacity(0.4), borderRadius: BorderRadius.circular(16.0)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text('Upcoming Schedule', style: TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
              const SizedBox(height: 12.0),
              _buildScheduleBrief('JAN 15', 'Python Frameworks\n10:00 AM \u2022 Online'),
              const Divider(color: Color(0xFFCBD5E1), height: 16.0),
              _buildScheduleBrief('JAN 18', 'Database Lab\n02:30 PM \u2022 Lab 304'),
            ],
          ),
        ),
        
        const SizedBox(height: 16.0),

        // Exam Protocols card
        Container(
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(color: const Color(0xFFE8F2FF), borderRadius: BorderRadius.circular(16.0)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: const [
                  Icon(Icons.info_outline, color: Color(0xFF005C9E), size: 18.0),
                  SizedBox(width: 8.0),
                  Text('EXAM PROTOCOLS', style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: Color(0xFF005C9E), letterSpacing: 1.0)),
                ],
              ),
              const SizedBox(height: 12.0),
              _buildBullet('Ensure stable internet for online tests.'),
              _buildBullet('Carry ID cards for offline lab exams.'),
              _buildBullet('Report issues to student helpdesk.'),
            ],
          ),
        ),
        
        const SizedBox(height: 20.0),

        // Performance Summary Section
        Container(
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16.0),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Performance Summary', style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                  TextButton(
                    onPressed: () {},
                    child: Row(
                      children: const [
                        Text('View Detailed Report ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11.0)),
                        Icon(Icons.arrow_forward_ios, size: 10.0),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10.0),
              const Text('Overall CGPA', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
              const SizedBox(height: 2.0),
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: const [
                  Text('8.4', style: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                  SizedBox(width: 4.0),
                  Text('/ 10.0', style: TextStyle(fontSize: 13.0, color: Color(0xFF64748B))),
                ],
              ),
              const SizedBox(height: 12.0),
              ClipRRect(
                borderRadius: BorderRadius.circular(4.0),
                child: const LinearProgressIndicator(
                  value: 0.84,
                  minHeight: 5.0,
                  backgroundColor: Color(0xFFF1F5F9),
                  valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF005C9E)),
                ),
              ),
              const SizedBox(height: 16.0),
              Row(
                children: [
                  Expanded(
                    child: _buildSimpleMetric('Tests Attempted', '12', subtitle: '4 pending this semester'),
                  ),
                  Expanded(
                    child: _buildSimpleMetric('Average Score', '78%', subtitle: '+2.4% since midterm', hasTrend: true),
                  ),
                ],
              ),
              const Divider(color: Color(0xFFE2E8F0), height: 24.0),
              const Text('Top Subject', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
              const SizedBox(height: 2.0),
              const Text('Data Structures', style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
              const SizedBox(height: 4.0),
              const Text('94/100 Average', style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B))),
            ],
          ),
        ),
        
        const SizedBox(height: 32.0),
      ],
    );
  }

  Widget _buildExamBadge(IconData icon, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 6.0),
      decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(6.0)),
      child: Row(
        children: [
          Icon(icon, size: 14.0, color: const Color(0xFF64748B)),
          const SizedBox(width: 4.0),
          Text(label, style: const TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: Color(0xFF475569))),
        ],
      ),
    );
  }

  Widget _buildScheduleBrief(String date, String desc) {
    return Row(
      children: [
        Container(
          width: 56.0,
          alignment: Alignment.centerLeft,
          child: Text(date, style: const TextStyle(fontSize: 13.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
        ),
        Expanded(
          child: Text(desc, style: const TextStyle(fontSize: 13.0, color: Color(0xFF475569), height: 1.35)),
        ),
      ],
    );
  }

  Widget _buildBullet(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('\u2022 ', style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.bold)),
          Expanded(child: Text(text, style: const TextStyle(fontSize: 12.5, color: Color(0xFF475569)))),
        ],
      ),
    );
  }

  Widget _buildSimpleMetric(String label, String value, {required String subtitle, bool hasTrend = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
        const SizedBox(height: 4.0),
        Text(value, style: const TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
        const SizedBox(height: 2.0),
        Row(
          children: [
            if (hasTrend) const Icon(Icons.trending_up, size: 12.0, color: Color(0xFF005C9E)),
            if (hasTrend) const SizedBox(width: 3.0),
            Expanded(
              child: Text(
                subtitle,
                style: TextStyle(
                  fontSize: 11.0,
                  color: hasTrend ? const Color(0xFF005C9E) : const Color(0xFF94A3B8),
                  fontWeight: hasTrend ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

// ----------------------------------------------------
// 8. MY ATTENDANCE SCREEN (Screenshot 10)
// ----------------------------------------------------
class StudentAttendanceScreen extends ConsumerWidget {
  const StudentAttendanceScreen({Key? key}) : super(key: key);

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
            icon: const Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications_none, color: Color(0xFF0F172A)),
            ),
            onPressed: () => context.push('/student/notifications'),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0, left: 8.0),
            child: CircleAvatar(
              radius: 14,
              backgroundImage: NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I',
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
            const Text(
              'My Attendance',
              style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
            ),
            const SizedBox(height: 4.0),
            const Text(
              'Track your lecture participation, monitor trends, and ensure you stay above the minimum academic requirements.',
              style: TextStyle(fontSize: 12.5, color: Color(0xFF64748B), height: 1.35),
            ),
            const SizedBox(height: 16.0),

            // Circular attendance gauge card
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  children: [
                    const Text('OVERALL ATTENDANCE', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B), fontWeight: FontWeight.bold, letterSpacing: 0.8)),
                    const SizedBox(height: 16.0),
                    Stack(
                      alignment: Alignment.center,
                      children: const [
                        SizedBox(
                          width: 140.0,
                          height: 140.0,
                          child: CircularProgressIndicator(
                            value: 0.92,
                            strokeWidth: 10.0,
                            backgroundColor: Color(0xFFF1F5F9),
                            valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF005C9E)),
                          ),
                        ),
                        Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text('92%', style: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                            SizedBox(height: 2.0),
                            Text('High Participation', style: TextStyle(fontSize: 11.0, color: Colors.green, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 24.0),
                    Row(
                      children: [
                        Expanded(
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 12.0),
                            decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(8.0)),
                            child: Column(
                              children: const [
                                Text('46', style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E))),
                                SizedBox(height: 2.0),
                                Text('Present', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(width: 16.0),
                        Expanded(
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 12.0),
                            decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(8.0)),
                            child: Column(
                              children: const [
                                Text('04', style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Colors.red)),
                                SizedBox(height: 2.0),
                                Text('Absent', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16.0),

            // Calendar August 2024 View Card
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
                            Icon(Icons.calendar_month, color: Color(0xFF005C9E), size: 20.0),
                            SizedBox(width: 8.0),
                            Text('August 2024', style: TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          ],
                        ),
                        Row(
                          children: [
                            IconButton(icon: const Icon(Icons.chevron_left, size: 20.0), onPressed: () {}),
                            IconButton(icon: const Icon(Icons.chevron_right, size: 20.0), onPressed: () {}),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 10.0),
                    // Mon - Sun labels
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: const [
                        Text('MON', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('TUE', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('WED', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('THU', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('FRI', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('SAT', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                        Text('SUN', style: TextStyle(fontSize: 10.0, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
                      ],
                    ),
                    const SizedBox(height: 8.0),
                    // Row 1 of Calendar (Days 1 to 4 placeholder)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildCalDay('-', isMuted: true),
                        _buildCalDay('-', isMuted: true),
                        _buildCalDay('-', isMuted: true),
                        _buildCalDay('01', isPresent: true),
                        _buildCalDay('02', isPresent: true),
                        _buildCalDay('03', isWeekend: true),
                        _buildCalDay('04', isWeekend: true),
                      ],
                    ),
                    const SizedBox(height: 8.0),
                    // Row 2 of Calendar (Days 5 to 11 placeholder)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildCalDay('05', isPresent: true),
                        _buildCalDay('06', isAbsent: true),
                        _buildCalDay('07', isPresent: true),
                        _buildCalDay('08', isPresent: true),
                        _buildCalDay('09', isPresent: true),
                        _buildCalDay('10', isWeekend: true),
                        _buildCalDay('11', isWeekend: true),
                      ],
                    ),
                    const SizedBox(height: 12.0),
                    Center(child: Text('Showing mid-month partial view...', style: TextStyle(fontSize: 11.5, fontStyle: FontStyle.italic, color: Colors.grey.shade400))),
                    const Divider(color: Color(0xFFE2E8F0), height: 24.0),
                    // Dot legends row
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildDotLegend(Colors.blue, 'Present'),
                        const SizedBox(width: 16.0),
                        _buildDotLegend(Colors.red, 'Absent'),
                        const SizedBox(width: 16.0),
                        _buildDotLegend(Colors.grey.shade300, 'Holiday/Closed'),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16.0),

            // Attendance Trends Card
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0), side: const BorderSide(color: Color(0xFFE2E8F0))),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text('Attendance Trends', style: TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                    const SizedBox(height: 16.0),
                    _buildTrendBar('Algorithms & Data Structures', 0.98),
                    const SizedBox(height: 12.0),
                    _buildTrendBar('Database Systems', 0.85),
                    const SizedBox(height: 12.0),
                    _buildTrendBar('Web Engineering', 0.94),
                    const Divider(color: Color(0xFFE2E8F0), height: 28.0),
                    SizedBox(
                      height: 38.0,
                      child: OutlinedButton(
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Color(0xFFE2E8F0)),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                        ),
                        onPressed: () {},
                        child: const Text('Download Analytics PDF', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16.0),

            // Requirement Alert Card
            Container(
              padding: const EdgeInsets.all(20.0),
              decoration: BoxDecoration(color: const Color(0xFF005C9E), borderRadius: BorderRadius.circular(16.0)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Requirement Alert', style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 6.0),
                  const Text(
                    'You are currently 12% above the 80% minimum mandatory attendance for the current semester.',
                    style: TextStyle(fontSize: 13.0, color: Colors.white70, height: 1.4),
                  ),
                  const SizedBox(height: 16.0),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 4.0),
                    decoration: BoxDecoration(color: Colors.white.withOpacity(0.16), borderRadius: BorderRadius.circular(12.0)),
                    child: const Text('STATUS: SAFE', style: TextStyle(fontSize: 11.0, fontWeight: FontWeight.bold, color: Colors.white)),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24.0),

            // Daily Class Logs Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Daily Class Logs', style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.w800, color: Color(0xFF0F172A))),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                  decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(6.0)),
                  child: const Text('Recent First', style: TextStyle(fontSize: 11.0, fontWeight: FontWeight.bold, color: Color(0xFF64748B))),
                ),
              ],
            ),
            const SizedBox(height: 12.0),
            
            _buildClassLogItem(
              title: 'Data Structures - Lecture 14',
              time: 'Aug 08, 2024 \u2022 09:00 AM - 11:00 AM',
              location: 'Hall A-202',
              isPresent: true,
              iconRef: Icons.computer_outlined,
            ),
            const SizedBox(height: 10.0),
            _buildClassLogItem(
              title: 'DB Management - Workshop',
              time: 'Aug 07, 2024 \u2022 02:00 PM - 04:00 PM',
              location: 'Lab 04',
              isPresent: true,
              iconRef: Icons.description_outlined,
            ),
            const SizedBox(height: 10.0),
            _buildClassLogItem(
              title: 'Systems Architecture - Seminar',
              time: 'Aug 08, 2024 \u2022 10:00 AM - 12:00 PM',
              location: 'Virtual Room 1',
              isPresent: false,
              iconRef: Icons.campaign_outlined,
            ),
            const SizedBox(height: 10.0),
            _buildClassLogItem(
              title: 'Web Engineering - Lecture 09',
              time: 'Aug 05, 2024 \u2022 01:00 PM - 03:00 PM',
              location: 'Hall C-10',
              isPresent: true,
              iconRef: Icons.language,
            ),
            
            const SizedBox(height: 48.0),
          ],
        ),
      ),
    );
  }

  Widget _buildCalDay(String label, {bool isPresent = false, bool isAbsent = false, bool isWeekend = false, bool isMuted = false}) {
    Color? bgColor;
    Color txtColor = const Color(0xFF0F172A);
    if (isPresent) {
      bgColor = const Color(0xFFE8F2FF);
      txtColor = const Color(0xFF005C9E);
    } else if (isAbsent) {
      bgColor = Colors.red.shade50;
      txtColor = Colors.red.shade700;
    } else if (isWeekend) {
      bgColor = const Color(0xFFF1F5F9);
      txtColor = const Color(0xFF64748B);
    } else if (isMuted) {
      txtColor = const Color(0xFFCBD5E1);
    }
    return Container(
      width: 32.0,
      height: 32.0,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(6.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: txtColor),
          ),
          if (isPresent)
            Container(width: 4.0, height: 4.0, decoration: const BoxDecoration(color: Color(0xFF005C9E), shape: BoxShape.circle)),
          if (isAbsent)
            Container(width: 4.0, height: 4.0, decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle)),
        ],
      ),
    );
  }

  Widget _buildDotLegend(Color color, String label) {
    return Row(
      children: [
        Container(width: 8.0, height: 8.0, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 6.0),
        Text(label, style: const TextStyle(fontSize: 11.5, color: Color(0xFF64748B), fontWeight: FontWeight.w600)),
      ],
    );
  }

  Widget _buildTrendBar(String subject, double value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(subject, style: const TextStyle(fontSize: 13.0, fontWeight: FontWeight.w600, color: Color(0xFF475569))),
            Text('${(value * 100).toInt()}%', style: const TextStyle(fontSize: 13.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
          ],
        ),
        const SizedBox(height: 6.0),
        ClipRRect(
          borderRadius: BorderRadius.circular(4.0),
          child: LinearProgressIndicator(
            value: value,
            minHeight: 5.0,
            backgroundColor: const Color(0xFFF1F5F9),
            valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF005C9E)),
          ),
        ),
      ],
    );
  }

  Widget _buildClassLogItem({required String title, required String time, required String location, required bool isPresent, required IconData iconRef}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 12.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Container(
            width: 40.0,
            height: 40.0,
            decoration: const BoxDecoration(color: Color(0xFFF1F5F9), shape: BoxShape.circle),
            child: Icon(iconRef, color: const Color(0xFF005C9E), size: 18.0),
          ),
          const SizedBox(width: 14.0),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 14.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                const SizedBox(height: 3.0),
                Text(time, style: const TextStyle(fontSize: 11.5, color: Color(0xFF64748B))),
                const SizedBox(height: 2.0),
                Text(location, style: const TextStyle(fontSize: 11.5, color: Color(0xFF94A3B8), fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
            decoration: BoxDecoration(
              color: isPresent ? const Color(0xFFE8F2FF) : Colors.red.shade50,
              borderRadius: BorderRadius.circular(6.0),
            ),
            child: Text(
              isPresent ? 'PRESENT' : 'ABSENT',
              style: TextStyle(fontSize: 9.5, fontWeight: FontWeight.bold, color: isPresent ? const Color(0xFF005C9E) : Colors.red.shade700),
            ),
          ),
        ],
      ),
    );
  }
}

// ----------------------------------------------------
// PLACEHOLDERS FOR REMAINING PORTAL SCREENS (COMPILE READY)
// ----------------------------------------------------
class StudentResultsScreen extends StatelessWidget {
  const StudentResultsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Exam Results'),
      body: Center(child: Text('Results Sheets & Term Grades (Placeholder)', style: TextStyle(color: Theme.of(context).colorScheme.outline))),
    );
  }
}

class StudentCertificatesScreen extends StatelessWidget {
  const StudentCertificatesScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'My Certificates'),
      body: Center(child: Text('Course Completion Certificates (Placeholder)', style: TextStyle(color: Theme.of(context).colorScheme.outline))),
    );
  }
}

class StudentPaymentsScreen extends StatelessWidget {
  const StudentPaymentsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Fee Invoices & Payments'),
      body: Center(child: Text('Payments Ledger & Invoices (Placeholder)', style: TextStyle(color: Theme.of(context).colorScheme.outline))),
    );
  }
}

class StudentNotificationsScreen extends StatelessWidget {
  const StudentNotificationsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Notifications'),
      body: Center(child: Text('Board Notices & Alerts (Placeholder)', style: TextStyle(color: Theme.of(context).colorScheme.outline))),
    );
  }
}

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

class StudentSettingsScreen extends StatelessWidget {
  const StudentSettingsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Settings', showBackButton: false),
      body: Center(child: Text('App Settings & Language configurations (Placeholder)', style: TextStyle(color: Theme.of(context).colorScheme.outline))),
    );
  }
}
