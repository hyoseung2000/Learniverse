// 상수 값을 넣어두는 폴더
// 사용되는 컴포넌트 또는 페이지별로 파일 만들어서 관리해주세요!
// 상수명은 모두 대문자로!

// 예시 (지워도됨)
export const MODAL_LEAVE_PAGE = [
  '아직 저장하지 않은 내용이 있어요.',
  '페이지를 벗어나시겠습니까?',
] as const;

// 예시 (지워도됨)
export const KEYWORDS_COLOR = {
  red: {
    name: 'red',
    color: '#FF4646',
    background: 'rgba(255, 70, 70, 0.20)',
  },
  yellow: {
    name: 'yellow',
    color: '#FFB802',
    background: 'rgba(255, 184, 2, 0.20)',
  },
  green: {
    name: 'green',
    color: '#38C94F',
    background: 'rgba(56, 201, 79, 0.20)',
  },
  blue: {
    name: 'blue',
    color: '#52A2FF',
    background: 'rgba(82, 162, 255, 0.20)',
  },
  purple: {
    name: 'purple',
    color: '#968DFF',
    background: 'rgba(150, 141, 255, 0.20)',
  },
  pink: {
    name: 'pink',
    color: '#FF6FC5',
    background: 'rgba(255, 111, 197, 0.20)',
  },
  brown: {
    name: 'brown',
    color: '#98613A',
    background: 'rgba(152, 97, 58, 0.20)',
  },
  gray: {
    name: 'gray',
    color: '#8B8B8B',
    background: 'rgba(139, 139, 139, 0.20)',
  },
} as const;

export type ModalLeavePageType = typeof MODAL_LEAVE_PAGE;
export type ColorKeyType = keyof typeof KEYWORDS_COLOR;
