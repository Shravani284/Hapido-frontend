import { TableBody, TableCell, TableRow } from '@mui/material';
import { CategoryType } from '../constants/types';
import CategoryRow from '../CategoryRow';
import { PreviewModal } from 'berlin-common';
import { useState } from 'react';
import { constants } from 'berlin-common';

type CategoryListType = {
  list: CategoryType[];
  loading?: boolean;
  onEdit?: (category: CategoryType) => void;
  onDelete?: (categoryId: number) => void;
};

const CategoryList = ({
  list = [],
  loading = false,
  onEdit = () => {},
  onDelete = () => {},
}: CategoryListType) => {
  const [showModal, setShowModal] = useState(false);
  const [fileType, setFileType] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<
    constants.types.fileType[]
  >([]);

  const renderList = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={6}>Loading data ...</TableCell>
        </TableRow>
      );
    }
    if (list.length > 0) {
      return list.map((data: CategoryType) => (
        <CategoryRow
          key={data?.id}
          name={
            data.sub_category
              ? `${data?.name} (${data.parent_category_name})`
              : data?.name
          }
          menu={data?.is_menu}
          Featured={data?.is_featured}
          homeWidget={data?.is_home_widget}
          sort={data?.sort}
          active={data?.active}
          onEdit={() => onEdit(data)}
          onDelete={() => onDelete(data?.id)}
        />
      ));
    }

    return (
      <TableRow>
        <TableCell align="center" colSpan={6}>
          No record found.
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <TableBody>{renderList()}</TableBody>
      {/* <PreviewModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        selectedFiles={selectedFiles}
        type={fileType}
      /> */}
    </>
  );
};

export default CategoryList;
