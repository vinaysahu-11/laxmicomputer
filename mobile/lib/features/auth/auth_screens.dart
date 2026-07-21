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
                      // Underlined Email Input field
                      TextField(
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          labelText: 'Email or Student ID',
                          labelStyle: TextStyle(
                            color: Color(0xFF64748B),
                            fontSize: 14.0,
                          ),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Color(0xFFCBD5E1), width: 1.5),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Color(0xFF0066AE), width: 2.0),
                          ),
                          contentPadding: EdgeInsets.symmetric(vertical: 8.0),
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
                        mainAxisAlignment: MainAxisAlignment.between,
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
                        onPressed: () => _handleLogin('student'),
                      ),
                      const SizedBox(height: 10.0),
                      GestureDetector(
                        onTap: () => _handleLogin('teacher'),
                        child: Text(
                          'Teacher login panel',
                          style: TextStyle(
                            fontSize: 12.0,
                            color: theme.colorScheme.primary.withOpacity(0.8),
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      
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
    final theme = Theme.of(context);
    final emailController = TextEditingController();

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(title: const Text('Forgot Password')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Reset Password Request',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            Text(
              'Enter your registered email address below, and we will send you an OTP to reset your password.',
              style: TextStyle(color: theme.colorScheme.onSurfaceVariant),
            ),
            const SizedBox(height: 32.0),
            TextField(
              controller: emailController,
              decoration: const InputDecoration(
                labelText: 'Email Address',
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFFCBD5E1), width: 1.5),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF0066AE), width: 2.0),
                ),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 24.0),
            CustomButton(
              text: 'Send Verification OTP',
              backgroundColor: const Color(0xFF005C9E),
              onPressed: () => context.push('/otp-verify?email=${Uri.encodeComponent(emailController.text)}'),
            ),
          ],
        ),
      ),
    );
  }
}

class OtpVerificationScreen extends StatelessWidget {
  final String email;

  const OtpVerificationScreen({Key? key, required this.email}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final otpController = TextEditingController();

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(title: const Text('OTP Verification')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Enter Verification Code',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            Text(
              'We have sent a 6-digit OTP code to $email. Please enter it below to proceed.',
              style: TextStyle(color: theme.colorScheme.onSurfaceVariant),
            ),
            const SizedBox(height: 32.0),
            TextField(
              controller: otpController,
              decoration: const InputDecoration(
                labelText: 'OTP Code',
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFFCBD5E1), width: 1.5),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF0066AE), width: 2.0),
                ),
              ),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 24.0),
            CustomButton(
              text: 'Verify Code',
              backgroundColor: const Color(0xFF005C9E),
              onPressed: () => context.push('/reset-password?email=${Uri.encodeComponent(email)}'),
            ),
          ],
        ),
      ),
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
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(title: const Text('Reset Password')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Create New Password',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            const Text('Your new password must be at least 8 characters long and different from previous passwords.'),
            const SizedBox(height: 32.0),
            TextField(
              controller: passController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'New Password',
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFFCBD5E1), width: 1.5),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF0066AE), width: 2.0),
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            TextField(
              controller: confirmPassController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Confirm New Password',
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFFCBD5E1), width: 1.5),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF0066AE), width: 2.0),
                ),
              ),
            ),
            const SizedBox(height: 24.0),
            CustomButton(
              text: 'Save & Login',
              backgroundColor: const Color(0xFF005C9E),
              onPressed: () => context.go('/login'),
            ),
          ],
        ),
      ),
    );
  }
}
