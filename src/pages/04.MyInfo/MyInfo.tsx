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
  const [address, setAddress] = useState<string>(myInfoData.address || "지역");

  //
  // 내 정보 가져오기
  useEffect(() => {
    UserUtils.fetchMyInfo(dispatch, setAddress);
  }, [dispatch]);

  // myInfoData 보내기
  const sendMyInfoData = async () => {
    const inputs: { ref: RefObject<HTMLInputElement>; name: string }[] = [
      { ref: kWhInputRef, name: "발전 설비(kWh)" },
      { ref: recWeightInputRef, name: "REC 가중치" },
      { ref: businessNumberInputRef, name: "사업자 번호" },
    ];

    // 빈값 체크
    const isNotNull = Utils.sendDataCheckIsNotNull(inputs);
    if (!isNotNull) return;

    // 각 상수에 값 할당
    const [kWh, recWeight, businessNumber] = inputs.map((input) => {
      return Number(input.ref.current!.value);
    });

    // 사업자 등록번호 체크
    const result = await UserUtils.checkBusinessNumber(businessNumber);
    if (!result) return;

    const myInfoData = {
      kWh,
      recWeight,
      businessNumber,
      address,
    };

    // 지역 체크
    const checkAddress = selectOptionData.includes(address);
    if (!checkAddress) return alert("지역 다름");

    await UserUtils.updateMyInfo(myInfoData, dispatch);
  };

  //
  const inputHTMLData = [
    {
      name: "발전 설비(kWh)",
      title: "",
      type: "number",
      defaultValue: myInfoData.kWh,
      ref: kWhInputRef,
    },
    {
      name: "REC 가중치",
      title: "",
      type: "number",
      defaultValue: myInfoData.recWeight,
      ref: recWeightInputRef,
    },
    {
      name: "사업자 번호",
      title: "",
      type: "number",
      defaultValue: myInfoData.businessNumber,
      ref: businessNumberInputRef,
    },
  ];

  //
  const selectOptionData = [
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
      {inputHTMLData.map((data, index) => (
        <div className="myInfo-items" key={index}>
          <span>{data.name}</span>
          <input
            type={data.type}
            placeholder={data.name}
            defaultValue={data.defaultValue || ""}
            ref={data.ref}
          />
        </div>
      ))}
      <div>{myInfoData.address || address}</div>
      <select name="" id="" onChange={(e) => setAddress(e.target.value)}>
        <option value="">지역을 선택하세요.</option>
        {selectOptionData.map((data) => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>
      <button onClick={sendMyInfoData}>업데이트</button>
    </div>
  );
};

export default MyInfo;
