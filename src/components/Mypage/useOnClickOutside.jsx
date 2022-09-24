import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
    // 모달 영역을 벗어났는지 확인
    const isClickModalOutside = (e) => {
        if (!ref.current || !ref.current.contains(e.target)) {
            handler(e);

            return;
        }
    };

    // clean-up 필수
    useEffect(() => {
        document.addEventListener('mousedown', isClickModalOutside, true);

        return () => {
            document.removeEventListener('mousedown', isClickModalOutside, true);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;