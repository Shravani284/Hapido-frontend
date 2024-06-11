import algoliasearch from 'algoliasearch';
import { Autocomplete } from './autocomplete';
import '@algolia/autocomplete-theme-classic';
import { useNavigate } from 'react-router-dom';
import { DealImg } from 'berlin-common';
import { lang } from '../../utils/getLang';
import { API_KEY, APP_ID, CDN_URL, S3_URL } from '../../../../../urlConst';
import { useTranslation } from 'react-i18next';

const searchClient = algoliasearch(APP_ID, API_KEY);
const index = searchClient.initIndex('deal');
const { t } = useTranslation('translation');

function SearchAutoComplete() {
  const navigate = useNavigate();
  const handleAutocompleteChange = (e: any, query: any) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`${lang}/search?q=${query}`);
    }
  };
  function debouncePromise<T>(
    fn: (...args: any[]) => Promise<T>,
    time: number
  ) {
    let timerId: NodeJS.Timeout | undefined;

    return function debounced(...args: any[]): Promise<T> {
      if (timerId) {
        clearTimeout(timerId);
      }

      return new Promise((resolve) => {
        timerId = setTimeout(() => resolve(fn(...args)), time);
      });
    };
  }

  const debounced = debouncePromise((items) => Promise.resolve(items), 500);

  return (
    <div className="app-container customAutocomplete">
      <Autocomplete
        detachedMediaQuery="none"
        placeholder={t(`WHAT ARE YOU LOOKING FOR`)}
        getSources={async ({ query }) => {
          const delayedApiCall = await debounced(async () => {
            return await index.search(query, { hitsPerPage: 1000 });
          });
          const response = await delayedApiCall();
          const suggestions = response?.hits?.filter((deal: any) => {
            if (
              (deal?.deal_bundle_id && deal?.id != deal?.deal_bundle_id) ||
              (deal?.deal_combo_id && deal?.id != deal?.deal_combo_id) ||
              (deal?.selling_price && deal?.selling_price <= 0)
            ) {
              return false;
            } else {
              return true;
            }
          });

          return [
            {
              sourceId: 'products',
              getItems() {
                return suggestions?.slice(0, 6) || [];
              },

              templates: {
                header() {
                  return (
                    <div
                      onClick={(e) => handleAutocompleteChange(e, query)}
                      className="aa-ItemWrapper aa-ItemWrapper--seeAll"
                    >
                      <span className="result-text">
                        See all results for "{query}"
                      </span>
                      <span style={{ float: 'right' }}>&gt;&gt;</span>
                    </div>
                  );
                },
                item({ item, components }) {
                  const productDetailRouts = (
                    type: string,
                    slug: string,
                    id: string
                  ) => {
                    if (type === 'SINGLE') {
                      return navigate(`/${lang}/s/${slug}/${id}`);
                    } else if (type === 'COMBO') {
                      return `/${lang}/c/${slug}/${id}`;
                    } else {
                      return navigate(`/${lang}/b/${slug}/${id}`);
                    }
                  };
                  const title_en = item.translations.find(
                    (ele: any) =>
                      ele.locale === 'en' &&
                      ele.column_name === 'title_trans_ids'
                  );
                  const replaceUrl = (imgUrl: string): string => {
                    if (imgUrl != undefined) {
                      return imgUrl.replace(S3_URL, CDN_URL);
                    }
                  };
                  let URL = item?.images[0]?.path;
                  const replacedUrl = replaceUrl(URL);
                  return (
                    <>
                      <div
                        onClick={() =>
                          productDetailRouts(item.deal_type, item.slug, item.id)
                        }
                        className="aa-ItemWrapper"
                      >
                        <div className="aa-ItemContent">
                          <div className="search-img">
                            {item?.images?.length > 0 ? (
                              <img width="50" height="50" src={replacedUrl} />
                            ) : (
                              <img width="50" height="50" src={DealImg} />
                            )}
                          </div>
                          <div className="aa-ItemContentBody">
                            <div className="aa-ItemContentTitle">
                              <components.Highlight
                                hit={item}
                                attribute="name"
                              />
                            </div>
                            <div className="aa-ItemContentDescription">
                              {title_en.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                },
              },
            },
          ];
        }}
      />
    </div>
  );
}

export default SearchAutoComplete;
