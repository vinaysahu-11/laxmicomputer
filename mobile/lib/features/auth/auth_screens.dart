import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/providers.dart';
import '../../core/widgets/custom_button.dart';
import '../../core/widgets/custom_text_field.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

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
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Icon(
                Icons.school,
                size: 64.0,
                color: theme.colorScheme.primary,
              ),
              const SizedBox(height: 16.0),
              const Text(
                'Welcome Back',
                style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8.0),
              Text(
                'Log in to access your Computer LMS portal',
                style: TextStyle(color: theme.colorScheme.onSurfaceVariant),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32.0),
              CustomTextField(
                labelText: 'Email Address',
                controller: _emailController,
                prefixIcon: const Icon(Icons.email_outlined),
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 16.0),
              CustomTextField(
                labelText: 'Password',
                controller: _passwordController,
                prefixIcon: const Icon(Icons.lock_outlined),
                isPassword: true,
              ),
              const SizedBox(height: 12.0),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () => context.push('/forgot-password'),
                  child: const Text('Forgot Password?'),
                ),
              ),
              const SizedBox(height: 24.0),
              CustomButton(
                text: 'Login as Student',
                isLoading: authState.isLoading,
                onPressed: () => _handleLogin('student'),
              ),
              const SizedBox(height: 12.0),
              CustomButton(
                text: 'Login as Teacher',
                backgroundColor: theme.colorScheme.secondary,
                textColor: theme.colorScheme.onSecondary,
                isLoading: authState.isLoading,
                onPressed: () => _handleLogin('teacher'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final emailController = TextEditingController();

    return Scaffold(
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
            CustomTextField(
              labelText: 'Email Address',
              controller: emailController,
              prefixIcon: const Icon(Icons.email_outlined),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 24.0),
            CustomButton(
              text: 'Send Verification OTP',
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
            CustomTextField(
              labelText: 'OTP Code',
              controller: otpController,
              prefixIcon: const Icon(Icons.security),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 24.0),
            CustomButton(
              text: 'Verify Code',
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
            CustomTextField(
              labelText: 'New Password',
              controller: passController,
              prefixIcon: const Icon(Icons.lock_outline),
              isPassword: true,
            ),
            const SizedBox(height: 16.0),
            CustomTextField(
              labelText: 'Confirm New Password',
              controller: confirmPassController,
              prefixIcon: const Icon(Icons.lock_outline),
              isPassword: true,
            ),
            const SizedBox(height: 24.0),
            CustomButton(
              text: 'Save & Login',
              onPressed: () => context.go('/login'),
            ),
          ],
        ),
      ),
    );
  }
}
