import { useState, useEffect } from 'react';
import css from './ticketsHighlightAndSchedule.module.scss';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface countI {
  data: any;
  countHandler: (
    operation: string,
    index: number,
    data: any,
    min?: string
  ) => void;
  fullProduct: any;
  index: number;
  sumOfQuantity?: any;
}
export default function PeopleCounterAr({
  data,
  countHandler,
  fullProduct,
  index,
  sumOfQuantity,
}: countI) {
  const { deal_type } = useParams();
  const [min, setMin] = useState<any>();
  const [max, setMax] = useState<any>();
  const { t } = useTranslation('translation');

  useEffect(() => {
    if (deal_type === 'c') {
      setMin(fullProduct?.min_limit_per_transaction);
      setMax(fullProduct?.max_limit_per_transaction);
    } else {
      setMin(fullProduct?.min_voucher_per_transaction);
      setMax(fullProduct?.max_voucher_per_transaction);
    }
  }, [fullProduct, deal_type]);

  return (
    <>
      <div className={css.dFlex}>
        <div className={css.adtppl}>
          {data?.type} {t(`LIMIT`)}
          <div className={css.minMaxLimit}>
            {min != '0' && min != null && `${t(`MINIMUM`)}: ${min},`}{' '}
            {max && `${t(`MAXIMUM`)}: ${max}`}
            {data?.price && (
              <p>
                {t(`PRICE`)}: {data?.price}
              </p>
            )}
          </div>
        </div>
        <div className={css.dFlexbtn}>
          <button
            disabled={data?.disabled || data?.quantity === 0}
            onClick={() => {
              countHandler('sub', index, data.quantity);
            }}
            className={css.addbtn}
          >
            <span>-</span>
          </button>
          <div className={css.pplCount}>{data.quantity}</div>
          <button
            disabled={data?.disabled || sumOfQuantity == max}
            onClick={() => {
              countHandler('add', index, data?.quantity, min);
            }}
            className={css.addbtn}
          >
            <span>+</span>
          </button>
        </div>
      </div>
    </>
  );
}
