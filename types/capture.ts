export interface CaptureInfo {
  coreTimeId: number;
  memberId: number;
  fileName: string;
}

export interface ImageListInfo {
  memberId: number;
  fileLink: string;
  createdTime: string;
  nickname?: string;
}

export interface CaptureTimeInfo {
  coreTimeId: string;
  memberId: string;
  fileName: string;
}
