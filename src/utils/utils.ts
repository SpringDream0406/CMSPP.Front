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

  // 작성일 만들기
  static makeCreatedAt(createdAt: string) {
    return `작성일 ${new Date(createdAt).toLocaleString()}`;
  }

  // date 합쳐진거 분리
  static splitDate(date: string): number[] {
    return date.split("-").map((part) => parseInt(part, 10));
  }

  // 년 뽑기
  static getYear(date: string): number {
    return Number(date.slice(0, 4));
  }

  // 월 뽑기
  static getMonth(date: string): number {
    return Number(date.slice(5, 7));
  }

  // 분기별 배경색 넣기
  static quarterBackGroundColor(date: string): string {
    const month = this.getMonth(date);
    if (month < 4) return "#f0fbfe";
    if (month < 7) return "#f4fff5";
    if (month < 10) return "#fff2f7";
    return "#fef8ed";
  }
}
