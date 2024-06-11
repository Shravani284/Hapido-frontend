import { lazy } from 'react';
import { localeLang } from '../utils/getLang';


const Home =
  localeLang == 'ar'
    ? lazy(() => import('../pages/home/index-ar'))
    : lazy(() => import('../pages/home/index'));
const StaticPage =
  localeLang == 'ar'
    ? lazy(() => import('../pages/StaticPage/index-ar'))
    : lazy(() => import('../pages/StaticPage/index'));
const ProductDetails =
  localeLang == 'ar'
    ? lazy(() => import('../pages/productDetails/index-ar'))
    : lazy(() => import('../pages/productDetails/index'));
const CartItemList =
  localeLang == 'ar'
    ? lazy(() => import('../pages/cart/index-ar'))
    : lazy(() => import('../pages/cart/index'));
const CartCheckoutList =
  localeLang == 'ar'
    ? lazy(() => import('../pages/cart/checkout/index-ar'))
    : lazy(() => import('../pages/cart/checkout/index'));
const SearchItem =
  localeLang == 'ar'
    ? lazy(() => import('../pages/searchPage/Index-ar'))
    : lazy(() => import('../pages/searchPage/Index'));
const CategoryList =
  localeLang == 'ar'
    ? lazy(() => import('../pages/categoryList/index-ar'))
    : lazy(() => import('../pages/categoryList/index'));
const Profile =
  localeLang == 'ar'
    ? lazy(() => import('../pages/account/Profile-ar'))
    : lazy(() => import('../pages/account/Profile'));
const Address =
  localeLang == 'ar'
    ? lazy(() => import('../pages/account/AddressForm/Address-ar'))
    : lazy(() => import('../pages/account/AddressForm/Address'));
const Vouchers =
  localeLang == 'ar'
    ? lazy(() => import('../pages/account/Vouchers-ar'))
    : lazy(() => import('../pages/account/Vouchers'));
const SavedCard =
  localeLang == 'ar'
    ? lazy(() => import('../pages/account/SavedCard-ar'))
    : lazy(() => import('../pages/account/SavedCard'));
const VoucherReview =
  localeLang == 'ar'
    ? lazy(() => import('../pages/account/VoucherReview-ar'))
    : lazy(() => import('../pages/account/VoucherReview'));
const AddAddress =
  localeLang == 'ar'
    ? lazy(() => import('../pages/account/AddressForm/index-ar'))
    : lazy(() => import('../pages/account/AddressForm/index'));
const PaymentPage =
  localeLang == 'ar'
    ? lazy(() => import('../pages/cart/checkout/PaymentPage-ar'))
    : lazy(() => import('../pages/cart/checkout/PaymentPage'));
const PageNotFound = lazy(
  () => import('../components/PageNotFound/PageNotFound')
);
const FlashSales =
  localeLang == 'ar'
    ? lazy(() => import('../pages/home/responsiveHome/flash-Sales/index-ar'))
    : lazy(() => import('../pages/home/responsiveHome/flash-Sales/index'));
const MapContainer =
  localeLang == 'ar'
    ? lazy(() => import('../pages/account/AddressForm/addressMap-ar'))
    : lazy(() => import('../pages/account/AddressForm/addressMap'));
const MenuListingMobile =
  localeLang == 'ar'
    ? lazy(() => import('../pages/MenuListingMobile/index-ar'))
    : lazy(() => import('../pages/MenuListingMobile/index'));
const PaymentSuccess =
  localeLang == 'ar'
    ? lazy(() => import('../pages/cart/checkout/paymentComplete-ar'))
    : lazy(() => import('../pages/cart/checkout/paymentComplete'));
const PaymentFailed =
  localeLang == 'ar'
    ? lazy(() => import('../pages/cart/checkout/paymentFailed-ar'))
    : lazy(() => import('../pages/cart/checkout/paymentFailed'));

const MobileAccount =
  localeLang == 'ar'
    ? lazy(() => import('../pages/account/MobileSideMenu-ar'))
    : lazy(() => import('../pages/account/MobileSideMenu'));
export {
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
  PaymentPage,
  PaymentFailed,
  FlashSales,
  PageNotFound,
  MobileAccount,
};
// export { Login, SignUp, PageNotFound, Home, StaticPage };
