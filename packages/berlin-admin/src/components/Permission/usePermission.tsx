import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

function usePermission(module) {
  const { roles } = useSelector((store: any) => store.login);
  const permission = roles?.find((role) => role.module === module)?.access;
  const isAdmin = useMemo(
    () => roles?.some((role) => role.module === 'SUPER_ADMINISTRATOR'),
    [roles]
  );
  return {
    permission: isAdmin ? 'FULL' : permission,
  };
}

export default usePermission;
