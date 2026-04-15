# Secure Login System - Documentation

## 1. AIM

To create a secure login system that authenticates users based on their email and password, and displays a role-specific dashboard page upon successful login. The system supports three user roles: **Admin**, **User**, and **Student**.

---

## 2. ALGORITHM

### Login Flow:

1. **User Input**: User enters email and password in the login form
2. **Validation**:
   - Check if email is empty and valid format
   - Check if password is empty and meets minimum requirements (6+ characters)
   - Display error messages if validation fails
3. **Authentication**:
   - Search the user database for a matching email and password combination
   - If match found: proceed to step 4
   - If no match: show error message and clear password field
4. **Dashboard Display**:
   - Hide the login container
   - Display the dashboard container with the user's role as the heading
   - Show "Welcome to your dashboard" message
   - Display a logout button
5. **Logout**:
   - Hide the dashboard
   - Show the login form again
   - Clear all input fields

### Validation Rules:

- Email: Must match the pattern `^\S+@\S+\.\S+$`
- Password: Minimum 6 characters

### Authentication Database:

```
Admin: admin@example.com / Admin@123 (role: admin)
User: user@example.com / User@123 (role: user)
Student: alice.j@university.edu / Alice@2024 (role: student)
```

---

## 3. PROGRAM

### Files:

#### **index.html** - Structure

```html
- Login form with email and password fields - Remember me checkbox - Forgot
password link - Sign up link - Alert messages display - Demo credentials section
- Dashboard section (hidden by default)
```

#### **style.css** - Styling

- Beautiful gradient background (purple/blue)
- Centered login box with shadow
- Form styling with icons
- Input error states
- Success/Error alert messages
- Responsive design
- Button animations
- Loading spinner animation

#### **script.js** - Logic

- User database with dummy data
- Email and password validation functions
- Real-time field validation with error messages
- Password visibility toggle
- Alert management
- Authentication logic
- Loading state management
- Login/Logout functionality
- Local storage for remembering email

---

## 4. OUTPUT

### Login Page:

```
┌─────────────────────────────────────┐
│            🔐 Welcome Back          │
│     Please login to your account    │
│                                     │
│  Email Address: [____________]      │
│  Password:      [____________] 👁️  │
│                                     │
│  ☑ Remember me   [Forgot Password?] │
│  [      LOGIN      ]                │
│  Don't have account? Sign up here   │
│                                     │
│  Demo Credentials:                  │
│  Admin: admin@example.com/Admin@123 │
│  User: user@example.com/User@123    │
│  Student: alice@uni.edu/Alice@2024  │
└─────────────────────────────────────┘
```

### After Successful Login:

```
┌─────────────────────────────────────┐
│                                     │
│           Admin Page                │
│     Welcome to your dashboard.      │
│                                     │
│          [    LOGOUT    ]           │
│                                     │
└─────────────────────────────────────┘
```

(For other users, "Admin Page" is replaced with "User Page" or "Student Page")

### Error States:

- Invalid email format → "Please enter a valid email address"
- Empty fields → "Email/Password is required"
- Invalid credentials → "❌ Invalid email or password. Please try again."

---

## 5. RESULT

### Success Criteria:

✅ **Login System**: Users can successfully authenticate with valid credentials
✅ **Validation**: Email and password fields are validated in real-time
✅ **Role-Based Dashboard**: Dashboard displays the appropriate heading based on user role
✅ **Logout**: Users can return to login screen via logout button
✅ **Error Handling**: Clear, user-friendly error messages for invalid inputs
✅ **User Experience**: Password visibility toggle, remember me checkbox, loading animation
✅ **Responsive Design**: Works well on different screen sizes
✅ **Local Storage**: Remembers email if "Remember me" is checked

### Tested Scenarios:

1. **Valid Login**:
   - Email: admin@example.com, Password: Admin@123
   - Result: Shows "Admin Page" ✅

2. **Valid Login**:
   - Email: user@example.com, Password: User@123
   - Result: Shows "User Page" ✅

3. **Valid Login**:
   - Email: alice.j@university.edu, Password: Alice@2024
   - Result: Shows "Student Page" ✅

4. **Invalid Email**: Empty or wrong format
   - Result: Shows validation error ✅

5. **Invalid Password**: Empty or wrong password
   - Result: Shows validation error or authentication error ✅

6. **Logout**: Click logout button
   - Result: Returns to login page ✅

### Features Implemented:

- ✅ Real-time form validation
- ✅ Password visibility toggle
- ✅ Loading spinner during authentication
- ✅ Alert notifications (success, error, info)
- ✅ Remember me functionality with localStorage
- ✅ Role-based dashboard pages
- ✅ Responsive design
- ✅ User-friendly error messages
- ✅ Logout functionality

---

## CONCLUSION

The secure login system has been successfully implemented with all required features. Users can authenticate their credentials, view role-specific dashboards, and manage their login sessions efficiently. The system provides a smooth user experience with proper validation, error handling, and visual feedback.
