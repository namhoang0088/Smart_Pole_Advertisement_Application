import React, { useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataAdvertisements } from "../../data/mockData";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Header from "../../components/Header";
import CustomDialog from "../../components/Dialog";

const AdManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      hideCheckbox: true,
    },
    {
      field: "companyName",
      headerName: "Tên công ty",
      flex: 1,
      cellClassName: "company-column--cell",
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <BusinessOutlinedIcon />
          <Typography sx={{ ml: 1 }}>{row.companyName}</Typography>
        </Box>
      ),
    },
    {
      field: "adType",
      headerName: "Loại quảng cáo",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
      renderCell: ({ value }) => (
        <Box display="flex" alignItems="center">
          <PhoneOutlinedIcon />
          <Typography sx={{ ml: 1 }}>{value}</Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ value }) => (
        <Box display="flex" alignItems="center">
          <EmailOutlinedIcon />
          <Typography sx={{ ml: 1 }}>{value}</Typography>
        </Box>
      ),
    },
    {
      field: "details",
      headerName: "Chi tiết",
      flex: 1,
      renderCell: () => (
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "#fff",
            }}
            endIcon={<DescriptionOutlinedIcon />}
            onClick={handleOpenDialog}
          >
            Xem
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Quản lý quảng cáo"
        subtitle="Quản lý danh sách quảng cáo được trả tiền"
      />
      {/* Overlay */}
      {openDialog && (
        <div className="overlay" onClick={handleCloseDialog}></div>
      )}
      {/* Dialog */}
      <CustomDialog open={openDialog} handleClose={handleCloseDialog} />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .company-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={mockDataAdvertisements} columns={columns} />
      </Box>
    </Box>
  );
};

export default AdManage;
