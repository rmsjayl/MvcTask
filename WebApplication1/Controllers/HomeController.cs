using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public static List<UserInfo> userinfos = new List<UserInfo>();
        public static HomeServices homeServices = new HomeServices();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Record()
        {
            return Json(userinfos, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //TASK - Purpose is to contain the data and execute the data asynchronously
        public async Task<JsonResult> TransferRecord(UserInfo userInfo)
        {
            var response = await Task.FromResult(userInfo);
            homeServices.TransferRecord(userinfos, response);
            return Json(userInfo, JsonRequestBehavior.AllowGet);
        }

        //FIND THE ID OF THE USER
        public JsonResult EditUser(int id)
        {
            return Json(homeServices.EditUser(userinfos, id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task <JsonResult> EditUserRecord(UserInfo userInfo)
        {
            var response = await Task.FromResult(userInfo);
            homeServices.EditUserRecord(userinfos, response);
            return Json(userInfo, JsonRequestBehavior.AllowGet);
        }

        //PROCEED WITH THE DELETE METHOD
        [HttpPost]
        public JsonResult DeleteUser(int id)
        {
            return Json(homeServices.DeleteUser(userinfos, id), JsonRequestBehavior.AllowGet);

        }
    }
}