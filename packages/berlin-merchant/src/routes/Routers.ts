import {
  Home,
  Login,
  Contact,
  ForgotPassword,
  Deals,
  DealBundles,
  DealCombo,
  UserProfile,
  PersonalInfo,
  PurchasesVoucher,
  RedeemedVoucher,
  VoucherRedemption,
  // BarcodeRedemption,
  ManualVoucherRedemption,
  // QRcodeRedemption,
  InventoryAssignment,
  InventoryAssignmentSlots,
} from './LazyPath';

interface RouteTemplate {
  path: string;
  Component: any;
  type?: string;
  role?: string;
}

interface RouterLink {
  path: string;
  title: string;
  icon?: string;
}

enum path {
  PAGE_NOT_FOUND = '/*',
  HOME = '/',
  LOGIN = '/login',
  SIGN_UP = '/signUp',
  ABOUT = '/about',
  CONTACT = '/contact',
  FORGOT_PASSWORD = '/forgot-password',
  DEALS = '/deals',
  DEALSBOUNDLES = '/dealsBoundles',
  DEALSCOMBO = '/dealsCombo',
  USERPROFILE = '/profile',
  PERSONALINFO = '/personal',
  PURCHASES_VOUCHER = '/purchases-voucher',
  REDEEMED_VOUCHER = '/redeemed-voucher',
  VOUCHER_REDEMPTION = '/voucher-redemption',
  VOUCHER_REDEMPTION_BOOKING = '/voucher-redemption/:type',
  // MANUAL_VOUCHER_REDEMPTION = '/voucher-redemption/Manual-Voucher-Redemption',
  // QR_CODE_REDEMPTION = '/voucher-redemption/QR-Code-Redemption',
  INVENTORYASSIGNMENT = '/manualbooking',
  INVENTORYASSIGNMENTSLOTS = '/manualbooking/InventoryAssignment/Slots',
}

const unsecureRoutes: RouteTemplate[] = [
  {
    path: `${path.HOME}`,
    Component: Login,
  },
  {
    path: `${path.LOGIN}`,
    Component: Login,
  },
  {
    path: `${path.FORGOT_PASSWORD}`,
    Component: ForgotPassword,
  },
];

const securedRoutesAdmin: RouteTemplate[] = [
  {
    path: `${path.HOME}`,
    Component: Home,
  },
  {
    path: `${path.CONTACT}`,
    Component: Contact,
  },
  {
    path: `${path.DEALS}`,
    Component: Deals,
  },
  {
    path: `${path.DEALSBOUNDLES}`,
    Component: DealBundles,
  },
  {
    path: `${path.DEALSCOMBO}`,
    Component: DealCombo,
  },
  {
    path: `${path.USERPROFILE}`,
    Component: UserProfile,
  },
  {
    path: `${path.PERSONALINFO}`,
    Component: PersonalInfo,
  },
  {
    path: `${path.PURCHASES_VOUCHER}`,
    Component: PurchasesVoucher,
  },
  {
    path: `${path.REDEEMED_VOUCHER}`,
    Component: RedeemedVoucher,
  },
  {
    path: `${path.VOUCHER_REDEMPTION}`,
    Component: VoucherRedemption,
  },
  // {
  //   path: `${path.BARCODE_REDEMPTION_BOOKING}`,
  //   Component: BarcodeRedemption,
  // },
  {
    path: `${path.VOUCHER_REDEMPTION_BOOKING}`,
    Component: ManualVoucherRedemption,
  },
  // {
  //   path: `${path.QR_CODE_REDEMPTION}`,
  //   Component: QRcodeRedemption,
  // },
  {
    path: `${path.INVENTORYASSIGNMENT}`,
    role: 'MANUAL_BOOKING',
    Component: InventoryAssignment,
  },

  {
    path: `${path.INVENTORYASSIGNMENTSLOTS}`,
    role: 'MANUAL_BOOKING',
    Component: InventoryAssignmentSlots,
  },
];

const routLink: RouterLink[] = [
  { path: path.HOME, title: 'Home' },
  { path: path.CONTACT, title: 'Contact us' },
  { path: path.PURCHASES_VOUCHER, title: 'Purcheses Voucher' },
  { path: path.REDEEMED_VOUCHER, title: 'Redeemed Voucher' },
];

// const securedRoutesMap = new Map<any, any>();
// securedRoutesMap.set('Admin', securedRoutesAdmin);

export { unsecureRoutes, securedRoutesAdmin, path };
