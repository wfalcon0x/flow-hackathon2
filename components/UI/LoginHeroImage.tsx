import { FunctionComponent } from "react";

const LoginHeroImage: FunctionComponent = () => {
  return (
    <div className="absolute top-[0px] left-[0px] rounded-t-none rounded-2xl [background:linear-gradient(180deg,_#0a0032,_#131e5d_61.12%,_#74447e)] w-full h-[285px] overflow-hidden text-center text-base text-white font-outfit rounded-t-xl">
      <img
        className="absolute h-[38.24%] w-[54.09%] top-[73.68%] right-[-4.09%] bottom-[-11.93%] left-[50%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/hero-mount3.svg"
      />
      <img
        className="absolute top-[34.51px] left-[344.52px] w-[22.97px] h-[22.97px]"
        alt=""
        src="/vector.svg"
      />
      <div className="absolute top-[139px] left-[calc(50%_-_126px)] font-semibold inline-block w-[253px]">
        <p className="m-0">{`Login to PayGlide for the `}</p>
        <p className="m-0">best offramp experience onFLOW</p>
      </div>
      <img
        className="absolute top-[77px] left-[calc(50%_-_98px)] w-[197px] h-[36.8px] overflow-hidden"
        alt=""
        src="/logo-light.svg"
      />
      <img
        className="absolute h-[40.56%] w-[57.36%] top-[71.23%] right-[41.88%] bottom-[-11.78%] left-[0.76%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/hero-mount1.svg"
      />
      <img
        className="absolute h-[17.89%] w-[44.16%] top-[82.11%] right-[30.2%] bottom-[0%] left-[25.63%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/hero-mount2.svg"
      />
    </div>
  );
};

export default LoginHeroImage;
