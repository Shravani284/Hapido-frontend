import { useTranslation } from 'react-i18next';
import css from './ResMixBanner.module.scss';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TwoRowsSlider from '../../../../components/twoRowsCarousel';
import { DealImg } from 'berlin-common';
import { lang } from '../../../../utils/getLang';
import { path } from '../../../../routes/Routers';

const ResMixBanner = ({ data }: any) => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  const productDetailRouts = (
    type: string,
    slug: string,
    id: string,
    dealType: string,
    search_term: string,
    primary: boolean,
    primarySlug: string
  ) => {
    if (type?.toLocaleLowerCase() === 'category') {
      primary
        ? navigate(`/${lang}/${primarySlug}`)
        : navigate(`/${lang}/${primarySlug}/${slug}`);
    } else if (search_term) {
      navigate(`/${lang}/search?q=${search_term}`);
    } else if (dealType === 'SINGLE') {
      navigate(`/${lang}/s/${slug}/${id}`);
    } else if (dealType === 'COMBO') {
      navigate(`/${lang}/c/${slug}/${id}`);
    } else {
      navigate(`/${lang}/b/${slug}/${id}`);
    }
  };
  return (
    <>
      <Box mb={3}>
        <h6 className={css.heading}>{data.placement_title}</h6>
        <Box display={'flex'} width={'100%'} columnGap={2}>
          <Box width={'50%'} className={css.mainImg}>
            {data?.images[0]?.type?.toLowerCase() === 'video' ? (
              <video
                playsInline
                autoPlay
                muted
                loop
                className={css.video}
                onClick={() =>
                  productDetailRouts(
                    data?.images[0].target_module,
                    data?.images[0].slug,
                    data?.images[0].target_id,
                    data?.images[0].target_deal_type,
                    data?.images[0].search_term,
                    data?.images[0].primary,
                    data?.images[0].primarySlug
                  )
                }
              >
                <source
                  src={data?.images[0]?.extfilepath || DealImg}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                loading="lazy"
                src={data?.images[0]?.extfilepath || DealImg}
                alt={t('HAPIDO')}
                onClick={() =>
                  productDetailRouts(
                    data?.images[0].target_module,
                    data?.images[0].slug,
                    data?.images[0].target_id,
                    data?.images[0].target_deal_type,
                    data?.images[0].search_term,
                    data?.images[0].primary,
                    data?.images[0].primarySlug
                  )
                }
              />
            )}
            {data?.target_module}
          </Box>
          <Box width={'50%'}>
            <TwoRowsSlider
              setting={{
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: false,
                rows: 2,
                arrows: true,
              }}
            >
              {data?.images?.slice(1, data?.images?.length).map((item: any) => (
                <Box
                  width={'100%'}
                  height={'155px'}
                  key={item?.imageId}
                  display={'flex'}
                  onClick={() =>
                    productDetailRouts(
                      item?.target_module,
                      item?.slug,
                      item?.target_id,
                      item?.target_deal_type,
                      item?.search_term,
                      item?.primary,
                      item?.primarySlug
                    )
                  }
                >
                  {/* {console.log('item', item)} */}
                  {item?.type?.toLowerCase() === 'video' ? (
                    <video
                      playsInline
                      autoPlay
                      muted
                      loop
                      className={css.sideLayerImg}
                    >
                      <source
                        src={item?.extfilepath || DealImg}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      loading="lazy"
                      src={item?.extfilepath || DealImg}
                      alt={t('HAPIDO')}
                      className={css.sideLayerImg}
                    />
                  )}
                </Box>
              ))}
            </TwoRowsSlider>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResMixBanner;
