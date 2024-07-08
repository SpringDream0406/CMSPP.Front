import { RefObject, useRef } from "react";
import "./MyInfo.css";
import { Utils } from "../../utils/utils";
import { UserUtils } from "../../utils/user.utils";

const MyInfo = () => {
  const kWhInputRef = useRef<HTMLInputElement>(null);
  const recWeightInputRef = useRef<HTMLInputElement>(null);

  const sendKWhAndRecWeightData = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: kWhInputRef, name: "발전 설비(kWh)" },
      { ref: recWeightInputRef, name: "REC 가중치" },
    ];

    let isNotNull = true; // 빈값 없음

    // 빈값 체크하고 알림
    Utils.sendDataCheckIsNotNull(inputs, isNotNull);

    if (isNotNull) {
      // 각 상수에 값 할당
      const [kWh, recWeight] = inputs.map((input) => {
        return Number(input.ref.current!.value);
      });

      const kWhAndrecWeightData = {
        kWh,
        recWeight,
      };

      const isUpdated = await UserUtils.updatekWhAndRecWeight(
        kWhAndrecWeightData
      );
      console.log(isUpdated);
    }
  };

  return (
    <div className="myInfo-background">
      <div className="myInfo-box1">
        <input type="number" placeholder="발전 설비(kWh)" ref={kWhInputRef} />
        <input type="number" placeholder="REC 가중치" ref={recWeightInputRef} />
        <button onClick={sendKWhAndRecWeightData}>등록하기</button>
      </div>
      <div className="myInfo-box2">사업자번호</div>
    </div>
  );
};

export default MyInfo;
