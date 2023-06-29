import { FunctionComponent } from "react";

const OffRamp: FunctionComponent = () => {
  return (
    <div className="relative rounded-[60px] bg-purple shadow-[0px_4px_80px_rgba(63,_63,_63,_0.6)] w-full h-[1024px] text-left text-xs text-slategray font-outfit">
      <div className="absolute top-[191px] left-[calc(50%_-_215px)] rounded-21xl bg-white box-border w-[430px] h-[642px] overflow-hidden border-[18px] border-solid border-gray-200">
        <div className="absolute bottom-[56px] left-[20px] rounded-[31.36px] bg-gray-100 w-[354px] h-12 flex flex-col items-center justify-center text-center text-base text-white">
          <b className="relative">SELL NOW</b>
        </div>
        <div className="absolute top-[122px] left-[20px] rounded-xl bg-whitesmoke-100 w-[354px] h-[69px] overflow-hidden flex flex-row pt-2 px-3.5 pb-[17px] box-border items-end justify-end gap-[195px]">
          <div className="flex flex-col items-start justify-start gap-[7px]">
            <div className="relative">You pay</div>
            <div className="relative text-lg font-medium font-neue-montreal text-black">
              1000
            </div>
          </div>
          <div className="rounded-6xl bg-white box-border w-[89px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center text-base text-black border-[1px] border-solid border-whitesmoke-200">
            <div className="flex flex-row items-center justify-center gap-[6px]">
              <img
                className="relative w-[13px] h-[13px] object-cover"
                alt=""
                src="/image-139@2x.png"
              />
              <div className="relative font-medium">Flow</div>
              <img
                className="relative w-[7.19px] h-[5.34px]"
                alt=""
                src="/evaarrowupfill2.svg"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-[203px] left-[calc(50%_-_195px)] rounded-xl bg-whitesmoke-100 w-[354px] h-[69px] overflow-hidden flex flex-row pt-2 px-3.5 pb-[17px] box-border items-end justify-end gap-[186px]">
          <div className="flex flex-col items-start justify-start gap-[7px]">
            <div className="flex flex-row items-start justify-start gap-[4px]">
              <div className="relative">{`You get `}</div>
              <div className="relative font-neue-montreal">≈</div>
            </div>
            <div className="relative text-lg font-medium font-neue-montreal text-black">
              500
            </div>
          </div>
          <div className="rounded-6xl bg-white box-border w-[89px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center text-base text-black border-[1px] border-solid border-whitesmoke-200">
            <div className="flex flex-row items-center justify-center gap-[6px]">
              <img
                className="relative w-[13px] h-[13px] overflow-hidden shrink-0"
                alt=""
                src="/circleflagsuk.svg"
              />
              <div className="relative font-medium">GBP</div>
              <img
                className="relative w-[7.19px] h-[5.34px]"
                alt=""
                src="/evaarrowupfill2.svg"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-[318px] left-[calc(50%_-_195px)] rounded-xl bg-whitesmoke-100 w-[354px] h-[152px] overflow-hidden">
          <div className="absolute top-[8px] left-[14px] flex flex-col items-start justify-start gap-[7px]">
            <div className="relative">Summary</div>
            <div className="relative text-lg font-medium font-neue-montreal text-black">{`1,000.00 FLOW @ £0.50 `}</div>
          </div>
          <div className="absolute top-[12px] left-[289px] flex flex-row items-center justify-center gap-[6px]">
            <div className="relative font-medium">Hide</div>
            <img
              className="relative w-[7.19px] h-[5.34px]"
              alt=""
              src="/evaarrowupfill21.svg"
            />
          </div>
          <div className="absolute top-[78px] left-[14px] w-[335px] flex flex-col items-start justify-start gap-[16px] text-darkgray">
            <div className="flex flex-row items-center justify-center gap-[215px]">
              <div className="relative">Network Fee</div>
              <div className="relative font-neue-montreal text-slategray">
                £ 1.25
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-[200px]">
              <div className="relative">Processing Fee</div>
              <div className="relative font-neue-montreal text-slategray">
                £ 0.35
              </div>
            </div>
            <div className="w-[335px] h-[9px] flex flex-row items-center justify-center gap-[150px]">
              <div className="relative">{`Withdrawal Method   `}</div>
              <div className="relative font-neue-montreal text-slategray">
                Visa Direct
              </div>
            </div>
          </div>
          <div className="absolute top-[37px] left-[264px] text-base font-neue-montreal">
            £ 500.00
          </div>
          <div className="absolute top-[62px] left-[13px] box-border w-[315px] h-0.5 border-t-[2px] border-dashed border-gainsboro" />
        </div>
        <div className="absolute top-[296px] left-[249px] flex flex-row items-center justify-center gap-[4px] text-right text-[10px] font-neue-montreal">
          <img
            className="relative w-[11px] h-[11px] overflow-hidden shrink-0"
            alt=""
            src="/phclock.svg"
          />
          <div className="relative font-medium [background:linear-gradient(90.19deg,_#eb98fd,_#6ab7ff)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Quote refreshes in 5 secs
          </div>
        </div>
        <div className="absolute top-[0px] left-[0px] rounded-t-none rounded-b-21xl [background:linear-gradient(90.25deg,_#eb98fd,_#6ab7ff)] w-[394px] h-[92px] overflow-hidden flex flex-col items-center justify-center text-[20px] text-white">
          <div className="flex flex-row items-center justify-start gap-[223px]">
            <b className="relative">Sell Crypto</b>
            <div className="flex flex-col items-start justify-start gap-[2px]">
              <div className="relative rounded-lg bg-white w-[30px] h-1.5" />
              <div className="relative rounded-lg bg-white w-[30px] h-1.5" />
              <div className="relative rounded-lg bg-white w-[30px] h-1.5" />
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute top-[50px] left-[61px] w-[250px] h-[46.7px] overflow-hidden"
        alt=""
        src="/logod1b2d0be9008cb67f6e5811644e165e2-1.svg"
      />
      <img
        className="absolute bottom-[-1px] left-[calc(50%_-_720px)] w-[1440px] h-[297.93px]"
        alt=""
        src="/vector.svg"
      />
    </div>
  );
};

export default OffRamp;
