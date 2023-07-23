let User = require("../Models/user.model");
let Category = require("../Models/categories.model");
let Store = require("../Models/stores.model");
let Coupon = require("../Models/coupon.model");
let Blog = require("../Models/blog.model");
let Banner = require("../Models/banner.model");
let postImgs = require("../Models/postImages.model");
let Product = require("../Models/product.model");
let BlogItem = require("../Models/blogItems.model");
let gridProduct = require("../Models/gridProduct.model");
let Review = require("../Models/review.model");
let Settings = require("../Models/settings.model");
let Slider = require("../Models/slide.model");
let userEmails = require("../Models/userEmails.model");
let resHandler = require("../utils/responseHandler");

module.exports = {
  fetchSlides: fetchSlides,
  fetchTopStores: fetchTopStores,
  fetchTopBlogs: fetchTopBlogs,
  fetchTopDeals: fetchTopDeals,
  fetchCoupons: fetchCoupons,
  singleStoreData: singleStoreData,
  fetchStores: fetchStores,
  fetchStoresDropDown: fetchStoresDropDown,
  fetchStoreProducts: fetchStoreProducts,
  fetchBanners: fetchBanners,
  fetchPostImages: fetchPostImages,
  fetchRandomStores: fetchRandomStores,
  fetchRandomBlogs:fetchRandomBlogs,
  fetchCategories: fetchCategories,
  featuredProducts: featuredProducts,
  trendingProducts: trendingProducts,
  fetchProductsByCategory: fetchProductsByCategory,
  singleProduct: singleProduct,
  fetchRandomProducts: fetchRandomProducts,
  fetchBlogItems: fetchBlogItems,
  searchQuery: searchQuery,
  fetchBlogsWithLimit: fetchBlogsWithLimit,
  fetchSingleBlog: fetchSingleBlog,
  increaseBlogViews: increaseBlogViews,
  increaseProductClicks: increaseProductClicks,
  storesForSiteMap: storesForSiteMap,
  blogsForSiteMap: blogsForSiteMap,
  fetchSettingsData: fetchSettingsData,
  fetchEventName: fetchEventName,
  fetchStoreURLOnly: fetchStoreURLOnly,
  fetchReviews: fetchReviews,
  addEmailToDB: addEmailToDB,
  submitReview: submitReview,
  fetchFeaturedCategories: fetchFeaturedCategories,
  fetchFeaturedCoupons: fetchFeaturedCoupons,
  fetchForBlogCategories: fetchForBlogCategories,
};

function fetchSlides(req, res) {
  Slider.find({}, function (err, slides) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!slides)
      res.json(
        resHandler.respondError("Unable to fetch slides at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(slides, "Slides fetched successfully", 2)
      );
  });
}

function fetchTopStores(req, res) {
  Store.find({ editorChoice: true }, "img storeURL name trackUrl shortDes")
    .limit(Number(req.query.limitNo))
    .exec(function (err, stores) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (stores.length)
          res.json(
            resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
          );
        else
          res.json(
            resHandler.respondError("Unable to fetch Stores at the moment", -3)
          );
      }
    });
}
function storesForSiteMap(req, res) {
  Store.find({}, "name storeURL").exec(function (err, stores) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else {
      if (stores.length)
        res.json(
          resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
        );
      else
        res.json(
          resHandler.respondError("Unable to fetch Stores at the moment", -3)
        );
    }
  });
}
function fetchTopBlogs(req, res) {
  Blog.find(
    { featuredForHome: true },
    "title img blogURL shortDes author CreatedAt"
  )
    .sort({ CreatedAt: -1 })
    .limit(Number(req.query.limitNo))
    .exec(function (err, blogs) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (blogs.length)
          res.json(
            resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2)
          );
        else
          res.json(
            resHandler.respondError("Unable to fetch Blogs at the moment", -3)
          );
      }
    });
}

function fetchTopDeals(req, res) {
  var today = new Date();
  Coupon.find({ expDate: { $gte: today }, forEvent: true })
    .sort({ CreatedAt: -1 })
    .populate("storeId", "img")
    // limit(8).
    .exec(function (err, deals) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (deals)
          res.json(
            resHandler.respondSuccess(deals, "Deals fetched successfully", 2)
          );
        else
          res.json(
            resHandler.respondError("Can't fetch deals at the moment", -3)
          );
      }
    });
}
function fetchBanners(req, res) {
  Banner.find({ storeId: req.query._id }).exec(function (err, coupons) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else {
      if (coupons)
        res.json(
          resHandler.respondSuccess(coupons, "Banners fetched successfully", 2)
        );
      else res.json(resHandler.respondError("No banners in this Store", -3));
    }
  });
}
function fetchPostImages(req, res) {
  postImgs.find({ storeId: req.query._id }).exec(function (err, coupons) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else {
      if (coupons)
        res.json(
          resHandler.respondSuccess(
            coupons,
            "Post Images fetched successfully",
            2
          )
        );
      else res.json(resHandler.respondError("No Post Image in this Store", -3));
    }
  });
}
function fetchCoupons(req, res) {
  Coupon.find({ storeId: req.query._id }).exec(function (err, coupons) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else {
      if (coupons)
        res.json(
          resHandler.respondSuccess(coupons, "Coupons fetched successfully", 2)
        );
      else res.json(resHandler.respondError("No coupons in this Store", -3));
    }
  });
}
function fetchFeaturedCoupons(req, res) {
  Coupon.find({ featuredForHome: true })
    .populate("storeId", "img")
    .exec(function (err, coupons) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (coupons)
          res.json(
            resHandler.respondSuccess(
              coupons,
              "Coupons fetched successfully",
              2
            )
          );
        else res.json(resHandler.respondError("No featured coupons found", -3));
      }
    });
}
function singleStoreData(req, res) {
  Store.find({ storeURL: req.query._id }, function (err, store) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!store)
      res.json(
        resHandler.respondError("Unable to fetch Store Image at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(store, "Store image fetched successfully", 2)
      );
  });
}
function fetchStores(req, res) {
  Store.find(
    { categoryRef: req.query._id },
    "name img storeURL",
    function (err, stores) {
      if (err) console.log(err);
      else if (!stores)
        res.json(
          resHandler.respondError("Unable to fetch Stores at the moment", -3)
        );
      else
        res.json(
          resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
        );
    }
  );
}
function fetchStoresDropDown(req, res) {
  Store.find({ categoryRef: req.query._id }, "name img storeURL")
    .limit(8)
    .exec(function (err, stores) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!stores)
        res.json(
          resHandler.respondError("Unable to fetch Stores at the moment", -3)
        );
      else
        res.json(
          resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
        );
    });
  // Store.find({ categoryRef: req.query._id }, 'name img storeURL', function (err, stores) {
  //     if (err) console.log(err)
  //     else if (!stores) res.json(resHandler.respondError("Unable to fetch Stores at the moment", -3));
  //     else res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
  // })
}
function fetchStoreProducts(req, res) {
  Product.find({ storeId: req.query._id })
    .sort({ sortNo: -1 })
    .exec(function (err, products) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!products)
        res.json(
          resHandler.respondError("Unable to fetch Products at the moment", -3)
        );
      else
        res.json(
          resHandler.respondSuccess(
            products,
            "Products fetched successfully",
            2
          )
        );
    });
}
function fetchFeaturedCategories(req, res) {
  Category.find(
    { featuredForHome: true },
    "name categoryURL",
    function (err, categories) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!categories)
        res.json(
          resHandler.respondError(
            "Unable to fetch categories at the moment",
            -3
          )
        );
      else
        res.json(
          resHandler.respondSuccess(
            categories,
            "Categories fetched successfully",
            2
          )
        );
    }
  );
}
function fetchForBlogCategories(req, res) {
  Category.find(
    { forBlogs: true },
    "name categoryURL",
    function (err, categories) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!categories)
        res.json(
          resHandler.respondError(
            "Unable to fetch categories at the moment",
            -3
          )
        );
      else
        res.json(
          resHandler.respondSuccess(
            categories,
            "Categories fetched successfully",
            2
          )
        );
    }
  );
}
function fetchCategories(req, res) {
  Category.find(
    { forBlogs: false },
    "name categoryURL",
    function (err, categories) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!categories)
        res.json(
          resHandler.respondError(
            "Unable to fetch categories at the moment",
            -3
          )
        );
      else
        res.json(
          resHandler.respondSuccess(
            categories,
            "Categories fetched successfully",
            2
          )
        );
    }
  );
}
function featuredProducts(req, res) {
  req.query["featured"] = true;
  if (req.query.catId == "null") delete req.query["catId"];
  if (req.query.storeId == "null") delete req.query["storeId"];
  if (req.query.tags == "null") delete req.query["tags"];
  var skipNo = Number(req.query.skipNo);
  var limitNo = Number(req.query.limitNo);
  delete req.query.skipNo;
  delete req.query.limitNo;
  Product.find(req.query)
    .sort({ sortNo: -1 })
    .skip(skipNo)
    .limit(limitNo)
    .exec(function (err, products) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (products.length)
          res.json(
            resHandler.respondSuccess(
              products,
              "Products fetched successfully",
              2
            )
          );
        else
          res.json(
            resHandler.respondError("Unable to fetch more Products", -3)
          );
      }
    });
}
function fetchReviews(req, res) {
  Review.find({ productId: req.query._id })
    .sort({ CreatedAt: -1 })
    .exec(function (err, reviews) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (reviews.length)
          res.json(
            resHandler.respondSuccess(
              reviews,
              "Reviews fetched successfully",
              2
            )
          );
        else res.json(resHandler.respondError("Unable to fetch Reviews", -3));
      }
    });
}
function trendingProducts(req, res) {
  if (req.query.catId == "null") delete req.query["catId"];
  if (req.query.storeId == "null") delete req.query["storeId"];
  if (req.query.tags == "null") delete req.query["tags"];
  var skipNo = Number(req.query.skipNo);
  var limitNo = Number(req.query.limitNo);
  delete req.query.skipNo;
  delete req.query.limitNo;
  Product.find(req.query)
    .sort({ clicks: -1 })
    .skip(skipNo)
    .limit(limitNo)
    .exec(function (err, products) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (products.length)
          res.json(
            resHandler.respondSuccess(
              products,
              "Products fetched successfully",
              2
            )
          );
        else
          res.json(
            resHandler.respondError("Unable to fetch more Products", -3)
          );
      }
    });
}
function fetchProductsByCategory(req, res) {
  Product.find({ catId: req.query._id }, "name img vid buttonText externalLink")
    .sort({ CreatedAt: -1 })
    .limit(9)
    .exec(function (err, products) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (products.length)
          res.json(
            resHandler.respondSuccess(
              products,
              "Products fetched successfully",
              2
            )
          );
        else res.json(resHandler.respondError("Unable to fetch Products", -3));
      }
    });
}
function fetchRandomProducts(req, res) {
  Product.aggregate([
    { $sample: { size: Number(req.query.limitNo) } },
    {
      $project: { name: 1, storeId: 1, img: 1, vid: 1, pricing: 1, clicks: 1 },
    },
  ]).exec(function (err, stores) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!stores)
      res.json(
        resHandler.respondError("Unable to fetch Stores at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
      );
  });
}
function singleProduct(req, res) {
  Product.findOne({ _id: req.query._id }, function (err, product) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!product)
      res.json(
        resHandler.respondError("Unable to fetch Product at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(product, "Product fetched successfully", 2)
      );
  });
}
function fetchBlogItems(req, res) {
  BlogItem.find({ blogId: req.query._id })
    .sort({ sortNo: -1 })
    .exec(function (err, blogItems) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (blogItems.length)
          res.json(
            resHandler.respondSuccess(
              blogItems,
              "Blog Items fetched successfully",
              2
            )
          );
        else
          res.json(resHandler.respondError("Unable to fetch Blog Items", -3));
      }
    });
}
function fetchRandomBlogs(req, res) {
  Blog.aggregate([
    { $sample: { size: Number(req.query.limitNo) } },
    { $project: { title: 1, img: 1, blogURL: 1, author: 1, CreatedAt: 1 } },
  ]).exec(function (err, blogs) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!blogs)
      res.json(
        resHandler.respondError("Unable to fetch Blogs at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2)
      );
  });
}
function fetchRandomStores(req, res) {
  Store.aggregate([
    { $sample: { size: Number(req.query.limitNo) } },
    { $project: { name: 1, img: 1, shortDes: 1, storeURL: 1 } },
  ]).exec(function (err, stores) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!stores)
      res.json(
        resHandler.respondError("Unable to fetch Stores at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
      );
  });
}
function searchQuery(req, res) {
  // { name: req.query.quer, img, storeURL }
  var regex = new RegExp(req.query["quer"], "i");
  Store.find({ name: regex }, "name img storeURL")
    .limit(Number(req.query.limitNo))
    .exec(function (err, stores) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (stores.length)
          res.json(
            resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
          );
        else
          res.json(
            resHandler.respondError("Can't fetch Stores at the moment", -3)
          );
      }
    });
}
function fetchBlogsWithLimit(req, res) {
  console.log(req.query);
  var queryObj = {};
  if (req.query.quer) {
    if (req.query.quer != "null") queryObj.categoryRef = req.query.quer;
  }
  Blog.find(queryObj, "title img blogURL shortDes views author CreatedAt")
    .sort({ CreatedAt: -1 })
    .skip(Number(req.query.skipNo))
    .limit(Number(req.query.limitNo))
    .exec(function (err, blogs) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (blogs.length)
          res.json(
            resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2)
          );
        else
          res.json(resHandler.respondError("Unable to fetch more Blogs", -3));
      }
    });
}
function blogsForSiteMap(req, res) {
  Blog.find({}, "title blogURL").exec(function (err, blogs) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else {
      if (blogs.length)
        res.json(
          resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2)
        );
      else
        res.json(
          resHandler.respondError("Can't fetch Blogs at the moment", -3)
        );
    }
  });
}
function fetchSingleBlog(req, res) {
  Blog.findOne({ blogURL: req.query._id }).exec(function (err, blog) {
    if (err) {
      console.log("Errorrr bloggggg");
      console.log(err);
      resHandler.respondError(err);
    } else {
      if (blog)
        res.json(
          resHandler.respondSuccess(blog, "Blog fetched successfully", 2)
        );
      else
        res.json(
          resHandler.respondError("Unable to fetch blog at the moment", -3)
        );
    }
  });
  // findOne({ blogURL: req.query._id }, function (err, blog) {
  //     if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
  //     else if (blog) res.json(resHandler.respondSuccess(blog, "Blog fetched successfully", 2));
  //     else res.json(resHandler.respondError("Unable to fetch blog at the moment", -3));
  // })
}
function increaseBlogViews(req, res) {
  Blog.findOneAndUpdate({ blogURL: req.body.id }, { $inc: { views: 1 } }).exec(
    function (err, blogs) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (blogs)
          res.json(
            resHandler.respondSuccess(blogs, "Blog found successfully", 2)
          );
        else
          res.json(
            resHandler.respondError("Can't find Blog at the moment", -3)
          );
      }
    }
  );
}
function increaseProductClicks(req, res) {
  Product.findOneAndUpdate({ _id: req.body.id }, { $inc: { clicks: 1 } }).exec(
    function (err, product) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (product)
          res.json(
            resHandler.respondSuccess(product, "product found successfully", 2)
          );
        else
          res.json(
            resHandler.respondError("Can't find product at the moment", -3)
          );
      }
    }
  );
}
function addEmailToDB(req, res) {
  userEmails.findOne({ email: req.body.emailId }, function (err, fetchedEmail) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!fetchedEmail) {
      var newEmail = new userEmails({ email: req.body.emailId });
      newEmail.save().then(
        function (result) {
          res.json(
            resHandler.respondSuccess(result, "Your email has been received", 2)
          );
        },
        function (err) {
          res.json(
            resHandler.respondError("Error in registering your email", -3)
          );
        }
      );
    } else
      res.json(resHandler.respondError("Your email is already registered", -3));
  });
}
function submitReview(req, res) {
  var newReview = new Review({
    name: req.body.name,
    email: req.body.email,
    reviewText: req.body.reviewText,
    rating: req.body.rating,
    productId: req.body.productId,
  });
  newReview.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Your review has been submitted", 2)
      );
    },
    function (err) {
      res.json(resHandler.respondError("Error in posting your Review", -3));
    }
  );
}
function fetchSettingsData(req, res) {
  Settings.findOne(
    { _id: "605634fbcd867926c88dddd9" },
    function (err, settings) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!settings)
        res.json(
          resHandler.respondError("Unable to fetch Settings at the moment", -3)
        );
      else
        res.json(
          resHandler.respondSuccess(
            settings,
            "Settings Data fetched successfully",
            2
          )
        );
    }
  );
}
function fetchEventName(req, res) {
  Settings.findOne(
    { _id: "605634fbcd867926c88dddd9" },
    "eventName eventBarText",
    function (err, settings) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!settings)
        res.json(
          resHandler.respondError(
            "Unable to fetch Event name at the moment",
            -3
          )
        );
      else
        res.json(
          resHandler.respondSuccess(
            settings,
            "Event name fetched successfully",
            2
          )
        );
    }
  );
}
function fetchStoreURLOnly(req, res) {
  Store.find({}, "storeURL name", function (err, stores) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!stores)
      res.json(
        resHandler.respondError("Unable to fetch Stores at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
      );
  });
}
