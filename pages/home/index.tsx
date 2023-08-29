// /home으로 라우팅됨
// page 폴더는 최대한 깔끔하게 유지하기!(여기에서 스타일링 하지 말고 최대한 import만 하기)

// 초기 데이터 관련된 것 빼고는 containers에서 가져와서 넣기
import { HomeContainer } from '@/containers/Home';

const index = () => {
  return <HomeContainer />;
};

export default index;
