import { RefObject, useEffect, useRef, useState } from "react";
import "./MyInfo.css";
import { Utils } from "../../utils/utils";
import { UserUtils } from "../../utils/user.utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MyInfo = () => {
  const dispatch = useDispatch();
  const myInfo = useSelector((state: RootState) => state.sppReducer.myInfo);
  const kWhInputRef = useRef<HTMLInputElement>(null);
  const recWeightInputRef = useRef<HTMLInputElement>(null);
  const businessNumberInputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string>(myInfo.address || "지역");

  //
  // 내 정보 가져오기
  useEffect(() => {
    UserUtils.fetchMyInfo(dispatch, setAddress);
  }, [dispatch]);

  // myInfo 보내기
  const sendMyInfo = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: kWhInputRef, name: "발전 설비(kWh)" },
      { ref: recWeightInputRef, name: "REC 가중치" },
      { ref: businessNumberInputRef, name: "사업자 번호" },
    ];

    // 빈값 체크
    const isOk = Utils.sendDataCheck(inputs);
    if (!isOk) {
      return;
    }

    // 각 상수에 값 할당
    const [kWh, recWeight, businessNumber] = inputs.map((input) => {
      return Number(input.ref.current!.value);
    });

    // 사업자 등록번호 체크
    const result = await UserUtils.checkBusinessNumber(businessNumber);
    if (!result) {
      return;
    }

    const myInfo = {
      kWh,
      recWeight,
      businessNumber,
      address,
    };

    // 지역 체크
    const checkAddress = selectOption.includes(address);
    if (!checkAddress) return alert("지역이 올바르지 않습니다.");

    await UserUtils.updateMyInfo(myInfo, dispatch);
  };

  //
  const inputHTML = [
    {
      name: "발전 설비(kWh)",
      title: "",
      type: "number",
      defaultValue: myInfo.kWh || "",
      ref: kWhInputRef,
    },
    {
      name: "REC 가중치",
      title: "",
      type: "number",
      defaultValue: myInfo.recWeight || "",
      ref: recWeightInputRef,
    },
    {
      name: "사업자 번호 (숫자만 입력하세요.)",
      title: "",
      type: "number",
      defaultValue: myInfo.businessNumber,
      ref: businessNumberInputRef,
    },
  ];

  //
  const selectOption = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원특별자치도",
    "충청북도",
    "충청남도",
    "전북특별자치도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  // 본문
  return (
    <div className="myInfo-background">
      {inputHTML.map((data, index) => (
        <div className="myInfo-items" key={index}>
          <span>{data.name}</span>
          <input
            className="myInfo-inputs"
            type={data.type}
            placeholder={data.name}
            defaultValue={data.defaultValue!}
            ref={data.ref}
          />
        </div>
      ))}
      <div className="myInfo-address">{address || "지역을 선택하세요."}</div>
      <select
        className="myInfo-select"
        onChange={(e) => setAddress(e.target.value)}
      >
        <option value="">지역을 선택하세요.</option>
        {selectOption.map((data) => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>
      <button className="myInfo-updateBtn" onClick={sendMyInfo}>
        업데이트
      </button>
    </div>
  );
};

export default MyInfo;
