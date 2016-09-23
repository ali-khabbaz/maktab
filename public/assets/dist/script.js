! function () {
  "use strict";
  angular.module("app", ["app.core", "app.main", "app.courses", "app.video"])
}(),
function () {
  "use strict";
  angular.module("app.core", ["ngRoute", "satellizer", "ngAnimate", "ngSanitize"])
}(),
function () {
  "use strict";
  angular.module("app.courses", [])
}(),
function () {
  "use strict";
  angular.module("app.main", [])
}(),
function () {
  "use strict";
  angular.module("app.video", [])
}(),
function () {
  "use strict";

  function e(e) {
    function t(e) {
      var t = n.getItem("userToken");
      return t && (e.headers.authorization = "ali is just." + t), e
    }

    function r(e) {
      return e
    }
    var n = e.localStorage,
      a = {
        request: t,
        response: r
      };
    return a
  }
  e.$inject = ["$window"], angular.module("app.core").factory("authInterceptor", e)
}(),
function () {
  "use strict";

  function e(e, t, r) {
    console.log("config---------"), t.config.$routeProvider = e, r.interceptors.push("authInterceptor")
  }
  e.$inject = ["$routeProvider", "routeServiceConfigProvider", "$httpProvider"], angular.module("app.core").config(e)
}(),
function () {
  "use strict";

  function e() {
    console.log("routeServiceConfig-------"), this.config = {}, this.$get = function () {
      return {
        config: this.config
      }
    }
  }

  function t(e, t, r, n, a) {
    function o(e) {
      console.log("configureRoutes---", e), e.forEach(function (e) {
        var t;
        "undefined" != typeof e.config.deps && 0 !== e.config.deps.length && (t = {
            deps: ["$ocLazyLoad", function (t) {
              return t.load(e.config.deps)
            }]
          }, e.config.resolve = angular.extend(e.config.resolve || {}, t)), v.when(e.url, e.config), m = e.config.isDefault ?
          e : m
      }), v.otherwise({
        redirectTo: m.url || "/"
      })
    }

    function i(e) {
      h = h.concat(e)
    }

    function s() {
      var e, t, n = [];
      for(e in r.routes) r.routes.hasOwnProperty(e) && (t = r.routes[e], "undefined" != typeof t.originalPath &&
        "undefined" == typeof t.redirectTo && n.push(t));
      return n
    }

    function c() {
      return h
    }

    function l() {
      var e = t.$on("$routeChangeStart", function (e, t, r) {
        t && t.$$route
      });
      t.$on("$destroy", e)
    }

    function u() {
      e.path("/logout")
    }

    function d() {
      e.path(m.url || "/")
    }

    function g() {
      var r = t.$on("$routeChangeError", function (t, r, n, a) {
        var o = 401 === a.status ? "دسترسی غیر مجاز" : "خطا در تغییر مسیر";
        logger.error(o, [r, a]), e.path(m.url)
      });
      t.$on("$destroy", r)
    }

    function p() {
      g(), l()
    }
    console.log("routeService");
    var f = {
        configureRoutes: o,
        configureMenu: i,
        getRoutes: s,
        getMenuItems: c,
        redirectToDefault: d,
        redirectToLogout: u
      },
      m = {},
      h = [],
      v = a.config.$routeProvider;
    return p(), f
  }
  t.$inject = ["$location", "$rootScope", "$route", "$filter", "routeServiceConfig"], angular.module("app.core").provider(
    "routeServiceConfig", e).factory("routeService", t)
}(),
function () {
  "use strict";

  function e(e, t) {
    function r() {
      c.searchWord ? e.getSearchResult({
        searchWord: c.searchWord
      }).then(function (e) {
        a(e), c.loadingShow = !1
      }) : e.getCategoryAndSubCategoriesAndArticles().success(function (e) {
        n(e), c.loadingShow = !1
      })
    }

    function n(t) {
      c.articles = t.data, c.categoryAndSubCategoriesAndArticles = e.categoryAndSubCategoriesAndArticlesDataReady(t.data),
        c.softwares = e.extractSoftwares(t.data)
    }

    function a(t) {
      c.articles = t[1], c.softwares = e.extractSoftwares(t[1]), c.categoryAndSubCategoriesAndArticles = t[2]
    }

    function o(e) {
      $(e.target).hasClass("active") ? ($(e.target).removeClass("active"), $(e.target).siblings("ul").slideUp()) : ($(
        ".courses_accordion h4").removeClass("active"), $(".courses_accordion ul").slideUp(700), $(e.target).addClass(
        "active"), $(e.target).siblings("ul").slideDown(700))
    }

    function i(t) {
      c.selectedSubCategory = t, c.selectedArticles = e.filterArticlesSubCategory(c.articles, t)
    }

    function s(t) {
      var r = null;
      if(c.selectedSubCategory && c.selectedSubCategory !== t.subCategoryName) return !1;
      if(e.noSoftwareSelected(c.softwares)) return !0;
      for(r = 0; r < c.softwares.length; r++)
        if(t.softwareName === c.softwares[r].name && c.softwares[r].select) return !0;
      return !1
    }
    var c = this;
    c.categoryAndSubCategoriesAndArticles = "", c.articles = "", c.selectedSubCategory = "", c.selectSubCategory = i, c
      .accordion = o, c.selectedArticles = "", c.searchWord = t.searchWord, c.filterCourses = s, c.softwares = null, c.selectedSoftwares = [],
      c.loadingShow = !0, r()
  }
  e.$inject = ["coursesFactory", "$routeParams"], angular.module("app.courses").controller("coursesController", e)
}(),
function () {
  "use strict";

  function e(e, t, r, n) {
    function a() {
      return r.absUrl().split("/#/")[0] + "/"
    }

    function o(r) {
      var n = a() + "app/getBestCourses",
        o = e.defer();
      return t.post(n, r).success(function (e) {
        o.resolve([null, e.data])
      }).error(function (e) {
        o.resolve([e])
      }), o.promise
    }

    function i(r) {
      var n = e.defer();
      return m.get("searchWord#" + r.searchWord) ? n.resolve([null, m.get("searchWord#" + r.searchWord), d(m.get(
        "searchWord#" + r.searchWord))]) : t({
        url: a() + "app/getSearchResult",
        method: "POST",
        data: r
      }).success(function (e) {
        m.put("searchWord#" + r.searchWord, e.data), n.resolve([null, e.data, d(e.data)])
      }).error(function (e) {
        n.resolve([e])
      }), n.promise
    }

    function s() {
      var r, n = a() + "app/getCategoryList",
        o = e.defer(),
        i = {};
      return t.post(n).success(function (e) {
        for(e = e.data, r = 0; r < e.length; r++) i[e[r].id] || (i[e[r].id] = {
          name: "",
          subCategories: []
        }), i[e[r].id].name = e[r].name, i[e[r].id].subCategories.push(e[r].subname);
        o.resolve([null, i])
      }).error(function (e) {
        o.resolve([e])
      }), o.promise
    }

    function c() {
      var r, n, o = a() + "app/getSelectedArticles",
        i = e.defer(),
        s = [],
        c = {},
        l = !1;
      return t.post(o).success(function (e) {
        for(e = e.data, r = 0; r < e.length; r++) {
          for(c = {}, l = !1, n = 0; n < s.length; n++) s[n].categoryName === e[r].name && (l = !0, s[n].videos.push({
            name: e[r].articleName,
            authorName: e[r].author_name,
            duration: e[r].duration,
            like: e[r].like,
            views: e[r].views,
            resourceName: e[r].resource_name
          }));
          l || s.push({
            categoryName: e[r].name,
            videos: [{
              name: e[r].articleName,
              authorName: e[r].author_name,
              duration: e[r].duration,
              like: e[r].like,
              views: e[r].views,
              resourceName: e[r].resource_name
            }]
          })
        }
        i.resolve([null, s])
      }).error(function (e) {
        i.resolve([e])
      }), i.promise
    }

    function l(r) {
      var n = a() + "app/getSubCategories",
        o = e.defer(),
        i = {
          categoryName: r
        };
      return t.post(n, i).success(function (e) {
        e = e.data, o.resolve([null, e])
      }).error(function (e) {
        o.resolve([e])
      }), o.promise
    }

    function u() {
      return t({
        url: a() + "app/getCategoryAndSubCategoriesAndArticles",
        method: "GET",
        cache: !0
      })
    }

    function d(e) {
      var t, r, n = [];
      for(t = 0; t < e.length; t++) 0 === n.length || e[t].categoryName !== n[n.length - 1].categoryName ? n.push({
        categoryName: e[t].categoryName,
        subCategories: [{
          name: e[t].subCategoryName,
          articles: [{
            name: e[t].articleName,
            id: e[t].articleId,
            duration: e[t].articleDuration,
            insertDate: e[t].articleInsertDate,
            releasedDate: e[t].articleReleaseDate,
            level: e[t].articleLevel,
            author: e[t].articleAuthor,
            resource: e[t].articleResource,
            views: e[t].articleViews,
            likes: e[t].articleLikes
          }]
        }]
      }) : e[t].categoryName === n[n.length - 1].categoryName && (e[t].subCategoryName === n[n.length - 1].subCategories[
        n[n.length - 1].subCategories.length - 1].name ? n[n.length - 1].subCategories[n[n.length - 1].subCategories
        .length - 1].articles.push({
        name: e[t].articleName,
        id: e[t].articleId,
        duration: e[t].articleDuration,
        insertDate: e[t].articleInsertDate,
        releasedDate: e[t].articleReleaseDate,
        level: e[t].articleLevel,
        author: e[t].articleAuthor,
        resource: e[t].articleResource,
        views: e[t].articleViews,
        likes: e[t].articleLikes
      }) : n[n.length - 1].subCategories.push({
        name: e[t].subCategoryName,
        articles: [{
          name: e[t].articleName,
          id: e[t].articleId,
          duration: e[t].articleDuration,
          insertDate: e[t].articleInsertDate,
          releasedDate: e[t].articleReleaseDate,
          level: e[t].articleLevel,
          author: e[t].articleAuthor,
          resource: e[t].articleResource,
          views: e[t].articleViews,
          likes: e[t].articleLikes
        }]
      }));
      for(t = 0; t < n.length; t++)
        for(n[t].num = 0, r = 0; r < n[t].subCategories.length; r++) n[t].num += n[t].subCategories[r].articles.length;
      return n
    }

    function g(e, t) {
      var r, n = [];
      for(r = 0; r < e.length; r++) e[r].subCategoryName === t && n.push(e[r]);
      return n
    }

    function p(e) {
      var t = [],
        r = [],
        n = null;
      for(n = 0; n < e.length; n++) r.indexOf(e[n].softwareName) === -1 && (t.push({
        name: e[n].softwareName,
        select: !1
      }), r.push(e[n].softwareName));
      return t
    }

    function f(e) {
      var t = null,
        r = !0;
      for(t = 0; t < e.length; t++)
        if(e[t].select) return r = !1;
      return r
    }
    var m = n("dataCacheCourses"),
      h = {
        getBestCourses: o,
        getCategoryList: s,
        getSelectedArticles: c,
        getSubCategories: l,
        getCategoryAndSubCategoriesAndArticles: u,
        categoryAndSubCategoriesAndArticlesDataReady: d,
        filterArticlesSubCategory: g,
        getSearchResult: i,
        extractSoftwares: p,
        noSoftwareSelected: f
      };
    return h
  }
  e.$inject = ["$q", "$http", "$location", "$cacheFactory"], angular.module("app.courses").factory("coursesFactory", e)
}(),
function () {
  function e(e) {
    e.configureRoutes(t())
  }

  function t() {
    return [{
      url: "/courses/:searchWord?",
      config: {
        templateUrl: "/app/courses/courses.html"
      }
    }]
  }
  e.$inject = ["routeService"], angular.module("app.courses").run(e)
}(),
function () {
  "use strict";

  function e(e, t, r, n, a) {
    function o() {
      var r = n.getApiUrl() + "app/getTopCards",
        a = e.defer();
      return t.post(r).success(function (e) {
        a.resolve([null, e.data])
      }).error(function (e) {
        a.resolve([e])
      }), a.promise
    }

    function i() {
      var r, a = n.getApiUrl() + "app/getSearchData",
        o = e.defer(),
        i = [];
      return t({
        url: a,
        method: "GET",
        cache: !0
      }).success(function (e) {
        for(r = 0; r < e.data[0].length; r++) i.push(e.data[0][r]);
        o.resolve([null, i])
      }).error(function (e) {
        o.resolve([e])
      }), o.promise
    }

    function s() {
      return t.post(n.getApiUrl() + "app/getTopCategories")
    }

    function c() {
      return e.all([t.post(n.getApiUrl() + "app/getTopSubCategories"), t.post(n.getApiUrl() + "app/getTopArticles"), t.post(
        n.getApiUrl() + "app/getBestArticles")])
    }

    function l(e) {
      var t, r = [];
      for(t = 0; t < e.length; t++) 0 === r.length || e[t].categoryName !== r[r.length - 1].categoryName ? r.push({
        categoryName: e[t].categoryName,
        subCategoryNames: [e[t].subCategoryName]
      }) : e[t].categoryName === r[r.length - 1].categoryName && r[r.length - 1].subCategoryNames.push(e[t].subCategoryName);
      return r
    }

    function u(e, t, r) {
      var n, a;
      for(e.unshift({
          name: "Best",
          articles: r
        }), n = 0; n < e.length; n++)
        for(e[n].articles || (e[n].articles = []), a = 0; a < t.length; a++) e[n].id === t[a].subCategoryId && e[n].articles
          .push(t[a]);
      return e
    }

    function d() {
      return ["اول", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم", "نهم", "دهم", "یازدهم", "دوازدهم", "سیزدهم",
        "چهاردهم", "پانزدهم", "شانزدهم", "هفدهم", "هجدهم", "نوزدهم", "بیستم", "بیست و یکم", "بیست و دوم"]
    }
    var g = (a("dataCache"), {
      getTopCards: o,
      getSearchData: i,
      getTopCategories: s,
      topCategoriesDataReady: l,
      topSubCategoriesDataReady: u,
      getArticlesAndSubCategories: c,
      counting: d
    });
    return g
  }
  e.$inject = ["$q", "$http", "$location", "mainViewFactory", "$cacheFactory"], angular.module("app.main").factory(
    "homeFactory", e)
}(),
function () {
  function e(e) {
    console.log("appRun"), e.configureRoutes(t())
  }

  function t() {
    return console.log("main.route"), [{
      url: "/main",
      config: {
        templateUrl: "/app/main/main.html",
        isDefault: !0
      }
    }]
  }
  e.$inject = ["routeService"], console.log("main.route"), angular.module("app.main").run(e)
}(),
function () {
  "use strict";

  function e(e, t, r, n, a, o, i) {
    function s(t, o, i, s) {
      function $(e, r) {
        e && ("object" == typeof e ? (t.searchStr = D(e), I({
          originalObject: e
        })) : "string" == typeof e && e.length > 0 ? t.searchStr = e : console && console.error && console.error(
          "Tried to set " + (r ? "initial" : "") + " value of angucomplete to", e, "which is an invalid value"), k(!
          0))
      }

      function b(e) {
        ge = null, t.hideResults(e), document.body.removeEventListener("click", b)
      }

      function A(e) {
        return e.which ? e.which : e.keyCode
      }

      function I(e) {
        "function" == typeof t.selectedObject ? t.selectedObject(e) : t.selectedObject = e, k(e ? !0 : !1)
      }

      function R(e) {
        return function (r) {
          return t[e] ? t[e](r) : r
        }
      }

      function N(e) {
        I({
          originalObject: e
        }), t.clearSelected && (t.searchStr = null), z()
      }

      function D(e) {
        return t.titleField.split(",").map(function (t) {
          return x(e, t)
        }).join(" ")
      }

      function x(e, t) {
        var r, n;
        if(t) {
          r = t.split("."), n = e;
          for(var a = 0; a < r.length; a++) n = n[r[a]]
        } else n = e;
        return n
      }

      function F(e, r) {
        var a, o, i;
        if(i = new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), e) return e.match && e.replace || (e = e.toString()),
          o = e.match(i), a = o ? e.replace(i, '<span class="' + t.matchClass + '">' + o[0] + "</span>") : e, n.trustAsHtml(
            a)
      }

      function k(e) {
        t.notEmpty = e, ce = t.searchStr, t.fieldRequired && s && t.inputName && s[t.inputName].$setValidity(se, e)
      }

      function U(e) {
        var r = A(e);
        if(r !== d && r !== l)
          if(r === u || r === p) e.preventDefault();
          else if(r === c) e.preventDefault(), !t.showDropdown && t.searchStr && t.searchStr.length >= oe && (G(), t.searching = !
          0, K(t.searchStr));
        else if(r === g) z(), t.$apply(function () {
          ae.val(t.searchStr)
        });
        else {
          if(0 === oe && !t.searchStr) return;
          t.searchStr && "" !== t.searchStr ? t.searchStr.length >= oe && (G(), ie && a.cancel(ie), t.searching = !0,
            ie = a(function () {
              K(t.searchStr)
            }, t.pause)) : t.showDropdown = !1, ce && ce !== t.searchStr && !t.clearSelected && t.$apply(function () {
            I()
          })
        }
      }

      function j(e) {
        !t.overrideSuggestions || t.selectedObject && t.selectedObject.originalObject === t.searchStr || (e && e.preventDefault(),
          a.cancel(ie), P(), N(t.searchStr))
      }

      function T(e) {
        var t = getComputedStyle(e);
        return e.offsetHeight + parseInt(t.marginTop, 10) + parseInt(t.marginBottom, 10)
      }

      function _() {
        return ue.getBoundingClientRect().top + parseInt(getComputedStyle(ue).maxHeight, 10)
      }

      function V() {
        return o[0].querySelectorAll(".angucomplete-row")[t.currentIndex]
      }

      function O() {
        return V().getBoundingClientRect().top - (ue.getBoundingClientRect().top + parseInt(getComputedStyle(ue).paddingTop,
          10))
      }

      function q(e) {
        ue.scrollTop = ue.scrollTop + e
      }

      function L() {
        var e = t.results[t.currentIndex];
        t.matchClass ? ae.val(D(e.originalObject)) : ae.val(e.title)
      }

      function E(e) {
        var r = A(e),
          n = null,
          a = null;
        r === p && t.results ? (t.currentIndex >= 0 && t.currentIndex < t.results.length ? (e.preventDefault(), t.selectResult(
            t.results[t.currentIndex])) : (j(e), z()), t.$apply()) : r === c && t.results ? (e.preventDefault(), t.currentIndex +
            1 < t.results.length && t.showDropdown && (t.$apply(function () {
              t.currentIndex++, L()
            }), de && (n = V(), _() < n.getBoundingClientRect().bottom && q(T(n))))) : r === u && t.results ? (e.preventDefault(),
            t.currentIndex >= 1 ? (t.$apply(function () {
              t.currentIndex--, L()
            }), de && (a = O(), a < 0 && q(a - 1))) : 0 === t.currentIndex && t.$apply(function () {
              t.currentIndex = -1, ae.val(t.searchStr)
            })) : r === f ? t.results && t.results.length > 0 && t.showDropdown ? t.currentIndex === -1 && t.overrideSuggestions ?
          j() : (t.currentIndex === -1 && (t.currentIndex = 0), t.selectResult(t.results[t.currentIndex]), t.$digest()) :
          t.searchStr && t.searchStr.length > 0 && j() : r === g && e.preventDefault()
      }

      function W(e) {
        return function (r, n, a, o) {
          n || a || o || !r.data || (r = r.data), t.searching = !1, Q(x(ee(r), t.remoteUrlDataField), e)
        }
      }

      function H(e, r, n, a) {
        0 !== r && r !== -1 && (r || n || a || (r = e.status), t.remoteUrlErrorCallback ? t.remoteUrlErrorCallback(e, r,
          n, a) : console && console.error && console.error("http error"))
      }

      function P() {
        le && le.resolve()
      }

      function B(n) {
        var a = {},
          o = t.remoteUrl + encodeURIComponent(n);
        t.remoteUrlRequestFormatter && (a = {
            params: t.remoteUrlRequestFormatter(n)
          }, o = t.remoteUrl), t.remoteUrlRequestWithCredentials && (a.withCredentials = !0), P(), le = e.defer(), a.timeout =
          le.promise, r.get(o, a).success(W(n)).error(H)
      }

      function M(r) {
        P(), le = e.defer(), t.remoteApiHandler(r, le.promise).then(W(r))["catch"](H)
      }

      function z() {
        t.showDropdown = !1, t.results = [], ue && (ue.scrollTop = 0)
      }

      function G() {
        t.showDropdown = re, t.currentIndex = t.focusFirst ? 0 : -1, t.results = []
      }

      function Y(e) {
        var r, n, a, o, i = t.searchFields.split(","),
          s = [];
        for("undefined" != typeof t.parseInput() && (e = t.parseInput()(e)), r = 0; r < t.localData.length; r++) {
          for(n = !1, a = 0; a < i.length; a++) o = x(t.localData[r], i[a]) || "", n = n || o.toString().toLowerCase().indexOf(
            e.toString().toLowerCase()) >= 0;
          n && (s[s.length] = t.localData[r])
        }
        return s
      }

      function J(e, r, n) {
        if(!n) return !1;
        for(var a in r)
          if(r[a].toLowerCase() === n.toLowerCase()) return t.selectResult(e), !0;
        return !1
      }

      function K(e) {
        !e || e.length < oe || (t.localData ? t.$apply(function () {
          var r;
          r = "undefined" != typeof t.localSearch() ? t.localSearch()(e) : Y(e), t.searching = !1, Q(r, e)
        }) : t.remoteApiHandler ? M(e) : B(e))
      }

      function Q(e, r) {
        var n, a, o, i, s, c;
        if(e && e.length > 0)
          for(t.results = [], n = 0; n < e.length; n++) t.titleField && "" !== t.titleField && (i = s = D(e[n])), a =
            "", t.descriptionField && (a = c = x(e[n], t.descriptionField)), o = "", t.imageField && (o = x(e[n], t.imageField)),
            t.matchClass && (s = F(i, r), c = F(a, r)), t.results[t.results.length] = {
              title: s,
              description: c,
              image: o,
              originalObject: e[n]
            };
        else t.results = [];
        t.autoMatch && 1 === t.results.length && J(t.results[0], {
            title: i,
            desc: a || ""
          }, t.searchStr) ? t.showDropdown = !1 : 0 !== t.results.length || ne ? t.showDropdown = !0 : t.showDropdown = !
          1
      }

      function X() {
        t.localData ? Q(t.localData, "") : t.remoteApiHandler ? M("") : B("")
      }
      var Z, ee, te, re, ne, ae = o.find("input"),
        oe = m,
        ie = null,
        se = y,
        ce = null,
        le = null,
        ue = o[0].querySelector(".angucomplete-dropdown"),
        de = !1,
        ge = null;
      o.on("mousedown", function (e) {
          e.target.id ? (ge = e.target.id, ge === t.id + "_dropdown" && document.body.addEventListener("click", b)) :
            ge = e.target.className
        }), t.currentIndex = t.focusFirst ? 0 : null, t.searching = !1, te = t.$watch("initialValue", function (e) {
          e && (te(), $(e, !0))
        }), t.$watch("fieldRequired", function (e, r) {
          e !== r && (e ? k(ce && t.currentIndex !== -1 ? !0 : !1) : s[t.inputName].$setValidity(se, !0))
        }), t.$on("angucomplete-alt:clearInput", function (e, r) {
          r && r !== t.id || (t.searchStr = null, I(), k(!1), z())
        }), t.$on("angucomplete-alt:changeInput", function (e, r, n) {
          r && r === t.id && $(n)
        }), t.onFocusHandler = function () {
          t.focusIn && t.focusIn(), 0 !== oe || t.searchStr && 0 !== t.searchStr.length || (t.currentIndex = t.focusFirst ?
            0 : t.currentIndex, t.showDropdown = !0, X())
        }, t.hideResults = function () {
          ge && (ge === t.id + "_dropdown" || ge.indexOf("angucomplete") >= 0) ? ge = null : (Z = a(function () {
              z(), t.$apply(function () {
                t.searchStr && t.searchStr.length > 0 && ae.val(t.searchStr)
              })
            }, C), P(), t.focusOut && t.focusOut(), t.overrideSuggestions && t.searchStr && t.searchStr.length > 0 &&
            t.currentIndex === -1 && j())
        }, t.resetHideResults = function () {
          Z && a.cancel(Z)
        }, t.hoverRow = function (e) {
          t.currentIndex = e
        }, t.selectResult = function (e) {
          t.$emit("selectResult", e), t.matchClass && (e.title = D(e.originalObject), e.description = x(e.originalObject,
            t.descriptionField)), t.clearSelected ? t.searchStr = null : t.searchStr = e.title, I(e), z()
        }, t.inputChangeHandler = function (e) {
          return e.length < oe ? (P(), z()) : 0 === e.length && 0 === oe && (t.searching = !1, X()), t.inputChanged &&
            (e = t.inputChanged(e)), e
        }, t.fieldRequiredClass && "" !== t.fieldRequiredClass && (se = t.fieldRequiredClass), t.minlength && "" !== t.minlength &&
        (oe = parseInt(t.minlength, 10)), t.pause || (t.pause = v), t.clearSelected || (t.clearSelected = !1), t.overrideSuggestions ||
        (t.overrideSuggestions = !1), t.fieldRequired && s && k(t.initialValue ? !0 : !1), t.inputType = i.type ? i.type :
        "text", t.textSearching = i.textSearching ? i.textSearching : S, t.textNoResults = i.textNoResults ? i.textNoResults :
        w, re = "false" !== t.textSearching, ne = "false" !== t.textNoResults, t.maxlength = i.maxlength ? i.maxlength :
        h, ae.on("keydown", E), ae.on("keyup", U), ee = R("remoteUrlResponseFormatter"), a(function () {
          var e = getComputedStyle(ue);
          de = e.maxHeight && "auto" === e.overflowY
        })
    }
    var c = 40,
      l = 39,
      u = 38,
      d = 37,
      g = 27,
      p = 13,
      f = 9,
      m = 3,
      h = 524288,
      v = 500,
      C = 200,
      y = "autocomplete-required",
      S = "Searching...",
      w = "No results found",
      $ = "/angucomplete-alt/index.html";
    return o.put($,
      '<div class="angucomplete-holder" ng-class="{\'angucomplete-dropdown-visible\': showDropdown}">  <input id="{{id}}_value" name="{{inputName}}" tabindex="{{fieldTabindex}}" ng-class="{\'angucomplete-input-not-empty\': notEmpty}" ng-model="searchStr" ng-disabled="disableInput" type="{{inputType}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" ng-focus="onFocusHandler()" class="{{inputClass}}" ng-focus="resetHideResults()" ng-blur="hideResults($event)" autocapitalize="off" autocorrect="off" autocomplete="off" ng-change="inputChangeHandler(searchStr)"/>  <div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-show="showDropdown">    <div class="angucomplete-searching" ng-show="searching" ng-bind="textSearching"></div>    <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" ng-bind="textNoResults"></div>    <div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseenter="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">      <div ng-if="imageField" class="angucomplete-image-holder">        <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>        <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>      </div>      <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>      <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>      <div ng-if="matchClass && result.description && result.description != \'\'" class="angucomplete-description" ng-bind-html="result.description"></div>      <div ng-if="!matchClass && result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>    </div>  </div></div>'
    ), {
      restrict: "EA",
      require: "^?form",
      scope: {
        selectedObject: "=",
        disableInput: "=",
        initialValue: "=",
        localData: "=",
        localSearch: "&",
        remoteUrlRequestFormatter: "=",
        remoteUrlRequestWithCredentials: "@",
        remoteUrlResponseFormatter: "=",
        remoteUrlErrorCallback: "=",
        remoteApiHandler: "=",
        id: "@",
        type: "@",
        placeholder: "@",
        remoteUrl: "@",
        remoteUrlDataField: "@",
        titleField: "@",
        descriptionField: "@",
        imageField: "@",
        inputClass: "@",
        pause: "@",
        searchFields: "@",
        minlength: "@",
        matchClass: "@",
        clearSelected: "@",
        overrideSuggestions: "@",
        fieldRequired: "=",
        fieldRequiredClass: "@",
        inputChanged: "=",
        autoMatch: "@",
        focusOut: "&",
        focusIn: "&",
        fieldTabindex: "@",
        inputName: "@",
        focusFirst: "@",
        parseInput: "&"
      },
      templateUrl: function (e, t) {
        return t.templateUrl || $
      },
      compile: function (e) {
        var t = i.startSymbol(),
          r = i.endSymbol();
        if("{{" !== t || "}}" !== r) {
          var n = e.html().replace(/\{\{/g, t).replace(/\}\}/g, r);
          e.html(n)
        }
        return s
      }
    }
  }
  e.$inject = ["$q", "$parse", "$http", "$sce", "$timeout", "$templateCache", "$interpolate"], angular.module(
    "app.main").directive("angucompleteAlt", e)
}(),
function () {
  "use strict";

  function e(e, t) {
    function r() {
      return t.absUrl().split("/#/")[0] + "/"
    }

    function n(e) {
      d = e, p.setItem("userToken", e)
    }

    function a() {
      return d || (d = p.getItem("userToken")), d
    }

    function o() {
      return !!a()
    }

    function i(e) {
      o() && p.setItem("userInfo", e)
    }

    function s() {
      return p.getItem("userInfo")
    }

    function c() {
      d = null, p.removeItem("userToken"), p.removeItem("userInfo")
    }

    function l(e) {
      var t = a();
      return t && (e.headers.authorization = "ali is just" + t), e
    }

    function u(e) {
      return e
    }
    var d, g = {
        getToken: a,
        setToken: n,
        getUser: s,
        setUser: i,
        isAuthenticated: o,
        getApiUrl: r,
        removeToken: c,
        request: l,
        response: u
      },
      p = e.localStorage;
    return g
  }
  e.$inject = ["$window", "$location"], angular.module("app.main").factory("mainViewFactory", e)
}(),
function () {
  "use strict";

  function e(e, t, r, n, a, o, i) {
    function s() {
      a.getArticleInfo(d.parameter).then(c)
    }

    function c(e) {
      e[0] && (d.showList = !1), d.articleVideos = e[1], d.articleInfo = e[2], d.similarArticles = e[3], d.showList = !
        0, l(1, 1)
    }

    function l(e, r) {
      d.selectedVideo = r, d.selectedSection = e, d.videoAddress = {}, console.log("link", d.articleVideos[e - 1].videos[
        r - 1].link), null !== d.articleVideos[e - 1].videos[r - 1].link ? a.getVideoLink(d.articleVideos[e - 1].videos[
        r - 1].link).success(function (t) {
        g || (g = jwplayer("my-video2")), g.setup({
          file: t.link.trim(),
          image: "assets/img/articles/" + d.parameter.artId + "/Main.jpg",
          title: d.articleVideos[e - 1].videos[r - 1].videoName,
          height: 480,
          width: 800
        }), jwplayer().play()
      }) : (d.videoAddress.wmv = t.getApiUrl() + "videos/" + d.parameter.artId + "/" + e + "/" + r + ".wmv", d.videoAddress
        .mp4 = t.getApiUrl() + "videos/" + d.parameter.artId + "/" + e + "/" + r + ".mp4", d.videoAddress.webm = t.getApiUrl() +
        "videos/" + d.parameter.artId + "/" + e + "/" + r + ".webm", g || (g = jwplayer("my-video2")), g.setup({
          file: d.videoAddress.mp4,
          image: "assets/img/articles/" + d.parameter.artId + "/Main.jpg",
          title: d.articleVideos[e - 1].videos[r - 1].videoName,
          height: 480,
          width: 800
        }))
    }

    function u(e) {
      var t = null;
      $(e.target).is("h5") ? t = $(e.target).parent() : $(e.target).is("span") ? t = $(e.target).closest("header") : $(
        e.target).is("header") && (t = $(e.target)), t.hasClass("active") ? (t.removeClass("active"), t.siblings(
        "article").slideUp()) : ($("header.section_course_header.active").removeClass("active"), $(
        "article.section_course_accordion").slideUp(700), t.addClass("active"), t.siblings("article").slideDown())
    }
    var d = this,
      g = null;
    d.current_video_address = "", d.parameter = r, d.articleInfo = {}, d.articleMetadata = "", d.showList = !1, d.config =
      "", d.videoAddress = null, d.count = e.counting(), d.selectedVideo = null, d.selectedSection = null, d.articleVideos =
      null, d.selectVideo = l, d.accordion = u, d.similarArticles = null, s()
  }
  e.$inject = ["homeFactory", "mainViewFactory", "$routeParams", "$sce", "videoFactory", "$scope", "$window"], angular.module(
    "app.video").controller("videoController", e)
}(),
function () {
  "use strict";

  function e(e, t, r, n, a) {
    function o(e, t, r) {
      return a.trustAsResourceUrl(n.getApiUrl() + "videos/" + e.artId + "/" + t + "/" + r + ".mp4")
    }

    function i(e) {
      return a.trustAsResourceUrl(e)
    }

    function s(r) {
      var a, o, i = n.getApiUrl() + "app/getArticleInfo",
        s = [],
        c = e.defer();
      return t.post(i, {
        article_id: r.artId
      }).success(function (e) {
        if(e.err) c.resolve([e.err]);
        else {
          for(a = 0; a < e.data[0].length; a++) o = {}, s[e.data[0][a].section_id] ? (o.videos = [], o.videos.push({
            videoId: e.data[0][a].video_id,
            videoName: e.data[0][a].video_name,
            duration: e.data[0][a].duration,
            link: e.data[0][a].link
          }), s[e.data[0][a].section_id].videos.push(o.videos[0])) : (o.sectionName = e.data[0][a].section_name,
            o.sectionId = e.data[0][a].section_id, o.videos = [], o.videos.push({
              videoId: e.data[0][a].video_id,
              videoName: e.data[0][a].video_name,
              duration: e.data[0][a].duration,
              link: e.data[0][a].link
            }), s[o.sectionId] = o);
          for(a = 0; a < s.length; a++) s[a] || (s.splice(a, 1), a--);
          c.resolve([null, s, {
            articleViews: e.data[0][0].articleViews,
            articleId: e.data[0][0].article_id,
            authorName: e.data[0][0].author_name,
            descBig: e.data[0][0].desc_big,
            descSmall: e.data[0][0].desc_small,
            duration: e.data[0][0].duration,
            levelName: e.data[0][0].level_name,
            like: e.data[0][0].like,
            views: e.data[0][0].views,
            name: e.data[0][0].name,
            releasedDate: e.data[0][0].released_date,
            resourceName: e.data[0][0].resource_name,
            categoryName: e.data[0][0].categoryName,
            articleDuration: (+(e.data[0][0].articleDuration / 60)).toFixed(0),
            subCategoryName: e.data[0][0].subCategoryName
          }, e.data[1]])
        }
      }), c.promise
    }

    function c(e) {
      return t({
        url: n.getApiUrl() + "app/getVideoLink",
        method: "POST",
        data: {
          link: e
        }
      })
    }
    var l = {
      getArticleInfo: s,
      createTrustedUrl: o,
      getVideoLink: c,
      cerateuploadBoyUrl: i
    };
    return l
  }
  e.$inject = ["$q", "$http", "$location", "mainViewFactory", "$sce"], angular.module("app.video").factory(
    "videoFactory", e)
}(),
function () {
  function e(e) {
    e.configureRoutes(t())
  }

  function t() {
    return [{
      url: "/video/:artId",
      config: {
        templateUrl: "/app/video/video.html"
      }
    }]
  }
  e.$inject = ["routeService"], angular.module("app.video").run(e)
}(),
function () {
  "use strict";

  function e(e, t, r) {
    function n() {
      a()
    }

    function a() {
      e.getSearchData().then(function (e) {
        e[0] ? console.log("getSearchDataErrrrrrrr", e[0]) : s.searchData = e[1]
      })
    }

    function o(e) {
      var t = e.which || e.keyCode;
      13 === t && (console.log("enter"), r.path("/courses/" + c))
    }

    function i(e) {
      console.log("input", e), c = e
    }
    var s = this,
      c = "";
    s.list = "mainviewcontroller loaded", s.searchData = [], s.selectedValue = "", s.keyEventHandler = o, s.inputChanged =
      i, n(), t.$on("selectResult", function (e, t) {
        t.originalObject.categoryName ? r.path("/courses/" + t.originalObject.categoryName + "/" + t.originalObject.subcategoryName) :
          t.originalObject.name && r.path("/video/" + t.originalObject.id)
      })
  }
  e.$inject = ["homeFactory", "$scope", "$location"], angular.module("app.main").controller("FirstPageSearchController",
    e)
}(),
function () {
  "use strict";

  function e(e) {
    var t = this;
    t.list = "mainviewcontroller loaded"
  }
  e.$inject = ["mainViewFactory"], angular.module("app.main").controller("FirstPageSignupController", e)
}(),
function () {
  "use strict";

  function e(e) {
    function t() {
      e.getArticlesAndSubCategories().then(function (t) {
        n.topSubCategories = e.topSubCategoriesDataReady(t[0].data.data, t[1].data.data, t[2].data.data), n.loadingshow = !
          1
      })
    }

    function r(e) {
      n.tab = e
    }
    var n = this;
    n.topSubCategories = "", n.tab = "Best", n.loadingshow = !0, n.changeTab = r, t()
  }
  e.$inject = ["homeFactory"], angular.module("app.main").controller("TopArticlesAndSubCategories", e)
}(),
function () {
  "use strict";

  function e(e) {
    function t() {
      r(), n()
    }

    function r() {
      e.getTopCards().then(function (e) {
        e[0] ? console.log("getTopCards Error", e[0]) : (a.mainCards = e[1], $(
          "main section.main_categories div.big_category").css("background-image", "url(/css/img/" + a.mainCards[
          0].img + ")"), $("main section.main_categories div.small_category_first").css("background-image",
          "url(/css/img/" + a.mainCards[1].img + ")"), $(
          "main section.main_categories div.small_category_second").css("background-image", "url(/css/img/" + a
          .mainCards[2].img + ")"))
      })
    }

    function n() {
      e.getTopArticles().then(function (e) {
        e[0] ? console.log("getTopArticles Error", e[0]) : (a.topArticles = e[1], console.log("vm.topArticles", a.topArticles))
      })
    }
    var a = this;
    a.mainCards = "", a.topArticles = "", t()
  }
  e.$inject = ["homeFactory"], angular.module("app.main").controller("TopCardsController", e)
}(),
function () {
  "use strict";

  function e(e, t) {
    function r() {
      function e(e) {
        n.topCategories = t.topCategoriesDataReady(e.data)
      }
      t.getTopCategories().success(e)
    }
    var n = this;
    n.topCategories = [], r()
  }
  e.$inject = ["mainViewFactory", "homeFactory"], angular.module("app.main").controller("TopCategories", e)
}();
