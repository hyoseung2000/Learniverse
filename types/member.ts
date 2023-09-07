export interface memberListInfo {
  members: memberInfo[];
}

export interface memberInfo {
  memberId: number;
  memberEmail: string;
  nickname: string;
  memberMessage: string;
  status: boolean;
  isMember: string;
}

export interface moonInfo {
  moonDate: Date;
  moonScore: number;
}
