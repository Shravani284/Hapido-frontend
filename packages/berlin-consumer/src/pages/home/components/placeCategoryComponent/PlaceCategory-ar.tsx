import { Link, useNavigate } from 'react-router-dom';
import css from './PlaceCategoryStyle.module.scss';
import { IPlaceCategoryType } from './placeCategory.interface';
import { DealImg } from 'berlin-common';
import { lang } from '../../../../utils/getLang';
import { useTranslation } from 'react-i18next';

const PlaceCategoryAr = ({
  img,
  name,
  id,
  moduleType,
  slug,
  primary,
}: IPlaceCategoryType) => {
  const navigate = useNavigate();
  const featureRouts = (
    moduleType: any,
    e: number,
    slug: string,
    primary: boolean
  ) => {
    switch (moduleType) {
      case 'Category':
        return `/${lang}/${slug}`;
      case 'Deal':
        return `/${lang}/s/${slug}/${e}`;
      case 'Deal Bundle':
        return `/${lang}/b/${slug}/${e}`;
      case 'Deal Combo':
        return `/${lang}/c/${slug}/${e}`;
      default:
        break;
    }
  };
  const { t } = useTranslation('translation');
  return (
    <>
      <Link to={featureRouts(moduleType, id, slug, primary)}>
        <div
          className={css.PlaceCatImg}
          // onClick={() => {
          //   featureRouts(moduleType, id, slug, primary);
          // }}
        >
          <img loading="lazy" src={img || DealImg} alt={t('HAPIDO')} />
        </div>
        <div className={css.placeName}>{name}</div>
      </Link>
    </>
  );
};

export default PlaceCategoryAr;
