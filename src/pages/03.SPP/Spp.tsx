import { useEffect, useState } from "react";
import "./Spp.css";
import Solar from "./components/Solar";
import { BackApiUtils } from "../../utils/backApi.utils";
import {
  IRecDataFromBack,
  ISolarDataFromBack,
} from "../../interfaces/api.interface";
import Rec from "./components/Rec";
import Expense from "./components/Expense";

const Spp = () => {
  const [solarData, setSolarData] = useState<ISolarDataFromBack[]>();
  const [recData, setRecData] = useState<IRecDataFromBack[]>();
  //
  useEffect(() => {
    const fetchSppData = async () => {
      const { solar, rec } = await BackApiUtils.fetchSppData();
      setSolarData(solar);
      setRecData(rec);
      console.log(solar);
      console.log(rec);
    };
    fetchSppData();
  }, []);
  //   console.log(solarData);

  // 본문
  return (
    <div className="spp-background">
      <div className="spp-box">
        <Solar solarData={solarData} />
        <Rec recData={recData} />
        <Expense />
      </div>
    </div>
  );
};

export default Spp;
