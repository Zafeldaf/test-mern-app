import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import UserTable from "../components/UserTable";
import "../app.css";

const UserScreen = () => {
    const [selectedRowsIds, setSelectedRowsIds] = useState([]);
    const handleDelete = () => {
        if (!selectedRowsIds.length) {
            console.log("No rows selected for deletion.");
            return;
        }

        (async () => {
            const responses = await Promise.all(
                selectedRowsIds.map((id) =>
                    axios.delete(`/api/datausers/${id}`)
                )
            );
            toast.success("Deleted Successfully");
            setTimeout(() => {
                window.location.reload();
            }, 700);
        })();
    };

    return (
        <>
            <div className="container">
                <h3 id="usershead">Users</h3>
                <ul className="ul">
                    <li>
                        <Link to="/users/create" className="li">
                            <button id="createbtn">Create</button>
                        </Link>
                    </li>
                    <li>
                        <button id="deletebtn" onClick={handleDelete}>
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
            <UserTable
                handleSelectionModelChange={setSelectedRowsIds}
                selectedRowsIds={selectedRowsIds}
            />
        </>
    );
};

export default UserScreen;
