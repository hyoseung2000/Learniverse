// 이런식으로 페이지 또는 컴포넌트별 필요한 타입 혹은 인터페이스 선언 파일 만들어서 모아주세요!

export interface LearniverseResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface studyRoomListInfo {
  rooms: studyRoomInfo[];
}

export interface studyRoomInfo {
  roomId: number;
  roomName: string;
  roomIntro: string;
  hashtags: string[];
  roomCategory: string;
  roomCount: number;
  roomLimit: number;
  isMember: string;
}
