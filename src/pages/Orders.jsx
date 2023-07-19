import React, { useState } from "react";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";

const Orders = () => {
  const [data, setData] = useState(ordersData);
  const editing = { allowDeleting: true, allowEditing: true };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    itemName: "",
    customerName: "",
    price: "",
    quantity: "",
  });

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      OrderID: generateOrderId(),
      CustomerName: orderFormData.customerName,
      ItemName: orderFormData.itemName,
      Price: orderFormData.price,
      Quantity: orderFormData.quantity,
    };

    setData((prevData) => [newOrder, ...prevData]);
    setIsDialogOpen(false);
    setOrderFormData({
      itemName: "",
      customerName: "",
      price: "",
      quantity: "",
    });
  };

  const generateOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 100000);
    return `ORD-${randomNumber}`;
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <button onClick={handleOpenDialog}>
        <span className="add-icon">&#43;</span>Add Order
      </button>
      <GridComponent
        id="gridcomp"
        dataSource={data}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <DialogComponent
          visible={isDialogOpen}
          width="300px"
          header="Add Order"
          showCloseIcon={true}
          close={handleCloseDialog}
        >
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="itemName">Item Name:</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={orderFormData.itemName}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label htmlFor="customerName">Customer Name:</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={orderFormData.customerName}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={orderFormData.price}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={orderFormData.quantity}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </DialogComponent>

        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;
