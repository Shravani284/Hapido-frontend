import { useTranslation } from 'react-i18next';
import AddressEdit from './AddressEdit';
import AddressEditAr from './AddressEdit-ar';
import { localeLang } from '../../../utils/getLang';

const AddressMainAr = () => {
  const { i18n, t } = useTranslation('translation');

  return <>{localeLang === 'en' ? <AddressEdit /> : <AddressEditAr />}</>;
};

export default AddressMainAr;
