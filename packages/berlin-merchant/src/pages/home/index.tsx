import { Typography } from '@mui/material';
import useConfig from '../../hooks/useConfig';
import { useSelector } from 'react-redux';
import MainCard from '../../components/MainCard';
const Home = () => {
  const { i18n } = useConfig();
  const { loginDetails } = useSelector((state: any) => state.login);

  return (
    <div>
      <MainCard sx={{ height: '85vh' }}>
        <Typography variant="h2" mb={2}>
          {`Hello ${
            i18n == 'en'
              ? loginDetails.first_name_en
              : loginDetails.first_name_ar
          }`}
        </Typography>
        <Typography variant="h5">
          You can redeem vouchers, view your deals, purchases, redemptions from
          the Menu. More interactive graphs and charts coming soon..
        </Typography>
      </MainCard>
    </div>
  );
};

export default Home;
