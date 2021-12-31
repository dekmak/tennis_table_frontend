import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Avatar
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

const getStatusLabel = (dataRecordStatus) => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color } = map[dataRecordStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (dataRecords, filters) => {
  return dataRecords.filter((dataRecord) => {
    let matches = true;

    if (filters.status && dataRecord.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (dataRecords, page, limit) => {
  return dataRecords.slice(page * limit, page * limit + limit);
};

const RecordsTable = ({ dataRecords }) => {

  const [selecteddataRecords, setSelecteddataRecords] = useState([]);
  const selectedBulkActions = selecteddataRecords.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAlldataRecords = (event) => {
    setSelecteddataRecords(
      event.target.checked
        ? dataRecords.map((dataRecord) => dataRecord.id)
        : []
    );
  };

  const handleSelectOnedataRecord = (event, dataRecordId) => {
    if (!selecteddataRecords.includes(dataRecordId)) {
      setSelecteddataRecords((prevSelected) => [
        ...prevSelected,
        dataRecordId
      ]);
    } else {
      setSelecteddataRecords((prevSelected) =>
        prevSelected.filter((id) => id !== dataRecordId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filtereddataRecords = applyFilters(dataRecords, filters);
  const paginateddataRecords = applyPagination(
    filtereddataRecords,
    page,
    limit
  );
  const selectedSomedataRecords =
    selecteddataRecords.length > 0 &&
    selecteddataRecords.length < dataRecords.length;
  const selectedAlldataRecords =
    selecteddataRecords.length === dataRecords.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAlldataRecords}
                  indeterminate={selectedSomedataRecords}
                  onChange={handleSelectAlldataRecords}
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Total Points</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateddataRecords.map((dataRecord) => {
              const isdataRecordSelected = selecteddataRecords.includes(
                dataRecord.player_id
              );
              return (
                <TableRow
                  hover
                  key={dataRecord.player_id}
                  selected={isdataRecordSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isdataRecordSelected}
                      onChange={(event) =>
                        handleSelectOnedataRecord(event, dataRecord.player_id)
                      }
                      value={isdataRecordSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar
                      src={dataRecord.profile_pic}
                    >
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dataRecord.player_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {dataRecord.age} years
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Avatar
                      variant='square'
                      sx={{ width: 50, height: 30 }}
                      src={`https://documentstore.ittf.com/websitefiles/assets/flags_normal/${dataRecord.country.toLowerCase()}.png`}
                    >
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dataRecord.total_points?dataRecord.total_points:2300}
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box p={2}>
        <TablePagination
          component="div"
          count={filtereddataRecords.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box> */}
    </Card>
  );
};

RecordsTable.propTypes = {
  dataRecords: PropTypes.array.isRequired
};

RecordsTable.defaultProps = {
  dataRecords: []
};

export default RecordsTable;
