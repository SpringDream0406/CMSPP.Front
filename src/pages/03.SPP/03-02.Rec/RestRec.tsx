import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";

const RestRec = () => {
  const iRec = useSelector((state: RootState) => state.sppReducer.iRec);
  const sRec = useSelector((state: RootState) => state.sppReducer.sRec);
  const [restRec, setRestRec] = useState<number>(0);

  //
  // 남은 rec 계산해서 넣기
  useEffect(() => {
    const iRecTotal = iRec.reduce((acc, iRec) => acc + iRec.issuance, 0);
    const sRecTotal = sRec.reduce((acc, sRec) => acc + sRec.sVolume, 0);
    setRestRec(iRecTotal - sRecTotal);
  }, [iRec, sRec]);

  // 본문
  return (
    <div
      className="spp-restRec-box"
      style={{ backgroundColor: restRec < 0 ? "red" : "" }}
    >
      <div className="spp-restRec-text">남은 REC</div>
      <div className="spp-restRec-calcul">{`${restRec}개`}</div>
    </div>
  );
};

export default RestRec;
