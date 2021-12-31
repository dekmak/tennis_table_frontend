import { Card } from '@mui/material';
import RecordsTable from './RecordsTable';
import { FetchAllRanks } from '../../../utils/FetchGraphql';
import React, { useState, useEffect } from "react";

function AllRanks() {

  const [dataRecords, setDataRecords] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const data = await FetchAllRanks();
    //console.log(data);
    setDataRecords(data);
  }

  return (
    <Card>
      <RecordsTable dataRecords={dataRecords} />
    </Card>
  );
}

export default AllRanks;
