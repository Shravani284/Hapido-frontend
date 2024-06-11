import { lazy } from 'react';

const Login = lazy(() => import('../pages/auth/login'));
// const SignUp = lazy(() => import('../pages/register/Index'));
// const PageNotFound = lazy(() => import('../pages/pageNotFound/Index'));
const Home = lazy(() => import('../pages/home'));
const Contact = lazy(() => import('../pages/contact'));
// const Forms = lazy(()=> import ('../pages/userList/form'))
const UserList = lazy(() => import('../pages/User'));
const UserForm = lazy(() => import('../pages/User/UserForm'));
const UserUpdateForm = lazy(() => import('../pages/User/UserForm'));
const MerchantForm = lazy(() => import('../pages/Merchant/MerchantForm'));
const MerchantList = lazy(() => import('../pages/Merchant'));
const CategoryList = lazy(() => import('../pages/category/index'));
const CategoryForm = lazy(() => import('../pages/category/CategoryFrom/Index'));
const City = lazy(() => import('../pages/city/index'));
const CityForm = lazy(() => import('../pages/city/cityForm'));

const CountryList = lazy(() => import('../pages/Countery'));
const CountryForm = lazy(() => import('../pages/Countery/CounteryForm'));
const CountryUpdateForm = lazy(() => import('../pages/Countery/CounteryForm'));
const Area = lazy(() => import('../pages/Area'));
const AreaForm = lazy(() => import('../pages/Area/Form'));
const UploadBanner = lazy(
  () => import('../pages/banner/bannerPlaceForm/bannerForm')
);
const UploadBannerPlaceList = lazy(() => import('../pages/banner/index'));
// const UploadBanner = lazy(() => import('../pages/banner/index'));
const CategoryDetails = lazy(() => import('../pages/category/CategoryDetails'));
const CreateBanner = lazy(() => import('../pages/banner/createBanner'));
const FlashSale = lazy(() => import('../pages/FlashSale'));
const FlashSaleForm = lazy(() => import('../pages/FlashSale/Form/index'));
const FlashSaleUpdateForm = lazy(() => import('../pages/FlashSale/Form/index'));

const BannerList = lazy(() => import('../pages/banner/bannerList'));
const DealComboList = lazy(() => import('../pages/DealCombo/index'));
const DealComboForm = lazy(
  () => import('../pages/DealCombo/components/FormDealCombo')
);

const PromoList = lazy(() => import('../pages/Promo/index'));
const PromoForm = lazy(() => import('../pages/Promo/Form'));
const TagsList = lazy(() => import('../pages/Tags'));
const TagsForm = lazy(() => import('../pages/Tags/Form'));
const BOGO = lazy(() => import('../pages/FlashSaleBOGO'));
const BOGOFORM = lazy(() => import('../pages/FlashSaleBOGO/Form'));
const DP = lazy(() => import('../pages/FlashComplexDiscount'));
const DPFORM = lazy(() => import('../pages/FlashComplexDiscount/Form'));
const DealBundle = lazy(() => import('../pages/DealBundle'));
const DealBundleForm = lazy(() => import('../pages/DealBundle/Form'));
const SingleDeals = lazy(() => import('../pages/singleDeals/index'));
const SingleDealsForm = lazy(() => import('../pages/singleDeals/Form/index'));
const SingleDealUpdate = lazy(() => import('../pages/singleDeals/Form/index'));
const BuyOneGetFreeGift = lazy(() => import('../pages/BuyOneGetFreeGift'));
const BuyOneGetFreeGiftForm = lazy(
  () => import('../pages/BuyOneGetFreeGift/Form')
);
const FlashDiscount = lazy(() => import('../pages/FlashSimpleDiscount/index'));
const FlashDiscountForm = lazy(
  () => import('../pages/FlashSimpleDiscount/form')
);
const CronJobs = lazy(() => import('../pages/CronJobs'));
const CronJobsForm = lazy(() => import('../pages/CronJobs/cronJobsForm'));
const EmailTemplate = lazy(() => import('../pages/EmailTemplate'));
const EmailTemplateForm = lazy(
  () => import('../pages/EmailTemplate/EmailTemplateForm')
);
const EmailTemplateFormid = lazy(
  () => import('../pages/EmailTemplate/EmailTemplateForm')
);
const AssignBulkInventory = lazy(
  () => import('../pages/AssignBulkInventory/AssignBulkInventory')
);
const UploadExternalCode = lazy(
  () => import('../pages/UploadExternalCode/UploadExternalCode')
);
const UploadMerchantTicket = lazy(
  () => import('../pages/UploadMerchantTicket/UploadMerchantTicket')
);
const VoucherList = lazy(() => import('../pages/Purchase/Voucher/VoucherList'));
const VoucherDetailsPage = lazy(
  () => import('../pages/Purchase/Voucher/VoucherDetailsPage')
);
const OrderUTM = lazy(() => import('../pages/Purchase/OrderUTM/orderUTM'));
const PaymentLogs = lazy(
  () => import('../pages/Purchase/PaymentLogs/paymentLogs')
);
const PaymentLogsDetails = lazy(
  () => import('../pages/Purchase/PaymentLogs/paymentLogsDetails')
);
const OrdersList = lazy(() => import('../pages/Purchase/Orders/ordersList'));
const OrderDetails = lazy(
  () => import('../pages/Purchase/Orders/orderDetails')
);
const RefundsList = lazy(() => import('../pages/Refunds/refundsList'));
const updateRefundDetails = lazy(
  () => import('../pages/Refunds/updateRefundDetails')
);
const staticPagesList = lazy(() => import('../pages/staticPage'));
const staticPageForm = lazy(() => import('../pages/staticPage/form'));
const ReviewForm = lazy(() => import('../pages/CustomerReview/ReviewForm'));
const ReviewList = lazy(() => import('../pages/CustomerReview'));
const InventoryAssignment = lazy(() => import('../pages/InventoryAssignment'));
const TravelerType = lazy(() => import('../pages/TravelerType/Form'));
const TravelerTypeList = lazy(() => import('../pages/TravelerType/Index'));
const InventoryAssignmentSlots = lazy(
  () => import('../pages/InventoryAssignment/Slots')
);
const NotFoundPage = lazy(() => import('../pages/Maintenance/NotFoundPage'));
const dealSales = lazy(() => import('../pages/Purchase/DealSales/index'));
const activeDeals = lazy(() => import('../pages/Purchase/ActiveDeals/index'));
const clearCache = lazy(() => import('../pages/ClearCache'));

export {
  Login,
  Home,
  Contact,
  UserList,
  UserForm,
  MerchantForm,
  MerchantList,
  CategoryList,
  CategoryForm,
  CountryList,
  CountryForm,
  City,
  CityForm,
  Area,
  AreaForm,
  CountryUpdateForm,
  UploadBanner,
  UploadBannerPlaceList,
  UserUpdateForm,
  // UploadBanner,
  CategoryDetails,
  CreateBanner,
  FlashSale,
  FlashSaleForm,
  FlashSaleUpdateForm,
  BannerList,
  PromoList,
  PromoForm,
  TagsList,
  TagsForm,
  BOGO,
  BOGOFORM,
  DP,
  DPFORM,
  DealBundle,
  DealBundleForm,
  SingleDeals,
  SingleDealsForm,
  SingleDealUpdate,
  DealComboList,
  DealComboForm,
  BuyOneGetFreeGift,
  BuyOneGetFreeGiftForm,
  FlashDiscount,
  FlashDiscountForm,
  UploadExternalCode,
  UploadMerchantTicket,
  CronJobs,
  CronJobsForm,
  EmailTemplate,
  EmailTemplateForm,
  EmailTemplateFormid,
  AssignBulkInventory,
  VoucherList,
  VoucherDetailsPage,
  OrderUTM,
  PaymentLogs,
  PaymentLogsDetails,
  OrdersList,
  OrderDetails,
  RefundsList,
  updateRefundDetails,
  staticPagesList,
  staticPageForm,
  ReviewForm,
  ReviewList,
  InventoryAssignment,
  InventoryAssignmentSlots,
  TravelerType,
  TravelerTypeList,
  NotFoundPage,
  dealSales,
  activeDeals,
  clearCache,
};
