import { FunctionComponent } from "react";

import { Input } from "antd";

const EmailInput: FunctionComponent = () => {
  return (
    <>
      <div className="absolute top-[357px] left-[20px]">
        Enter email address
      </div>
      <Input
        className="rounded-full bg-gray-100 gradient-border mb-3 top-[384px]"
        type="email"
        placeholder="john.doe@email.com"
        required
        autoFocus
      />
    </>
  );
};

export default EmailInput;
