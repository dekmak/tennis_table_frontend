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
  const [limit, setLimit] = useState(1000);
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
      event.target.checked ? dataRecords.map((dataRecord) => dataRecord.id) : []
    );
  };

  const handleSelectOnedataRecord = (event, dataRecordId) => {
    if (!selecteddataRecords.includes(dataRecordId)) {
      setSelecteddataRecords((prevSelected) => [...prevSelected, dataRecordId]);
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
              <TableCell></TableCell>
              <TableCell>Game Name</TableCell>
              <TableCell>First Player</TableCell>
              <TableCell>Second Player</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateddataRecords.map((dataRecord) => {
              const isdataRecordSelected = selecteddataRecords.includes(
                dataRecord.game_id
              );
              return (
                <TableRow
                  hover
                  key={dataRecord.game_id}
                  selected={isdataRecordSelected}
                >
                  <TableCell>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dataRecord.event_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {dataRecord.subevent_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Avatar src={dataRecord.player_1_profile}></Avatar>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dataRecord.player_1_name} ({dataRecord.player_1_score})
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Avatar src={dataRecord.player_2_profile}></Avatar>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dataRecord.player_2_name} ({dataRecord.player_2_score})
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
