import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { mutate } from 'swr';

import { postDiscuss } from '@/apis/issue';
import { SquareModal } from '@/components/Common/Modal';
import useGetDiscussInfo from '@/hooks/StudyRooms/useGetDiscussInfo';
import useGetIssueInfo from '@/hooks/StudyRooms/useGetIssueInfo';
import { IcDiscussLogo } from '@/public/assets/icons';
import { issueIdState, memberIdState } from '@/recoil/atom';
import { DiscussInfo, PostDiscussInfo } from '@/types/studyroom';
import { DiffEditor, Editor, MonacoDiffEditor } from '@monaco-editor/react';

import CommentCard from './CommentCard';

interface Props {
  isShowing: boolean;
  handleCancel: () => void;
}

const DiscussIssueModal = ({ isShowing, handleCancel }: Props) => {
  const cMemberId = useRecoilValue(memberIdState);
  const issueId = useRecoilValue(issueIdState);
  // const editorRef = useRef<MonacoDiffEditor>(null);

  const [suggestCode, setSuggestCode] = useState<string>('');
  const [opinion, setOpinion] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, setLanguage] = useState('typescript');
  const [code, setCode] = useState<string>('');
  const [changeCode, setChangeCode] = useState<string>('');
  const [title, setTitle] = useState('');
  const [descrpt, setDescrpt] = useState('');
  const [giturl, setGiturl] = useState('');
  const [writer, setWriter] = useState<number>(1);
  const [commentList, setCommentList] = useState<DiscussInfo[]>();
  const [discussData, setDiscussData] = useState<PostDiscussInfo>();

  const [editor, setEditor] = useState<MonacoDiffEditor>();
  const [modifyEditor, setmodifyEditor] = useState<MonacoDiffEditor>();
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(1);
  const [isCode, setIsCode] = useState<boolean>(true);
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const { issue, issueCode, gitCodeModify, isLoading } =
    useGetIssueInfo(issueId);
  const { discuss, isDiscussLoading } = useGetDiscussInfo(issueId);

  const getIssueData = async () => {
    if (issue && !isLoading) {
      const { issueTitle, issueDescription, issueGitUrl, memberId } = issue;
      if (!issueCode) {
        setIsCode(false);
      } else {
        setIsCode(true);
        setCode(issueCode!);
        setChangeCode(gitCodeModify!);
      }
      setTitle(issueTitle!);
      setDescrpt(issueDescription!);
      setGiturl(issueGitUrl!);
      setWriter(memberId!);
    }
  };

  const getDiscuss = async () => {
    if (!isDiscussLoading) {
      setCommentList(discuss);
    }
  };

  const handleOpenGithub = () => {
    window.open(`${giturl}/issues`);
  };

  const handleCreateComment = async () => {
    if (isPosting) return;
    if (!opinion) {
      alert('코멘트는 필수 입력사항 입니다.');
      return;
    }
    setIsPosting(true);
    await postDiscuss(discussData!);
    alert('이슈 디스커션이 등록되었습니다!');
    initData();
    mutate(`room/discussions?issueId=${issueId}`);
    setIsPosting(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (e: any) => {
    const original = e.getOriginalEditor();
    setEditor(original);
    const modify = e.getModifiedEditor();
    setmodifyEditor(modify);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = async () => {
    const position = editor?.getSelection();
    setStart(position!.startLineNumber);
    setEnd(position!.endLineNumber);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleInput = (value: any) => {
  //   setSuggestCode(value);
  // };

  const initData = () => {
    setOpinion('');
    setSuggestCode('');
    setStart(1);
    setEnd(1);
  };

  useEffect(() => {
    if (isShowing) {
      initData();
      getIssueData();
      getDiscuss();
    }
  }, [isShowing]);

  useEffect(() => {
    getIssueData();
  }, [issue]);

  useEffect(() => {
    getDiscuss();
  }, [discuss]);

  useEffect(() => {
    setDiscussData({
      issueId,
      memberId: cMemberId,
      issueOpinion: opinion,
      issueOpinionStartLine: start,
      issueOpinionEndLine: end,
      issueOpinionCode: suggestCode,
    });
  }, [opinion, start, end, suggestCode]);

  return (
    isShowing && (
      <SquareModal title="이슈 디스커션" isShowing={isShowing}>
        <StCloseBtn type="button" onClick={handleCancel}>
          𝗫
        </StCloseBtn>
        <StDiscussWrapper>
          <StIssueWrapper>
            <StIssue>
              <IcDiscussLogo />
              <StContent $isCode={isCode}>
                <h3>{title}</h3>
                <p className="descrpt">{descrpt}</p>
                <p>
                  🔗 깃허브 링크{' '}
                  <StLink onClick={handleOpenGithub}>{giturl}/issues</StLink>
                </p>
              </StContent>
            </StIssue>
            <StCode $isCode={isCode} onClick={handleClick}>
              <DiffEditor
                height="30rem"
                width="95%"
                language={language}
                original={code}
                modified={changeCode}
                options={{
                  fontSize: 40,
                  lineHeight: 20,
                  // minimap: { enabled: false },
                  readOnly: true,
                  quickSuggestions: false,
                  screenReaderAnnounceInlineSuggestion: false,
                  suggestOnTriggerCharacters: false,
                  snippetSuggestions: 'none',
                  codeLens: false,
                  diffCodeLens: false,
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto',
                  },
                }}
                // eslint-disable-next-line react/jsx-no-bind
                onMount={handleEditorDidMount}
              />
            </StCode>

            <StInputWrapper>
              <StInput $isCode={isCode}>
                <textarea
                  placeholder="코멘트를 입력하세요"
                  value={opinion}
                  onChange={(e) => {
                    setOpinion(e.target.value);
                  }}
                />
                {isCode ? (
                  <CodeInput>
                    <div>
                      <p>Selected Line</p>
                      <p>
                        {start} - {end}
                      </p>
                    </div>
                    <CustomEditor
                      height="5rem"
                      width="95%"
                      defaultValue="//test"
                      language={language}
                      onChange={(value) => {
                        setSuggestCode(value!);
                      }}
                      options={{
                        snippetSuggestions: 'none',
                        screenReaderAnnounceInlineSuggestion: false,
                        // fontSize: 35,
                        // suggestFontSize: 400,
                        // // codeLensFontSize: 400,
                        // suggestLineHeight: 30,
                        // lineHeight: 20,
                        minimap: { enabled: false },
                        scrollbar: {
                          vertical: 'auto',
                          horizontal: 'auto',
                        },
                        inlineSuggest: {
                          enabled: false,
                        },
                        codeLens: false,
                      }}
                    />
                  </CodeInput>
                ) : null}
              </StInput>
              <button type="button" onClick={handleCreateComment}>
                입력
              </button>
            </StInputWrapper>
          </StIssueWrapper>
          <StCommentWrapper>
            <StTitle>
              <div>
                <p>의견</p>
                <span>{commentList?.length}</span>
              </div>
            </StTitle>
            <StComment>
              {commentList &&
                commentList.map((comment) => (
                  <CommentCard
                    modifyCode={changeCode}
                    coderef={modifyEditor!}
                    key={comment.opinionId}
                    commentInfo={comment}
                    writer={writer}
                  />
                ))}
            </StComment>
          </StCommentWrapper>
        </StDiscussWrapper>
      </SquareModal>
    )
  );
};

export default DiscussIssueModal;

const StCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 3rem;

  ${({ theme }) => theme.fonts.Title1};
`;

const StDiscussWrapper = styled.div`
  display: flex;
  height: 90%;
`;

const StIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  padding: 1.5rem 2.4rem 2.4rem 3.4rem;
  box-sizing: border-box;

  border-right: 0.1rem solid ${({ theme }) => theme.colors.Learniverse_BG};
`;

const StCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 20%;
  margin-top: 2.4rem;
  margin-left: 1.4rem;
  margin-right: 1.4rem;
  gap: 1rem;

  position: relative;
`;

const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2rem;

  & > div {
    display: flex;
  }

  & > div > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
  & > div > span {
    text-align: center;
    align-items: center;

    height: 2rem;
    width: 2rem;
    margin-left: 1rem;
    border-radius: 50%;

    background-color: ${({ theme }) => theme.colors.Green};
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body2};
  }
`;

const StComment = styled.div`
  height: 90%;
  width: 90%;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StIssue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;

  margin-bottom: 1.4rem;

  & > svg {
    position: absolute;
    top: 9rem;
    left: 5rem;
  }

  & > div {
    display: flex;
    margin-top: 1rem;
  }
`;

const StContent = styled.div<{ $isCode: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  width: 90%;
  white-space: pre-wrap;

  & > h3 {
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
  & > .descrpt {
    align-items: center;
    margin-left: 2.1rem;
    margin-top: 0.4rem;
    padding: 1rem;

    // height: fit-content;

    height: ${({ $isCode }) => ($isCode ? '5rem' : '30rem')};
    overflow-y: scroll;

    background-color: ${({ theme }) => theme.colors.LightGray2};

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }
  & > p {
    align-items: center;
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }
`;

const StCode = styled.div<{ $isCode: boolean }>`
  display: ${({ $isCode }) => ($isCode ? 'block' : 'none')};
  width: 100%;
`;

const StLink = styled.button`
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Purple4};
`;

const StInputWrapper = styled.div`
  /* .view-overlays,
  .current-line,
  .view-overlays > div {
    font-size: 100rem !important;
  } */

  font-size: 100% !important;
  margin-top: 1rem;

  display: flex;
  width: 100%;

  & > button {
    margin-left: 1rem;
    width: 3.5rem;

    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.Gray4};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body6};
  }
`;

const StInput = styled.div<{ $isCode: boolean }>`
  /* & > .monaco-editor.no-user-select.showUnused.showDeprecated.vs,
  .overflow-guard,
  .monaco-scrollable-element.editor-scrollable.vs,
  .view-overlays,
  .current-line,
  .view-overlays > div {
    font-size: 10rem !important;
  } */
  font-size: 100% !important;
  display: flex;
  flex-direction: column;

  padding: 0.5rem;
  gap: 1rem;

  width: 90%;

  align-items: center;
  justify-content: space-between;

  border: ${({ $isCode }) => ($isCode ? '0.2rem solid #000000' : '')};
  border-radius: 1rem;

  & > textarea {
    height: 3rem;
    margin-left: 5rem;
    width: 90%;
    border: 1px solid;
    resize: none;
    background-color: ${({ theme }) => theme.colors.LightGray1};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body5};
  }

  & > div {
    display: flex;
    textarea {
      font-size: 100rem !important;
    }
    & > div {
      margin-right: 1rem;

      ${({ theme }) => theme.fonts.Title5};
      color: ${({ theme }) => theme.colors.Purple4};
    }
  }
`;

const CustomEditor = styled(Editor)`
  font-size: 100% !important;
  & > .monaco-editor.no-user-select.showUnused.showDeprecated.vs,
  .overflow-guard,
  .monaco-scrollable-element.editor-scrollable.vs,
  .view-overlays,
  .view-overlays.focused,
  .view-overlays.focused > div,
  .lines-content.monaco-editor-background,
  .view-overlays > div,
  .view-overlays > div > div,
  .current-line,
  .view-lines.monaco-mouse-cursor-text,
  .view-line,
  .view-line > span > span,
  .cursor.monaco-mouse-cursor-text,
  .editor-widget.suggest-widget,
  .monaco-sash.vertical,
  .monaco-sash.vertical.disabled,
  .monaco-sash.orthogonal-edge-north.horizontal.disabled,
  .action-item.menu-entry,
  .action-label,
  .slider,
  .monaco-list-rows,
  .monaco-list-row, // suggest
  .line-numbers {
    font-size: 100% !important;
  }

  /* & > .monaco-scrollable-element.editor-scrollable.vs {
    font-size: 100% !important;
  }

  & > .view-overlays {
    font-size: 100% !important;
  } */

  /* .view-overlays,
  .current-line,
  .view-overlays > div {
    font-size: 100rem !important;
  }
  

  & > .lines-content.monaco-editor-background {
    font-size: 100rem !important;
  } */
`;

const CodeInput = styled.div`
  display: flex;
  height: 90%;
  width: 90%;

  font-size: 100% !important;

  /* & > .monaco-scrollable-element-editor-scrollable.vs {
    font-size: 100rem !important;
  }

  & > .lines-content.monaco-editor-background {
    font-size: 100rem !important;
  }

  & > .current-line {
    font-size: 100rem !important;
  }

  & > .monaco-editor .view-overlays .current-line {
    font-size: 10rem !important;
  }

  & > .monaco-editor .view-overlays,
  .monaco-editor .view-overlays > div {
    font-size: 10rem !important;
  }

  .view-overlays,
  .current-line,
  .view-overlays > div {
    font-size: 100rem !important;
  } */
`;
