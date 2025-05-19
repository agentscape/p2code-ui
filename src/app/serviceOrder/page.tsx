"use client";

import { Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function ServiceOrderList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "off",
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        flex: 1,
        align: "left",
        headerAlign: "left",
      },
      {
        field: "externalId",
        headerName: "External ID",
        flex: 1,
      },
      {
        field: "description",
        headerName: "Description",
        display: "flex",
        flex: 1,
        renderCell: function render({ value }) {
          if (!value) return "-";
          return (
            <Typography
              component="p"
              whiteSpace="pre"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {value}
            </Typography>
          );
        },
      },

      {
        field: "category",
        headerName: "Category",
        flex: 1,
      },
      {
        field: "state",
        headerName: "State",
        flex: 1,
        renderCell: function render({ row }) {
          return (
            <>
              <Chip
                sx={{ width: 150 }}
                label={row.state}
                color={row.state !== "FAILED" ? "success" : "warning"}
              />
            </>
          );
        },
      },
      {
        field: "orderDate",
        headerName: "Order Date",
        display: "flex",
        flex: 1,
        minWidth: 200,
        valueGetter: (value) => {
          if (!value) {
            return value;
          }
          // Convert the decimal value to a percentage
          return new Date(value).toISOString();
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
}
