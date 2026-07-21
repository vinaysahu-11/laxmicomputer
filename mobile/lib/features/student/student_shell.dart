import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class StudentShell extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const StudentShell({
    Key? key,
    required this.navigationShell,
  }) : super(key: key);

  void _onTap(BuildContext context, int index) {
    int targetBranch = index;
    if (index == 2) {
      // Dynamic center tab (index 2 in UI)
      final currentBranch = navigationShell.currentIndex;
      if (currentBranch == 5) {
        targetBranch = 5; // Results
      } else if (currentBranch == 6) {
        targetBranch = 6; // Certificates
      } else if (currentBranch == 7) {
        targetBranch = 7; // Payments
      } else {
        targetBranch = 2; // Classes / Schedule
      }
    } else if (index == 3) {
      targetBranch = 3; // Alerts
    } else if (index == 4) {
      targetBranch = 4; // Profile
    }
    
    navigationShell.goBranch(
      targetBranch,
      initialLocation: targetBranch == navigationShell.currentIndex,
    );
  }

  int _getSelectedIndex() {
    final idx = navigationShell.currentIndex;
    if (idx == 0) return 0;
    if (idx == 1) return 1;
    if (idx == 2 || idx == 5 || idx == 6 || idx == 7) return 2;
    if (idx == 3) return 3;
    if (idx == 4) return 4;
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final currentBranch = navigationShell.currentIndex;
    
    // Determine dynamic icon, selectedIcon and label for the center tab (index 2)
    IconData centerIcon = Icons.play_circle_outline;
    IconData centerSelectedIcon = Icons.play_circle;
    String centerLabel = 'Classes';

    if (currentBranch == 5) {
      centerIcon = Icons.star_outline;
      centerSelectedIcon = Icons.star;
      centerLabel = 'Results';
    } else if (currentBranch == 6) {
      centerIcon = Icons.verified_outlined;
      centerSelectedIcon = Icons.verified;
      centerLabel = 'Certificates';
    } else if (currentBranch == 7) {
      centerIcon = Icons.credit_card_outlined;
      centerSelectedIcon = Icons.credit_card;
      centerLabel = 'Payments';
    }

    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: NavigationBar(
        selectedIndex: _getSelectedIndex(),
        onDestinationSelected: (index) => _onTap(context, index),
        indicatorColor: const Color(0xFFE8F2FF), // Custom active capsule light blue background
        backgroundColor: Colors.white,
        elevation: 8,
        shadowColor: Colors.black.withOpacity(0.4),
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        height: 68.0,
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.grid_view_outlined, color: Color(0xFF64748B)),
            selectedIcon: Icon(Icons.grid_view, color: theme.colorScheme.primary),
            label: 'Home',
          ),
          NavigationDestination(
            icon: const Icon(Icons.school_outlined, color: Color(0xFF64748B)),
            selectedIcon: Icon(Icons.school, color: theme.colorScheme.primary),
            label: 'Courses',
          ),
          NavigationDestination(
            icon: Icon(centerIcon, color: const Color(0xFF64748B)),
            selectedIcon: Icon(centerSelectedIcon, color: theme.colorScheme.primary),
            label: centerLabel,
          ),
          NavigationDestination(
            icon: const Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications_none_outlined, color: Color(0xFF64748B)),
            ),
            selectedIcon: Badge(
              backgroundColor: Colors.red,
              smallSize: 8,
              child: Icon(Icons.notifications, color: theme.colorScheme.primary),
            ),
            label: 'Alerts',
          ),
          NavigationDestination(
            icon: const Icon(Icons.person_outline, color: Color(0xFF64748B)),
            selectedIcon: Icon(Icons.person, color: theme.colorScheme.primary),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
