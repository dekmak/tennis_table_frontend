import { Card } from '@mui/material';
import RecordsTable from './RecordsTable';
import { FetchAllDisplayGames } from '../../../utils/FetchGraphql';
import React, { useState, useEffect } from "react";

function AllGames() {

  const [dataRecords, setDataRecords] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const data = await FetchAllDisplayGames();
    setDataRecords(data);
  }

  return (
    <Card>
      <RecordsTable dataRecords={dataRecords} />
    </Card>
  );
}

export default AllGames;
