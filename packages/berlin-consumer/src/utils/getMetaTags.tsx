import React from 'react';

const title = document.createElement('title');
const metaKeywords = document.createElement('meta');
const metaDescription = document.createElement('meta');
const ogType = document.createElement('meta');
const ogSiteName = document.createElement('meta');
const ogLocale = document.createElement('meta');
const ogURL = document.createElement('meta');
const ogTitle = document.createElement('meta');
const ogDescriptions = document.createElement('meta');
const ogImageWidth = document.createElement('meta');
const ogImageHeight = document.createElement('meta');
const ogImage = document.createElement('meta');
const twitterSite = document.createElement('meta');
const twitterCreator = document.createElement('meta');
const twitterImage = document.createElement('meta');
const twitterCard = document.createElement('meta');
const twitterTitle = document.createElement('meta');
const twitterDescriptions = document.createElement('meta');

const getMetaTags = (fullMetaArray: any) => {
  const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
  };
  var injectMeta = document.querySelector('meta[property="hapido-inject"]');

  // 1. meta title
  title.textContent = fullMetaArray?.title;
  insertAfter(injectMeta, title);

  // 2 meta keywords
  metaKeywords.name = 'keywords';
  metaKeywords.content = fullMetaArray?.metaKeywords;
  insertAfter(injectMeta, metaKeywords);

  // 3. meta descriptions
  metaDescription.name = 'description';
  metaDescription.content = fullMetaArray?.metaDescription;
  insertAfter(injectMeta, metaDescription);

  // 4. meta og:type
  ogType.setAttribute('property', 'og:type');
  ogType.content = fullMetaArray?.ogType;
  insertAfter(injectMeta, ogType);

  // 5 meta og:site_name
  ogSiteName.setAttribute('property', 'og:site_name');
  ogSiteName.content = fullMetaArray?.ogSiteName;
  insertAfter(injectMeta, ogSiteName);

  // 6 meta og:local
  ogLocale.setAttribute('property', 'og:locale');
  ogLocale.content = fullMetaArray?.ogLocale;
  insertAfter(injectMeta, ogLocale);

  // 7 meta og:local
  ogURL.setAttribute('property', 'og:url');
  ogURL.content = fullMetaArray?.ogURL;
  insertAfter(injectMeta, ogURL);

  // 8 meta og:local
  ogTitle.setAttribute('property', 'og:title');
  ogTitle.content = fullMetaArray?.ogTitle;
  insertAfter(injectMeta, ogTitle);

  // 9 meta og:local
  ogDescriptions.setAttribute('property', 'og:description');
  ogDescriptions.content = fullMetaArray?.ogDescriptions;
  insertAfter(injectMeta, ogDescriptions);

  // 10 meta og:imageSize
  ogImageWidth.setAttribute('property', 'og:image:width');
  ogImageHeight.setAttribute('property', 'og:image:height');
  ogImageWidth.content = fullMetaArray?.ogImageWidth;
  ogImageHeight.content = fullMetaArray?.ogImageHeight;
  insertAfter(injectMeta, ogImageWidth);
  insertAfter(injectMeta, ogImageHeight);

  // 11 meta og:image
  ogImage.setAttribute('property', 'og:image');
  ogImage.content = fullMetaArray?.ogImage;
  insertAfter(injectMeta, ogImage);

  // 12 meta Twitter:card
  twitterCard.setAttribute('property', 'twitter:card');
  twitterCard.content = 'summary_large_image';
  insertAfter(injectMeta, twitterCard);

  // 13 meta Twitter:site
  twitterSite.setAttribute('property', 'twitter:site');
  twitterSite.content = fullMetaArray?.twitterSite;
  insertAfter(injectMeta, twitterSite);

  // 14 meta Twitter:creator
  twitterCreator.setAttribute('property', 'twitter:creator');
  twitterCreator.content = fullMetaArray?.twitterCreator;
  insertAfter(injectMeta, twitterCreator);

  // 15 meta Twitter:local
  twitterTitle.setAttribute('property', 'twitter:title');
  twitterTitle.content = fullMetaArray?.ogTitle;
  insertAfter(injectMeta, twitterTitle);

  // 16 meta Twitter:local
  twitterDescriptions.setAttribute('property', 'twitter:description');
  twitterDescriptions.content = fullMetaArray?.ogDescriptions;
  insertAfter(injectMeta, twitterDescriptions);

  // 17 meta Twitter:image
  twitterImage.setAttribute('property', 'twitter:image');
  twitterImage.content = fullMetaArray?.ogImage;
  insertAfter(injectMeta, twitterImage);

  // const titleElements = document.querySelectorAll('title');
  // console.log('Number of title elements:', titleElements.length);

  return () => {
    // Check if the script element exists before removing it
    if (document.head.contains(title)) {
      document.head.removeChild(title); // 1. meta title
    }
    if (document.head.contains(metaKeywords)) {
      document.head.removeChild(metaKeywords); // 2. meta keywords
    }
    if (document.head.contains(metaDescription)) {
      document.head.removeChild(metaDescription); // 3 meta description
    }
    if (document.head.contains(ogType)) {
      document.head.removeChild(ogType); // 4. meta og:type
    }
    if (document.head.contains(ogSiteName)) {
      document.head.removeChild(ogSiteName); // 5 meta og:site_name
    }
    if (document.head.contains(ogLocale)) {
      document.head.removeChild(ogLocale); // 6 meta og:local
    }
    if (document.head.contains(ogURL)) {
      document.head.removeChild(ogURL); // 7 meta og:local
    }
    if (document.head.contains(ogTitle)) {
      document.head.removeChild(ogTitle); // 8 meta og:local
    }
    if (document.head.contains(ogDescriptions)) {
      document.head.removeChild(ogDescriptions); // 9 meta og:local
    }
    if (document.head.contains(ogImageWidth)) {
      document.head.removeChild(ogImageWidth); // 10 meta og:imageSize
    }
    if (document.head.contains(ogImageHeight)) {
      document.head.removeChild(ogImageHeight); // 10 meta og:imageSize
    }
    if (document.head.contains(ogImage)) {
      document.head.removeChild(ogImage); // 11 meta og:image
    }
    if (document.head.contains(twitterCard)) {
      document.head.removeChild(twitterCard); // 12 meta Twitter:card
    }
    if (document.head.contains(twitterSite)) {
      document.head.removeChild(twitterSite); // 13 meta Twitter:site
    }
    if (document.head.contains(twitterCreator)) {
      document.head.removeChild(twitterCreator); // 14 meta Twitter:creator
    }
    if (document.head.contains(twitterTitle)) {
      document.head.removeChild(twitterTitle); // 15 meta Twitter:title
    }
    if (document.head.contains(twitterDescriptions)) {
      document.head.removeChild(twitterDescriptions); // 16 meta Twitter:description
    }
    if (document.head.contains(twitterImage)) {
      document.head.removeChild(twitterImage); // 17 meta Twitter:image
    }
  };
};

export default getMetaTags;
