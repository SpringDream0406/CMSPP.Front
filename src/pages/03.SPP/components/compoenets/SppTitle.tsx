import { Utils } from "../../../../utils/utils";
import { ISppTitle } from "../../../../interfaces/components.interface";

const SppTitle = ({ name, data, setSeletedYear }: ISppTitle) => {
  //
  // 본문
  return (
    <div className="spp-titles">
      <div>{name}</div>
      {data ? (
        <select
          className="spp-titles-selet"
          onChange={(e) => setSeletedYear(e.target.value)}
        >
          {Utils.selectYears(data).map((year, index) => (
            <option className="" key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      ) : (
        <div></div>
      )}{" "}
    </div>
  );
};

export default SppTitle;
