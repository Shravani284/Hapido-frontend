import { useTranslation } from 'react-i18next';
import css from './MegaSalesStyle.module.scss';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { DealImg } from 'berlin-common';
import { lang } from '../../../../utils/getLang';
import { path } from '../../../../routes/Routers';

const MegaSalesAr = ({ images, id }: any) => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  const productDetailRouts = (
    type: string,
    slugs: string,
    targetId: any,
    search_term: string,
    targetModule: string,
    primarySlug: string,
    primary: boolean
  ) => {
    if (type === 'SINGLE') {
      return `/${lang}/s/${slugs}/${targetId}`;
      // navigate(`/s/${slugs}/${targetId}`);
    } else if (targetModule === 'category') {
      return primary
        ? `/${lang}/${primarySlug}`
        : `/${lang}/${primarySlug}/${slugs}`;
    } else if (search_term) {
      return `/${lang}/search?q=${search_term}`;
      // navigate(`${path.SEARCHITEM}?q=${search_term}`);
    } else if (type === 'COMBO') {
      return `/${lang}/c/${slugs}/${targetId}`;
    } else {
      return `/${lang}/b/${slugs}/${targetId}`;
    }
    // navigate(`/productDetails/${bannerId || id}`);
  };
  return (
    <>
      <Box className={`${css.megaRoundContainer} RTLComponent`}>
        {images?.map((item: any) => (
          <Box
            sx={{ width: '33%' }}
            key={item?.imageId}
            // onClick={() =>
            //   productDetailRouts(
            //     item?.target_deal_type,
            //     item?.slug,
            //     item?.target_id,
            //     item?.search_term,
            //     item?.target_module,
            //     item?.primarySlug,
            //     item?.primary
            //   )
            // }
          >
            <Link
              to={productDetailRouts(
                item?.target_deal_type,
                item?.slug,
                item?.target_id,
                item?.search_term,
                item?.target_module,
                item?.primarySlug,
                item?.primary
              )}
            >
              <div>
                <img
                  src={item?.extfilepath || DealImg}
                  alt={t('HAPIDO')}
                  className={css.megaSalesRound}
                  loading="lazy"
                />
              </div>
              <div className={css.roundImgTitle}>{item?.campaign_name}</div>
            </Link>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MegaSalesAr;
