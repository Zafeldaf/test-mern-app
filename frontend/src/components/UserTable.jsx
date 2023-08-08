import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import { ApiInstance } from "../axiosConfig.js";

function getFullAddress(params) {
    const { address } = params.row;
    return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
}

function getFullCompanyName(params) {
    const { company } = params.row;
    return `${company.name}, ${company.catchPhrase}, ${company.bs}`;
}

const UserTable = ({ handleSelectionModelChange, selectedRowsIds }) => {
    const [dataUsers, setDataUsers] = useState([]);
    const columns = [
        // { field: "id", headerName: "ID", width: 15, editable: false }, // Use the 'id' field instead of '_id'
        { field: "name", headerName: "Name", width: 170, editable: true },
        {
            field: "username",
            headerName: "Username",
            width: 135,
            editable: true,
        },
        { field: "email", headerName: "Email", width: 205, editable: true },
        {
            field: "address",
            valueGetter: getFullAddress,
            headerName: "Address",
            width: 320,
            editable: true,
        },
        { field: "phone", headerName: "Phone", width: 175, editable: true },
        { field: "website", headerName: "Website", width: 125, editable: true },
        {
            field: "company",
            valueGetter: getFullCompanyName,
            headerName: "Company",
            width: 150,
            editable: true,
        },
    ];

    useEffect(() => {
        ApiInstance.get("/datausers")
            .then((response) => setDataUsers(response.data))
            .catch((error) =>
                console.error("Error fetching datausers:", error),
            );
    }, []);

    return (
        <>
            <DataTable
                rows={dataUsers}
                columns={columns}
                selectedRows={selectedRowsIds}
                onSelectionModelChange={handleSelectionModelChange}
            />
        </>
    );
};

export default UserTable;
