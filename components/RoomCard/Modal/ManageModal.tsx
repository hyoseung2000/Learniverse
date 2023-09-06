import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getWaitMembers, JoinMember, RejectMember } from "@/apis/memberList";
import { CancelButton, ConfirmButton } from "@/components/Common/Button";
import { SmallModal } from "@/components/Common/Modal";
import { memberInfo } from "@/types/member";

interface CompleteModalProps {
  roomId: number;
  isShowing: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const ManageModal = ({
  roomId,
  isShowing,
  handleConfirm,
  handleCancel,
}: CompleteModalProps) => {
  const [applyList, setApplyList] = useState<memberInfo[]>();

  const getApplyList = async () => {
    const list = await getWaitMembers(roomId);
    setApplyList(list);
  };

  const handleJoin = async (memberId: number) => {
    await JoinMember(roomId, memberId);
  };

  const handleReject = async (memberId: number) => {
    await RejectMember(roomId, memberId);
  };

  useEffect(() => {
    if (roomId !== 0) getApplyList();
  }, [roomId]);

  return (
    <>
      {isShowing && (
        <>
          <SmallModal title="신청자 관리하기" isShowing={isShowing}>
            <StManageModalWrapper>
              <p>닉네임</p>
              <p>깃허브 아이디</p>
              <p>승인상태</p>
            </StManageModalWrapper>
            {applyList &&
              applyList.map((apply, index) => (
                <StApplyList key={index}>
                  <span>{apply.nickname}</span>
                  <span>{apply.memberEmail}</span>
                  {apply.isMember === '대기' ? (
                    <span>
                      <button
                        type="button"
                        onClick={() => handleJoin(apply.memberId)}
                      >
                        승인
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(apply.memberId)}
                      >
                        거절
                      </button>
                    </span>
                  ) : (
                    <span className="status">{apply.isMember}</span>
                  )}
                </StApplyList>
              ))}
            <StBtnWrapper>
              <ConfirmButton btnName="완료" onClick={handleConfirm} />
              <CancelButton btnName="취소" onClick={handleCancel} />
            </StBtnWrapper>
          </SmallModal>
        </>
      )}
    </>
  );
};

export default ManageModal;

const StManageModalWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;

  padding: 1.3rem 0;

  & > p {
    width: 13rem;

    text-align: center;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StApplyList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;

  & > span {
    width: 13rem;
    height: 2.5rem;

    text-align: center;

    ${({ theme }) => theme.fonts.Body5};

    & > button {
      padding: 0.2rem 0.5rem;
      margin-right: 0.4rem;

      border-radius: 0.4rem;
      background-color: ${({ theme }) => theme.colors.Green};
      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Body6};

      &:last-child {
        margin-right: 0rem;

        background-color: ${({ theme }) => theme.colors.Orange1};
      }
    }
  }
  .status {
    ${({ theme }) => theme.fonts.Body6};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  margin: 1.3rem 0;
`;
