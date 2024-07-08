import { ISendDataRefInputs } from "../interfaces/utils.interface";

export class Utils {
  //
  // 데이터 보내기 빈값 체크
  static sendDataCheckIsNotNull(
    inputs: ISendDataRefInputs[],
    isNotNull: boolean
  ) {
    for (let input of inputs) {
      if (!input.ref.current || !input.ref.current.value) {
        alert(`${input.name}을(를) 입력해주세요.`);
        isNotNull = false;
        break;
      }
    }
  }

  // refInput 값 초기화
  static clearInputs(inputs: ISendDataRefInputs[], isAdded: boolean) {
    if (isAdded) {
      inputs.forEach((input) => {
        if (input.ref && input.ref.current) input.ref.current.value = "";
      });
    }
  }
}
