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

export interface CreateCaptureTimeInfo {
  coreTimeId: number;
  startTime: Date;
  endTime: Date;
  captureCount: number;
  tokens: string[];
}

export interface GetCaptureTimeInfo {
  _id: string;
  coreTimeId: number;
  captureTime: Date;
  __v: number;
}
