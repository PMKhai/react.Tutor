import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Chip,
} from '@material-ui/core';
import _ from 'lodash';
import axios from 'axios';
import {
  API,
  ALLREGISTRATION,
  ACCEPTCONTRACT,
  CANCELCONTRACT,
} from '../../config';

const api = `${API}${ALLREGISTRATION}`;
const apiAcceptContract = `${API}${ACCEPTCONTRACT}`;
const apiCancelContract = `${API}${CANCELCONTRACT}`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function RegistrationRequest() {
  const classes = useStyles();

  // eslint-disable-next-line no-undef
  const token = JSON.parse(localStorage.getItem('token'));

  const [registrationListing, setRegistrationListing] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [display, setDisplay] = useState(
    _.slice(registrationListing, 0, rowsPerPage)
  );

  const fetchRegistrationListing = async () => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.get(api, {
        headers: { Authorization },
      });

      const { registration, returnCode } = res.data;
      if (returnCode === 1) {
        setRegistrationListing(registration);
        setDisplay(_.slice(registration, 0, rowsPerPage));
        setTotal(registration.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegistrationListing();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setDisplay(
      _.slice(
        registrationListing,
        newPage * rowsPerPage,
        (newPage + 1) * rowsPerPage
      )
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setDisplay(
      _.slice(registrationListing, 0, parseInt(event.target.value, 10))
    );
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'waiting':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'blue', color: 'white' }}
          />
        );
      case 'cancel':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'red', color: 'white' }}
          />
        );
      case 'doing':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'red', color: 'white' }}
          />
        );
      case 'done':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'red', color: 'white' }}
          />
        );
      default:
        return null;
    }
  };

  const updateAcceptStatus = async (idContract) => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.put(
        apiAcceptContract,
        { id: idContract },
        {
          headers: { Authorization },
        }
      );
      const { returnCode } = res.data;
      if (returnCode === 1) {
        const temp = registrationListing.map((e) => {
          // eslint-disable-next-line no-underscore-dangle
          if (e._id === idContract) e.status = 'doing';
          return e;
        });
        setRegistrationListing(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCancelStatus = async (idContract) => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.put(
        apiCancelContract,
        { id: idContract },
        {
          headers: { Authorization },
        }
      );
      const { returnCode } = res.data;
      if (returnCode === 1) {
        const temp = registrationListing.map((e) => {
          // eslint-disable-next-line no-underscore-dangle
          if (e._id === idContract) e.status = 'doing';
          return e;
        });
        setRegistrationListing(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAcceptButton = (idContract) => {
    updateAcceptStatus(idContract);
  };

  const handelClickCancelButton = (idContract) => {
    updateCancelStatus(idContract);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {display.map((row, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {row.student}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">{renderStatus(row.status)}</TableCell>
              <TableCell align="center">{row.totalMoney || 0} USD</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 2 }}
                  onClick={() => handleClickAcceptButton(row._id)}
                  disabled={row.status !== 'waiting'}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handelClickCancelButton(row._id)}
                  disabled={row.status !== 'waiting'}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
