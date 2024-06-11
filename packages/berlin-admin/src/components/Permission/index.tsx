import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

function Permission({ module, children, isRoute = false }) {
  // Get the user's roles from the Redux store
  const { roles } = useSelector((store: any) => store.login);

  // Memoize the isAdmin and isModuleAccess values to prevent unnecessary recalculations
  const isAdmin = useMemo(
    () => roles?.some((role) => role.module === 'SUPER_ADMINISTRATOR'),
    [roles]
  );
  const isModuleAccess = useMemo(
    () => roles?.some((role) => role.module === module),
    [roles]
  );

  // If the user doesn't have access and is not an admin, show a message
  if (!isAdmin && !isModuleAccess) {
    return "You don't have permission. Please connect with an admin for more info.";
  }

  return <>{children}</>;
}

export default Permission;
