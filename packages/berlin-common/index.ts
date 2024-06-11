import * as utility from "./src/utils";
import MagicTextField from "./src/components/MagicTextField";
import LazyLoader from "./src/components/LazyLoader";
import { useLocalStorage } from "./src/hooks";
import * as constants from "./src/constants";
import i18n from "./src/config/i18n";
import PrimaryButton from "./src/components/button/PrimaryButton";
import SecondaryButton from "./src/components/button/SecondaryButton";
import { ApiRequest } from "./src/config/AxiosInterceptor";
import CheckBoxField from "../berlin-common/src/components/checkBox/index";
import MagicPassword from "../berlin-common/src/components/MagicTextField/MagicPassword";
import NormalTextField from "./src/components/NormalTextField";
import MagicDropDown from "./src/components/MagicDropDown";
import MagicDropDownWithId from "./src/components/MagicDropDown/MagicDropDownWithId";
import authLogo from "./assets/images/AuthLogo.svg";
import authBgLogo from "./assets/images/AuthBgLogo.svg";
import MagicDatePicker from "./src/components/MagicDatePicker";
import { paginationOption } from "./src/config/data";
import ConfirmBoxAlert from "./src/components/ConfirmBox";
import WarningBoxAlert from "./src/components/WarningBox";
import FileUpload from "./src/components/FileUpload/index";
import FileUploadAr from "./src/components/FileUpload/indexAr";
import PreviewModal from "./src/components/PreviewModal";
import CustomSwitchButton from "./src/components/CustomSwitchButton";
import DateFormat from "./src/components/DateFormat";
import DateFormatAr from "./src/components/DateFormatAr/index-ar";
import useWindowSize from "./src/hooks/useWindowSize";
import ResSecondaryBtn from "./src/components/button/ResSecondaryBtn";
import GroupDropDown from "./src/components/GroupDropDown";
import { timeFormat } from "./src/components/DateFormat";
import SortHeader from "./src/components/TableSort";
import ErrorBoundary from "./src/components/ErrorBoundery/ErrorBoundary";
import MagicDateAndTimePicker from "./src/components/MagicDateAndTimePicker";
import Error404Image from "./src/components/maintenance/404.jpg";
import DocsPreviewBtn from "./src/components/PreviewExternalTicket/DocsPreviewBtn";
import useDebounce from "./src/utils/useDebouce";
import BannerImg from "../berlin-common/assets/images/NoBanner.jpg";
import DealImg from "../berlin-common/assets/images/NoDeal.jpg";
import useReplace from "../berlin-common/src/utils/useReplace";
import { tableIcons } from "../berlin-common/src/config/materialTableIcons";
import { formatDateInDubaiTimeZone } from "./src/components/DateFormat";
import HapidoLogo from "../berlin-common/assets/images/halfLogo.svg";

export {
  MagicTextField,
  LazyLoader,
  useLocalStorage,
  constants,
  i18n,
  SecondaryButton,
  ApiRequest,
  MagicPassword,
  CheckBoxField,
  PrimaryButton,
  NormalTextField,
  MagicDropDown,
  authLogo,
  authBgLogo,
  MagicDatePicker,
  paginationOption,
  ConfirmBoxAlert,
  WarningBoxAlert,
  FileUpload,
  FileUploadAr,
  CustomSwitchButton,
  utility,
  PreviewModal,
  DateFormat,
  DateFormatAr,
  useWindowSize,
  ResSecondaryBtn,
  GroupDropDown,
  MagicDropDownWithId,
  timeFormat,
  SortHeader,
  ErrorBoundary,
  MagicDateAndTimePicker,
  Error404Image,
  DocsPreviewBtn,
  useDebounce,
  BannerImg,
  DealImg,
  useReplace,
  tableIcons,
  formatDateInDubaiTimeZone,
  HapidoLogo,
};
