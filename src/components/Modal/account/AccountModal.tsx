import { Button, Modal } from "antd";
import styled from "styled-components";
import { CheckOutlined } from "@ant-design/icons";
import { DispatchType, RootState } from "../../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { GlobalAccountModalActionType, triggerGlobalAccountModal } from "../../../redux/reducers/global-slice";
import Constants from "../../../constants/Constants";
import { createPaymentAPI } from "../../../redux/reducers/payment";

const data = [
  {
    id: 1,
    type: "FREE",
    price: "0 VND",
    desc: "The essentials for you when you are just getting started.",
    feature: [
      "5 Exams", "3 Contests", "All free courses", "Download supported"
    ]
  },
  {
    id: 2,
    type: "MONTHLY",
    price: `${Constants.pricePremium.MONTHLY.toLocaleString()} VND/month`,
    desc: "For small team looking for self training efficiency and time savings",
    feature: [
      "Up to 100 exams per month", "Up to 50 contests per month", "24-hour chat support"
    ]
  },
  {
    id: 3,
    type: "YEARLY",
    price: `${Constants.pricePremium.YEARLY.toLocaleString()} VND/years`,
    desc: "For businesses looking for the maximum competitive edge and expanding their reach.",
    feature: [
      "Unlimited exams", "Unlimited contests", "1-hours, dedicated support response time."
    ]
  }
];

const AccountModal = () => {
  const dispatch: DispatchType = useDispatch();
  const { globalAccountModalOpen } = useSelector((state: RootState) => state.globalSlice);

  const hideModal = () => {
    dispatch(triggerGlobalAccountModal({ type: GlobalAccountModalActionType.CLOSE }));
  };

  return (
    <>
      <Modal
        title={<p className="text-xl">Pricing</p>}
        open={globalAccountModalOpen}
        width={1000}
        onOk={hideModal}
        onCancel={hideModal}
        footer={null}
      >
        <AccountModalWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {
            data.map(item => {
              return <AccountType key={item.id} {...item} />;
            })
          }
        </AccountModalWrapper>
      </Modal>
    </>
  );
};

type AccountTypeProps = {
  type: string,

  id: number,

  price: string,

  desc: string,

  feature: string[]
}

const AccountModalWrapper = styled.div`
  padding-bottom: 4rem;
`;

const AccountType = (props: AccountTypeProps) => {
  let dispatch: DispatchType = useDispatch()
  const { id, type, feature, price, desc } = props;
  const renderButton = () => {
    if (type === "FREE") {
      return <Button size="large" disabled className="mt-auto text-base "><CheckOutlined className="-translate-y-2 text-2xl text-green-400" /></Button>
    } else {
      return <Button size="large" className="mt-auto text-base" onClick={() => {
        let result
        if (type === "MONTHLY") {
          result = dispatch(createPaymentAPI(Constants.pricePremium.MONTHLY))
        } else {
          result = dispatch(createPaymentAPI(Constants.pricePremium.YEARLY))
        }

      }}>Choose</Button>
    }
  }
  return (
    <div className={`flex flex-col p-5   rounded-md ${type === "FREE" ? 'border-4 border-green-400' : 'border-2 border-slate-300'}`}>
      <div>
        <h3 className="font-semibold text-lg mb-3">{type}</h3>
        <p className="account__type_font font-semibold text-2xl mb-4">{price}</p>
        <p className="text-gray-400 italic" style={{ minHeight: "5rem" }}>{desc}</p>
        <ul className="flex flex-col gap-3 mb-6">
          {
            feature.map((item, index) => {
              return <p className="flex items-center gap-4" key={index}>
                <CheckOutlined className="text-green-600" />
                <span className="font-medium text-base">{item}</span>
              </p>;
            })
          }
        </ul>
      </div>
      {renderButton()}
    </div>
  );
};

export default AccountModal;