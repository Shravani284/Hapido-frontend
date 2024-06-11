import { lang } from '../utils/getLang';
import {
  Home,
  StaticPage,
  ProductDetails,
  CartItemList,
  CartCheckoutList,
  SearchItem,
  CategoryList,
  Profile,
  Address,
  Vouchers,
  SavedCard,
  VoucherReview,
  MenuListingMobile,
  AddAddress,
  MapContainer,
  PaymentSuccess,
  PaymentFailed,
  PaymentPage,
  FlashSales,
  MobileAccount,
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
  HOME = '/:lang',
  ABOUT = '/about',
  STATICPAGE = '/:lang/static/:slug',
  PRODUCTDETAILS = '/:lang/:deal_type/:deal_slug/:id',
  CARTITEMLIST = '/:lang/cart',
  CHECKOUTSITEM = '/:lang/checkout',
  SEARCHITEM = '/:lang/search',
  CATEGORYLIST = '/:lang/:category_slug',
  SUBCATEGORYLIST = '/:lang/:category_slug/:subcategory_slug',
  PROFILE = '/:lang/profile',
  ADDRESS = '/:lang/addresses',
  VOUCHERS = '/:lang/vouchers',
  SAVEDCARD = '/:lang/saved_cards',
  VOUCHERREVIEW = '/:lang/voucher/add-review/:voucherId',
  ADDADDRESS = '/:lang/addresses/add',
  ADDADDRESSMAP = '/:lang/address/addAddressMap',
  UPDATEADDRESS = '/:lang/addresses/edit/:id',
  MENULISTINGMOBILE = '/:lang/menu',
  PAYMENTSUCCESS = '/:lang/cartitemlist/paymentSuccess',
  PAYMENTFAILED = '/:lang/cartitemlist/PaymentFailed',
  PAYMENTPAGE = '/cartitemlist/payment',
  FLASHSALES = '/:lang/flash-sale',
  MOBILEACCOUNT = '/:lang/account',
}

// this is for accounts
const accountRoute: RouteTemplate[] = [
  {
    path: `${path.PROFILE}`,
    Component: Profile,
  },
  {
    path: `${path.ADDRESS}`,
    Component: Address,
  },

  {
    path: `${path.VOUCHERS}`,
    Component: Vouchers,
  },
  {
    path: `${path.SAVEDCARD}`,
    Component: SavedCard,
  },
  {
    path: `${path.MOBILEACCOUNT}`,
    Component: MobileAccount,
  },
];

// this is for header and footer layout
const mainRoute: RouteTemplate[] = [
  {
    path: `${path.HOME}`,
    Component: Home,
  },
  {
    path: `${path.FLASHSALES}`,
    Component: FlashSales,
  },
  {
    path: `${path.STATICPAGE}`,
    Component: StaticPage,
  },

  {
    path: `${path.PRODUCTDETAILS}`,
    Component: ProductDetails,
  },

  {
    path: `${path.SEARCHITEM}`,
    Component: SearchItem,
  },
  {
    path: `${path.CATEGORYLIST}`,
    Component: CategoryList,
  },
  {
    path: `${path.SUBCATEGORYLIST}`,
    Component: CategoryList,
  },
];

// this is for header layout
const headerLayout: RouteTemplate[] = [
  {
    path: `${path.CARTITEMLIST}`,
    Component: CartItemList,
  },
  {
    path: `${path.CHECKOUTSITEM}`,
    Component: CartCheckoutList,
  },
  {
    path: `${path.VOUCHERREVIEW}`,
    Component: VoucherReview,
  },
  {
    path: `${path.ADDADDRESS}`,
    Component: AddAddress,
  },
  {
    path: `${path.ADDADDRESSMAP}`,
    Component: MapContainer,
  },
  {
    path: `${path.UPDATEADDRESS}`,
    Component: AddAddress,
  },
  {
    path: `${path.PAYMENTSUCCESS}`,
    Component: PaymentSuccess,
  },
  {
    path: `${path.PAYMENTFAILED}`,
    Component: PaymentFailed,
  },
  {
    path: `${path.PAYMENTPAGE}`,
    Component: PaymentPage,
  },
];

// this is for header layout
const normalLayout: RouteTemplate[] = [
  {
    path: `${path.MENULISTINGMOBILE}`,
    Component: MenuListingMobile,
  },
];

// const routLink: RouterLink[] = [
//   { path: path.HOME, title: 'Home' },
//   { path: path.CONTACT, title: 'Contact us' },
// ];

// const securedRoutesMap = new Map<any, any>();
// securedRoutesMap.set('Admin', securedRoutesAdmin);

export { accountRoute, mainRoute, headerLayout, normalLayout, path };
