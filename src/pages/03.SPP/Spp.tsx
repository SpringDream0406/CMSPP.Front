import { useEffect, useState } from "react";
import "./Spp.css";
import Solar from "./components/Solar/Solar";
import { BackApiUtils } from "../../utils/backApi.utils";
import {
  IRecDataFromBack,
  ISolarDataFromBack,
} from "../../interfaces/api.interface";
import Rec from "./components/Rec/Rec";
import Expense from "./components/Expense";

const Spp = () => {
  const [solarData, setSolarData] = useState<ISolarDataFromBack[]>();
  const [recData, setRecData] = useState<IRecDataFromBack[]>();

  // 내 발전소 초기 데이터 받아다 각각 넣어주기
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

  // 본문
  return (
    <div className="spp-background">
      <div className="spp-box1">
        <Solar solarData={solarData} />
        <Rec recData={recData} />
      </div>
      <div className="spp-box2">
        <Expense />
      </div>
    </div>
  );
};

export default Spp;
