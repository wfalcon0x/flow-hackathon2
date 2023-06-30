import { FunctionComponent } from "react";
import MainLayout from "../layouts/MainLayout";
import { Input, Space, Select } from 'antd';

const Trasfer: FunctionComponent = () => {
  return (
   <MainLayout>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-span-4 flex">
          <div className="w-100 m-auto grow mb-3">
              <label className="text-xs text-gray-900">You pay</label>
              <Input
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
              <Select className="min-w-full bg-gray-50 opacity-100 rounded-xl align-middle"
                bordered={false}
                >
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-span-4 flex">
          <div className="w-100 m-auto grow mb-3">
              <label className="text-xs text-gray-900">You get &asymp;</label>
              <Input
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
              <Select className="min-w-full bg-white opacity-100 rounded-xl align-middle"
                bordered={false}
                >
                
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="text-end">
        <span className='gradient-text'>Quote refresh in 5 secs</span>
      </div>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">

      </div>
   </MainLayout>
  );
};

export default Trasfer;
