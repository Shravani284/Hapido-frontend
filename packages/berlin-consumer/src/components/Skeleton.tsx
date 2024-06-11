import { Box, Skeleton } from '@mui/material';
import { useWindowSize } from 'berlin-common';

// Home Page NavBar
const SkeletonNavBar = () => {
  return (
    <>
      <Skeleton variant="text" width={'8%'} height={'60px'} />
      <Skeleton variant="text" width={'8%'} height={'60px'} />
      <Skeleton variant="text" width={'8%'} height={'60px'} />
      <Skeleton variant="text" width={'8%'} height={'60px'} />
      <Skeleton variant="text" width={'8%'} height={'60px'} />
      <Skeleton variant="text" width={'8%'} height={'60px'} />
      <Skeleton variant="text" width={'8%'} height={'60px'} />
      <Skeleton variant="text" width={'8%'} height={'60px'} />
      <Skeleton variant="text" width={'8%'} height={'60px'} />
    </>
  );
};

// Home Page Banner
const SkeletonBanner = () => {
  const { size } = useWindowSize();
  return (
    <>
      {size < 768 ? (
        <Skeleton variant="rectangular" width={'100%'} height={170} />
      ) : (
        <Skeleton variant="rectangular" width={'100%'} height={400} />
      )}
    </>
  );
};

// Product Detail Page Video Slider
const SkeletonBannerVideo = () => {
  const { size } = useWindowSize();

  return (
    <>
      <Box mt={3}>
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={500}
          sx={{ borderRadius: 10 }}
        />

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={5}
        >
          <Skeleton variant="text" width={'50%'} height={80} />
          <Skeleton variant="rectangular" width={'5%'} height={50} />
        </Box>
        <Skeleton variant="text" width={'80%'} height={40} />
        <Skeleton variant="text" width={'20%'} height={60} />
        <Skeleton
          variant="text"
          width={'60%'}
          height={50}
          sx={{ marginTop: 8 }}
        />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={4}
          mt={6}
        >
          <Skeleton
            variant="rounded"
            width={'48%'}
            height={500}
            sx={{ borderRadius: 10 }}
          />
          <Skeleton
            variant="rounded"
            width={'48%'}
            height={500}
            sx={{ borderRadius: 10 }}
          />
        </Box>
      </Box>
    </>
  );
};

//Product Details
const SkeletonProductDetailsBanner = () => {
  return (
    <>
      <Box>
        <Skeleton variant="rectangular" width={'100%'} height={220} />
      </Box>
      <Box ml={'15px'} mt={3.5} lineHeight={1.5}>
        <Skeleton variant="text" width={130} sx={{ fontSize: '9px' }} />
        <Skeleton variant="text" width={'85%'} sx={{ fontSize: '9px' }} />
      </Box>
      <Box>
        <Box margin={'15px'} my={2} mb={1}>
          <Skeleton variant="text" width={'100%'} sx={{ fontSize: ' 18px' }} />
          {/* <Skeleton variant="text" width={'100%'} sx={{ fontSize: ' 18px' }} /> */}

          <Skeleton variant="text" width={'100%'} sx={{ fontSize: ' 16px' }} />
          <Skeleton variant="text" width={'100%'} sx={{ fontSize: ' 16px' }} />
          <Box display={'flex'} alignItems={'center'} mt={1}>
            <Box>
              <Skeleton variant="rounded" width={55} height={27} />
            </Box>
            <Box px={2}>
              <Skeleton variant="text" width={70} sx={{ fontSize: ' 16px' }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

//Product Details Highlights
const SkeletonPDHighlights = () => {
  return (
    <>
      <Box paddingLeft={'5px'} paddingRight={'5px'}>
        <Box>
          <Skeleton variant="rectangular" width={'100%'} height={100} />
        </Box>
        <Box mt={2}>
          <Skeleton variant="text" width={'100%'} sx={{ fontSize: '24px' }} />
        </Box>
      </Box>
    </>
  );
};

//PDP deal cards below highlights
const SkeletonPDPBookNow = () => {
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} mt={0.5}>
        <Box display={'flex'}>
          <Skeleton variant="rounded" width={70} height={21.6} />
          <Skeleton
            variant="text"
            width={40}
            sx={{ fontSize: '18px', ml: '10px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={120} height={26.1} />
        </Box>
      </Box>
    </>
  );
};

const SkeletonPDPDeals = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box width={'72%'}>
          <Skeleton
            variant="rounded"
            width={'100%'}
            height={'21px'}
            sx={{ mb: 0.5 }}
          />
          <Skeleton
            variant="rounded"
            width={120}
            height={'21px'}
            sx={{ mb: 0.5 }}
          />
          <Skeleton
            variant="rounded"
            width={200}
            height={40}
            sx={{ mb: 0.5 }}
          />
        </Box>
        <Box>
          <Skeleton
            variant="rounded"
            width={'55px'}
            height={'10px'}
            sx={{ mb: 0.5 }}
          />
        </Box>
      </Box>
    </>
  );
};

// Home Page Feature List
const SkeletonFeatureList = () => {
  const { size } = useWindowSize();
  return (
    <>
      {size < 768 ? (
        <>
          <Box
            display={'flex'}
            gap={5}
            my={5}
            justifyContent={'space-between'}
            sx={{ overflowX: 'hidden' }}
          >
            <Box>
              <Skeleton variant="circular" width={70} height={70} />
              <Skeleton
                variant="text"
                sx={{ fontSize: '22px', marginTop: '8px' }}
              />
            </Box>
            <Box>
              <Skeleton variant="circular" width={70} height={70} />
              <Skeleton
                variant="text"
                sx={{ fontSize: '22px', marginTop: '8px' }}
              />
            </Box>
            <Box>
              <Skeleton variant="circular" width={70} height={70} />
              <Skeleton
                variant="text"
                sx={{ fontSize: '22px', marginTop: '8px' }}
              />
            </Box>
            <Box>
              <Skeleton variant="circular" width={70} height={70} />
              <Skeleton
                variant="text"
                sx={{ fontSize: '22px', marginTop: '8px' }}
              />
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display={'flex'}
          gap={5}
          my={5}
          justifyContent={'space-between'}
          sx={{ overflowX: 'hidden' }}
        >
          <Box>
            <Skeleton variant="rounded" width={156} height={156} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '8px' }}
            />
          </Box>
          <Box>
            <Skeleton variant="rounded" width={156} height={156} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '8px' }}
            />
          </Box>
          <Box>
            <Skeleton variant="rounded" width={156} height={156} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '8px' }}
            />
          </Box>
          <Box>
            <Skeleton variant="rounded" width={156} height={156} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '8px' }}
            />
          </Box>
          <Box>
            <Skeleton variant="rounded" width={156} height={156} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '8px' }}
            />
          </Box>
          <Box>
            <Skeleton variant="rounded" width={156} height={156} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '8px' }}
            />
          </Box>
          <Box>
            <Skeleton variant="rounded" width={156} height={156} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '8px' }}
            />
          </Box>
          <Box>
            <Skeleton variant="rounded" width={156} height={156} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '8px' }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

/* Category List on Home page */
const SkeletonHomeCategory = () => {
  return (
    <>
      <Skeleton
        variant="text"
        width={200}
        sx={{ fontSize: '28px', marginTop: '8px', marginBottom: '10px' }}
      />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        marginBottom={'20px'}
      >
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        marginBottom={'20px'}
      >
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        marginBottom={'20px'}
      >
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={80} height={80} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
      </Box>
    </>
  );
};

// Home Page Double Column
const SkeletonDoubleColumn = () => {
  const { size } = useWindowSize();
  return (
    <>
      {size < 768 ? (
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={220}
          sx={{ mt: 2 }}
        />
      ) : (
        <>
          <Skeleton
            variant="text"
            width={'25%'}
            height={40}
            sx={{ marginBottom: '10px', marginTop: '10px' }}
          />
          <Box
            width={'100%'}
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            rowGap={4}
            sx={{ marginBottom: '30px' }}
          >
            <Box maxWidth={'49%'} display={'flex'}>
              <Skeleton
                variant="rounded"
                width={340}
                height={260}
                sx={{ borderRadius: '20px' }}
              />
              <Box ml={1}>
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: '32px' }}
                />
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: '20px' }}
                />
                <Skeleton
                  variant="text"
                  width={100}
                  sx={{ fontSize: '30px', marginTop: '10px' }}
                />
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: '30px' }}
                />
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: '25px' }}
                />
                <Box display={'flex'} alignItems={'center'} gap={1} mb={1}>
                  <Skeleton variant="circular" width={20} />
                  <Skeleton variant="text" width={170} />
                </Box>
                <Skeleton variant="rounded" width={100} height={25} />
              </Box>
            </Box>

            <Box maxWidth={'49%'} display={'flex'}>
              <Skeleton
                variant="rounded"
                width={340}
                height={260}
                sx={{ borderRadius: '20px' }}
              />
              <Box ml={1}>
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: '32px' }}
                />
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: '20px' }}
                />
                <Skeleton
                  variant="text"
                  width={100}
                  sx={{ fontSize: '30px', marginTop: '10px' }}
                />
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: '30px' }}
                />
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ fontSize: '25px' }}
                />
                <Box display={'flex'} alignItems={'center'} gap={1} mb={1}>
                  <Skeleton variant="circular" width={20} />
                  <Skeleton variant="text" width={170} />
                </Box>
                <Skeleton variant="rounded" width={100} height={25} />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
// Home Page single Column Title
const SkeletonColumnTitle = () => {
  return (
    <>
      <Skeleton variant="text" width={'25%'} sx={{ fontSize: '16px', mb: 2 }} />
    </>
  );
};

// Home Page single Column
const SkeletonSingleColumn = () => {
  const { size } = useWindowSize();
  return (
    <>
      {size < 768 ? (
        <Skeleton variant="rounded" width={'100%'} height={360} />
      ) : (
        <>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
          >
            <Skeleton
              variant="text"
              width={'25%'}
              height={40}
              sx={{ marginBottom: '10px', marginTop: '10px' }}
            />
            <Skeleton
              variant="text"
              width={'10%'}
              height={40}
              sx={{ marginBottom: '10px', marginTop: '10px' }}
            />
          </Box>
          <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            sx={{ marginBottom: '30px' }}
          >
            <Box maxWidth={'32%'}>
              <Skeleton
                variant="rounded"
                width={'100%'}
                height={260}
                sx={{ borderRadius: '20px' }}
              />
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
              >
                <Box display={'flex'} alignItems={'center'} gap={1} mb={1}>
                  <Skeleton variant="circular" width={20} />
                  <Skeleton variant="text" width={200} />
                </Box>
                <Skeleton variant="circular" width={20} />
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={50} />
              </Box>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={250} height={40} />
            </Box>

            <Box maxWidth={'32%'}>
              <Skeleton
                variant="rounded"
                width={'100%'}
                height={260}
                sx={{ borderRadius: '20px' }}
              />
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'} gap={1} mb={1}>
                  <Skeleton variant="circular" width={20} />
                  <Skeleton variant="text" width={200} />
                </Box>
                <Skeleton variant="circular" width={20} />
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={50} />
              </Box>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={250} height={40} />
            </Box>
            <Box maxWidth={'32%'}>
              <Skeleton
                variant="rounded"
                width={'100%'}
                height={260}
                sx={{ borderRadius: '20px' }}
              />
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'} gap={1} mb={1}>
                  <Skeleton variant="circular" width={20} />
                  <Skeleton variant="text" width={200} />
                </Box>
                <Skeleton variant="circular" width={20} />
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={50} />
              </Box>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={250} height={40} />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

// Category Banner
const SkeletonCategoryBanner = () => {
  const { size } = useWindowSize();
  return (
    <>
      {size < 768 ? (
        <Skeleton variant="rectangular" width={'100%'} height={180} />
      ) : (
        <Skeleton variant="rectangular" width={'100%'} height={400} />
      )}
    </>
  );
};

//Category page breadcrumbs
const SkeletonCategoryBreadCrumbs = () => {
  return (
    <Skeleton
      variant="text"
      width={100}
      sx={{ fontSize: '14px', marginTop: '0px', marginBottom: '8px' }}
    />
  );
};

// Category Page Feature List
const SkeletonFeatureOnCategory = () => {
  return (
    <>
      <Box
        display={'flex'}
        gap={5}
        my={5}
        justifyContent={'space-between'}
        sx={{ overflowX: 'hidden' }}
      >
        <Box>
          <Skeleton variant="rounded" width={156} height={200} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={156} height={200} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={156} height={200} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={156} height={200} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={156} height={200} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={156} height={200} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={156} height={200} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
        <Box>
          <Skeleton variant="rounded" width={156} height={200} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '22px', marginTop: '8px' }}
          />
        </Box>
      </Box>
    </>
  );
};

// Category Page Feature List Mobile
const SkeletonFeatureOnCategoryMob = () => {
  return (
    <>
      <Box
        display={'flex'}
        my={2.5}
        gap={2}
        sx={{ overflowX: 'scroll' }}
        flexDirection={'row'}
      >
        {[...Array(8)].map((_, index) => (
          <Box>
            <Skeleton variant="rounded" width={93} height={121} />
            <Skeleton
              variant="text"
              sx={{ fontSize: '22px', marginTop: '10px' }}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

// SearchLIst
const SkeletonSearchList = () => {
  const { size } = useWindowSize();
  const mobileLoopHandler = () => {
    return (
      <>
        <Box>
          <Skeleton
            variant="rounded"
            width={140}
            height={180}
            sx={{ borderRadius: '20px' }}
          />
          <Box ml={1} mr={1}>
            <Skeleton variant="text" width={100} sx={{ fontSize: '15px' }} />
            <Skeleton variant="text" width={90} sx={{ fontSize: '15px' }} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Skeleton variant="text" width={50} sx={{ fontSize: '15px' }} />
              <Skeleton
                variant="rounded"
                width={30}
                height={10}
                sx={{
                  fontSize: '20px',
                  ml: '10px',
                  borderRadius: '20px',
                }}
              />
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Skeleton
                variant="rounded"
                width={30}
                height={10}
                sx={{
                  fontSize: '20px',
                  marginTop: '2.5px',
                  borderRadius: '20px',
                }}
              />
              <Skeleton
                variant="text"
                width={25}
                sx={{
                  fontSize: '12px',
                  mr: '5px',
                }}
              />
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Skeleton variant="circular" width={10} />
              <Skeleton variant="text" width={75} />
            </Box>
            <Box display={'flex'} justifyContent={'space-around'}>
              <Skeleton
                variant="rounded"
                width={75}
                height={13}
                sx={{ borderRadius: '20px', mt: '5px' }}
              />
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  const loopHandler = () => {
    return (
      <>
        <Box>
          <Skeleton
            variant="rounded"
            width={210}
            height={300}
            sx={{ borderRadius: '20px' }}
          />
          <Box ml={1} mr={1}>
            <Skeleton variant="text" width={180} sx={{ fontSize: '20px' }} />
            <Skeleton variant="text" width={150} sx={{ fontSize: '20px' }} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Skeleton
                variant="text"
                width={100}
                sx={{ fontSize: '20px', marginTop: '5px' }}
              />
              <Skeleton
                variant="text"
                width={50}
                // height={20}
                sx={{ fontSize: '20px', marginTop: '5px' }}
              />
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Skeleton
                variant="rounded"
                width={50}
                height={20}
                sx={{ fontSize: '20px', marginTop: '5px' }}
              />
              <Skeleton
                variant="text"
                width={30}
                sx={{
                  fontSize: '20px',
                  marginTop: '5px',
                  mr: '5px',
                }}
              />
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={1} mb={1}>
              <Skeleton variant="circular" width={30} />
              <Skeleton variant="text" width={150} />
            </Box>
            <Box display={'flex'} justifyContent={'space-around'}>
              <Skeleton
                variant="rounded"
                width={150}
                height={25}
                sx={{ borderRadius: '20px', mt: '10px' }}
              />
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  return (
    <>
      {size > 768 ? (
        <>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            rowGap={8}
            columnGap={2}
          >
            {[...Array(Math.ceil(8 / 4))].map((_, rowIndex) => (
              <Box
                key={rowIndex}
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                {[...Array(4)].map((_, cardIndex) => (
                  <div key={cardIndex}>{loopHandler()}</div>
                ))}
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          {' '}
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-around'}
            rowGap={4}
            columnGap={1}
          >
            {[...Array(8)].map((_, index) => (
              <div key={index}>{mobileLoopHandler()}</div>
            ))}
          </Box>
        </>
      )}
    </>
  );
};

// Menu Listing- Mobile
const SkeletonMobileCategory = () => {
  return [...Array(8)].map((_, index) => (
    <Box key={index}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        margin={'0px 5px'}
        mt={'20px'}
        alignItems={'center'}
      >
        <Skeleton variant="text" width={'29%'} height={'50px'} />
        <Skeleton
          variant="rounded"
          sx={{ borderRadius: '30px' }}
          width={'29%'}
          height={'30px'}
        />
      </Box>
      <Box display={'flex'} justifyContent={'space-around'}>
        <Box mb={2} width={'24%'}>
          <Skeleton variant="rectangular" height={100} sx={{ margin: '5px' }} />
          <Skeleton variant="rectangular" sx={{ margin: '5px' }} height={20} />
        </Box>
        <Box mb={2} width={'24%'}>
          <Skeleton variant="rectangular" height={100} sx={{ margin: '5px' }} />
          <Skeleton variant="rectangular" sx={{ margin: '5px' }} height={20} />
        </Box>
        <Box mb={2} width={'24%'}>
          <Skeleton variant="rectangular" height={100} sx={{ margin: '5px' }} />
          <Skeleton variant="rectangular" sx={{ margin: '5px' }} height={20} />
        </Box>
        <Box mb={2} width={'24%'}>
          <Skeleton variant="rectangular" height={100} sx={{ margin: '5px' }} />
          <Skeleton variant="rectangular" sx={{ margin: '5px' }} height={20} />
        </Box>
      </Box>
    </Box>
  ));
};

//VoucherList
const SkeletonVoucherlist = () => {
  return [...Array(8)]?.map((_, index) => (
    <Box key={index}>
      <Skeleton
        variant="rectangular"
        height={270}
        sx={{ borderRadius: '20px', marginBottom: '20px' }}
      />
    </Box>
  ));
};

// Address List
const SkeletonAddressList = () => {
  return [...Array(1)]?.map((_, index) => (
    <Box key={index}>
      <Skeleton
        variant="rectangular"
        height={122}
        sx={{ borderRadius: '20px', marginBottom: '20px' }}
      />
    </Box>
  ));
};

export {
  SkeletonNavBar,
  SkeletonBanner,
  SkeletonFeatureList,
  SkeletonDoubleColumn,
  SkeletonColumnTitle,
  SkeletonSingleColumn,
  SkeletonBannerVideo,
  SkeletonProductDetailsBanner,
  SkeletonPDHighlights,
  SkeletonPDPDeals,
  SkeletonPDPBookNow,
  SkeletonCategoryBanner,
  SkeletonFeatureOnCategory,
  SkeletonFeatureOnCategoryMob,
  SkeletonCategoryBreadCrumbs,
  SkeletonSearchList,
  SkeletonHomeCategory,
  SkeletonMobileCategory,
  SkeletonVoucherlist,
  SkeletonAddressList,
};
