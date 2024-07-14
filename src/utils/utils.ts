import { ISendDataRefInputs } from "../interfaces/utils.interface";

export class Utils {
  //
  // 데이터 보내기 빈값 체크
  static sendDataCheckIsNotNull(inputs: ISendDataRefInputs[]): boolean {
    let isNotNull = true;
    for (let input of inputs) {
      if (!input.ref.current || !input.ref.current.value) {
        alert(`${input.name}을(를) 입력해주세요.`);
        isNotNull = false;
        break;
      }
    }
    return isNotNull;
  }

  // refInput 값 초기화
  static clearInputs(inputs: ISendDataRefInputs[]) {
    inputs.forEach((input) => {
      if (input.ref && input.ref.current) input.ref.current.value = "";
    });
  }
}
