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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

const GameDetails = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const route = useRouteMatch();
  const gameType = route.params.id.split("_")[0];
  const history = useHistory();
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const backNavigation = () => {
    history.goBack();
  };
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#000000",
      color: "#ffffff",
      align: "center",
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      {data.length ? (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="simple table"
            style={{ border: "2px solid #000000" }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell rowSpan="2" align="center">
                  <strong>Game Type</strong>
                </StyledTableCell>
                <StyledTableCell colSpan="8" align="center">
                  <strong>Races Information</strong>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    border: "0.5px solid #000000",
                  }}
                >
                  Race No.
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    border: "0.5px solid #000000",
                  }}
                >
                  Race Name
                </TableCell>
                <TableCell
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
              ></TableRow>
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
                  <TableCell
                    style={{
                      border: "0.5px solid #000000",
                    }}
                  >
                    <Accordion
                      expanded={expanded === item.number}
                      onChange={handleChange(item.number)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          Click To See Starts Information
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer component={Paper}>
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                            style={{ border: "2px solid #000000" }}
                          >
                            <TableHead>
                              <TableRow
                                style={{
                                  border: "0.5px solid #ffffff",
                                }}
                              >
                                <StyledTableCell>Start No.</StyledTableCell>
                                <StyledTableCell>Horse Name</StyledTableCell>
                                <StyledTableCell>Rider Name</StyledTableCell>
                                <StyledTableCell>Trainer Name</StyledTableCell>
                                <StyledTableCell>
                                  Horse Father Name
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {item.startInfo.map((item) => (
                                <StyledTableRow>
                                  <TableCell
                                    align="center"
                                    style={{
                                      border: "0.5px solid #000000",
                                    }}
                                  >
                                    {item.startNo}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      border: "0.5px solid #000000",
                                    }}
                                  >
                                    {item.horseName}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      border: "0.5px solid #000000",
                                    }}
                                  >
                                    {item.rider}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      border: "0.5px solid #000000",
                                    }}
                                  >
                                    <Accordion>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                      >
                                        <Typography className={classes.heading}>
                                          Click
                                        </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        {item.trainer}
                                      </AccordionDetails>
                                    </Accordion>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      border: "0.5px solid #000000",
                                    }}
                                  >
                                    <Accordion>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                      >
                                        <Typography className={classes.heading}>
                                          Click
                                        </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        {item.horseFather}
                                      </AccordionDetails>
                                    </Accordion>
                                  </TableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
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
export default GameDetails;
