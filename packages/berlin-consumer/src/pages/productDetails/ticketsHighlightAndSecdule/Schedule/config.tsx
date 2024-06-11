export const getDealComponent = (selectedPackage, getCalendar) => {
  if (selectedPackage.is_slot_enabled) {
    getCalendar(selectedPackage?.id);
    return 'date';
  } else if (selectedPackage.is_location_specific) {
    return 'location';
  } else if (selectedPackage.is_type_variable_pricing) {
    return 'people';
  } else {
    return 'defaultCount';
  }
};

export const getTimeSelectionComponent = (selectedPackage) => {
  if (selectedPackage.is_location_specific) {
    return 'location';
  } else if (selectedPackage.is_type_variable_pricing) {
    return 'people';
  } else {
    return 'defaultCount';
  }
};

export const getPayload = (selectedData, productDetailsInfo, deal_type) => {
  let count = null;
  let quantity = null;
  let price_type = null;
  let price = null;
  let id = null;
  let slot_date = selectedData?.date;
  if (!selectedData?.package?.is_type_variable_pricing) {
    selectedData?.count?.forEach((e) => {
      quantity = e?.quantity;
      price_type = 'People';
    });
    if (selectedData?.package?.is_slot_enabled) {
      price = selectedData?.time?.slot_price;
    } else {
      price = selectedData?.package?.selling_price;
    }
  } else {
    count = selectedData?.count?.map((e) => {
      return {
        price_type: e?.type,
        quantity: e?.quantity,
        price: e?.price,
        price_id: e?.id,
      };
    });
  }
  const typePricingPayload = {
    deal_type:
      deal_type === 's' ? 'SINGLE' : deal_type === 'c' ? 'COMBO' : 'BUNDLE',
    deal_id: selectedData?.package?.id,
    voucher_type: selectedData?.package?.voucher_type,
    slot_id: selectedData?.time?.id,
    deal_bundle_id: productDetailsInfo?.deal_bundle_id
      ? productDetailsInfo?.deal_bundle_id
      : null,
    deal_combo_id: productDetailsInfo?.deal_combo_id
      ? productDetailsInfo?.deal_combo_id
      : null,
    deal_area_id: selectedData?.location?.id,
    type_pricing:
      count?.length > 0 ? count?.filter((q) => q?.quantity > 0) : [],
    // price_type,
    // price,
    // quantity: quantity,
    coupon_code_applied: '',
    currency: 'AED',
    slot_date,
  };

  const payLoad = {
    price_type: price_type,
    price: price,
    quantity: quantity,
    price_id: id,
  };

  // if variable Pricing

  if (!selectedData?.package?.is_type_variable_pricing) {
    let newPayLoad = {
      ...typePricingPayload,
      ...payLoad,
    };
    return newPayLoad;
  } else {
    return typePricingPayload;
  }
};

export const getPayloadMobile = (
  selectedData,
  productDetailsInfo,
  deal_type,
  id
) => {
  let count = null;
  let quantity = null;
  let price_type = null;
  let price = null;
  let slot_date = selectedData?.date;
  if (!productDetailsInfo?.is_type_variable_pricing) {
    selectedData?.count?.forEach((e) => {
      quantity = e?.quantity;
      price_type = 'People';
    });
    if (productDetailsInfo?.is_slot_enabled) {
      price = selectedData?.time?.slot_price;
    } else {
      price = productDetailsInfo?.selling_price;
    }
  } else {
    count = selectedData?.count?.map((e) => {
      return {
        price_type: e?.type,
        quantity: e?.quantity,
        price: e?.price,
        price_id: e?.id,
      };
    });
  }
  const typePricingPayload = {
    deal_type:
      deal_type === 's' ? 'SINGLE' : deal_type === 'c' ? 'COMBO' : 'BUNDLE',
    deal_id: productDetailsInfo?.id,
    voucher_type: productDetailsInfo?.voucher_type,
    slot_id: selectedData?.time?.id,
    deal_bundle_id: deal_type === 'b' ? +id : null,
    deal_combo_id: deal_type === 'c' ? +id : null,
    deal_area_id: selectedData?.location?.id,
    type_pricing:
      count?.length > 0 ? count?.filter((q) => q?.quantity > 0) : [],
    // price_type,
    // price,
    // quantity: quantity,
    coupon_code_applied: '',
    currency: 'AED',
    slot_date,
  };
  const payLoad = {
    price_type: price_type,
    price: price,
    quantity: quantity,
    price_id: id,
  };

  if (!productDetailsInfo?.is_type_variable_pricing) {
    let newPayLoad = {
      ...typePricingPayload,
      ...payLoad,
    };
    return newPayLoad;
  } else {
    return typePricingPayload;
  }
};
