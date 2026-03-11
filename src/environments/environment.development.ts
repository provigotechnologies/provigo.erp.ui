import { CourseOfferingService } from "../app/core/services/course-offering.service";

export const environment = {
  production: false,
  customerApiUrl: 'https://localhost:7115/api',
  tenantApiUrl: 'https://localhost:7112/api',
  tenantServerUrl: 'https://localhost:7112',
  productApiUrl: 'https://localhost:7026/api',
  pricingApiUrl: 'https://localhost:7223/api',
  orderApiUrl: 'https://localhost:7258/api',
  shiftApiUrl: 'https://localhost:7166/api',
  trainerCourseApiUrl: 'https://localhost:7026/api',
  CourseOfferingApiUrl: 'https://localhost:7166/api',
  userApiUrl: 'https://localhost:7082/api',
  paymentApiUrl: 'https://localhost:7256/api',
  razorpayKeyId: 'rzp_test_SJblYw5zUpGlcO',   // ← replace with your Razorpay test key
  tenantId: '550e8400-e29b-41d4-a716-446655440000'
};