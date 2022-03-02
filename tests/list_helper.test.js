const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
const listWithSeveralBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("of a bigger list is caluclated right", () => {
    const result = listHelper.totalLikes(listWithSeveralBlogs);
    expect(result).toBe(36);
  });
});
describe("favoriteBlog", () => {
  test("of empty list is minus one", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(-1);
  });
  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });
  test("of a bigger list returns right blog", () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs);
    expect(result).toEqual(listWithSeveralBlogs[2]);
  });
});
describe("mostBlogs", () => {
  let mAuthor = {
    author: "Robert C. Martin",
    blogs: 3,
  };
  test("of empty list is minus one", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(-1);
  });
  test("when list has only one blog, equals the author of that", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const blogEl = listWithOneBlog[0];
    const expectedAuthor = {
      author: blogEl.author,
      blogs: 1,
    };
    expect(result).toEqual(expectedAuthor);
  });
  test("of a bigger list returns right author", () => {
    const result = listHelper.mostBlogs(listWithSeveralBlogs);
    expect(result).toEqual(mAuthor);
  });
});
describe("mostLikes", () => {
  let mLikes = {
    author: "Edsger W. Dijkstra",
    likes: 17,
  };
  test("of empty list is minus one", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(-1);
  });
  test("when list has only one blog, equals the author of that", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const blogEl = listWithOneBlog[0];
    const expectedAuthor = {
      author: blogEl.author,
      likes: blogEl.likes,
    };
    expect(result).toEqual(expectedAuthor);
  });
  test("of a bigger list returns right author", () => {
    const result = listHelper.mostLikes(listWithSeveralBlogs);
    expect(result).toEqual(mLikes);
  });
});
