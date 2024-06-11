const getMetaDataLink = (WrappedComponent: any) => {
  return (props) => {
    return <WrappedComponent {...props} />;
  };
};

export default getMetaDataLink;
