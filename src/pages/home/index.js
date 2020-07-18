import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  Avatar,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Link,
  Card,
} from "@material-ui/core";
import { getGameTableData } from "../../gateways/game-api";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Home = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [gameType, setGameType] = useState();
  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });

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
  const searchGameClicked = async () => {
    setLoader(true);
    const response = await getGameTableData(gameType);
    setData(response);
    setLoader(false);
  };

  const classes = useStyles();
  const navigateToGameDetails = (id) => {
    history.push("/game_detail/" + id);
  };
  useEffect(() => {
    async function fetchData() {
      setLoader(true);
      const response = await getGameTableData();
      setData(response);
      setLoader(false);
    }
    fetchData();
  }, []);
  console.log("...........", gameType);
  return (
    <Grid container style={{ padding: "50px" }}>
      <Grid item style={{ width: "100%" }}>
        <Typography
          align="center"
          display="block"
          variant="h2"
          style={{ fontFamily: "'Ranchers', cursive" }}
        >
          Horse Betting Dashboard
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        style={{ margin: "20px 0px" }}
        alignItems="center"
      >
        <Input
          autoFocus={true}
          size="small"
          style={{
            border: "1px solid #000000",
            padding: "5px",
            marginRight: "0.7rem",
          }}
          placeholder="Enter The Game Type"
          value={gameType}
          onChange={(event) => setGameType(event.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => searchGameClicked()}
          style={{ marginRight: "0.7rem" }}
        >
          Search Game
        </Button>

        <Grid item>
          <Grid container direction="row" alignItems="center">
            <ArrowBackIcon style={{ marginRight: "0.3rem" }} />
            <Typography
              size="10px"
              style={{ color: "#A9A9A9", size: "10px" }}
              align="center"
            >
              Search Game Type Here like "V75, V65, V64, V4"
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center">
        <Typography
          align="center"
          variant="h3"
          style={{ fontFamily: "'Dancing Script', cursive", color: "#9AFF33 " }}
        >
          Game Schedule Table
        </Typography>
      </Grid>
      {data.length > 0 && !loader ? (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="simple table"
            style={{ border: "2px solid #000000" }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" style={{ fontSize: "1.25rem" }}>
                  <strong>Game Id</strong>
                </StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: "1.25rem" }}>
                  <strong>Start Time</strong>
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={item.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    style={{
                      cursor: "pointer",
                      border: "0.5px solid #000000",
                    }}
                  >
                    <Link onClick={() => navigateToGameDetails(item.id)}>
                      {item.id}
                    </Link>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      border: "0.5px solid #000000",
                    }}
                  >
                    {item.startTime}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          style={{ minHeight: "50vh", width: "100%" }}
        >
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
};
export default Home;
