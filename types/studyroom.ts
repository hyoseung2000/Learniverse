// 이런식으로 페이지 또는 컴포넌트별 필요한 타입 혹은 인터페이스 선언 파일 만들어서 모아주세요!

export interface LearniverseResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface StudyRoomListInfo {
  rooms: StudyRoomInfo[];
}

export interface StudyRoomInfo {
  roomId: number;
  roomName: string;
  roomIntro: string;
  roomHashtags: string[];
  roomCategory: string;
  roomCount: number;
  roomLimit: number;
  isMember: string;
}

export interface EditStudyRoomInfo {
  roomId: number;
  roomName: string;
  roomCategory: number;
  roomIntro: string;
  roomLimit: number;
  roomHashtags: string[];
}

export interface PostStudyRoomInfo {
  memberId: number;
  roomName: string;
  roomCategory: number;
  roomIntro?: string;
  roomLimit: number;
  roomHashtags: string[];
  room_git_org?: string;
  room_notion?: string;
  room_google_drive?: string;
  room_figma?: string;
}
