import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { UidInfo } from "../../types/users";
import http, { ResponseData } from "../../utils/http/http";

const UsersIndex = () => {
  const router = useRouter();
  const checkLogin = useCallback(async () => {
    let code = 401;
    try {
      const result = await http.get<ResponseData<UidInfo>>(`/session`);
      code = result.status;
      if (code === 200 && result.data.code === 2000) {
        const uid = result.data.data.uid;
        router.replace(`/users/${uid}`);
      }
    } catch (error) {
      code = error?.response?.status ?? 401;

      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return null;
};

export default UsersIndex;
