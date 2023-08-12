import { Button, Modal, Table } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Constants from "../../../constants/Constants";
interface IProps {
  flag: boolean;

  data?: any;

  callback: () => void;
}

const ExamModalResult = ({ flag, data, callback }: IProps) => {
  console.log(data)
  const [open, setOpen] = useState(true);
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    callback();
  };
  const dataGet = [
    {
      key: "1",
      name: "Exam name",
      value: "HTML quiz with W3School"
    },
    {
      key: "2",
      name: "Participant",
      value: "nguyen cao hieu"
    },
    {
      key: "3",
      name: "CreatedAt",
      value: "2023/07/10"
    }, {
      key: "4",
      name: "Total Questions",
      value: "30"
    }, {
      key: "5",
      name: "Correct Answer",
      value: "30"
    }, {
      key: "6",
      name: "Incorrect Answer",
      value: "30"
    }
  ];

  const formatData = () => {
    console.log(data);
    
    let newData = [];
    let totalQuest = 0;
    for (const [key, value] of Object.entries(data)) {
      if (key === "contestName") {
        // @ts-ignore
        if (value.length !== 0) {
          newData.push({
            key: 1,
            name: "Contest name",
            value: value
          });
        } else {
          newData.push({
            key: 1,
            name: "Exam name",
            value: data["exam"]
          });
        }
      }
      if (key === "userName") {
        newData.push({
          key: 2,
          name: "Participant",
          value: data["userName"]
        });
      }
      if (key === "incorrectAnswers") {
        // @ts-ignore
        totalQuest += value;
        newData.push({
          key: 6,
          name: "Incorrect Answer",
          value: value
        });
      }
      if (key === "correctAnswers") {
        // @ts-ignore
        totalQuest += value;
        newData.push({
          key: 5,
          name: "Correct Answer",
          value: value
        });
      }
      if (key === "createdAt") {
        newData.push({
          key: 3,
          name: "CreatedAt",
          value: dayjs(String(value)).format(Constants.formatFullDate)
        });
      }
    }

    newData.push({
      key: 4,
      name: "Total Questions",
      value: totalQuest
    });

    return newData;
  };


  const columns: ColumnsType<any> = [
    {
      dataIndex: "name",
      render: (record) => <p className="italic font-normal">{record}</p>
    },
    {
      dataIndex: "value",
      render: (record) => <p className="font-medium text-right">{record}</p>
    }
  ];

  return (<>
    <Button type="primary" onClick={showModal}>
      Modal
    </Button>
    <Modal
      title={<p className="underline underline-offset-4 decoration-pink-500">Exam result</p>}
      open={open}
      onOk={hideModal}
      onCancel={hideModal}
      footer={null}
      maskClosable={false}
    >
      <div className="mt-8 pb-8">
        <Table
          dataSource={formatData()}
          bordered
          footer={() => <div className="flex justify-between font-medium">
            <span>Total point:</span> <span>{data?.point.toFixed(2)}</span></div>}
          columns={columns}
          pagination={false}
        />
      </div>
    </Modal>
  </>);
};

export default ExamModalResult;