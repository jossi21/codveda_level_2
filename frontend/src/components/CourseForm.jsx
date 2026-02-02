import React, { useState, useEffect } from "react";

const CourseForm = ({ onAdd, onUpdate, editingCourse, onCancel }) => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    if (editingCourse) {
      setCourseCode(editingCourse.course_code);
      setCourseName(editingCourse.course_name);
    } else {
      resetForm();
    }
  }, [editingCourse]);

  const resetForm = () => {
    setCourseCode("");
    setCourseName("");
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) {
      onCancel();
    }
  };

  const courseHandler = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!courseCode.trim() || !courseName.trim()) {
      return;
    }

    if (editingCourse) {
      onUpdate(courseCode, { course_name: courseName });
    } else {
      onAdd({ course_code: courseCode, course_name: courseName });
    }

    resetForm();
  };

  return (
    <div className="p-4 w-115 mx-auto">
      <form
        className="flex flex-col gap-4 outline-none"
        onSubmit={courseHandler}
      >
        <input
          type="text"
          placeholder="Enter Course code"
          readOnly={!!editingCourse}
          className="p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-300 border-2 border-gray-200"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Course name"
          className="p-2 rounded-md border-2 border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-300"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 font-bold"
        >
          {editingCourse ? "Update Course" : "Add Course"}
        </button>

        {editingCourse && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 font-bold"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CourseForm;
