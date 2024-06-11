// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Button,
  CardHeader,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import MainCard from '../../MainCard';
import { useEffect, useState } from 'react';
import { path } from '../../../routes/Routers';
import GeneralInfo from './Steps/GeneralInfo';
import { Promo, initialValues, validationSchema } from './Steps/formikValues';
import CouponSpecifics from './Steps/couponSpecifics';
import LimitationsAndRestrictions from './Steps/limitationsRestrictions';
import UserSpecifics from './Steps/userSpecificData';
import ValidityPeriods from './Steps/ValidityPeriods';
import UsageAndStatistics from './Steps/usageStatistics';
import AdministrativeData from './Steps/administrativeData';
import {
  getAllDeal,
  // getAllUser,
} from '../../../services/commonService';
import {
  createPromo,
  getPromoById,
  updatePromo,
} from '../../../services/promoService';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../utils/dropDown';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import Permission from '../../../components/Permission';
import { flashSale } from '../../../data/data';
import {
  allCombinedDeals,
  allComboList,
  allExcludeCombinedDeals,
  allExcludeComboList,
  getAllUser,
  getCategoriesSubCategories,
} from '../../../services/dropDownService';
import usePermission from '../../../components/Permission/usePermission';
import { resolve } from 'path/win32';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

function CreateSingleDealForm() {
  const params = useParams();
  const id: string = params.id ? params.id : '';
  const { permission } = usePermission('PROMO_CODE');
  const [categoriesList, setCategoriesList] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [userList, setUserList] = useState([]);
  const [dealList, setDealList] = useState([]);
  const [dealCombo, setDealCombo] = useState([]);
  const [dealExcludeList, setDealExcludeList] = useState([]);
  const [dealExcludeCombo, setDealExcludeCombo] = useState([]);
  const [resData, setResData] = useState();
  const [formData, setFormData] = useState({
    coupon_scope: '',
    deal_id: '',
    combo_deal_id: '',
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema(formData),
    onSubmit: async (value) => {
      handleAdd(value);
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = async ({
    created_at,
    updated_at,
    created_by,
    updated_by,
    category,
    deal,

    ...value
  }: Promo) => {
    const payload = {
      ...value,
      currency: value?.currency?.id,
      code: value?.code.toUpperCase(),
      coupon_type: value.coupon_type?.id,
      coupon_scope: value.coupon_scope?.id,
      coupon_application_type: value.coupon_application_type?.id,
      deal_id: value.deal_id?.id ? value.deal_id?.id : null,
      combo_deal_id: value.combo_deal_id?.id ? value.combo_deal_id?.id : null,
      exclude_combo_ids: value.exclude_combo_ids
        .map((e: any) => e.id)
        .join(','),
      exclude_applicable_flash_sales: value?.exclude_applicable_flash_sales
        .map((e: any) => e.id)
        .join(','),
      category_id: value.category_id?.id,
      platform: value.platform?.id,
      user_id: value.user_id?.id,
      exclude_deal_ids: value.exclude_deal_ids.map((e: any) => e.id).join(','),
      soft_delete: false,
      limit_per_customer: value?.limit_per_customer || null,
      limit_per_coupon: value?.limit_per_coupon || null,
      min_cart_amount: value?.min_cart_amount || null,
      max_discount_cap: value?.max_discount_cap || null,
      exclude_category_ids: value?.exclude_category_ids
        .map((e: any) => e.id)
        .join(','),
    };
    setBtnLoader(true);

    id
      ? updatePromo({ ...payload, id: +id })
          .then((response) => {
            setBtnLoader(false);

            if (response.data.success === true) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: 'Promo updated successfully',
                  varient: 'success',
                })
              );
              navigate(path.PORMOCODE);
            }
          })
          .catch((error) => {
            setBtnLoader(false);

            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: error.response.data.error.message.code
                  ? error.response.data.error.message.code
                  : 'Something went wrong',
                varient: 'error',
              })
            );
          })
      : createPromo(payload)
          .then((response) => {
            setBtnLoader(false);

            if (response.data.success === true) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: 'Promo created successfully',
                  varient: 'success',
                })
              );
              navigate(path.PORMOCODE);
            }
          })
          .catch((error) => {
            setBtnLoader(false);

            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: error.response.data.error.message
                  ? error.response.data.error.message
                  : 'Something went wrong',
                varient: 'error',
              })
            );
          });
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  useEffect(() => {
    setFormData(formik?.values);
  }, [
    formik?.values.coupon_scope,
    formik?.values.deal_id,
    formik?.values.combo_deal_id,
  ]);

  const getCategoryList = (data?: any) => {
    getCategoriesSubCategories()
      .then((res) => {
        setCategoriesList(res);
        if (data) {
          setDropDownValues(res, data, 'category_id', formik);
          setMultiDropDownValue(
            res,
            data.exclude_category_ids?.split(','),
            'exclude_category_ids',
            formik
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getDealList = (data?: any) => {
    allCombinedDeals()
      .then((res) => {
        if (res?.success == true) {
          const deallist = res.data?.deals.map((e: any) => {
            return {
              label: e.label,
              id: e.id,
            };
          });
          setDealList(deallist);
          if (data) {
            setDropDownValues(deallist, data, 'deal_id', formik);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const categoryID = formik?.values?.category_id?.id;
  const getExcludeDealList = (data?: any) => {
    allExcludeCombinedDeals(categoryID)
      .then((res) => {
        if (res?.success == true) {
          const dealExcludeList = res.data?.deals.map((e: any) => {
            return {
              label: e.label,
              id: e.id,
            };
          });
          setDealExcludeList(dealExcludeList);
          if (data) {
            setMultiDropDownValue(
              dealExcludeList,
              data.exclude_deal_ids.split(','),
              'exclude_deal_ids',
              formik
            );
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getComboList = (data: any) => {
    allComboList()
      .then((res) => {
        const comboList = res.data.allDeals.map((item: any) => {
          return {
            label: item.label,
            id: item.id,
          };
        });
        setDealCombo(comboList);
        if (data) {
          setDropDownValues(comboList, data, 'combo_deal_id', formik);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getExcludeComboList = (data: any) => {
    allExcludeComboList(categoryID)
      .then((res) => {
        const dealExcludeCombo = res.data.allDeals.map((item: any) => {
          return {
            label: item.label,
            id: item.id,
          };
        });
        setDealExcludeCombo(dealExcludeCombo);
        if (data) {
          setMultiDropDownValue(
            dealExcludeCombo,
            data.exclude_combo_ids.split(','),
            'exclude_combo_ids',
            formik
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserList = (data: any) => {
    getAllUser()
      .then((res) => {
        setUserList(res);
        if (data) {
          setDropDownValues(res, data, 'user_id', formik);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const featchAllDropdownData = (data?: any) => {
    getCategoryList(data);
    getDealList(data);
    getUserList(data);
    getComboList(data);
  };

  const getSingleDeal = (id: string) => {
    const singleDropDown = [
      'currency',
      'coupon_type',
      'coupon_scope',
      'coupon_application_type',
      'category_id',
      'platform',
      'deal_id',
      'user_id',
      'exclude_deal_ids',
      'exclude_combo_ids',
      'exclude_applicable_flash_sales',
      'currency',
      'combo_deal_id',
      'exclude_category_ids',
    ];
    getPromoById(id).then((res) => {
      const response = res.data.data.promo;
      Object.keys(response).map((e) => {
        if (!singleDropDown.includes(e)) {
          formik.setFieldValue(e, response[e]);
        } else if (
          e === 'platform' ||
          e === 'coupon_type' ||
          e === 'coupon_application_type' ||
          e === 'coupon_scope' ||
          e === 'currency' ||
          e === 'coupon_type'
        ) {
          formik.setFieldValue(e, { label: response[e], id: response[e] });
        }
      });
      featchAllDropdownData(response);
      setResData(response);
      setMultiDropDownValue(
        flashSale,
        response.exclude_applicable_flash_sales.split(','),
        'exclude_applicable_flash_sales',
        formik
      );
    });
  };
  useEffect(() => {
    if (id) {
      getSingleDeal(id);
    } else {
      featchAllDropdownData('');
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      if (resData) {
        getExcludeDealList(resData);
        getExcludeComboList(resData);
      }
    } else {
      getExcludeDealList('');
      getExcludeComboList('');
    }
  }, [formik.values.category_id, id]);

  useEffect(() => {
    if (!formik.isSubmitting) return;
    if (Object.keys(formik.errors).length > 0) {
      const firstError = document.querySelector('.Mui-error');

      if (firstError) {
        const offset = -150; // Adjust this value based on your preference
        const scrollToY =
          firstError.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: scrollToY, behavior: 'smooth' });
      }
    }
  }, [formik]);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.PORMOCODE}>
          Promo
        </Link>
        {id ? (
          <Typography color="text.primary">Update Promo</Typography>
        ) : (
          <Typography color="text.primary">Add Promo</Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <Box>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader title="General Information" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <GeneralInfo formik={formik} />
              </Box>

              <CardHeader title="Coupon Specifics" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <CouponSpecifics
                  formik={formik}
                  categoriesList={categoriesList}
                  dealList={dealList}
                  dealExcludeList={dealExcludeList}
                  dealCombo={dealCombo}
                  dealExcludeCombo={dealExcludeCombo}
                  flashSale={flashSale}
                />
              </Box>
              <CardHeader title="Limitations And Restrictions" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <LimitationsAndRestrictions formik={formik} />
              </Box>
              <CardHeader title="User Specifics" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <UserSpecifics formik={formik} userList={userList} />
              </Box>
              <CardHeader title="Validity Periods" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <ValidityPeriods formik={formik} />
              </Box>
              <CardHeader title="Usage And Statistics" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <UsageAndStatistics formik={formik} />
              </Box>
              <CardHeader title="Administrative Data" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <AdministrativeData formik={formik} />
              </Box>
              <Box sx={{ p: 2.5, textAlign: 'right' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  sx={{ mr: 1 }}
                  onClick={() => navigate(path.PORMOCODE)}
                >
                  Cancel
                </Button>
                {(permission === 'WRITE' || permission === 'FULL') && (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={btnLoader}
                  >
                    {btnLoader ? (
                      <CircularProgress
                        color="secondary"
                        style={{ margin: '3px 10px' }}
                        size={18}
                      />
                    ) : (
                      <>{id ? 'Update' : 'Add'}</>
                    )}
                  </Button>
                )}
              </Box>
            </form>
          </FormikProvider>
        </Box>
      </MainCard>
    </>
  );
}

export default CreateSingleDealForm;
