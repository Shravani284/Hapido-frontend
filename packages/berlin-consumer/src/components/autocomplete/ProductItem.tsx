import { Link, useNavigate } from 'react-router-dom';
import { lang } from '../../utils/getLang';

const ProductItem = ({ hit, components }) => {
  const navigate = useNavigate();

  const productDetailRouts = (type: string, slug: string, id: string) => {
    if (type === 'SINGLE') {
      navigate(`/${lang}/s/${slug}/${id}`);
    } else if (type === 'COMBO') {
      navigate(`/${lang}/c/${slug}/${id}`); // Added 'navigate'
    } else {
      navigate(`/${lang}/b/${slug}/${id}`);
    }
  };

  const title_en = hit.translations.find(
    (ele: any) => ele.locale === 'en' && ele.column_name === 'title_trans_ids'
  );

  return (
    <>
      <div
        onClick={() => productDetailRouts(hit.deal_type, hit.slug, hit.id)}
        className="aa-ItemWrapper"
      >
        <div className="aa-ItemContent">
          <div className="search-img">
            {hit?.images?.length > 0 && (
              <img
                width="50"
                height="50"
                src={hit?.images[0]?.path}
                alt={`Product ${hit.id}`}
              />
            )}
          </div>

          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              <components.Highlight hit={hit} attribute="name" />
            </div>
            <div className="aa-ItemContentDescription">{title_en.text}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
