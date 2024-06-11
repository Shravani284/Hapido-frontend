import { autocomplete } from '@algolia/autocomplete-js';
import React, {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';
import '@algolia/autocomplete-theme-classic';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { lang } from '../../utils/getLang';

export function Autocomplete(props) {
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const [searchItem, setSearchItem] = useState<any>();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const queryParams = Object.fromEntries(searchParams.entries());
  const otherParams = { ...queryParams };
  delete otherParams['q'];
  const newQueryParams = new URLSearchParams(otherParams).toString();

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    if (props.searchText) {
      setSearchItem(props.searchText);
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;
          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  const handleKeyDown = (e: any) => {
    let searchState = e.target.value;

    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchItem(searchState);
      navigate(`${lang}/search?q=${searchState}`);
    }
  };

  return <div ref={containerRef} onKeyDown={(e: any) => handleKeyDown(e)} />;
}
