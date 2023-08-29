// icons 파일명 규칙(snake case) : 'ic_name.svg'
// ic_ 접두사 붙이기, 모두 소문자로, 확장자는 svg로 저장하기

// export는 index.ts 만들어서 한꺼번에
// export는 camel case로!!! (ic_logo -> IcLogo)

import IcLoginBtn from './ic_login_btn.svg';
import IcLogo from './ic_logo.svg';
import IcProfile from './ic_profile.svg';

export { IcLogo, IcProfile, IcLoginBtn };
