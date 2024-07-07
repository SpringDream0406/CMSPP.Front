import { useEffect } from "react";
import "./Spp.css";
import Solar from "./components/Solar/Solar";
import SRec from "./components/Rec/SRec";
import Expense from "./components/Expense";
import { useDispatch } from "react-redux";
import { sppActions } from "../../redux/sppReducer";
import { SppUtils } from "../../utils/spp.utils";
import SppSelectYears from "./components/SppSelectYears";
import IRec from "./components/Rec/IRec";

const Spp = () => {
  const dispatch = useDispatch();

  // 내 발전소 초기 데이터 받아다 각각 넣어주기
  useEffect(() => {
    const fetchSppData = async () => {
      const { solarData, recData } = await SppUtils.fetchSppData();
      dispatch(sppActions.setSolarData(solarData));
      dispatch(sppActions.setRecData(recData));
    };
    fetchSppData();
  }, [dispatch]);

  // 본문
  return (
    <div className="spp-background">
      <div className="spp-select">
        <SppSelectYears />
      </div>
      <div className="spp-box1">
        <Solar />
        <IRec />
        <SRec />
      </div>
      <div className="spp-box2">
        <Expense />
      </div>
    </div>
  );
};

export default Spp;
