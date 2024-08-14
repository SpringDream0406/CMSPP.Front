import { RefObject, useRef } from "react";
import { SppUtils } from "../../../utils/spp.utils";
import { useDispatch } from "react-redux";

const InputSRec = () => {
  const dispatch = useDispatch();
  const inputDateRef = useRef<HTMLInputElement>(null); // 년-월-일 입력
  const inputSVolumeRef = useRef<HTMLInputElement>(null); // 판매량 입력
  const inputSPriceRef = useRef<HTMLInputElement>(null); // 판매가 입력

  //
  // 서버로 REC 판매 데이터 보내기
  const sendSRec = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: inputDateRef, name: "날짜" },
      { ref: inputSVolumeRef, name: "판매량" },
      { ref: inputSPriceRef, name: "판매가" },
    ];

    await SppUtils.sendData(
      inputs,
      ([date, sVolume, sPrice]) => ({
        date: String(date),
        sVolume: Number(sVolume),
        sPrice: Number(sPrice),
      }),
      SppUtils.addSRec,
      dispatch
    );
  };

  // 본문
  return (
    <div className="spp-box-box2-input-box">
      <input className="spp-sRec-input-date" type="date" ref={inputDateRef} />
      <input
        className="spp-sRec-input-sVolume"
        type="number"
        placeholder="판매량"
        ref={inputSVolumeRef}
      />
      <input
        className="spp-sRec-input-sPrice"
        type="number"
        placeholder="판매가"
        ref={inputSPriceRef}
      />
      <button className="spp-sRec-input-btn" onClick={sendSRec}>
        추가하기
      </button>
    </div>
  );
};

export default InputSRec;
