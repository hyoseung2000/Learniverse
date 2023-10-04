export interface MemberListInfo {
  members: MemberInfo[];
}

export interface MemberInfo {
  memberId: number;
  memberEmail: string;
  nickname: string;
  memberMessage: string;
  status: boolean;
  isMember: string;
}

export interface ProfileInfo {
  imageUrl: string;
  nickname: string;
}

export interface MoonInfo {
  moonDate: Date;
  moonScore: number;
}

export interface MoonScoreInfo {
  isFirstAccess: number;
  isCoreTimeParticipate: number;
  isCapture: number;
}

export interface MemberTokenInfo {
  memberId: number;
  token: string;
}
