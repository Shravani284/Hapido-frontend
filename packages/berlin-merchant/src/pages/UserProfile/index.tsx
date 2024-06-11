import { Button, CardHeader, Divider, Grid, Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import {
  userProfile,
  userProfileUpdate,
} from '../../services/userProfileService';
import useConfig from '../../hooks/useConfig';
import {
  Merchants,
  Merchanttranslation,
  initialValues,
  validationSchema,
} from './initialValues';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import Address from './Address';
import { country_code } from '../../data/data';
import { useDispatch } from 'react-redux';
import { path } from '../../routes/Routers';
import GeneralInfo from './GeneralInfo';
import { setSnackbarConfig } from '../../store/slice/Loader';

// ==============================|| TAB - PERSONAL ||============================== //
const UserProfile = () => {
  const { i18n } = useConfig();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState<any>();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleUpdate(values);
    },
  });

  const handleUpdate = async ({
    created_at,
    updated_at,
    created_by,
    updated_by,
    ...value
  }: Merchants) => {
    const payload = {
      id: updateData.id,
      translations: [
        {
          column_name: 'name',
          locale: 'en',
          text: value.name,
        },
        {
          column_name: 'tagline_trans_ids',
          locale: 'en',
          text: value.tagline_trans_ids,
        },
        {
          column_name: 'description_trans_ids',
          locale: 'en',
          text: value.description_trans_ids,
        },
      ],
      mobile: value.mobile,
      country_code: value.country_code?.id ?? null,
      contact_person_name: value.contact_person_name,
      contact_person_mobile: value.contact_person_mobile,
      address1: value.address1,
      address2: value.address2,
      website: value.website,
      categories_interest: value.categories_interest
        .map((i: any) => i.id)
        .join(','),
      area: updateData.area,
    };
    userProfileUpdate({ ...payload })
      .then((response) => {
        if (response.data.success === true) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'Profile updated successfully',
              varient: 'success',
            })
          ),
            navigate(path.HOME);
        }
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message.code
              ? error.response.data.error.message.code
              : 'something went wrong',
            varient: 'error',
          })
        );
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  useEffect(() => {
    userProfile(i18n)
      .then((response) => {
        if (response) {
          const profile = { ...response.data.data.merchants };
          setUpdateData(profile);
          if (profile?.merchanttranslation?.length > 0) {
            const name = profile.merchanttranslation.find(
              (ele: Merchanttranslation) => ele.column_name === 'name'
            );

            const tagline_trans_ids = profile.merchanttranslation.find(
              (ele: Merchanttranslation) =>
                ele.column_name === 'tagline_trans_ids'
            );

            const description_trans_ids = profile.merchanttranslation.find(
              (ele: Merchanttranslation) =>
                ele.column_name === 'description_trans_ids'
            );

            profile.name = name?.text ?? '';
            profile.tagline_trans_ids = tagline_trans_ids?.text ?? '';
            profile.description_trans_ids = description_trans_ids?.text ?? '';
          }
          formik.setValues({
            active: profile.active === 1 ? true : false,
            slug: profile.slug,
            email: profile.email,
            mobile: profile.mobile,
            country_code:
              country_code.find((e) => +e.id === profile.country_code) || null,
            contact_person_name: profile.contact_person_name,
            contact_person_mobile: profile.contact_person_mobile,
            address1: profile.address1,
            address2: profile.address2,
            country: profile.area_data.country_name,
            city: profile.area_data.city_name,
            area: profile.area_data.area_name,
            coordinates: profile.coordinates,
            website: profile.website,
            categories_interest: profile.category_labels,
            listing_fee: profile.listing_fee,
            merchant_active_date: profile.merchant_active_date,
            merchant_expiry_date: profile.merchant_expiry_date,
            merchant_supporting_docs_file_ids:
              profile.merchant_supporting_docs_file_ids,
            activeDealsCount: profile.activeDealsCount,
            name: profile.name,
            tagline_trans_ids: profile.tagline_trans_ids,
            description_trans_ids: profile.description_trans_ids,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
            created_by: profile.created_by,
            updated_by: profile.updated_by,
            hapido_sales_person:
              profile?.happidoUserfirstName +
              ' ' +
              profile?.happidoUserlastName,
            total_vouchers_sold: profile.countOfSoldVoucher,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [i18n]);
  return (
    <MainCard>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <CardHeader title="Personal Information" />
          <Divider />
          <PersonalInfo formik={formik} />
          <CardHeader title="Address" />
          <Divider />
          <Address formik={formik} />
          <CardHeader title="General Information" />
          <Divider />
          <GeneralInfo formik={formik} updateData={updateData} />

          <Grid sx={{ mt: 3 }} item xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
            >
              <Button
                variant="outlined"
                color="secondary"
                type="reset"
                onClick={handleCancel}
                sx={{ mt: 1, mr: 1 }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </Grid>
        </form>
      </FormikProvider>
    </MainCard>
  );
};

export default UserProfile;
