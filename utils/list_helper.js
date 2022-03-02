const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  if (blogs.length === 0) {
    return 0;
  }
  return blogs.reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return -1;
  }
  let maxVal = blogs[0].likes;
  let maxIndex = 0;
  for (var i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > maxVal) {
      maxIndex = i;
      maxVal = blogs[i].likes;
    }
  }
  return blogs[maxIndex];
};
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return -1;
  }
  let hMap = new Map();
  blogs.forEach((blog) => {
    if (hMap.has(blog.author)) {
      let tempValue = hMap.get(blog.author);
      tempValue += 1;
      hMap.set(blog.author, (tempValue));
    } else {
      hMap.set(blog.author, 1);
    }
  });
  let mAuthor;
  let mBlogs = 0;
  for (let [key, value] of hMap) {
    if (mBlogs < value) {
      mAuthor = key;
      mBlogs = value;
    }
  }
  return {
    author: mAuthor,
    blogs: mBlogs,
  };
};
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return -1;
  }
  let hMap = new Map();
  blogs.forEach((blog) => {
    if (hMap.has(blog.author)) {
      let tempValue = hMap.get(blog.author);
      hMap.set(blog.author, (tempValue + blog.likes));
    } else {
      hMap.set(blog.author, blog.likes);
    }
  });
  let mAuthor;
  let mLikes = 0;
  for (let [key, value] of hMap) {
    if (mLikes < value) {
      mAuthor = key;
      mLikes = value;
    }
  }
  return {
    author: mAuthor,
    likes: mLikes,
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
