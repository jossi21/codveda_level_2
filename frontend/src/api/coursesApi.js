// define the backend url
const API_BASE_URL = "http://localhost:1616";

// get all courses
export async function getAllCourses() {
  const res = await fetch(`${API_BASE_URL}/api/courses`);
  return res.json();
}

// get single courses
export async function getOneCourse(CourseCode) {
  const res = await fetch(`${API_BASE_URL}/api/courses/${CourseCode}`);
  return res.json();
}

// add courses
export async function addCourse(course) {
  const res = await fetch(`${API_BASE_URL}/api/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  return res.json();
}

// Update Course
export async function updateCourse(courseCode, CourseData) {
  const res = await fetch(`${API_BASE_URL}/api/courses/${courseCode}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CourseData),
  });

  return await res.json();
}

// Delete Course
export async function deleteCourse(courseCode) {
  const res = await fetch(`${API_BASE_URL}/api/courses/${courseCode}`, {
    method: "DELETE",
  });
  return res.json();
}
