import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/providers.dart';
import '../../core/widgets/custom_button.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _rememberMe = false;
  bool _obscurePassword = true;
  String _selectedRole = 'student';

  void _handleLogin(String role) async {
    final success = await ref.read(authNotifierProvider.notifier).login(
          _emailController.text,
          _passwordController.text,
          role,
        );
    if (success && mounted) {
      if (role == 'student') {
        context.go('/student');
      } else {
        context.go('/teacher');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authNotifierProvider);
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9), // Slate background
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Header Logo and Title
                Row(
                  children: [
                    Container(
                      width: 44.0,
                      height: 44.0,
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primary,
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      child: const Icon(
                        Icons.school,
                        color: Colors.white,
                        size: 24.0,
                      ),
                    ),
                    const SizedBox(width: 12.0),
                    const Text(
                      'Tech Academy',
                      style: TextStyle(
                        fontSize: 26.0,
                        fontWeight: FontWeight.w800,
                        color: Color(0xFF005C9E),
                        letterSpacing: -0.5,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16.0),
                // Greeting message
                const Text(
                  'Welcome back! Please enter your\ncredentials to access your dashboard.',
                  style: TextStyle(
                    fontSize: 14.5,
                    color: Color(0xFF475569),
                    fontWeight: FontWeight.w500,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 24.0),
                
                // Form Card Container
                Container(
                  padding: const EdgeInsets.all(24.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16.0),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.02),
                        blurRadius: 16.0,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Role Selection Options
                      Row(
                        children: [
                          Expanded(
                            child: InkWell(
                              onTap: () => setState(() => _selectedRole = 'student'),
                              child: Container(
                                height: 42.0,
                                decoration: BoxDecoration(
                                  color: _selectedRole == 'student' ? const Color(0xFF005C9E) : Colors.white,
                                  borderRadius: BorderRadius.circular(8.0),
                                  border: Border.all(
                                    color: _selectedRole == 'student' ? const Color(0xFF005C9E) : const Color(0xFFE2E8F0),
                                  ),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.school,
                                      size: 16.0,
                                      color: _selectedRole == 'student' ? Colors.white : const Color(0xFF64748B),
                                    ),
                                    const SizedBox(width: 8.0),
                                    Text(
                                      'Student',
                                      style: TextStyle(
                                        fontSize: 13.5,
                                        fontWeight: FontWeight.bold,
                                        color: _selectedRole == 'student' ? Colors.white : const Color(0xFF64748B),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 12.0),
                          Expanded(
                            child: InkWell(
                              onTap: () => setState(() => _selectedRole = 'teacher'),
                              child: Container(
                                height: 42.0,
                                decoration: BoxDecoration(
                                  color: _selectedRole == 'teacher' ? const Color(0xFF005C9E) : Colors.white,
                                  borderRadius: BorderRadius.circular(8.0),
                                  border: Border.all(
                                    color: _selectedRole == 'teacher' ? const Color(0xFF005C9E) : const Color(0xFFE2E8F0),
                                  ),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.co_present,
                                      size: 16.0,
                                      color: _selectedRole == 'teacher' ? Colors.white : const Color(0xFF64748B),
                                    ),
                                    const SizedBox(width: 8.0),
                                    Text(
                                      'Teacher',
                                      style: TextStyle(
                                        fontSize: 13.5,
                                        fontWeight: FontWeight.bold,
                                        color: _selectedRole == 'teacher' ? Colors.white : const Color(0xFF64748B),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24.0),

                      // Underlined Email Input field
                      TextField(
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: InputDecoration(
                          labelText: _selectedRole == 'student' ? 'Email or Student ID' : 'Email or Teacher ID',
                          labelStyle: const TextStyle(
                            color: Color(0xFF64748B),
                            fontSize: 14.0,
                          ),
                          enabledBorder: const UnderlineInputBorder(
                            borderSide: BorderSide(color: Color(0xFFCBD5E1), width: 1.5),
                          ),
                          focusedBorder: const UnderlineInputBorder(
                            borderSide: BorderSide(color: Color(0xFF0066AE), width: 2.0),
                          ),
                          contentPadding: const EdgeInsets.symmetric(vertical: 8.0),
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      
                      // Underlined Password Input field
                      TextField(
                        controller: _passwordController,
                        obscureText: _obscurePassword,
                        decoration: InputDecoration(
                          labelText: 'Password',
                          labelStyle: const TextStyle(
                            color: Color(0xFF64748B),
                            fontSize: 14.0,
                          ),
                          enabledBorder: const UnderlineInputBorder(
                            borderSide: BorderSide(color: Color(0xFFCBD5E1), width: 1.5),
                          ),
                          focusedBorder: const UnderlineInputBorder(
                            borderSide: BorderSide(color: Color(0xFF0066AE), width: 2.0),
                          ),
                          contentPadding: const EdgeInsets.symmetric(vertical: 8.0),
                          suffixIcon: IconButton(
                            icon: Icon(
                              _obscurePassword ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                              color: const Color(0xFF64748B),
                              size: 20.0,
                            ),
                            onPressed: () {
                              setState(() {
                                _obscurePassword = !_obscurePassword;
                              });
                            },
                          ),
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      
                      // Remember Me & Forgot Password Row
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Checkbox(
                                value: _rememberMe,
                                visualDensity: VisualDensity.compact,
                                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                activeColor: theme.colorScheme.primary,
                                onChanged: (value) {
                                  setState(() {
                                    _rememberMe = value ?? false;
                                  });
                                },
                              ),
                              const SizedBox(width: 6.0),
                              const Text(
                                'Remember Me',
                                style: TextStyle(
                                  fontSize: 13.5,
                                  color: Color(0xFF475569),
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                          GestureDetector(
                            onTap: () => context.push('/forgot-password'),
                            child: Text(
                              'Forgot Password?',
                              style: TextStyle(
                                fontSize: 13.5,
                                fontWeight: FontWeight.bold,
                                color: theme.colorScheme.primary,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24.0),
                      
                      // Primary login buttons
                      CustomButton(
                        text: 'Login',
                        isLoading: authState.isLoading,
                        backgroundColor: const Color(0xFF005C9E),
                        onPressed: () => _handleLogin(_selectedRole),
                      ),
                      const SizedBox(height: 10.0),
                      
                      // Divider OR
                      Row(
                        children: const [
                          Expanded(child: Divider(color: Color(0xFFE2E8F0))),
                          Padding(
                            padding: EdgeInsets.symmetric(horizontal: 16.0),
                            child: Text(
                              'OR',
                              style: TextStyle(
                                fontSize: 12.0,
                                color: Color(0xFF94A3B8),
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          Expanded(child: Divider(color: Color(0xFFE2E8F0))),
                        ],
                      ),
                      const SizedBox(height: 20.0),
                      
                      // Social Login buttons row
                      Row(
                        children: [
                          Expanded(
                            child: _buildSocialButton(
                              label: 'Google',
                              logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I',
                              onPressed: () => _handleLogin('student'),
                            ),
                          ),
                          const SizedBox(width: 12.0),
                          Expanded(
                            child: _buildSocialButton(
                              label: 'Office 365',
                              logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8R1xHQ-91rAG8uSNBeP8yHYKUvREHaA3Y1l6XtLnborfK6wjOzXjAi2caaJ_X1b-mJph9n-PbvdvgxzvtAq5yuieoLhJ7SiVs7Jtc3jio2RV9s0MnkMwab22sJQ95FUfyCoTnB8V38MckRy-3SwqSYd1sqHAk3HdBZWNRYJceiCjGUO5NCHsAk2iQmSthYtrngxxh1ERVkhh958px_EA90kE-nk6RwPh78o32g8vMihc_OpVq3n0jjmGvKmQHOuufg_svTA6TNi8c',
                              onPressed: () => _handleLogin('student'),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(height: 28.0),
                
                // Bottom Register redirection
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      "Don't have an account? ",
                      style: TextStyle(
                        fontSize: 14.0,
                        color: Color(0xFF475569),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    GestureDetector(
                      onTap: () => context.push('/forgot-password'),
                      child: const Text(
                        'Register',
                        style: TextStyle(
                          fontSize: 14.0,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF005C9E),
                        ),
                      ),
                    ),
                  ],
                ),
                
                const SizedBox(height: 48.0),
                
                // Footer Policies links
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _buildFooterLink('Privacy Policy'),
                    _buildFooterDot(),
                    _buildFooterLink('Terms of Service'),
                    _buildFooterDot(),
                    _buildFooterLink('Support'),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSocialButton({required String label, required String logoUrl, required VoidCallback onPressed}) {
    return OutlinedButton(
      style: OutlinedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 12.0),
        side: const BorderSide(color: Color(0xFFE2E8F0)),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        backgroundColor: Colors.white,
      ),
      onPressed: onPressed,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.network(
            logoUrl,
            width: 18.0,
            height: 18.0,
            errorBuilder: (context, error, stackTrace) => const Icon(Icons.account_circle, size: 18.0),
          ),
          const SizedBox(width: 8.0),
          Text(
            label,
            style: const TextStyle(
              fontSize: 14.0,
              fontWeight: FontWeight.bold,
              color: Color(0xFF0F172A),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFooterLink(String label) {
    return GestureDetector(
      onTap: () {},
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 11.5,
          color: Color(0xFF64748B),
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Widget _buildFooterDot() {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 8.0),
      child: Text(
        '•',
        style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10.0),
      ),
    );
  }
}

// Keep placeholders for forgot and reset screens underneath
class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final emailController = TextEditingController();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        title: Row(
          children: const [
            Text(
              'school ',
              style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.normal, fontSize: 20.0),
            ),
            Text(
              'Computer\nAcademy',
              style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.bold, fontSize: 16.0, height: 1.1),
            ),
          ],
        ),
        actions: [
          TextButton.icon(
            style: TextButton.styleFrom(foregroundColor: const Color(0xFF475569)),
            icon: const Icon(Icons.arrow_back, size: 14.0),
            label: const Text('Back to\nLogin', style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, height: 1.1)),
            onPressed: () => context.go('/login'),
          ),
          const SizedBox(width: 8.0),
        ],
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraints.maxHeight),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      children: [
                        const SizedBox(height: 16.0),
                        // Inner Card
                        Card(
                          elevation: 0,
                          color: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16.0),
                            side: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(24.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                // Top Icon
                                Center(
                                  child: CircleAvatar(
                                    radius: 36,
                                    backgroundColor: const Color(0xFFE8F2FF),
                                    child: Icon(Icons.lock_reset, size: 36.0, color: const Color(0xFF005C9E)),
                                  ),
                                ),
                                const SizedBox(height: 24.0),
                                const Text(
                                  'Reset Your Password',
                                  style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                  textAlign: TextAlign.center,
                                ),
                                const SizedBox(height: 8.0),
                                const Text(
                                  'Enter your registered details to receive a\nsecure verification code.',
                                  style: TextStyle(fontSize: 13.0, color: Color(0xFF64748B), height: 1.4),
                                  textAlign: TextAlign.center,
                                ),
                                const SizedBox(height: 28.0),

                                // Steps row
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    _buildStepCircle('1', 'Verify OTP', true),
                                    Container(
                                      width: 60.0,
                                      height: 1.0,
                                      color: const Color(0xFFCBD5E1),
                                      margin: const EdgeInsets.symmetric(horizontal: 8.0),
                                    ),
                                    _buildStepCircle('2', 'New Password', false),
                                  ],
                                ),
                                const SizedBox(height: 32.0),

                                const Text(
                                  'Email or Mobile',
                                  style: TextStyle(fontSize: 11.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8.0),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12.0),
                                  decoration: BoxDecoration(
                                    border: Border.all(color: const Color(0xFFCBD5E1)),
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                  child: Row(
                                    children: [
                                      const Icon(Icons.alternate_email, color: Color(0xFF64748B), size: 18.0),
                                      const SizedBox(width: 8.0),
                                      Expanded(
                                        child: TextField(
                                          controller: emailController,
                                          decoration: const InputDecoration(
                                            hintText: 'teacher@academy.edu or +1...',
                                            hintStyle: TextStyle(fontSize: 13.5, color: Color(0xFF94A3B8)),
                                            border: InputBorder.none,
                                            contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                                          ),
                                          keyboardType: TextInputType.emailAddress,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 24.0),

                                SizedBox(
                                  height: 46.0,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF005C9E),
                                      foregroundColor: Colors.white,
                                      elevation: 0,
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                                    ),
                                    onPressed: () {
                                      final val = emailController.text;
                                      context.push('/otp-verify?email=${Uri.encodeComponent(val.isNotEmpty ? val : 'teacher@academy.edu')}');
                                    },
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: const [
                                        Text('Send OTP ', style: TextStyle(fontSize: 14.0, fontWeight: FontWeight.bold)),
                                        Icon(Icons.send, size: 14.0),
                                      ],
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 24.0),

                                // Support Link
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    const Text('Difficulty receiving OTP? ', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                                    GestureDetector(
                                      onTap: () {},
                                      child: const Text(
                                        'Contact Support',
                                        style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E), decoration: TextDecoration.underline),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),

                    // Footer Section
                    Padding(
                      padding: const EdgeInsets.only(top: 24.0),
                      child: Column(
                        children: const [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.shield_outlined, size: 14.0, color: Color(0xFF64748B)),
                              SizedBox(width: 4.0),
                              Text('Secure 256-bit Encrypted Session', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
                            ],
                          ),
                          SizedBox(height: 4.0),
                          Text(
                            '© 2024 Computer Academy. Academic Portal Security.',
                            style: TextStyle(fontSize: 10.5, color: Color(0xFF94A3B8)),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildStepCircle(String step, String label, bool active) {
    return Column(
      children: [
        CircleAvatar(
          radius: 16.0,
          backgroundColor: active ? Colors.white : const Color(0xFFF1F5F9),
          child: Container(
            alignment: Alignment.center,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: active ? const Color(0xFF005C9E) : const Color(0xFFCBD5E1), width: 1.5),
            ),
            child: Text(
              step,
              style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: active ? const Color(0xFF005C9E) : const Color(0xFF64748B)),
            ),
          ),
        ),
        const SizedBox(height: 6.0),
        Text(
          label,
          style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: active ? const Color(0xFF005C9E) : const Color(0xFF64748B)),
        ),
      ],
    );
  }
}

class OtpVerificationScreen extends StatelessWidget {
  final String email;

  const OtpVerificationScreen({Key? key, required this.email}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final otpController = TextEditingController();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        title: Row(
          children: const [
            Text(
              'school ',
              style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.normal, fontSize: 20.0),
            ),
            Text(
              'Computer\nAcademy',
              style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.bold, fontSize: 16.0, height: 1.1),
            ),
          ],
        ),
        actions: [
          TextButton.icon(
            style: TextButton.styleFrom(foregroundColor: const Color(0xFF475569)),
            icon: const Icon(Icons.arrow_back, size: 14.0),
            label: const Text('Back to\nLogin', style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, height: 1.1)),
            onPressed: () => context.go('/login'),
          ),
          const SizedBox(width: 8.0),
        ],
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraints.maxHeight),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Column(
                      children: [
                        const SizedBox(height: 16.0),
                        // Inner Card
                        Card(
                          elevation: 0,
                          color: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16.0),
                            side: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(24.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                // Top Icon
                                Center(
                                  child: CircleAvatar(
                                    radius: 36,
                                    backgroundColor: const Color(0xFFE8F2FF),
                                    child: Icon(Icons.lock_outline, size: 36.0, color: const Color(0xFF005C9E)),
                                  ),
                                ),
                                const SizedBox(height: 24.0),
                                const Text(
                                  'Verify OTP',
                                  style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                  textAlign: TextAlign.center,
                                ),
                                const SizedBox(height: 8.0),
                                Text(
                                  'A verification OTP has been sent to\n$email.',
                                  style: const TextStyle(fontSize: 13.0, color: Color(0xFF64748B), height: 1.4),
                                  textAlign: TextAlign.center,
                                ),
                                const SizedBox(height: 28.0),

                                // Steps row
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    _buildStepCircle('1', 'Verify OTP', true),
                                    Container(
                                      width: 60.0,
                                      height: 1.0,
                                      color: const Color(0xFFCBD5E1),
                                      margin: const EdgeInsets.symmetric(horizontal: 8.0),
                                    ),
                                    _buildStepCircle('2', 'New Password', false),
                                  ],
                                ),
                                const SizedBox(height: 32.0),

                                const Text(
                                  'OTP Code',
                                  style: TextStyle(fontSize: 11.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8.0),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12.0),
                                  decoration: BoxDecoration(
                                    border: Border.all(color: const Color(0xFFCBD5E1)),
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                  child: Row(
                                    children: [
                                      const Icon(Icons.security, color: Color(0xFF64748B), size: 18.0),
                                      const SizedBox(width: 8.0),
                                      Expanded(
                                        child: TextField(
                                          controller: otpController,
                                          decoration: const InputDecoration(
                                            hintText: 'Enter 6-digit OTP',
                                            hintStyle: TextStyle(fontSize: 13.5, color: Color(0xFF94A3B8)),
                                            border: InputBorder.none,
                                            contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                                          ),
                                          keyboardType: TextInputType.number,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 24.0),

                                SizedBox(
                                  height: 46.0,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF005C9E),
                                      foregroundColor: Colors.white,
                                      elevation: 0,
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                                    ),
                                    onPressed: () {
                                      context.push('/reset-password?email=${Uri.encodeComponent(email)}');
                                    },
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: const [
                                        Text('Verify Code ', style: TextStyle(fontSize: 14.0, fontWeight: FontWeight.bold)),
                                        Icon(Icons.arrow_forward, size: 14.0),
                                      ],
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 24.0),

                                // Support Link
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    const Text('Difficulty receiving OTP? ', style: TextStyle(fontSize: 12.0, color: Color(0xFF64748B))),
                                    GestureDetector(
                                      onTap: () {},
                                      child: const Text(
                                        'Contact Support',
                                        style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: Color(0xFF005C9E), decoration: TextDecoration.underline),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),

                    // Footer Section
                    Padding(
                      padding: const EdgeInsets.only(top: 24.0),
                      child: Column(
                        children: const [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.shield_outlined, size: 14.0, color: Color(0xFF64748B)),
                              SizedBox(width: 4.0),
                              Text('Secure 256-bit Encrypted Session', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
                            ],
                          ),
                          SizedBox(height: 4.0),
                          Text(
                            '© 2024 Computer Academy. Academic Portal Security.',
                            style: TextStyle(fontSize: 10.5, color: Color(0xFF94A3B8)),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildStepCircle(String step, String label, bool active) {
    return Column(
      children: [
        CircleAvatar(
          radius: 16.0,
          backgroundColor: active ? Colors.white : const Color(0xFFF1F5F9),
          child: Container(
            alignment: Alignment.center,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: active ? const Color(0xFF005C9E) : const Color(0xFFCBD5E1), width: 1.5),
            ),
            child: Text(
              step,
              style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: active ? const Color(0xFF005C9E) : const Color(0xFF64748B)),
            ),
          ),
        ),
        const SizedBox(height: 6.0),
        Text(
          label,
          style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: active ? const Color(0xFF005C9E) : const Color(0xFF64748B)),
        ),
      ],
    );
  }
}

class ResetPasswordScreen extends StatelessWidget {
  final String email;

  const ResetPasswordScreen({Key? key, required this.email}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final passController = TextEditingController();
    final confirmPassController = TextEditingController();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        title: Row(
          children: const [
            Text(
              'school ',
              style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.normal, fontSize: 20.0),
            ),
            Text(
              'Computer\nAcademy',
              style: TextStyle(color: Color(0xFF005C9E), fontWeight: FontWeight.bold, fontSize: 16.0, height: 1.1),
            ),
          ],
        ),
        actions: [
          TextButton.icon(
            style: TextButton.styleFrom(foregroundColor: const Color(0xFF475569)),
            icon: const Icon(Icons.arrow_back, size: 14.0),
            label: const Text('Back to\nLogin', style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, height: 1.1)),
            onPressed: () => context.go('/login'),
          ),
          const SizedBox(width: 8.0),
        ],
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraints.maxHeight),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Column(
                      children: [
                        const SizedBox(height: 16.0),
                        // Inner Card
                        Card(
                          elevation: 0,
                          color: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16.0),
                            side: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(24.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                // Top Icon
                                Center(
                                  child: CircleAvatar(
                                    radius: 36,
                                    backgroundColor: const Color(0xFFE8F2FF),
                                    child: Icon(Icons.vpn_key_outlined, size: 36.0, color: const Color(0xFF005C9E)),
                                  ),
                                ),
                                const SizedBox(height: 24.0),
                                const Text(
                                  'New Password',
                                  style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                  textAlign: TextAlign.center,
                                ),
                                const SizedBox(height: 8.0),
                                const Text(
                                  'Set a strong, unique password to secure\nyour academic account.',
                                  style: TextStyle(fontSize: 13.0, color: Color(0xFF64748B), height: 1.4),
                                  textAlign: TextAlign.center,
                                ),
                                const SizedBox(height: 28.0),

                                // Steps row
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    _buildStepCircle('1', 'Verify OTP', true),
                                    Container(
                                      width: 60.0,
                                      height: 1.0,
                                      color: const Color(0xFF005C9E),
                                      margin: const EdgeInsets.symmetric(horizontal: 8.0),
                                    ),
                                    _buildStepCircle('2', 'New Password', true),
                                  ],
                                ),
                                const SizedBox(height: 32.0),

                                const Text(
                                  'New Password',
                                  style: TextStyle(fontSize: 11.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8.0),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12.0),
                                  decoration: BoxDecoration(
                                    border: Border.all(color: const Color(0xFFCBD5E1)),
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                  child: Row(
                                    children: [
                                      const Icon(Icons.lock_outline, color: Color(0xFF64748B), size: 18.0),
                                      const SizedBox(width: 8.0),
                                      Expanded(
                                        child: TextField(
                                          controller: passController,
                                          obscureText: true,
                                          decoration: const InputDecoration(
                                            hintText: 'Enter new password',
                                            hintStyle: TextStyle(fontSize: 13.5, color: Color(0xFF94A3B8)),
                                            border: InputBorder.none,
                                            contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 16.0),

                                const Text(
                                  'Confirm New Password',
                                  style: TextStyle(fontSize: 11.5, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8.0),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12.0),
                                  decoration: BoxDecoration(
                                    border: Border.all(color: const Color(0xFFCBD5E1)),
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                  child: Row(
                                    children: [
                                      const Icon(Icons.lock_clock_outlined, color: Color(0xFF64748B), size: 18.0),
                                      const SizedBox(width: 8.0),
                                      Expanded(
                                        child: TextField(
                                          controller: confirmPassController,
                                          obscureText: true,
                                          decoration: const InputDecoration(
                                            hintText: 'Confirm new password',
                                            hintStyle: TextStyle(fontSize: 13.5, color: Color(0xFF94A3B8)),
                                            border: InputBorder.none,
                                            contentPadding: EdgeInsets.symmetric(vertical: 12.0),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 24.0),

                                SizedBox(
                                  height: 46.0,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF005C9E),
                                      foregroundColor: Colors.white,
                                      elevation: 0,
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
                                    ),
                                    onPressed: () {
                                      context.go('/login');
                                    },
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: const [
                                        Text('Save & Login ', style: TextStyle(fontSize: 14.0, fontWeight: FontWeight.bold)),
                                        Icon(Icons.check_circle_outline, size: 14.0),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),

                    // Footer Section
                    Padding(
                      padding: const EdgeInsets.only(top: 24.0),
                      child: Column(
                        children: const [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.shield_outlined, size: 14.0, color: Color(0xFF64748B)),
                              SizedBox(width: 4.0),
                              Text('Secure 256-bit Encrypted Session', style: TextStyle(fontSize: 11.0, color: Color(0xFF64748B))),
                            ],
                          ),
                          SizedBox(height: 4.0),
                          Text(
                            '© 2024 Computer Academy. Academic Portal Security.',
                            style: TextStyle(fontSize: 10.5, color: Color(0xFF94A3B8)),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildStepCircle(String step, String label, bool active) {
    return Column(
      children: [
        CircleAvatar(
          radius: 16.0,
          backgroundColor: active ? Colors.white : const Color(0xFFF1F5F9),
          child: Container(
            alignment: Alignment.center,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: active ? const Color(0xFF005C9E) : const Color(0xFFCBD5E1), width: 1.5),
            ),
            child: Text(
              step,
              style: TextStyle(fontSize: 12.0, fontWeight: FontWeight.bold, color: active ? const Color(0xFF005C9E) : const Color(0xFF64748B)),
            ),
          ),
        ),
        const SizedBox(height: 6.0),
        Text(
          label,
          style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: active ? const Color(0xFF005C9E) : const Color(0xFF64748B)),
        ),
      ],
    );
  }
}
