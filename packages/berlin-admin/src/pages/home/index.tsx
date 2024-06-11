import { Typography } from '@mui/material';
import useConfig from '../../hooks/useConfig';
import { useSelector } from 'react-redux';
import MainCard from '../../components/MainCard';
import { Box } from '@mui/material';
import HapidoLogo from '../../assets/images/HapidoLogoTrans.png';
import HapidoLogoWhite from '../../assets/images/HapidoLogoWhite.png';
import { useWindowSize } from 'berlin-common';
const Home = () => {
  const { i18n } = useConfig();
  const { size } = useWindowSize();
  const { loginDetails } = useSelector((state: any) => state.login);
  return (
    <div>
      <MainCard sx={{ height: '85vh' }}>
        {size > 767 ? (
          <Box
            style={{
              color: 'white',
              // height: '35vh',
              borderRadius: '5px',
              backgroundImage:
                'linear-gradient(to right, #fC1C15 1% , #fdf8f7 )',
              padding: '65px 30px',
              position: 'relative',
            }}
          >
            {/* <Typography variant="h2" mb={2}>
            {`Hello ${loginDetails.first_name} ${loginDetails.last_name},`}
          </Typography> */}
            <Typography variant="h2" mb={2}>
              Welcome to Hapido
            </Typography>
            <Typography variant="h5" width={'70%'}>
              This is where the magic happens.
            </Typography>
            <img
              src={HapidoLogo}
              alt="HapidoLogo"
              width="30px"
              style={{ position: 'absolute', right: '1%', bottom: '5%' }}
            />
          </Box>
        ) : (
          <Box
            style={{
              color: 'white',
              borderRadius: '5px',
              backgroundImage:
                'linear-gradient(to right, #fC1C15 5% , #fdf8f7 )',
              padding: '65px 30px',
              position: 'relative',
            }}
          >
            <Typography variant="h3" mb={2}>
              Welcome to Hapido
            </Typography>
            <Typography variant="h6" mb={9}>
              This is where the magic happens.
            </Typography>
            <img
              src={HapidoLogo}
              alt="HapidoLogo"
              height="60px"
              style={{ position: 'absolute', bottom: '5%', right: '5%' }}
            />
          </Box>
        )}
      </MainCard>
    </div>
  );
};

export default Home;
