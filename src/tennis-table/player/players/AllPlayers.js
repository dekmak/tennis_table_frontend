import { Card } from '@mui/material';
import RecordsTable from './RecordsTable';
import { FetchAllPlayers } from '../../../utils/FetchGraphql';
import React, { useState, useEffect } from "react";

function AllPlayers() {

  const [dataRecords, setDataRecords] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const data = await FetchAllPlayers();
    //console.log(data);
    setDataRecords(data);
  }

  return (
    <Card>
      <RecordsTable dataRecords={dataRecords} />
    </Card>
  );
}

export default AllPlayers;
