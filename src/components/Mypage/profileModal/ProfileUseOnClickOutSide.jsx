import { useEffect } from "react";

const useProfileOnClickOutside = (ref, handler) => {
    // 모달 영역을 벗어났는지 확인
    const isClickprofileModalOutside = (e) => {
        if (!ref.current || !ref.current.contains(e.target)) {
            handler(e);

            return;
        }
    };

    // clean-up 필수
    useEffect(() => {
        document.addEventListener('mousedown', isClickprofileModalOutside, true);

        return () => {
            document.removeEventListener('mousedown', isClickprofileModalOutside, true);
        };
    }, [ref, handler]);
};

export default useProfileOnClickOutside;