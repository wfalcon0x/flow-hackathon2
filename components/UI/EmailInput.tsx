import { FunctionComponent } from "react";

const EmailInput: FunctionComponent = () => {
  return (
    <>
      <div className="absolute top-[357px] left-[20px]">
        Enter email address
      </div>
      <input
        className="[border:none] font-medium font-outfit text-sm bg-whitesmoke-300 absolute top-[384px] left-[calc(50%_-_195px)] rounded-11xl w-[354px] h-12 overflow-hidden flex flex-col py-0 px-[23px] box-border items-start justify-center"
        type="email"
        placeholder="john.doe@email.com"
        required
        autoFocus
      />
    </>
  );
};

export default EmailInput;
