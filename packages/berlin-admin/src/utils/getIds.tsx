export const getId = (array, type = 'img') => {
  if (type === 'img') {
    return array?.map((e) => e?.imageId || e.id).join(',');
  } else if (type === 'vid') {
    return array?.map((e) => e?.videoId || e.id).join(',');
  } else if (type === 'docMulti') {
    return array?.map((e) => e?.docId || e.id).join(',');
  } else if (type === 'doc') {
    return array?.length > 0
      ? array?.map((e) => parseInt(e?.docId || e.id))[0]
      : null;
  }
};

export const getSigneid = (array, type = 'img') => {
  if (type === 'img') {
    return array.length > 0
      ? parseInt(array?.map((e) => e?.imageId || e.id)[0])
      : null;
  } else if (type === 'vid') {
    return array.length > 0
      ? parseInt(array?.map((e) => e?.videoId || e.id)[0])
      : null;
  } else if (type === 'doc') {
    return array?.length > 0
      ? array?.map((e) => parseInt(e?.docId || e.id))[0]
      : null;
  }
};
