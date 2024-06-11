import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Box, TableCell, TableRow } from '@mui/material';

import IconButton from '../../../components/@extended/IconButton';
import { t } from 'i18next';
import usePermission from '../../../components/Permission/usePermission';

type CategoryRowType = {
  name: string;
  description?: string;
  show_in_menu?: boolean;
  show_in_featured?: boolean;
  show_in_home_widgets?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  menu?: boolean;
  Featured?: boolean;
  homeWidget?: boolean;
  sort: number;
  active: boolean;
};

const CategoryRow = ({
  name,
  description = '',
  onEdit = () => {},
  onDelete = () => {},
  menu = false,
  Featured = false,
  homeWidget = false,
  sort = null,
  active = false,
}: CategoryRowType) => {
  const { permission } = usePermission('CATEGORY');

  return (
    <>
      <TableRow hover tabIndex={-1} key={name}>
        <TableCell>{name}</TableCell>
        <TableCell align="left">{menu ? 'Yes' : 'No'}</TableCell>
        <TableCell align="center">{Featured ? 'Yes' : 'No'}</TableCell>
        <TableCell align="center">{homeWidget ? 'Yes' : 'No'}</TableCell>
        <TableCell align="center">{sort}</TableCell>
        <TableCell align="center">{active ? 'Active' : 'Inactive'}</TableCell>
        <TableCell align="center">
          <Box display={'flex'} justifyContent={'center'} gap={2}>
            <IconButton
              title={t('EDIT')}
              variant="light"
              color="info"
              onClick={onEdit}
            >
              <EditOutlined />
            </IconButton>
            {permission === 'FULL' && (
              <IconButton
                title={t('DELETE')}
                variant="light"
                onClick={onDelete}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CategoryRow;
