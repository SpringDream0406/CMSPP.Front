import { RefObject, useEffect, useRef, useState } from "react";
import "./MyInfo.css";
import { Utils } from "../../utils/utils";
import { UserUtils } from "../../utils/user.utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MyInfo = () => {
  const dispatch = useDispatch();
  const myInfoData = useSelector(
    (state: RootState) => state.sppReducer.myInfoData
  );

  const kWhInputRef = useRef<HTMLInputElement>(null);
  const recWeightInputRef = useRef<HTMLInputElement>(null);
  const businessNumberInputRef = useRef<HTMLInputElement>(null);
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");

  //
  // 내 정보 가져오기
  useEffect(() => {
    UserUtils.fetchMyInfo(dispatch);
  }, [dispatch]);

  const sendKWhAndRecWeightData = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: kWhInputRef, name: "발전 설비(kWh)" },
      { ref: recWeightInputRef, name: "REC 가중치" },
      { ref: businessNumberInputRef, name: "사업자 번호" },
    ];

    let isNotNull = true; // 빈값 없음

    // 빈값 체크하고 알림
    Utils.sendDataCheckIsNotNull(inputs, isNotNull);

    // 주소 체크

    if (isNotNull) {
      // 각 상수에 값 할당
      const [kWh, recWeight, businessNumber] = inputs.map((input) => {
        return Number(input.ref.current!.value);
      });

      const myInfoData = {
        kWh,
        recWeight,
        businessNumber,
        address1,
        address2,
      };

      await UserUtils.updateMyInfo(myInfoData, dispatch);
    }
  };

  // 본문
  return (
    <div className="myInfo-background">
      <div className="myInfo-box1">
        <input
          type="number"
          placeholder="발전 설비(kWh)"
          defaultValue={myInfoData.kWh || ""}
          ref={kWhInputRef}
        />
        <input
          type="number"
          placeholder="REC 가중치"
          defaultValue={myInfoData.recWeight || ""}
          ref={recWeightInputRef}
        />
      </div>
      <div className="myInfo-box2">
        <input
          type="number"
          placeholder="사업자 번호"
          defaultValue={myInfoData.businessNumber || ""}
          ref={businessNumberInputRef}
        />
        <div>{address1}1</div>
        <div>{address2}2</div>
      </div>
      <button onClick={sendKWhAndRecWeightData}>등록하기</button>
    </div>
  );
};

export default MyInfo;
