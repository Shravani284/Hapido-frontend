import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Container, Skeleton } from '@mui/material';
import css from './HeaderStyle.module.scss';
import { useTranslation } from 'react-i18next';
import { homePageCategoryList } from '../../services/HomePageServices';
import { SkeletonNavBar } from '../Skeleton';
import { DealImg } from 'berlin-common';
import { lang, localeLang } from '../../utils/getLang';
// import { lang } from '../../utils/getLang';

const Header = ({ ResetHandler }: any) => {
  const [hoveredNavItem, setHoveredNavItem] = useState<number | null>(null);
  const { i18n } = useTranslation('translation');
  const [categoryList, setCategoryList] = useState([]);
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();
  const [isSkeleton, setIsSkeleton] = useState(false);

  const handleHeaderHover = (index: number | null) => {
    setHoveredNavItem(index);
    setActiveLink(index);
  };

  const handleHeaderLeave = () => {
    setHoveredNavItem(null);
    setActiveLink(null);
  };

  useEffect(() => {
    setIsSkeleton(true);
    homePageCategoryList()
      .then((response) => {
        setCategoryList(response.data.category);
        setIsSkeleton(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathname = url.pathname;
  const search = url.search;

  return (
    <>
      <div
        className={css.subHeadNav}
        onMouseEnter={() => handleHeaderHover(null)}
        onMouseLeave={handleHeaderLeave}
      >
        <Container maxWidth={'xl'}>
          {isSkeleton ? (
            <>
              <SkeletonNavBar />
            </>
          ) : (
            <>
              {categoryList?.map((item: any, index: number) => (
                <span
                  key={index}
                  onMouseEnter={() => handleHeaderHover(index)}
                  className={pathname.includes(item?.slug) ? css.active : ''}
                  onClick={() => (ResetHandler ? ResetHandler() : '')}
                  // onClick={() => navigate()}
                  // onClick={() => navigate(`categoryList/${item.id}`)}
                >
                  <NavLink to={`/${lang}/${item?.slug}`}>{item.label}</NavLink>
                </span>
              ))}
            </>
          )}
        </Container>
        {/* {hoveredNavItem !== null && (
        // !TODO: Important Code
          <div style={{ width: '100%' }}>
            <Container maxWidth={'xl'}>
              {categoryList?.map((item: any, index: number) => (
                <Box className={css.dropDownMenu} key={index}>
                  <Container maxWidth={'xl'}>
                    {hoveredNavItem === index
                      ? item.subCategories?.map((i: any, index: number) => (
                        <span
                          key={index}
                          onClick={() =>
                            navigate(`/${lang}/${item?.slug}/${i?.slug}`)
                          }
                          className={css.secondaryCat}
                        >
                          <img
                            loading="lazy"
                            src={i?.images[0]?.extfilepath || DealImg}
                            alt="CategoryImg"
                          />
                          <span>{i?.label}</span>
                        </span>
                      ))
                      : null}
                  </Container>
                </Box>
              ))}
            </Container>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Header;
