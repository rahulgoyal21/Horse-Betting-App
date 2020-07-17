import axios from "axios";
import GameData from "../entities/gameData";
import StartsInformation from "../entities/startsInformation";

const getGameTableData = async (type) => {
  const gameType = type ? type.toUpperCase() : "V75";
  try {
    const response = await axios.get(
      `https://www.atg.se/services/racinginfo/v1/api/products/${gameType}`
    );
    console.log(".....data......", response);
    const gameTableData = response.data.results.map((item) => {
      return new GameData(item);
    });
    console.log("....entitiy response.....", gameTableData);
    return gameTableData;
  } catch (err) {
    console.log(err);
  }
};

const getGameDetails = async (gameId) => {
  try {
    const response = await axios.get(
      `https://www.atg.se/services/racinginfo/v1/api/games/${gameId}`
    );
    console.log(".....game details......", response);
    // const gameTableData = response.data.results.map((item) => {
    //   return new GameData(item);
    // });
    // console.log("....entitiy response.....", gameTableData);
    // return gameTableData;
    const gameDetails = response.data.races.map((item) => {
      const startInfo = item.starts.map((item2) => {
        return new StartsInformation(item2);
      });
      const { name, number, startTime } = item;
      const newStartTime = new Date(startTime).toString().substr(0, 25);
      return { startInfo, number, name, newStartTime };
    });
    console.log(".....new Data.....", gameDetails);
    return gameDetails;
  } catch (err) {
    console.log(err);
  }
};

export { getGameTableData, getGameDetails };
