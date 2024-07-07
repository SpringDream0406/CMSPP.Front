import { useDispatch, useSelector } from "react-redux";
import { sppActions } from "../../../redux/sppReducer";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { SppUtils } from "../../../utils/spp.utils";

const SppSelectYears = () => {
  const dispatch = useDispatch();
  const [years, setYears] = useState<number[]>(); // 데이터들에서 추린 년도들
  const [selectedYear, setSelectedYear] = useState<number | null>(null); // 선택된 년도
  const solarData = useSelector(
    (state: RootState) => state.sppReducer.solarData
  ); // 태양광 데이터
  const recData = useSelector((state: RootState) => state.sppReducer.recData); // rec 데이터

  // 데이터들에서 년도 추출해서 년도들 세팅하고, 그 중 최근값을 선택된 년도 초기값으로 설정
  useEffect(() => {
    const years = SppUtils.filteringYears({ solarData, recData });
    setYears(years);
    setSelectedYear(years[0]);
  }, [solarData, recData]);

  // 태양광 데이터 선택된 년도로 필터링
  useEffect(() => {
    dispatch(
      sppActions.setFilteredSolarData(
        SppUtils.filteringData(selectedYear, solarData)
      )
    );
  }, [dispatch, selectedYear, solarData]);

  // rec 데이터 선택된 년도로 필터링
  useEffect(() => {
    dispatch(
      sppActions.setFilteredRecData(
        SppUtils.filteringData(selectedYear, recData)
      )
    );
  }, [dispatch, selectedYear, recData]);

  //
  // 본문
  return (
    <>
      <div>년도 선택</div>
      <div className="spp-select-selectYears">
        {years ? (
          <select
            className="spp-select-selectYears-select"
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
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
        onClick={() => setSelectedYear(null)}
      >
        전체 보기
      </button>
    </>
  );
};

export default SppSelectYears;
