const express = require("express");
const router = express.Router();
let fetchCtrl = require("../api/fetch.ctrl");

router.get("/fetchSlides", fetchCtrl.fetchSlides);
router.get("/fetchTopStores", fetchCtrl.fetchTopStores);
router.get("/fetchTopBlogs", fetchCtrl.fetchTopBlogs);
router.get("/fetchTopDeals", fetchCtrl.fetchTopDeals);
router.get("/fetchCoupons", fetchCtrl.fetchCoupons);
router.get("/singleStoreData", fetchCtrl.singleStoreData);
router.get("/fetchStores", fetchCtrl.fetchStores);
router.get("/fetchStoreProducts", fetchCtrl.fetchStoreProducts);
router.get("/fetchBanners", fetchCtrl.fetchBanners);
router.get("/fetchPostImages", fetchCtrl.fetchPostImages);
router.get("/fetchRandomStores", fetchCtrl.fetchRandomStores);
router.get("/fetchCategories", fetchCtrl.fetchCategories);
router.get("/featuredProducts", fetchCtrl.featuredProducts);
router.get("/trendingProducts", fetchCtrl.trendingProducts);
router.get("/singleProduct", fetchCtrl.singleProduct);
router.get("/fetchRandomProducts", fetchCtrl.fetchRandomProducts);
router.get("/fetchBlogItems", fetchCtrl.fetchBlogItems);
router.get("/searchQuery", fetchCtrl.searchQuery);
router.get("/fetchBlogsWithLimit", fetchCtrl.fetchBlogsWithLimit);
router.get("/fetchSingleBlog", fetchCtrl.fetchSingleBlog);
router.get("/fetchSettingsData", fetchCtrl.fetchSettingsData);
router.get("/fetchEventName", fetchCtrl.fetchEventName);
router.get("/fetchStoreURLOnly", fetchCtrl.fetchStoreURLOnly);
router.get("/fetchReviews", fetchCtrl.fetchReviews);
router.get("/fetchProductsByCategory", fetchCtrl.fetchProductsByCategory);
router.get("/fetchStoresDropDown", fetchCtrl.fetchStoresDropDown);
router.get("/fetchFeaturedCategories", fetchCtrl.fetchFeaturedCategories);
router.get("/fetchFeaturedCoupons", fetchCtrl.fetchFeaturedCoupons);
router.get("/fetchForBlogCategories", fetchCtrl.fetchForBlogCategories);

router.get("/storesForSiteMap", fetchCtrl.storesForSiteMap);
router.get("/blogsForSiteMap", fetchCtrl.blogsForSiteMap);

router.post("/increaseBlogViews", fetchCtrl.increaseBlogViews);
router.post("/increaseProductClicks", fetchCtrl.increaseProductClicks);
router.post("/submitReview", fetchCtrl.submitReview);
router.post("/addEmailToDB", fetchCtrl.addEmailToDB);

module.exports = router;
