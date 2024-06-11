import ClearCache from '../pages/ClearCache';
import {
  Home,
  Login,
  Contact,
  UserList,
  UserForm,
  MerchantForm,
  MerchantList,
  CategoryList,
  CategoryForm,
  Area,
  AreaForm,
  City,
  CityForm,
  CountryList,
  CountryForm,
  CountryUpdateForm,
  UploadBanner,
  UploadBannerPlaceList,
  UserUpdateForm,
  CategoryDetails,
  CreateBanner,
  FlashSale,
  FlashSaleForm,
  FlashSaleUpdateForm,
  BannerList,
  PromoList,
  PromoForm,
  TagsForm,
  TagsList,
  BOGO,
  BOGOFORM,
  DealBundle,
  DealBundleForm,
  SingleDeals,
  SingleDealsForm,
  SingleDealUpdate,
  DealComboList,
  DealComboForm,
  BuyOneGetFreeGift,
  BuyOneGetFreeGiftForm,
  DPFORM,
  DP,
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
  ReviewList,
  ReviewForm,
  InventoryAssignment,
  InventoryAssignmentSlots,
  TravelerTypeList,
  TravelerType,
  dealSales,
  activeDeals,
  clearCache,
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
  DASHBOARD = '/dashboard',
  LOGIN = '/login',
  SIGN_UP = '/signUp',
  ABOUT = '/about',
  CONTACT = '/contact',
  USERLIST = '/users',
  MERCHANTFORM = '/merchant/add',
  MERCHANTUPDATE = '/merchant/update/:id',
  UserFORM = '/users/add',
  USERUPDATEFORM = '/users/update/:id',
  MERCHANTLIST = '/merchant',
  CATEGORYLIST = '/category',
  CATEGORYFORM = '/category/add',
  CATEGORYFORMUPDATE = '/category/update/:id',
  AREA = '/geography/area',
  AREAFORM = '/geography/area/add',
  AREAFORMUPDATE = '/geography/area/update/:id',
  CITY = '/geography/city',
  CITYFORM = '/geography/city/add',
  CITYFORMUPDATE = '/geography/city/update/:id',
  COUNTRYLIST = '/geography/country',
  COUNTRYFORM = '/geography/country/add',
  COUNTRYUPDATEFORM = '/geography/country/update/:id',
  UPLOADBANNER = '/banner/bannerplacelist/add',
  UPLOADBANNERPLACELIST = '/banner/bannerplacelist',
  UPLOADBANNERPLACELISTBYID = '/banner/bannerplacelist/update/:id',
  CATEGORYDETAILS = '/Category/:id',
  USERDETAILS = '/userDetails',
  FLASHSALE = '/flashsale/bosd',
  FLASHSALEFORM = '/flashsale/bosd/add',
  FLASHSALEUPDATEFORM = '/flashsale/bosd/update/:id',
  CREATEBANNER = '/banner/bannerlist/addbanner',
  UPLOADBANERBYID = '/banner/bannerlist/update/:id',
  BANNERLIST = '/banner/bannerlist',
  PORMOCODE = '/promo',
  PROMOADD = '/promo/add',
  PROMOUPDATE = '/promo/update/:id',
  TAGLIST = '/deals/tag',
  TAGADD = '/deals/tag/add',
  TAGUPDATE = '/deals/tag/update/:id',
  BOGOLIST = '/flashsale/bo-go',
  BOGOLISTFORM = '/flashsale/bo-go/add',
  BOGOLISTFORMUPDATE = '/flashsale/bo-go/update/:id',
  DPLIST = '/flashsale/dp',
  DPLISTFORM = '/flashsale/dp/add',
  DPLISTFORMUPDATE = '/flashsale/dp/update/:id',
  DEALBUNDLE = '/deals/dealbundle',
  DEALBUNDLEFORM = '/deals/dealbundle/add',
  DEALBUNDLEFORMUPDATE = '/deals/dealbundle/update/:id',
  SINGLEDEALS = '/deals/singledeals',
  SINGLEDEALSFORM = '/deals/singledeals/add',
  SINGLEDEALSFORMUPDATEBYID = '/deals/singledeals/update/:id',
  DEALCOMBOLIST = '/deals/dealcombo',
  DEALCOMBOFORM = '/deals/dealcombo/add',
  UPDATEDEALCOMBOFORM = '/deals/dealcombo/update/:id',
  BOGFG = '/flashsale/bogfg',
  BOGFGFORM = '/flashsale/bogfg/add',
  BOGFGFORMUPDATE = '/flashsale/bogfg/update/:id',
  FLASHDISCOUNT = '/flashsale/flashdiscount',
  FLASHDISCOUNTFORM = '/flashsale/flashdiscount/add',
  UPDATEFLASHDISCOUNTFORM = '/flashsale/flashdiscount/update/:id',
  CRONJOBSLIST = '/cronjobs',
  CRONJOBSFORM = '/cronjobs/add',
  UPDATECRONJOBS = '/cronjobs/update/:id',
  EMAILTEMPLATELIST = '/emailtemplate',
  EMAILTEMPLATEFORM = '/emailtemplate/add',
  EMAILTEMPLATEFORMID = 'emailtemplate/update/:id',
  ASSIGNBULKINVENTORY = '/manualbooking/assignbulkinventory',
  UPLOADEXTERNALCODE = '/deals/uploadexternalcode',
  UPLOADMERCHANTTICKET = '/deals/uploadexternalticket',
  VOUCHERLIST = '/purchase/voucherlist',
  VOUCHERDETAILSPAGE = '/purchase/voucherlist/:id',
  ORDERUTM = '/purchase/orderutm',
  PAYMENTLOGS = '/purchase/paymentlogs',
  DEALSALES = '/purchase/dealsales',
  ACTIVEDEALS = '/purchase/activedeals',
  PAYMENTLOGSDETAILS = '/purchase/paymentlogs/:id',
  ORDERSLIST = '/purchase/orderslist',
  ORDERDETAILS = '/purchase/orderslist/:id',
  REFUNDSLIST = '/refunds',
  UPDATEREFUNDDETAILS = '/refunds/:id',
  STATICPAGE = '/staticpage',
  STATICPAGEFORM = '/staticpage/add',
  UPDATESTATICPAGE = '/staticpage/update/:id',
  REVIEWLIST = '/reviewlist',
  REVIEWFORM = 'reviewlist/update/:id',
  INVENTORYASSIGNMENT = 'manualbooking/inventoryassignment',
  INVENTORYASSIGNMENTSLOTS = '/InventoryAssignment/Slots',
  TRAVELERTYPE = '/deals/travelertype',
  TRAVELERTYPEADD = '/deals/travelertype/add',
  TRAVELERTYPEUPDATE = '/deals/travelertype/update/:id',
  CLEARCACHE = '/clearCache',
}

const unsecureRoutes: RouteTemplate[] = [
  {
    path: `${path.HOME}`,
    role: '',
    Component: Login,
  },
  {
    path: `${path.LOGIN}`,
    role: '',
    Component: Login,
  },
];

const securedRoutesAdmin: RouteTemplate[] = [
  {
    path: `${path.DASHBOARD}`,
    Component: Home,
  },
  // {
  //   path: `${path.CONTACT}`,
  //  Component: Contact,
  // },
  // {
  //   path: `${path.FORMS}`,
  //  Component: Forms,
  // },
  // user routes
  {
    path: `${path.USERLIST}`,
    Component: UserList,
    role: 'USER',
  },
  {
    path: `${path.UserFORM}`,
    Component: UserForm,
    role: 'USER',
  },

  {
    path: `${path.USERUPDATEFORM}`,
    Component: UserUpdateForm,
    role: 'USER',
  },
  // merchant routes
  {
    path: `${path.MERCHANTFORM}`,
    Component: MerchantForm,
    role: 'MERCHANT',
  },
  {
    path: `${path.MERCHANTUPDATE}`,
    Component: MerchantForm,
    role: 'MERCHANT',
  },

  {
    path: `${path.MERCHANTLIST}`,
    Component: MerchantList,
    role: 'MERCHANT',
  },

  // CATEGORY
  {
    path: `${path.CATEGORYLIST}`,
    role: 'CATEGORY',
    Component: CategoryList,
  },
  {
    path: `${path.CATEGORYFORM}`,
    role: 'CATEGORY',
    Component: CategoryForm,
  },
  {
    path: `${path.CATEGORYFORMUPDATE}`,
    role: 'CATEGORY',
    Component: CategoryForm,
  },
  {
    path: `${path.CITY}`,
    role: 'GEOGRAPHY',
    Component: City,
  },
  {
    path: `${path.CITYFORM}`,
    role: 'GEOGRAPHY',
    Component: CityForm,
  },
  {
    path: `${path.CITYFORMUPDATE}`,
    role: 'GEOGRAPHY',
    Component: CityForm,
  },
  {
    path: `${path.COUNTRYLIST}`,
    role: 'GEOGRAPHY',
    Component: CountryList,
  },
  {
    path: `${path.COUNTRYFORM}`,
    role: 'GEOGRAPHY',
    Component: CountryForm,
  },
  {
    path: `${path.COUNTRYUPDATEFORM}`,
    role: 'GEOGRAPHY',
    Component: CountryUpdateForm,
  },
  {
    path: `${path.AREA}`,
    role: 'GEOGRAPHY',
    Component: Area,
  },
  {
    path: `${path.AREAFORM}`,
    role: 'GEOGRAPHY',
    Component: AreaForm,
  },

  {
    path: `${path.AREAFORMUPDATE}`,
    role: 'GEOGRAPHY',
    Component: AreaForm,
  },

  // banner
  {
    path: `${path.UPLOADBANNER}`,
    role: 'BANNER',
    Component: UploadBanner,
  },
  {
    path: `${path.CATEGORYDETAILS}`,
    role: 'BANNER',
    Component: CategoryDetails,
  },
  {
    path: `${path.UPLOADBANNERPLACELIST}`,
    role: 'BANNER',
    Component: UploadBannerPlaceList,
  },
  {
    path: `${path.UPLOADBANNERPLACELISTBYID}`,
    role: 'BANNER',
    Component: UploadBanner,
  },
  {
    path: `${path.CREATEBANNER}`,
    role: 'BANNER',
    Component: CreateBanner,
  },
  {
    path: `${path.BANNERLIST}`,
    role: 'BANNER',
    Component: BannerList,
  },
  {
    path: `${path.UPLOADBANERBYID}`,
    role: 'BANNER',
    Component: CreateBanner,
  },

  {
    path: `${path.FLASHSALE}`,
    role: 'FLASH_SALE',
    Component: FlashSale,
  },
  {
    path: `${path.FLASHSALEFORM}`,
    role: 'FLASH_SALE',
    Component: FlashSaleForm,
  },

  {
    path: `${path.FLASHSALEUPDATEFORM}`,
    role: 'FLASH_SALE',
    Component: FlashSaleUpdateForm,
  },

  {
    path: `${path.PORMOCODE}`,
    role: 'PROMO_CODE',
    Component: PromoList,
  },
  {
    path: `${path.PROMOADD}`,
    role: 'PROMO_CODE',
    Component: PromoForm,
  },
  {
    path: `${path.PROMOUPDATE}`,
    role: 'PROMO_CODE',
    Component: PromoForm,
  },
  {
    path: `${path.TAGLIST}`,
    role: 'DEAL',
    Component: TagsList,
  },
  {
    path: `${path.TAGADD}`,
    role: 'DEAL',
    Component: TagsForm,
  },
  {
    path: `${path.TAGUPDATE}`,
    role: 'DEAL',
    Component: TagsForm,
  },
  {
    path: `${path.BOGOLIST}`,
    Component: BOGO,
    role: 'FLASH_SALE',
  },
  {
    path: `${path.BOGOLISTFORM}`,
    role: 'FLASH_SALE',
    Component: BOGOFORM,
  },
  {
    path: `${path.BOGOLISTFORMUPDATE}`,
    role: 'FLASH_SALE',
    Component: BOGOFORM,
  },
  {
    path: `${path.DPLIST}`,
    Component: DP,
    role: 'FLASH_SALE',
  },
  {
    path: `${path.DPLISTFORM}`,
    role: 'FLASH_SALE',
    Component: DPFORM,
  },
  {
    path: `${path.DPLISTFORMUPDATE}`,
    role: 'FLASH_SALE',
    Component: DPFORM,
  },
  {
    path: `${path.DEALBUNDLE}`,
    role: 'DEAL',
    Component: DealBundle,
  },
  {
    path: `${path.DEALBUNDLEFORM}`,
    role: 'DEAL',
    Component: DealBundleForm,
  },
  {
    path: `${path.DEALBUNDLEFORMUPDATE}`,
    role: 'DEAL',
    Component: DealBundleForm,
  },
  {
    path: `${path.SINGLEDEALS}`,
    role: 'DEAL',
    Component: SingleDeals,
  },
  {
    path: `${path.SINGLEDEALSFORM}`,
    role: 'DEAL',
    Component: SingleDealsForm,
  },
  {
    path: `${path.SINGLEDEALSFORMUPDATEBYID}`,
    role: 'DEAL',
    Component: SingleDealUpdate,
  },
  {
    path: `${path.DEALCOMBOLIST}`,
    role: 'DEAL',
    Component: DealComboList,
  },
  {
    path: `${path.DEALCOMBOFORM}`,
    role: 'DEAL',
    Component: DealComboForm,
  },
  {
    path: `${path.UPDATEDEALCOMBOFORM}`,
    role: 'DEAL',
    Component: DealComboForm,
  },
  {
    path: `${path.BOGFG}`,
    role: 'FLASH_SALE',
    Component: BuyOneGetFreeGift,
  },
  {
    path: `${path.BOGFGFORM}`,
    role: 'FLASH_SALE',
    Component: BuyOneGetFreeGiftForm,
  },
  {
    path: `${path.BOGFGFORMUPDATE}`,
    role: 'FLASH_SALE',
    Component: BuyOneGetFreeGiftForm,
  },

  {
    path: `${path.FLASHDISCOUNT}`,
    role: 'FLASH_SALE',
    Component: FlashDiscount,
  },
  {
    path: `${path.FLASHDISCOUNTFORM}`,
    role: 'FLASH_SALE',
    Component: FlashDiscountForm,
  },
  {
    path: `${path.UPDATEFLASHDISCOUNTFORM}`,
    role: 'FLASH_SALE',
    Component: FlashDiscountForm,
  },
  {
    path: `${path.UPLOADEXTERNALCODE}`,
    role: 'DEAL',
    Component: UploadExternalCode,
  },
  {
    path: `${path.UPLOADMERCHANTTICKET}`,
    role: 'DEAL',
    Component: UploadMerchantTicket,
  },
  {
    path: `${path.CRONJOBSLIST}`,
    role: 'CRON_JOB',
    Component: CronJobs,
  },
  {
    path: `${path.CRONJOBSFORM}`,
    role: 'CRON_JOB',
    Component: CronJobsForm,
  },
  {
    path: `${path.UPDATECRONJOBS}`,
    role: 'CRON_JOB',
    Component: CronJobsForm,
  },
  {
    path: `${path.ASSIGNBULKINVENTORY}`,
    role: 'MANUAL_BOOKING',
    Component: AssignBulkInventory,
  },

  {
    path: `${path.EMAILTEMPLATELIST}`,
    role: 'EMAIL_TEMPLATE',
    Component: EmailTemplate,
  },
  {
    path: `${path.EMAILTEMPLATEFORM}`,
    role: 'EMAIL_TEMPLATE',
    Component: EmailTemplateForm,
  },
  {
    path: `${path.EMAILTEMPLATEFORMID}`,
    role: 'EMAIL_TEMPLATE',
    Component: EmailTemplateFormid,
  },
  {
    path: `${path.VOUCHERLIST}`,
    role: 'VOUCHER',
    Component: VoucherList,
  },
  {
    path: `${path.VOUCHERDETAILSPAGE}`,
    role: 'VOUCHER',
    Component: VoucherDetailsPage,
  },
  {
    path: `${path.ORDERUTM}`,
    role: 'ORDER_UTM',
    Component: OrderUTM,
  },
  {
    path: `${path.PAYMENTLOGS}`,
    role: 'PAYMENT',
    Component: PaymentLogs,
  },
  {
    path: `${path.PAYMENTLOGSDETAILS}`,
    role: 'PAYMENT',
    Component: PaymentLogsDetails,
  },
  {
    path: `${path.ORDERSLIST}`,
    role: 'ORDER',
    Component: OrdersList,
  },
  {
    path: `${path.ORDERDETAILS}`,
    role: 'ORDER',
    Component: OrderDetails,
  },
  {
    path: `${path.REFUNDSLIST}`,
    role: 'REFUND',
    Component: RefundsList,
  },
  {
    path: `${path.DEALSALES}`,
    role: 'VOUCHER',
    Component: dealSales,
  },
  {
    path: `${path.ACTIVEDEALS}`,
    role: 'VOUCHER',
    Component: activeDeals,
  },
  {
    path: `${path.UPDATEREFUNDDETAILS}`,
    role: 'REFUND',
    Component: updateRefundDetails,
  },
  {
    path: `${path.STATICPAGE}`,
    role: 'STATIC_PAGES',
    Component: staticPagesList,
  },
  {
    path: `${path.STATICPAGEFORM}`,
    role: 'STATIC_PAGES',
    Component: staticPageForm,
  },
  {
    path: `${path.UPDATESTATICPAGE}`,
    role: 'STATIC_PAGES',
    Component: staticPageForm,
  },
  {
    path: `${path.REVIEWLIST}`,
    role: 'REVIEWS',
    Component: ReviewList,
  },
  {
    path: `${path.REVIEWFORM}`,
    role: 'REVIEWS',
    Component: ReviewForm,
  },
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
  {
    path: `${path.TRAVELERTYPE}`,
    role: 'TRAVELLER_TYPES',
    Component: TravelerTypeList,
  },
  {
    path: `${path.TRAVELERTYPEADD}`,
    role: 'TRAVELLER_TYPES',
    Component: TravelerType,
  },
  {
    path: `${path.TRAVELERTYPEUPDATE}`,
    role: 'TRAVELLER_TYPES',
    Component: TravelerType,
  },
  {
    path: `${path.CLEARCACHE}`,
    role: 'CLEAR_CACHES',
    Component: clearCache,
  },
];

const routLink: RouterLink[] = [
  { path: path.HOME, title: 'Home' },
  { path: path.CONTACT, title: 'Contact us' },
];

export { unsecureRoutes, securedRoutesAdmin, routLink, path };
