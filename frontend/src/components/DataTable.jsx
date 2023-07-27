import { DataGrid } from "@mui/x-data-grid";
import { get } from "mongoose";

const DataTable = ({
    rows,
    columns,
    selectedRowsIds,
    onSelectionModelChange,
}) => (
    <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        getRowId={(row) => row.id}
        selectionModel={selectedRowsIds}
        onRowSelectionModelChange={onSelectionModelChange}
    />
);

export default DataTable;
