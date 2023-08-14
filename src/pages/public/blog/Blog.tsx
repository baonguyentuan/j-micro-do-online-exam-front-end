import React from "react";
import { Blog } from "../../../_core/Blog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configStore";
import CardBlog from "../../../components/Card/CardBlog";
import { selectAllBlogs } from "../../../redux/reducers/blog/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => selectAllBlogs(state));

  // Thay vì truyền blogs từ selector vào props, bạn có thể truyền trực tiếp BlogData vào
  // và sử dụng nó để render ra UI. Ví dụ:
  const blogData: Blog[] = [
    {
      id: "1",
      title: "Salesforce Certified Advanced Administrator – Sales Cloud Applications Part 11",
      description: "27. Sharing Forecasts You could potentially be asked on the exam about sharing forecasts and question if that’s even possible or not. So as a manager, as far as the forecast manager, I’m able to share forecasts, and from the forecast tab, you can click the Share button and this will open up the Share",
      createdAt: "05/23/2023"
    },
    {
      id: "2",
      title: "Salesforce Certified Advanced Administrator – Sales Cloud Applications Part 10",
      description: "24. Setting a Default Display Forecast Currency Collaborative forecasting supports multiple currencies. And so in order to demonstrate this, we need to enable multiple currencies in our organization. And you do that from company information. And this is something that you should have previously done or learned for the administrator certification.",
      createdAt: "05/23/2023"
    },
    {
      id: "3",
      title: "Salesforce Certified Advanced Administrator – Sales Cloud Applications Part 9",
      description: "22. Creating Forecast Types Just now dive more deeply into these forecast settings and just keeping in mind that these different forecast types are just different ways of slicing and dicing data represented in it to you as it relates to forecast. And that’s being able to look at what is projected to happen revenue",
      createdAt: "05/22/2023"
    },
    {
      id: "4",
      title: "Salesforce Certified Advanced Administrator – Sales Cloud Applications Part 8",
      description: "24. Setting a Default Display Forecast Currency Collaborative forecasting supports multiple currencies. And so in order to demonstrate this, we need to enable multiple currencies in our organization. And you do that from company information. And this is something that you should have previously done or learned for the administrator certification.",
      createdAt: "05/22/2023"
    },
    {
      id: "5",
      title: "Salesforce Certified Advanced Administrator – Sales Cloud Applications Part 7",
      description: "24. Setting a Default Display Forecast Currency Collaborative forecasting supports multiple currencies. And so in order to demonstrate this, we need to enable multiple currencies in our organization. And you do that from company information. And this is something that you should have previously done or learned for the administrator certification.",
      createdAt: "05/21/2023"
    },
    {
      id: "6",
      title: "Salesforce Certified Advanced Administrator – Sales Cloud Applications Part 6",
      description: "24. Setting a Default Display Forecast Currency Collaborative forecasting supports multiple currencies. And so in order to demonstrate this, we need to enable multiple currencies in our organization. And you do that from company information. And this is something that you should have previously done or learned for the administrator certification.",
      createdAt: "05/21/2023"
    }
  ];

  return (
    <div className='size__component'>
      {blogData.map((blog: Blog) => (
        <CardBlog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
