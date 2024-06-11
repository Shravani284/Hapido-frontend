import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BreadCrumbs = ({ list, active, routesHandler }: any) => {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {/* {routesHandler && (
          <div
            onClick={routesHandler}
            style={{ marginRight: '10px', cursor: 'pointer' }}
          >
            <ArrowBackIcon />
          </div>
        )} */}
        {list.map((e: any, index: any) => (
          <span
            key={index}
            onClick={() => routesHandler(e)}
            style={{ cursor: 'pointer' }}
          >
            {e}
          </span>
        ))}
        <span style={{ color: 'black' }}>{active}</span>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
