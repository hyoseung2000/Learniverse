/* eslint-disable @typescript-eslint/no-unused-vars */
// import 'ace-builds/src-noconflict/ace';
// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/theme-tomorrow';

import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { mutate } from 'swr';

import { getDiscussions, getIssueInfo, postDiscuss } from '@/apis/issue';
import { StateDeleteBtn } from '@/components/Common/Button';
import { SquareModal } from '@/components/Common/Modal';
import useGetDiscussInfo from '@/hooks/StudyRooms/useGetDiscussInfo';
import useGetIssueInfo from '@/hooks/StudyRooms/useGetIssueInfo';
import { IcDiscussLogo } from '@/public/assets/icons';
import { issueIdState, memberIdState } from '@/recoil/atom';
import { DiscussInfo, PostDiscussInfo } from '@/types/studyroom';
import {
  DiffEditor,
  Editor,
  MonacoDiffEditor,
  useMonaco,
} from '@monaco-editor/react';

import CommentCard from './CommentCard';

interface Props {
  isShowing: boolean;
  handleCancel: () => void;
}

const DiscussIssueModal = ({ isShowing, handleCancel }: Props) => {
  const cMemberId = useRecoilValue(memberIdState);
  const issueId = useRecoilValue(issueIdState);
  // const codeRef = useRef<AceEditor>(null);
  // const codeRef = useRef<MonacoDiffEditor>(null);
  const editorRef = useRef<MonacoDiffEditor>(null);
  // const editor = useRef<undefined | monaco.editor.IStandaloneCodeEditor>();

  const [isComment, setIsComment] = useState(false);
  const [suggestCode, setSuggestCode] = useState<string>('');
  const [opinion, setOpinion] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  const [language, setLanguage] = useState('typescript');
  const [code, setCode] = useState<string>('');
  const [changeCode, setChangeCode] = useState<string>('');
  const [title, setTitle] = useState('');
  const [descrpt, setDescrpt] = useState('');
  const [giturl, setGiturl] = useState('');
  const [writer, setWriter] = useState<number>(1);
  const [commentList, setCommentList] = useState<DiscussInfo[]>();
  const [discussData, setDiscussData] = useState<PostDiscussInfo>();

  const [editor, setEditor] = useState<MonacoDiffEditor>(null);
  const [modifyEditor, setmodifyEditor] = useState<MonacoDiffEditor>(null);
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(1);

  const { issue, issueCode, isLoading } = useGetIssueInfo(issueId);
  const { discuss, isDiscussLoading } = useGetDiscussInfo(issueId);

  const getIssueData = async () => {
    // const issueInfo = await getIssueInfo(issueId);
    // const { issue, gitCode } = issueInfo!;
    if (!isLoading) {
      const { issueTitle, issueDescription, issueGitUrl, memberId } = issue!;
      // const { issueTitle, issueDescription, issueGitUrl, memberId } = issue || {};
      // setCode(issueCode!);
      setCode(issueCode!);
      setChangeCode(issueCode!);
      setTitle(issueTitle!);
      setDescrpt(issueDescription!);
      setGiturl(issueGitUrl!);
      setWriter(memberId!);
    }
  };

  const getDiscuss = async () => {
    // const discussInfo = await getDiscussions(issueId);
    // console.log(discussInfo);
    // setCommentList(discussInfo);
    if (!isDiscussLoading) {
      setCommentList(discuss);
    }
  };

  const handleOpenGithub = () => {
    window.open(`https://github.com/${giturl}`);
  };

  const handleCreateInput = () => {
    // if (codeRef.current) {
    //   const { editor } = codeRef.current;
    //   const line = editor.getSelectionRange().start.row;
    //   const range = editor.getSelectionRange();
    //   const getSelectedText = editor.session.getTextRange(range);
    //   console.log(line, range, getSelectedText);
    //   setIsComment(true);
    //   setIndex(line);
    //   changeData();
    // }
  };

  const handleCreateComment = async () => {
    await postDiscuss(discussData!);
    setSuggestCode('');
    mutate(`room/discussions?issueId=${issueId}`);
  };

  const changeData = () => {
    setSuggestCode('');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (e: any) => {
    const original = e.getOriginalEditor();
    setEditor(original);
    const modify = e.getModifiedEditor();
    setmodifyEditor(modify);
    // console.log('model', e.getModel());
    // console.log('modify', e.getModifiedEditor());
    // console.log('original', original);
    // console.log(editorRef.current.getSelection());
    // console.log(editor.current.getSelection());
  };

  const monaco = useMonaco();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = async () => {
    editorRef.current = editor;
    const position = editor.getSelection();
    // console.log('position', editor.getvalue());
    setStart(position.startLineNumber);
    setEnd(position.endLineNumber - 1);
    setIsComment(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInput = (value: any) => {
    setSuggestCode(value);
  };

  useEffect(() => {
    if (monaco) {
      console.log('here is the monaco instance:', monaco);
    }
  }, [monaco]);

  useEffect(() => {
    if (isShowing) {
      getIssueData();
      getDiscuss();
    }
  }, [isShowing]);

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
        <StDiscussWrapper>
          <StIssueWrapper>
            <StIssue>
              <IcDiscussLogo />
              <StContent>
                <h3>{title}</h3>
                <p>{descrpt}</p>
                <p>
                  🔗 깃허브 링크{' '}
                  <StLink onClick={handleOpenGithub}>
                    https://github.com/{giturl}
                  </StLink>
                </p>
              </StContent>
            </StIssue>
            <StCode onClick={handleClick}>
              <div>
                {/* <AceEditor
                  ref={codeRef}
                  className="github code"
                  setOptions={{ useWorker: false }}
                  placeholder="this is code editor"
                  mode="javascript"
                  theme="tomorrow"
                  name="codeInput"
                  height="40rem"
                  width="100%"
                  fontSize={30}
                  showPrintMargin
                  showGutter
                  highlightActiveLine
                  readOnly
                  value={code}
                  onCursorChange={() => {
                    handleCreateInput();
                  }}
                /> */}
                <DiffEditor
                  height="40rem"
                  language={language}
                  original={code}
                  modified={changeCode}
                  options={{
                    fontSize: 35,
                    lineHeight: 20,
                    // minimap: { enabled: false },
                    // readOnly: true,
                    scrollbar: {
                      vertical: 'auto',
                      horizontal: 'auto',
                    },
                  }}
                  // eslint-disable-next-line react/jsx-no-bind
                  onMount={handleEditorDidMount}
                />
              </div>
            </StCode>
            {isComment && (
              <StInputWrapper>
                <StInput>
                  <textarea
                    placeholder="코멘트를 입력하세요"
                    value={opinion}
                    onChange={(e) => {
                      setOpinion(e.target.value);
                    }}
                  />
                  <div>
                    <div>
                      <p>Selected Line</p>
                      <p>
                        {start} - {end}
                      </p>
                    </div>

                    <Editor
                      height="5rem"
                      width="90rem"
                      defaultValue="// 제안할 코드를 입력하세요"
                      language={language}
                      onChange={handleInput}
                      options={{
                        fontSize: 35,
                        lineHeight: 30,
                        minimap: { enabled: false },
                        scrollbar: {
                          vertical: 'auto',
                          horizontal: 'auto',
                        },
                      }}
                    />
                  </div>
                </StInput>
                <button type="button" onClick={handleCreateComment}>
                  입력
                </button>
              </StInputWrapper>
            )}
          </StIssueWrapper>
          <StCommentWrapper>
            <StTitle>
              <div>
                <p>의견</p>
                <span>{commentList?.length}</span>
              </div>
              <StateDeleteBtn btnName="창 닫기" handleClick={handleCancel} />
            </StTitle>
            <StComment>
              {commentList &&
                commentList.map((comment) => (
                  <CommentCard
                    coderef={modifyEditor}
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

const StDiscussWrapper = styled.div`
  display: flex;
`;

const StIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  flex-wrap: wrap;

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
  height: 28rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StIssue = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 1.4rem;

  & > div {
    display: flex;
    margin-top: 1rem;
  }

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90%;

  & > h3 {
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
  & > p {
    align-items: center;
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }
`;

const StCode = styled.div``;

const StLink = styled.button`
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Purple4};
`;

const StInputWrapper = styled.div`
  margin-top: 1rem;

  display: flex;

  & > button {
    margin-left: 1rem;
    width: 3.5rem;

    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.Gray4};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body6};
  }
`;

const StInput = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0.5rem;
  gap: 1rem;

  width: 110rem;

  align-items: center;
  justify-content: space-between;

  border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
  border-radius: 1rem;

  & > textarea {
    height: 3rem;
    width: 90%;
    border: 1px solid;
    resize: none;
    background-color: ${({ theme }) => theme.colors.LightGray1};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body5};
  }

  & > div {
    display: flex;
    & > div {
      margin-right: 1rem;

      ${({ theme }) => theme.fonts.Title5};
      color: ${({ theme }) => theme.colors.Purple4};
    }
  }
`;
