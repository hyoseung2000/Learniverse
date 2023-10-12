import { useEffect, useState } from 'react';
/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from 'styled-components';

import { useModal } from '@/hooks/Common';
import { NoticeInfo } from '@/types/studyroom';
import { getNickName } from '@/utils/getNicknames';

import ModifyNoticeModal from './Modal/ModifyNoticeModal';

interface Props {
  noticeInfo: NoticeInfo;
  isWriter: boolean;
}

const NoticeCard = ({ noticeInfo, isWriter }: Props) => {
  const { memberId, title, content } = noticeInfo;
  const modify = useModal();
  const [memberNickname, setMemberNickname] = useState('');

  const setNickname = async (): Promise<void> => {
    const nickname = await getNickName(memberId);
    setMemberNickname(nickname);
  };

  const handleModify = () => {
    if (isWriter) {
      modify.toggle();
    }
  };

  useEffect(() => {
    setNickname();
  }, []);

  return (
    <>
      <StNoticeCardWrapper onClick={handleModify} $isWriter={isWriter}>
        <StTitle>
          <h2>{title}</h2>
          <p>작성자 : {memberNickname}</p>
        </StTitle>
        <StContent>
          <p>{content}</p>
        </StContent>
      </StNoticeCardWrapper>
      <StModifyModalWrapper $showing={modify.isShowing}>
        <ModifyNoticeModal
          isShowing={modify.isShowing}
          noticeInfo={noticeInfo}
          handleCancel={modify.toggle}
        />
      </StModifyModalWrapper>
    </>
  );
};

export default NoticeCard;

const StNoticeCardWrapper = styled.div<{
  $isWriter: boolean;
}>`
  width: 73rem;
  padding: 0.5rem;

  border-radius: 1rem;

  background: ${({ theme }) => theme.colors.LightGray2};

  cursor: ${({ $isWriter }) => ($isWriter ? 'pointer' : 'default')};
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 5rem;

  & > h2 {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title3};
  }
  & > p {
    margin-left: 10rem;
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body2};
  }
`;
const StContent = styled.div`
  margin: 0 5rem;
  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body1};
  }
  white-space: pre-wrap;
`;

const StModifyModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
