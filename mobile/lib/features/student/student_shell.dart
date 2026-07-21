import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class StudentShell extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const StudentShell({
    Key? key,
    required this.navigationShell,
  }) : super(key: key);

  void _onTap(BuildContext context, int index) {
    navigationShell.goBranch(
      index,
      initialLocation: index == navigationShell.currentIndex,
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: NavigationBar(
        selectedIndex: navigationShell.currentIndex,
        onDestinationSelected: (index) => _onTap(context, index),
        indicatorColor: const Color(0xFFE8F2FF), // Custom active capsule light blue background
        backgroundColor: Colors.white,
        elevation: 8,
        shadowColor: Colors.black.withOpacity(0.4),
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        height: 68.0,
        destinations: [
          NavigationDestination(
            icon: Icon(Icons.grid_view_outlined, color: const Color(0xFF64748B)),
            selectedIcon: Icon(Icons.grid_view, color: theme.colorScheme.primary),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.school_outlined, color: const Color(0xFF64748B)),
            selectedIcon: Icon(Icons.school, color: theme.colorScheme.primary),
            label: 'Courses',
          ),
          NavigationDestination(
            icon: Icon(Icons.play_circle_outline, color: const Color(0xFF64748B)),
            selectedIcon: Icon(Icons.play_circle, color: theme.colorScheme.primary),
            label: 'Classes',
          ),
          NavigationDestination(
            icon: Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications_none_outlined, color: const Color(0xFF64748B)),
            ),
            selectedIcon: Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications, color: theme.colorScheme.primary),
            ),
            label: 'Alerts',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline, color: const Color(0xFF64748B)),
            selectedIcon: Icon(Icons.person, color: theme.colorScheme.primary),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
