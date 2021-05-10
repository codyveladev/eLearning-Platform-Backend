const fs = require("fs");

const courseData = require("./courses.json");

const { items } = courseData;

src = "https://www.youtube.com/embed/9sWEecNUW-o";

const formatted = [];

items.map((item) => {
  const { title, description, thumbnails, resourceId } = item.snippet;
  const test = {
    title,
    description,
    thumbnail: thumbnails.default.url,
    video_link: `https://www.youtube.com/embed/${resourceId.videoId}`,
  };

  formatted.push(test);
});

console.log(formatted);

formatted.forEach((course, index) => {
  if (index < formatted.length - 1) {
    course.instructor = "6092fd4fae272f37011cc421";
  } else {
    course.instructor = "6092fd7eae272f37011cc422";
  }
});

console.log(formatted);

// write file to disk
fs.writeFileSync("./formatted.json", JSON.stringify(formatted, null, 4), "utf8");
