import React from "react";
import CourseItem from "./CourseItem";

const CourseList = ({ courses, onEdit, onDelete }) => {
  if (courses.length === 0) {
    return <p>No Courses found</p>;
  }
  return courses.map((course) => (
    <CourseItem
      key={course.course_code}
      course={course}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));
};

export default CourseList;
