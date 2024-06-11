// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  },
  '& .MuiLinearProgress-bar.MuiLinearProgress-barColorPrimary.MuiLinearProgress-bar1Indeterminate':{
    backgroundColor:"#fb1d14"
  },
  '& .MuiLinearProgress-bar.MuiLinearProgress-barColorPrimary.MuiLinearProgress-bar2Indeterminate':{
    backgroundColor:"#fb1d14"
  }
}));

// ==============================|| Loader ||============================== //

export interface LoaderProps extends LinearProgressProps {}

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

export default Loader;