import css from './PlaceCategoryStyle.module.scss';
import PlaceCategoryAr from './PlaceCategory-ar';
import { IPlaceCategoryType } from './placeCategory.interface';
import { Box } from '@mui/material';
import { useWindowSize } from 'berlin-common';
import { useMemo } from 'react';

type IProps = {
  PlaceCategoryJson: IPlaceCategoryType[];
};

function PlaceCategoryListAr({ PlaceCategoryJson }: IProps) {
  const { size } = useWindowSize();
  const mobileCat = useMemo(() => {
    if (PlaceCategoryJson.length == 0 || size > 768) return [];
    const rows = [[], []];
    PlaceCategoryJson.forEach((item, index) => {
      const rowIndex = index % 2;
      rows[rowIndex].push(item);
    });
    return rows;
  }, [PlaceCategoryJson, size]);

  return size >= 768 ? (
    <Box
      className={`${css.placeCategoryContainer} placementScroll RTLComponent`}
      columnGap={5}
    >
      {PlaceCategoryJson.map((item, index) => (
        <Box className={css.GridRow} key={item.id}>
          <PlaceCategoryAr
            img={item.img}
            name={item.name}
            id={item.id}
            moduleType={item?.moduleType}
            primary={item?.primary}
            slug={item?.slug}
          />
        </Box>
      ))}
    </Box>
  ) : (
    <Box className={`${css.mobileScroll} placementScroll`} columnGap={5}>
      {mobileCat?.map((data, index) => (
        <Box
          key={index}
          className={`${css.MobPlaceCategoryContainer} RTLComponent`}
          columnGap={5}
        >
          {data.map((item, index) => (
            <Box className={css.GridRow} key={item.id}>
              <PlaceCategoryAr
                img={item.img}
                name={item.name}
                id={item.id}
                moduleType={item?.moduleType}
                primary={item?.primary}
                slug={item?.slug}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default PlaceCategoryListAr;
