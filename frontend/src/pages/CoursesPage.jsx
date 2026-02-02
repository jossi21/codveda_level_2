import React, { useState, useEffect } from "react";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import StatusMessage from "../components/StatusMessage";

// API functions
import {
  getAllCourses as fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../api/coursesApi.js";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [courseEditing, setCourseEditing] = useState(null);

  async function loadCourses() {
    setLoading(true);
    const data = await fetchCourses();
    setCourses(data.data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    loadCourses();
  }, []);

  // Define AdditionHandler
  async function AdditionHandler(course) {
    // Frontend validation
    if (!course.course_code?.trim()) {
      setStatus("Error: Course code is required");
      return;
    }

    if (!course.course_name?.trim()) {
      setStatus("Error: Course name is required");
      return;
    }

    try {
      // Call API
      const response = await addCourse(course);

      // Check backend success flag
      if (!response.success) {
        setStatus(`Error: ${response.error || "Failed to add course"}`);
        return;
      }

      // Success
      setStatus("Course added successfully!");
      loadCourses();
    } catch (error) {
      console.error("Add course error:", error);
      setStatus(
        `Error: ${error.message || "Server error while adding course"}`,
      );
    }
  }

  // Define updateHandler
  async function updateHandler(courseCode, updatedData) {
    // Frontend validation
    if (!courseCode) {
      setStatus("Error: Course code is required for update");
      return;
    }

    if (!updatedData?.course_name?.trim()) {
      setStatus("Error: Course name is required to update");
      return;
    }

    try {
      // Call API
      const response = await updateCourse(courseCode, updatedData);

      // Backend validation
      if (!response?.success) {
        setStatus(`Error: ${response?.error || "Failed to update course"}`);
        return;
      }

      // Success
      setStatus("Course updated successfully!");
      setCourseEditing(null);
      loadCourses();
    } catch (error) {
      console.error("Update course error:", error);
      setStatus(
        `Error: ${error.message || "Server error while updating course"}`,
      );
    }
  }

  async function deleteHandler(courseCode) {
    try {
      await deleteCourse(courseCode);
      setStatus("Course deleted successfully!");
      loadCourses();
    } catch (error) {
      console.error("Delete course error:", error);
      setStatus(
        `Error: ${error.message || "Server error while deleting course"}`,
      );
    }
  }

  return (
    <div>
      <h1 className="text-5xl font-bold text-center md:text-3xl mb-10 ">
        Course Management System
      </h1>

      <CourseForm
        onAdd={AdditionHandler}
        onUpdate={updateHandler}
        onCancel={() => setCourseEditing(null)}
        editingCourse={courseEditing}
      />

      {/* StatusMessage will show success/error messages */}
      {status && (
        <StatusMessage
          message={status}
          type={status.includes("Error") ? "error" : "success"}
        />
      )}

      {loading ? (
        <p>Loading Courses...</p>
      ) : (
        <CourseList
          courses={courses}
          onEdit={setCourseEditing}
          onDelete={deleteHandler}
        />
      )}
    </div>
  );
};

export default CoursesPage;
