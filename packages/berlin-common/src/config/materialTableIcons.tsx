import React from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddBox from "@mui/icons-material/AddBox";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Edit from "@mui/icons-material/Edit";
import SaveAlt from "@mui/icons-material/SaveAlt";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Remove from "@mui/icons-material/Remove";
import ViewColumn from "@mui/icons-material/ViewColumn";
import Search from "@mui/icons-material/Search";

export const tableIcons: any = {
  Add: () => <AddIcon />,
  Edit: () => <EditIcon />,
  Delete: () => <DeleteIcon />,
  Check: (props) => <Check {...props} />,
  Clear: (props) => <Clear {...props} />,
  DetailPanel: (props) => <ChevronRight {...props} />,
  Export: (props) => <SaveAlt {...props} />,
  Filter: (props) => <FilterList {...props} />,
  FirstPage: (props) => <FirstPage {...props} />,
  LastPage: (props) => <LastPage {...props} />,
  NextPage: (props) => <ChevronRight {...props} />,
  PreviousPage: (props) => <ChevronLeft {...props} />,
  ResetSearch: (props) => <Clear {...props} />,
  Search: (props) => <Search {...props} />,
  SortArrow: (props) => <ArrowDownward {...props} />,
  ThirdStateCheck: (props) => <Remove {...props} />,
  ViewColumn: (props) => <ViewColumn {...props} />,
};
