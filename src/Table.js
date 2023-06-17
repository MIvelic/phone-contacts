import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Tooltip,
  IconButton
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import moment from "moment/moment";

const Table = ({ data, countryList, createNewContact, updateContactList, deleteContact }) => {

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateNewRow = (values) => {
    const newContact = {
      "name": values.name,
      "country": values.country,
      "city": values.city,
      "address": values.address,
      "avatar": values.avatar,
      "accounts": [
        {
          "created": moment(),
          "name": values.accounts,
          "balance": values.accountsB,
          "id": "1",
          "subscriberId": "1"
        }
      ],
      "calls": [
        {
          "created": moment(),
          "name": values.calls,
          "balance": values.callsB,
          "id": "1",
          "subscriberId": "1"
        }
      ]
    }

    createNewContact(newContact)
    updateContactList(newContact, 'Create')
  };

  const handleDeleteRow = (row) => {
    deleteContact(row.original.id)
    updateContactList(row.original, 'Delete')
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        )
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 150,
      },
      {
        accessorFn: (row) => row?.accounts?.length !== 0 ? row?.accounts?.map((account) => account.name + ' = ' + account.balance + ',') : 'No data',
        accessorKey: 'accounts',
        header: 'Accounts and balance',
        size: 150,
      },
      {
        accessorFn: (row) => row?.calls?.length !== 0 ? row?.calls?.map((call) => call.name + ' = ' + call.balance + ',') : 'No data',
        accessorKey: 'calls',
        header: 'Calls and balance',
        size: 150,
      }
    ],
    [],
  );

  const createNewAccountColumns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 150,
      },
      {
        accessorKey: 'accounts',
        header: 'Account',
        size: 150,
      },
      {
        accessorKey: 'accountsB',
        header: 'Account Balance',
        size: 150,
      },
      {
        accessorKey: 'calls',
        header: 'Call',
        size: 150,
      },
      {
        accessorKey: 'callsB',
        header: 'Call Balance',
        size: 150,
      },
      {
        accessorKey: 'avatar',
        header: 'Avatar',
        size: 1000,
      }
    ],
    [],
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'left',
            },
            size: 120,
          },
        }}
        enableEditing
        columns={columns}
        data={data}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10]
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Account
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={createNewAccountColumns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        countryList={countryList}
      />
    </>
  )
};

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit, countryList }) => {

  const [country, setCountry] = useState('');
  // const [selectedImage, setSelectedImage] = useState(null);

  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );



  const handleSubmit = () => {
    onSubmit(values);
    columns.map((column) => setValues({[column.accessorKey]: ''}))
    setCountry('')
    // setSelectedImage(null)
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              column.accessorKey !== 'country' ?
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
                :
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="Country">Country</InputLabel>
                    <Select
                      labelId="Country-label"
                      id="Country-select"
                      value={country}
                      label={column.accessorKey}
                      onChange={(e) => {
                          setCountry(e.target.value)
                          setValues({ ...values, [column.accessorKey]: e.target.value })
                        }
                      }
                    >
                      {countryList?.map((country) => <MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
                // :
                //   <div>
                //     <div>Upload Avatar</div>
                //
                //     {selectedImage && (
                //       <div>
                //         <img
                //           alt="not found"
                //           width={"250px"}
                //           src={URL.createObjectURL(selectedImage)}
                //         />
                //         <br />
                //         <Button onClick={() => setSelectedImage(null)}>Remove</Button>
                //       </div>
                //     )}
                //
                //     <br />
                //
                //     <input
                //       type="file"
                //       name="myImage"
                //       onChange={(e) => {
                //         setSelectedImage(e.target.files[0])
                //         setValues({ ...values, [column.accessorKey]: e.target.files[0] })
                //       }}
                //     />
                //   </div>
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Table;