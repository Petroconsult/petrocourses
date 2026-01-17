/**
 * Test Fixtures - Mock data for testing
 */

export const mockCourses = [
  {
    id: 'course_1',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts and patterns',
    price: 99.99,
    currency: 'USD',
    instructor: 'John Doe',
    duration: '8 weeks',
    level: 'Intermediate',
    students: 150,
    rating: 4.8,
    image: '/images/courses/typescript.jpg',
    slug: 'advanced-typescript',
  },
  {
    id: 'course_2',
    title: 'Next.js 14 Mastery',
    description: 'Build production-ready applications with Next.js 14',
    price: 129.99,
    currency: 'USD',
    instructor: 'Jane Smith',
    duration: '10 weeks',
    level: 'Advanced',
    students: 200,
    rating: 4.9,
    image: '/images/courses/nextjs.jpg',
    slug: 'nextjs-14-mastery',
  },
];

export const mockUsers = [
  {
    id: 'user_1',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'user_2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'admin',
    createdAt: new Date('2025-01-02'),
  },
];

export const mockEnrollments = [
  {
    id: 'enrollment_1',
    userId: 'user_1',
    courseId: 'course_1',
    enrolledAt: new Date('2025-06-01'),
    progress: 45,
    status: 'active',
    completedAt: null,
  },
  {
    id: 'enrollment_2',
    userId: 'user_1',
    courseId: 'course_2',
    enrolledAt: new Date('2025-11-01'),
    progress: 100,
    status: 'completed',
    completedAt: new Date('2025-12-01'),
  },
];

export const mockPayments = [
  {
    id: 'payment_1',
    userId: 'user_1',
    courseId: 'course_1',
    amount: 99.99,
    currency: 'USD',
    gateway: 'stripe',
    status: 'completed',
    transactionId: 'txn_stripe_123',
    createdAt: new Date('2025-06-01'),
  },
  {
    id: 'payment_2',
    userId: 'user_1',
    courseId: 'course_2',
    amount: 129.99,
    currency: 'USD',
    gateway: 'stripe',
    status: 'completed',
    transactionId: 'txn_stripe_456',
    createdAt: new Date('2025-11-01'),
  },
];

export const mockBookings = [
  {
    id: 'booking_1',
    userId: 'user_1',
    serviceId: 'service_advisory_1',
    serviceName: 'Advisory Consultation',
    date: new Date('2025-12-15'),
    time: '14:00',
    duration: 60,
    status: 'confirmed',
    notes: 'Discuss project requirements',
    confirmationCode: 'CONF001',
    createdAt: new Date('2025-12-01'),
  },
];

export const mockServices = [
  {
    id: 'service_advisory_1',
    name: 'Advisory Consultation',
    description: 'Expert advisory on your projects',
    type: 'advisory',
    price: 150,
    duration: 60,
    capacity: 1,
  },
  {
    id: 'service_consultancy_1',
    name: 'Consultancy Project',
    description: 'Full consultancy engagement',
    type: 'consultancy',
    price: 2000,
    duration: 480,
    capacity: 5,
  },
];

export const mockPaymentIntents = {
  stripe: {
    id: 'pi_1234567890',
    object: 'payment_intent',
    amount: 9999,
    currency: 'usd',
    status: 'requires_payment_method',
  },
  razorpay: {
    id: 'order_1234567890',
    entity: 'order',
    amount: 9999,
    amount_paid: 0,
    currency: 'INR',
    status: 'created',
  },
  paypal: {
    id: 'PAYID-1234567890',
    state: 'created',
    links: [
      {
        rel: 'approval_url',
        href: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=TOKEN',
      },
    ],
  },
};

export const mockAuthTokens = {
  validToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEiLCJleHAiOjk5OTk5OTk5OTl9.test_signature',
  expiredToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEiLCJleHAiOjEwMDB9.test_signature',
};

export const mockErrorResponses = {
  unauthorized: {
    error: 'Unauthorized',
    message: 'Authentication required',
    statusCode: 401,
  },
  forbidden: {
    error: 'Forbidden',
    message: 'Access denied',
    statusCode: 403,
  },
  notFound: {
    error: 'Not Found',
    message: 'Resource not found',
    statusCode: 404,
  },
  badRequest: {
    error: 'Bad Request',
    message: 'Invalid request data',
    statusCode: 400,
  },
  serverError: {
    error: 'Internal Server Error',
    message: 'Something went wrong',
    statusCode: 500,
  },
};

export const mockValidationErrors = {
  emailRequired: { field: 'email', message: 'Email is required' },
  emailInvalid: { field: 'email', message: 'Invalid email format' },
  passwordTooShort: { field: 'password', message: 'Password must be at least 8 characters' },
  nameRequired: { field: 'name', message: 'Name is required' },
};
