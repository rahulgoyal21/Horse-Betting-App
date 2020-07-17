import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { getGameDetails } from "../../gateways/game-api";
import { useRouteMatch } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const GameDetails = () => {
  const [data, setData] = useState([]);
  const route = useRouteMatch();
  const gameType = route.params.id.split("_")[0];
  const history = useHistory();
  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });
  const backNavigation = () => {
    history.goBack();
  };
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#000000",
      color: "#ffffff",
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#D3D3D3",
      },
    },
  }))(TableRow);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const response = await getGameDetails(route.params.id);
      setData(response);
    }
    fetchData();
  }, []);
  console.log("......table info data.....", data);
  return (
    <Grid container spacing={4} style={{ padding: "50px" }}>
      <Grid
        container
        direction="row"
        justify="center"
        style={{ margin: "10px" }}
      >
        <Typography
          align="center"
          display="block"
          variant="h4"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: "#9AFF33 ",
          }}
        >
          Game Details
        </Typography>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<ArrowBackIcon />}
        style={{ margin: "10px 0px" }}
        onClick={() => backNavigation()}
      >
        Back
      </Button>

      {/* <Grid item style={{ width: "100%" }}>
        
      </Grid>
      <Grid
        container
        direction="row"
        style={{ margin: "20px 0px" }}
        spacing={2}
      >
        <Grid item>
          <Input
            autoFocus={true}
            style={{
              border: "1px solid #000000",
              padding: "5px",
            }}
            placeholder="Enter The Game Type"
            value={gameType}
            onChange={(event) => setGameType(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => searchGameClicked()}
          >
            Search Game
          </Button>
        </Grid>
        <Grid container item direction="row" alignItems="center" spacing={3}>
          <Typography
            size="10px"
            style={{ color: "#A9A9A9", size: "10px" }}
            align="center"
          >
            Search Game Type Here like "V75, V65, V64, V4"
          </Typography>
        </Grid>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Typography
          align="center"
          variant="h3"
          style={{ fontFamily: "'Dancing Script', cursive", color: "#9AFF33 " }}
        >
          Game Schedule Table
        </Typography>
      </Grid> */}

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="simple table"
          style={{ border: "2px solid #000000" }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell rowSpan="3" align="center">
                <strong>Game Type</strong>
              </StyledTableCell>
              <StyledTableCell colSpan="8" align="center">
                <strong>Races Information</strong>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <TableCell
                rowSpan="2"
                align="center"
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Race No.
              </TableCell>
              <TableCell
                rowSpan="2"
                align="center"
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Race Name
              </TableCell>
              <TableCell
                rowSpan="2"
                align="center"
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Start Time
              </TableCell>
              <TableCell
                colspan="5"
                align="center"
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Starts Information
              </TableCell>
            </TableRow>
            <TableRow
              style={{
                border: "0.5px solid #000000",
              }}
            >
              <TableCell
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Start No.
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Horse Name
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Rider Name
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Tainer Name
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "0.5px solid #000000",
                }}
              >
                Horse Father Name
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <StyledTableRow key={item.number}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{
                    border: "0.5px solid #000000",
                  }}
                >
                  {gameType}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{
                    border: "0.5px solid #000000",
                  }}
                >
                  {item.number}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    border: "0.5px solid #000000",
                  }}
                >
                  {item.name}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    border: "0.5px solid #000000",
                  }}
                >
                  {item.newStartTime}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ) : (
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          style={{ minHeight: "50vh", width: "100%" }}
        >
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      )} */}
    </Grid>
  );
};

export default GameDetails;
