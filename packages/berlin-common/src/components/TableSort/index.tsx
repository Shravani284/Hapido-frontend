import { TableCell, TableSortLabel } from "@mui/material";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";
function SortHeader({ headCell, orderBy, order, handleSort }: any) {
  return (
    <ErrorBoundary>
      <TableCell
        key={headCell.id}
        align={headCell.numeric ? "right" : "left"}
        padding={headCell.disablePadding ? "none" : "normal"}
      >
        {headCell.disableSort === true ? (
          headCell?.label
        ) : (
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={() => handleSort(headCell.id)}
          >
            {headCell?.label}
          </TableSortLabel>
        )}
      </TableCell>
    </ErrorBoundary>
  );
}

export default SortHeader;
