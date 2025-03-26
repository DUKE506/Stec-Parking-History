import { Suspense } from "react";
import PatrolClientPage from "./patrolClientPage";

const PatrolPage = () => {
  return (
    // [NEW] Suspense 경계 추가
    <Suspense fallback={<div>로딩 중...</div>}>
      {/* [NEW] 실제 컨텐츠를 담은 별도의 컴포넌트 */}
      <PatrolClientPage />
    </Suspense>
  );
};

export default PatrolPage;
