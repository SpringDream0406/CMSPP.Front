import { useEffect, useState } from "react";
import "./Spp.css";
import Solar from "./components/Solar";
import { BackApiUtils } from "../../utils/backApi.utils";
import { ISolarDataFromBack } from "../../utils/interfaces/api.interface";

const Spp = () => {
  const [solarData, setSolarData] = useState<ISolarDataFromBack[]>();
  useEffect(() => {
    const fetchSppData = async () => {
      const { solar } = await BackApiUtils.fetchSppData();
      setSolarData(solar);
      //   console.log(solar);
    };
    fetchSppData();
  }, []);
  //   console.log(solarData);

  // 본문
  return (
    <div className="spp-background">
      <div className="spp-box">
        <Solar solarData={solarData} />
        <div className="spp-rec">
          <div className="spp-rec-title">REC</div>
          <div className="spp-rec-box">box</div>
        </div>
        <div className="spp-expense">
          <div className="spp-expense-title">고정지출</div>
          <div className="spp-expense-box">box</div>
        </div>
      </div>
    </div>
  );
};

export default Spp;
