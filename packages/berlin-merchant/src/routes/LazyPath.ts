import { lazy } from 'react';

const Login = lazy(() => import('../pages/auth/login'));
// const SignUp = lazy(() => import('../pages/register/Index'));
// const PageNotFound = lazy(() => import('../pages/pageNotFound/Index'));
const Home = lazy(() => import('../pages/home'));
const Contact = lazy(() => import('../pages/contact'));
const ForgotPassword = lazy(() => import('../pages/auth/forgot-password'));
const Otp = lazy(() => import('../pages/auth/code-verification'));
const Deals = lazy(() => import('../pages/Deals'));
const DealBundles = lazy(() => import('../pages/Deals Bundles'));
const DealCombo = lazy(() => import('../pages/DealsCombo'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const PersonalInfo = lazy(() => import('../pages/UserProfile/PersonalInfo'));
const RedeemedVoucher = lazy(
  () => import('../pages/vouchersList/redeemedVoucher')
);
const PurchasesVoucher = lazy(
  () => import('../pages/vouchersList/purchasesVoucher')
);
const VoucherRedemption = lazy(
  () => import('../pages/VoucherRedemption/index')
);
// const BarcodeRedemption = lazy(
//   () => import('../pages/VoucherRedemption/BarcodeRedemption')
// );
const ManualVoucherRedemption = lazy(
  () => import('../pages/VoucherRedemption/form')
);
// const QRcodeRedemption = lazy(
//   () => import('../pages/VoucherRedemption/QRcodeRedemption')
// );
const InventoryAssignment = lazy(() => import('../pages/InventoryAssignment'));
const InventoryAssignmentSlots = lazy(
  () => import('../pages/InventoryAssignment/Slots')
);
// const NotFoundPage = lazy(() => import('../pages/Maintenance/NotFoundPage'));


export {
  Login,
  Home,
  Contact,
  ForgotPassword,
  Otp,
  Deals,
  DealBundles,
  DealCombo,
  UserProfile,
  PersonalInfo,
  RedeemedVoucher,
  PurchasesVoucher,
  VoucherRedemption,
  // BarcodeRedemption,
  ManualVoucherRedemption,
  // QRcodeRedemption,
  InventoryAssignment,
  InventoryAssignmentSlots
};
