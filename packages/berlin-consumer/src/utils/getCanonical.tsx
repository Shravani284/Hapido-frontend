import React, { useEffect } from 'react';
const canonicalLink = document.createElement('link');
canonicalLink.rel = 'canonical';

const getCanonical = (baseUrlWithoutQueryString: any) => {
  canonicalLink.href = baseUrlWithoutQueryString;
  document.head.prepend(canonicalLink);

  return () => {
    if (document.head.contains(canonicalLink)) {
      document.head.removeChild(canonicalLink); // canonical link
    }
  };
};

export default getCanonical;

// HOC
// import React, { useEffect } from 'react';

// const getCanonical = (WrappedComponent: any) => {
//   return (props) => {
//     const urlObject = new URL(window.location.href);
//     const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
//     useEffect(() => {
//       const canonicalLink = document.createElement('link');
//       canonicalLink.rel = 'canonical';
//       canonicalLink.href = baseUrlWithoutQueryString;
//       document.head.prepend(canonicalLink);

//       return () => {
//         document.head.removeChild(canonicalLink);
//       };
//     }, []);
//     return <WrappedComponent {...props} />;
//   };
// };

// export default getCanonical;
