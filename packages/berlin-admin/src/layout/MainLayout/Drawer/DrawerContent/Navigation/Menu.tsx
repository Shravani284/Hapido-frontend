import PublicIcon from '@mui/icons-material/Public';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import WidgetsIcon from '@mui/icons-material/Widgets';
import DiscountIcon from '@mui/icons-material/Discount';
import SellIcon from '@mui/icons-material/Sell';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Shop2Icon from '@mui/icons-material/Shop2';
import PaymentsIcon from '@mui/icons-material/Payments';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import UpdateIcon from '@mui/icons-material/Update';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  HomeOutlined,
  UserOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DiscountTwoToneIcon from '@mui/icons-material/DiscountTwoTone';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { LocationCity } from '@mui/icons-material';
import HikingIcon from '@mui/icons-material/Hiking';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export const menu: any = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/dashboard',
    icon: <HomeOutlined />,
    breadcrumbs: false,
    module: 'DASHBOARD',
  },
  {
    id: 'user',
    title: 'User',
    type: 'item',
    url: '/users',
    icon: <UserOutlined />,
    breadcrumbs: false,
    module: 'USER',
  },
  {
    id: 'merchant',
    title: 'Merchant',
    type: 'item',
    url: '/merchant',
    icon: <UsergroupAddOutlined />,
    breadcrumbs: false,
    module: 'MERCHANT',
  },
  {
    id: 'category',
    title: 'Category',
    type: 'item',
    url: '/category',
    icon: <UnorderedListOutlined />,
    breadcrumbs: false,
    module: 'CATEGORY',
  },
  {
    id: 'Geographical Areas',
    title: 'Geography',
    type: 'item',
    icon: <PublicIcon />,
    breadcrumbs: false,
    module: 'GEOGRAPHY',

    children: [
      {
        id: 'area',
        title: 'Area',
        type: 'item',
        url: '/geography/area',
        icon: <LocationOnOutlinedIcon />,
        breadcrumbs: false,
      },
      {
        id: 'city',
        title: 'City',
        type: 'item',
        url: '/geography/city',
        icon: <LocationCity />,
        breadcrumbs: false,
      },

      {
        id: 'country',
        title: 'Country',
        type: 'item',
        url: '/geography/country',
        icon: <PublicIcon />,
        breadcrumbs: false,
      },
    ],
  },
  {
    id: 'deals',
    title: 'Deals',
    type: 'item',
    icon: <DiscountOutlinedIcon />,
    breadcrumbs: false,
    module: 'DEAL',

    children: [
      {
        id: 'deal',
        title: 'Single Deal',
        type: 'item',
        url: '/deals/singledeals',
        icon: <SellIcon />,
        breadcrumbs: false,
      },
      {
        id: 'bundle',
        title: 'Bundle',
        type: 'item',
        url: '/deals/dealbundle',
        icon: <DiscountTwoToneIcon />,
        breadcrumbs: false,
      },
      {
        id: 'dealCombo',
        title: 'Combo',
        type: 'item',
        url: '/deals/dealcombo',
        icon: <DiscountTwoToneIcon />,
        breadcrumbs: false,
      },
      {
        id: 'tag',
        title: 'Tags',
        type: 'item',
        url: '/deals/tag',
        icon: <WidgetsIcon />,
      },

      {
        id: 'UploadExternalCode',
        title: 'Upload External Code',
        type: 'item',
        url: '/deals/uploadexternalcode',
        icon: <FileUploadOutlinedIcon />,
        breadcrumbs: false,
      },
      {
        id: 'UploadMerchantTicket',
        title: 'Upload External Ticket',
        type: 'item',
        url: '/deals/uploadexternalticket',
        icon: <FileUploadIcon />,
        breadcrumbs: false,
      },
      {
        id: 'travelerType',
        title: 'Traveler Type',
        type: 'item',
        url: '/deals/travelertype',
        icon: <HikingIcon />,
        module: 'TRAVELLER_TYPES',
      },
    ],
  },

  {
    id: 'promo',
    title: 'Promo',
    type: 'item',
    url: '/promo',
    icon: <LocalAtmIcon />,
    breadcrumbs: false,
    module: 'PROMO_CODE',
  },
  {
    id: 'banners',
    title: 'Banners',
    type: 'item',
    module: 'BANNER',
    icon: <DiscountOutlinedIcon />,
    children: [
      {
        id: 'bannerPlacement',
        title: 'Placements',
        type: 'item',
        url: '/banner/bannerplacelist',
        icon: <FileImageOutlined />,
        breadcrumbs: false,
      },
      {
        id: 'banner',
        title: 'Banner',
        type: 'item',
        url: '/banner/bannerlist',
        icon: <ViewCarouselIcon />,
        breadcrumbs: false,
      },
    ],
  },

  {
    id: 'flashsale',
    title: 'Flash Sale',
    type: 'item',
    module: 'FLASH_SALE',
    icon: <DiscountIcon />,
    children: [
      {
        id: 'bogo',
        title: 'Buy one get one',
        type: 'item',
        url: '/flashsale/bo-go',
        icon: <LocalOfferOutlinedIcon />,
        breadcrumbs: false,
      },
      {
        id: 'bosd',
        title: (
          <span>
            Buy one get 2<sup>nd</sup> at
            <br /> discount
          </span>
        ),
        type: 'item',
        url: '/flashsale/bosd',
        icon: <LocalOfferOutlinedIcon />,
      },
      {
        id: 'bogfg',
        title: 'Buy and get free gift',
        type: 'item',
        url: '/flashsale/bogfg',
        icon: <LocalOfferOutlinedIcon />,
        breadcrumbs: false,
      },
      {
        id: 'dp',
        title: 'Complex Discount',
        type: 'item',
        url: '/flashsale/dp',
        icon: <LocalOfferOutlinedIcon />,
        breadcrumbs: false,
      },

      {
        id: 'DiscountApp',
        title: 'Simple Discount',
        type: 'item',
        url: '/flashsale/flashdiscount',
        icon: <LocalOfferOutlinedIcon />,
        breadcrumbs: false,
      },
    ],
  },
  {
    id: 'Reviews',
    title: 'Reviews',
    type: 'item',
    url: '/reviewlist',
    module: 'REVIEWS',
    icon: <ReviewsIcon />,
    breadcrumbs: false,
  },
  {
    id: 'purchase',
    title: 'Purchases',
    type: 'item',
    icon: <Shop2Icon />,
    children: [
      {
        id: 'voucher',
        title: 'Voucher',
        type: 'item',
        url: '/purchase/voucherlist',
        icon: <DiscountTwoToneIcon />,
        breadcrumbs: false,
        module: 'VOUCHER',
      },
      {
        id: 'order',
        title: 'Order',
        type: 'item',
        url: '/purchase/orderslist',
        icon: <ShoppingBagTwoToneIcon />,
        breadcrumbs: false,
        module: 'ORDER',
      },
      {
        id: 'paymentLogs',
        title: 'Payment Logs',
        type: 'item',
        url: '/purchase/paymentlogs',
        icon: <PaymentsIcon />,
        breadcrumbs: false,
        module: 'PAYMENT',
      },
      {
        id: 'refunds',
        title: 'Refunds',
        type: 'item',
        url: '/refunds',
        icon: <WidgetsIcon />,
        module: 'REFUND',
      },
      {
        id: 'orderUTM',
        title: 'Order UTM Data',
        type: 'item',
        url: '/purchase/orderutm',
        icon: <ShoppingBagTwoToneIcon />,
        breadcrumbs: false,
        module: 'ORDER_UTM',
      },
      {
        id: 'dealSales',
        title: 'Deal Sales Report',
        type: 'item',
        url: '/purchase/dealsales',
        icon: <TrendingUpIcon />,
        breadcrumbs: false,
        module: 'VOUCHER',
      },
      {
        id: 'activeDeals',
        title: 'Active Deals Report',
        type: 'item',
        url: '/purchase/activedeals',
        icon: <WhatshotIcon />,
        breadcrumbs: false,
        module: 'VOUCHER',
      },
    ],
  },

  {
    id: 'cronJobs',
    title: 'Cron Job',
    type: 'item',
    url: '/cronjobs',
    icon: <UpdateIcon />,
    module: 'CRON_JOB',
  },
  {
    id: 'EmailTemplate',
    title: 'Email Templates',
    type: 'item',
    url: '/emailtemplate',
    icon: <HomeOutlined />,
    module: 'EMAIL_TEMPLATE',
  },
  {
    id: 'staticPage',
    title: 'Static Pages',
    type: 'item',
    url: '/staticpage',
    icon: <AutoStoriesOutlinedIcon />,
    module: 'STATIC_PAGES',
  },
  {
    id: 'manualBooking',
    title: 'Manual Booking',
    type: 'item',
    module: 'MANUAL_BOOKING',
    icon: <BookOnlineIcon />,
    children: [
      {
        id: 'AssignBulkInventory',
        title: 'Bulk Inventory',
        type: 'item',
        url: '/manualbooking/assignbulkinventory',
        icon: <Inventory2OutlinedIcon />,
        breadcrumbs: false,
      },
      {
        id: 'inventoryAssignment',
        title: 'Inventory Assignment',
        type: 'item',
        url: '/manualbooking/inventoryassignment',
        icon: <InventoryOutlinedIcon />,
        breadcrumbs: false,
      },
    ],
  },
  {
    id: 'clearCaches',
    title: 'Clear all caches',
    type: 'item',
    url: '/clearCache',
    icon: <DeleteOutlinedIcon />,
    module: 'STATIC_PAGES',
  },
];
