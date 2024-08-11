import { useDispatch, useSelector } from "react-redux";
import { sppActions } from "../../redux/sppReducer";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { SppUtils } from "../../utils/spp.utils";
import { useNavigate } from "react-router-dom";

const SppSelectYears = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [years, setYears] = useState<number[]>(); // 데이터들에서 추린 년도들
  const [optionYear, setOptionYear] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null); // 선택된 년도
  const solar = useSelector((state: RootState) => state.sppReducer.solar); // 태양광 데이터
  const iRec = useSelector((state: RootState) => state.sppReducer.iRec); // iRec 데이터
  const sRec = useSelector((state: RootState) => state.sppReducer.sRec); // sRec 데이터
  const expense = useSelector((state: RootState) => state.sppReducer.expense); // expense 데이터
  const myInfo = useSelector((state: RootState) => state.sppReducer.myInfo); // myInfo 데이터

  //
  // 내 발전소 초기 데이터 받아다 각각 넣어주기
  useEffect(() => {
    SppUtils.dispatchSpp(dispatch, navigate);
  }, [dispatch, navigate]);

  //
  // iRec데이터 만들어 넣기
  useEffect(() => {
    SppUtils.createIRec(solar, myInfo, dispatch);
  }, [solar, myInfo, dispatch]);

  // ============ 로직 변경 생각해보기 ============ //
  // 데이터들에서 년도 추출해서 년도들 세팅하고, 그 중 최근값을 선택된 년도 초기값으로 설정
  useEffect(() => {
    const years = SppUtils.filteringYears({ solar, sRec });
    setYears(years);
    setSelectedYear(years[0]);
  }, [solar, sRec, expense]);

  // 데이터들 선택된 년도로 필터링
  useEffect(() => {
    dispatch(
      sppActions.setFilteredSolar(SppUtils.filteringData(selectedYear, solar))
    );
    dispatch(
      sppActions.setFilteredIRec(SppUtils.filteringData(selectedYear, iRec))
    );
    dispatch(
      sppActions.setFilteredSRec(SppUtils.filteringData(selectedYear, sRec))
    );
    dispatch(
      sppActions.setFilteredExpense(
        SppUtils.filteringData(selectedYear, expense)
      )
    );
  }, [dispatch, selectedYear, solar, iRec, sRec, expense]);

  //
  // 본문
  return (
    <>
      <div>{selectedYear ? `${selectedYear}년` : ""}</div>
      <div className="spp-select-selectYears">
        {years ? (
          <select
            className="spp-select-selectYears-select"
            onChange={(e) => setOptionYear(Number(e.target.value))}
          >
            <option value="">전체</option>
            {years.map((year, index) => (
              <option className="" key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        ) : (
          <div></div>
        )}{" "}
      </div>
      <button
        className="spp-select-allBtn"
        onClick={() => setSelectedYear(optionYear)}
      >
        보기
      </button>
    </>
  );
};

export default SppSelectYears;
