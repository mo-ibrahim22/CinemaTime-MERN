import React from "react";
import './css/table.css';
function Itmestable() {
    return (
        <>
            <div className="container">
                <table className="custom-table text-center text-light w-100 position-absolute start-0 end-0">
                    <thead className="h4">
                        <tr>
                            <th>Item ID</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Item 1</td>
                            <td><img src="item1.jpg" alt="Item 1" /></td>
                            <td>Category 1</td>
                            <td><button className="btn btn-outline-warning">Edit</button></td>
                            <td><button className="btn btn-outline-danger">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Itmestable;