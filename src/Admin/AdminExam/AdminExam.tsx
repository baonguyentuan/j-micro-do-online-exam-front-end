import React, { useEffect, useState } from "react";
import Constants from "../../constants/Constants";
import { useTranslation } from "react-i18next";
import type { ColumnsType } from "antd/es/table";
import {
  deleteExamApi,
  getExamDetailShow,
  getFullExamDetail,
  getFullExamDetailApi,
  getListExam
} from "../../redux/reducers/exam";

import dayjs from "dayjs";
import AppConfigs from "../../config/AppConfigs";
import { ExamCardInfoModel } from "../../_core/exam";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { DispatchType, RootState } from "../../redux/configStore";
import { setDrawerInfo } from "../../redux/reducers/drawer/drawerSlice";
import { setOptionSidebarAdmin } from "../../redux/reducers/menu/menuSlice";
import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";


const AdminExam = () => {
  let { t } = useTranslation("admin");
  const dispatch: DispatchType = useDispatch();
  let [nameFilter, setNameFilter] = useState<boolean>(true);
  let [createAtFilter, setCreateAtFilter] = useState<boolean>(true);
  let [durationFilter, setDurationFilter] = useState<boolean>(true);
  const { userInfo } = useSelector((state: RootState) => state.userSlice);
  const { examsByCategory } = useSelector((state: RootState) => state.examSlice);
  const [searchExams, setSearchExams] = useState({
    name: "",
    category_ids: Constants.EmptyString,
    durations: Constants.EmptyString,
    from_date: Constants.EmptyString,
    to_date: Constants.EmptyString,
    page_index: 1,
    page_size: 10,
    order_by: -1
  });

  const columns: ColumnsType<ExamCardInfoModel> = [
    {
      title: t("thumbnail"),
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "10%",
      render: (text, record) => {
        return <img width={50} height={50} src={record.image} alt={record.examName} />;
      }
    },
    {
      title: <div className="flex justify-between items-center">
        <div>{t("name")}</div>
        <div>
          <Button type="link" className={`${nameFilter ? "hidden" : ""}`} onClick={async () => {
            await setNameFilter(!nameFilter);
            setSearchExams({ ...searchExams, order_by: 1, page_index: 1 });
          }}><CaretUpOutlined className="text-base -translate-y-1 " /></Button>
          <Button type="link" className={`${!nameFilter ? "hidden" : ""}`} onClick={async () => {
            await setNameFilter(!nameFilter);
            setSearchExams({ ...searchExams, order_by: 2, page_index: 1 });
          }}><CaretDownOutlined className="text-base -translate-y-1 " /></Button>
        </div>
      </div>,
      dataIndex: "examName",
      key: "examName",
      width: "20%",
      render: (text) => <p>{text}</p>
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "10%"
    },
    {
      title: "Exam type",
      dataIndex: "examType",
      key: "examType",
      width: "10%"
    },
    {
      title: <div className="flex justify-between items-center">
        <div>Duration (min)</div>
        <div>
          <Button type="link" className={`${durationFilter ? "hidden" : ""}`} onClick={async () => {
            await setDurationFilter(!durationFilter);
            setSearchExams({ ...searchExams, order_by: 3, page_index: 1 });
          }}><CaretUpOutlined className="text-base -translate-y-1 " /></Button>
          <Button type="link" className={`${!durationFilter ? "hidden" : ""}`} onClick={async () => {
            await setDurationFilter(!durationFilter);
            setSearchExams({ ...searchExams, order_by: 4, page_index: 1 });
          }}><CaretDownOutlined className="text-base -translate-y-1 " /></Button>
        </div>
      </div>,
      dataIndex: "duration",
      key: "duration",
      width: "10%"
    },
    {
      title: "Rating",
      dataIndex: "totalRating",
      key: "totalRating",
      width: "10%"
    },
    {
      title: "Downloaded",
      dataIndex: "downloadNumber",
      key: "downloadNumber",
      width: "10%"
    },
    {
      title: <div className="flex justify-between items-center">
        <div>{t("create at")}</div>
        <div>
          <Button type="link" className={`${createAtFilter ? "hidden" : ""}`} onClick={async () => {
            await setCreateAtFilter(!createAtFilter);
            setSearchExams({ ...searchExams, order_by: 5, page_index: 1 });
          }}><CaretUpOutlined className="text-base -translate-y-1 " /></Button>
          <Button type="link" className={`${!createAtFilter ? "hidden" : ""}`} onClick={async () => {
            await setCreateAtFilter(!createAtFilter);
            setSearchExams({ ...searchExams, order_by: 6, page_index: 1 });
          }}><CaretDownOutlined className="text-base -translate-y-1 " /></Button>
        </div>
      </div>,
      dataIndex: "createAt",
      key: "createAt",
      render: (text) => {
        return <p>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</p>;
      }
    },
    {
      title: t("action"),
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Button className="btn_view" onClick={async () => {
            await dispatch(getExamDetailShow({ name: record.examName }));
            await dispatch(getFullExamDetailApi(record.id));
            await dispatch(setDrawerInfo({
              typeContent: Constants.typeDrawer.VIEW_EXAM,
              sizeDrawer: Constants.sizeDrawer.LARGE
            }));
          }}><EyeOutlined className="text-base -translate-y-1 " /></Button>
          <Button disabled={record.examType === "PRIVATE"} className="btn_edit" onClick={async () => {
            await dispatch(getExamDetailShow({ name: record.examName }));
            await dispatch(getFullExamDetailApi(record.id));
            await dispatch(setDrawerInfo({
              typeContent: Constants.typeDrawer.EDIT_EXAM,
              sizeDrawer: Constants.sizeDrawer.LARGE
            }));
          }}><EditOutlined className="text-base -translate-y-1 " /></Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={async () => {
              await dispatch(deleteExamApi(record.id));
            }}
            okType="danger"
            okText="Yes"
            cancelText="No">
            <Button className="btn_delete" disabled={record.examType === "PRIVATE"}><DeleteOutlined
              className="text-base -translate-y-1 " /></Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  useEffect(() => {
    dispatch(getListExam(searchExams));
    dispatch(setOptionSidebarAdmin({ option: Constants.optionMenuAdmin.EXAM }));
  }, [searchExams]);

  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Exam management</h1>
      <div className="my-4 flex justify-between items-center">
        <Button onClick={async () => {
          await dispatch(getFullExamDetail({
            examDetail: {
              id: -1,
              title: "",
              categoryId: null,
              examType: userInfo?.roles.find(roleItem => roleItem === "ADMIN") === "ADMIN" ? "FREE" : "PRIVATE",
              description: "",
              duration: AppConfigs.exam.MIN_DURATION_EXAM,
              question: [
                {
                  "id": 1,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": ["access", "afford", "brochure", "casual"],
                  "questionType": "SINGLE",
                  "correctAnswers": [0],
                  "questionPoint": 1
                },
                {
                  "id": 2,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": [
                    "behaviour",
                    "determined",
                    "counselor",
                    "decisive"
                  ],
                  "questionType": "SINGLE",
                  "correctAnswers": [0],
                  "questionPoint": 1
                },
                {
                  "id": 3,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": [
                    "donate",
                    "compare",
                    "campaign",
                    "flashy"
                  ],
                  "questionType": "MULTI",
                  "correctAnswers": [0, 3],
                  "questionPoint": 1
                },
                {
                  "id": 4,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": ["access", "afford", "brochure", "casual"],
                  "questionType": "SINGLE",
                  "correctAnswers": [0],
                  "questionPoint": 1
                },
                {
                  "id": 5,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": [
                    "behaviour",
                    "determined",
                    "counselor",
                    "decisive"
                  ],
                  "questionType": "SINGLE",
                  "correctAnswers": [0],
                  "questionPoint": 1
                },
                {
                  "id": 6,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": [
                    "donate",
                    "compare",
                    "campaign",
                    "flashy"
                  ],
                  "questionType": "MULTI",
                  "correctAnswers": [0, 3],
                  "questionPoint": 1
                },
                {
                  "id": 7,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": ["access", "afford", "brochure", "casual"],
                  "questionType": "SINGLE",
                  "correctAnswers": [0],
                  "questionPoint": 1
                },
                {
                  "id": 8,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": [
                    "behaviour",
                    "determined",
                    "counselor",
                    "decisive"
                  ],
                  "questionType": "SINGLE",
                  "correctAnswers": [0],
                  "questionPoint": 1
                },
                {
                  "id": 9,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": [
                    "donate",
                    "compare",
                    "campaign",
                    "flashy"
                  ],
                  "questionType": "MULTI",
                  "correctAnswers": [0, 3],
                  "questionPoint": 1
                },
                {
                  "id": 10,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": ["access", "afford", "brochure", "casual"],
                  "questionType": "SINGLE",
                  "correctAnswers": [0],
                  "questionPoint": 1
                },
                {
                  "id": 11,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": [
                    "behaviour",
                    "determined",
                    "counselor",
                    "decisive"
                  ],
                  "questionType": "SINGLE",
                  "correctAnswers": [0],
                  "questionPoint": 1
                },
                {
                  "id": 12,
                  "question": "Choose the word which is stressed differently from the rest.",
                  "answers": [
                    "donate",
                    "compare",
                    "campaign",
                    "flashy"
                  ],
                  "questionType": "MULTI",
                  "correctAnswers": [0, 3],
                  "questionPoint": 1
                }
              ],
              file: null
            }
          }));
          await dispatch(setDrawerInfo({
            typeContent: Constants.typeDrawer.CREAT_EXAM,
            sizeDrawer: Constants.sizeDrawer.LARGE
          }));
        }}>Create Exam</Button>
        <Input
          placeholder={t("search")}
          size="large"
          onChange={(event) => {
            setTimeout(() => {
              setSearchExams({ ...searchExams, name: event.target.value, page_index: 1 });
            }, 1000);
          }} style={{ maxWidth: 400 }} className="mx-4" />
        <p className="mx-4 font-bold text-blue-600 text-base">
          <span>{t("total")}: </span><span>{examsByCategory?.pagination.totals}</span></p>
      </div>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={examsByCategory?.data}
        pagination={{
          total: examsByCategory?.pagination.totals,
          current: examsByCategory?.pagination.index,
          onChange: (page) => {
            setSearchExams({ ...searchExams, page_index: page });
          }
        }}
      />
    </div>
  );
};

export default AdminExam;