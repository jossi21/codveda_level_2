import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

const CourseItem = ({ course, onEdit, onDelete }) => {
  return (
    <div className="w-190 mx-auto">
      <div className="flex justify-between bg-blue-50 items-center gap-5  p-3 rounded mb-2">
        {/* Course info */}
        <div className="flex  font-bold">
          <p className="w-20">{course.course_id}</p>
          <p className="w-50">{course.course_code}</p>
          <p className="w-90">{course.course_name}</p>
        </div>

        {/* Action icons */}
        <div className="flex gap-8 text-xl">
          {/* EDIT */}
          <FaPen
            className="text-blue-500 cursor-pointer hover:scale-110 transition"
            title="Edit"
            onClick={() => onEdit(course)}
          />

          {/* DELETE */}
          <FaTrash
            className="text-red-500 cursor-pointer hover:scale-110 transition"
            title="Delete"
            onClick={() => onDelete(course.course_code)}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
