import { Component, ComponentProps, ComponentRef, ForwardedRef, FunctionComponent, Ref, useRef } from "react";

import { Input, InputRef } from "antd";

export default function EmailInput({inputRef}) {
  const input = useRef();
  return (
    <>
      <div className="absolute top-[357px] left-[20px]">
        Enter email address
      </div>
      <Input
        ref={inputRef}
        className="rounded-full gradient-border-hover gradient-border-focus focus:border-none bg-gray-100 border-gray-200 mb-3 top-[384px]"
        type="email"
        placeholder="john.doe@email.com"
        required
        autoFocus
      />
    </>
  );
};
