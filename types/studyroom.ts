export interface LearniverseResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface StudyRoomListInfo {
  pinRooms?: StudyRoomInfo[];
  rooms: StudyRoomInfo[];
}

export interface StudyRoomDataInfo {
  rooms: StudyRoomInfo;
}

export interface LanguageDataInfo {
  languages: string[];
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
  roomLanguages?: string[];
  roomIntro?: string;
  roomLimit: number;
  roomHashtags: string[];
  room_git_org?: string;
  room_notion?: string;
  room_google_drive?: string;
  room_figma?: string;
}

export interface CoreTimeListInfo {
  cores: CoreTimeInfo[];
  isCore: boolean;
}

export interface CoreTimeInfo {
  coreTimeId: number;
  roomId: number;
  coreStartTime: Date;
  coreEndTime: Date;
  captureNum: number;
  isCore: boolean;
}

export interface CoreTimeIdInfo {
  coreTimeId: number;
}

export interface PostCoreTimeInfo {
  roomId: number;
  coreStartTime: Date;
  coreHour: number;
  coreMinute: number;
  captureNum: number;
}

export interface WorkSpaceDataInfo {
  workspaces: WorkSpaceInfo;
}

export interface WorkSpaceInfo {
  roomFigma: string;
  roomGitOrg: string;
  roomGoogleDrive: string;
  roomNotion: string;
}

export interface PostWorkSpaceInfo {
  roomId: number;
  roomGitOrg?: string;
  roomNotion?: string;
  roomGoogleDrive?: string;
  roomFigma?: string;
}

export interface PostNoticeInfo {
  memberId: number;
  roomId: number;
  title: string;
  content: string;
}

export interface NoticeListInfo {
  boards: NoticeInfo[];
}

export interface NoticeInfo {
  memberId: number;
  boardId: number;
  title: string;
  content: string;
  createdDate: Date;
}

export interface ModifyNoticeInfo {
  memberId: number;
  roomId: number;
  boardId: number;
  title: string;
  content: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface IssueListInfo {
  issues: IssueInfo[];
}

export interface IssueGetInfo {
  issue: IssueInfo;
  gitCode: string;
  gitCodeModify: string;
}

export interface IssueInfo {
  issueId: number;
  memberId: number;
  roomId: number;
  issueTitle: string;
  issueDescription: string;
  issueGitUrl: string;
  gitFileName: string;
  gitCode: string;
  gitCodeModify: string;
  issueOpen: boolean;
  createdDate: Date;
}

export interface PostIssueInfo {
  roomId: number;
  memberId: number;
  issueTitle: string;
  issueDescription: string;
  issueGitUrl: string;
  gitFileName?: string;
}
export interface DiscussListInfo {
  opinions: DiscussInfo[];
}

export interface DiscussInfo {
  opinionId: number;
  issueId: number;
  memberId: number;
  issueOpinion: string;
  issueOpinionStartLine: number;
  issueOpinionEndLine: number;
  issueOpinionCode: string;
  issueAccepted: boolean;
  createdDate: Date;
}

export interface PostDiscussInfo {
  issueId: number;
  memberId: number;
  issueOpinion: string;
  issueOpinionStartLine: number;
  issueOpinionEndLine: number;
  issueOpinionCode: string;
}

export interface ModifyDiscussInfo {
  issueId: number;
  roomId: number;
  gitCodeModify: string;
}
