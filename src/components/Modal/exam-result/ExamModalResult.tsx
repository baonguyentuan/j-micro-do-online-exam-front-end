import { Button, Modal } from "antd";
import { useState } from "react";

interface IProps {
  flag: boolean;

  data?: any;
}

const ExamModalResult = ({ flag, data }: IProps) => {
  const [open, setOpen] = useState(true);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  return (<>
    <Button type="primary" onClick={showModal}>
      Modal
    </Button>
    <Modal
      title="Exam result"
      open={open}
      onOk={hideModal}
      onCancel={hideModal}
      footer={null}
    >
      <div>


      </div>
    </Modal>
  </>);
};

export default ExamModalResult;