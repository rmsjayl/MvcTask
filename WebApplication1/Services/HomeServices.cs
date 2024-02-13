using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class HomeServices : IHome
    {
        public void TransferRecord(List<UserInfo> userinfo, UserInfo userinfos)
        {
            try
            {
                Thread.Sleep(2000);
                lock (userinfo)
                {

                    int MaxValueId = userinfo.Any() ? userinfo.Max(x => x.Id) : 0;
                    userinfos.Id = MaxValueId + 1;
                   
                }

                userinfo.Add(userinfos);
            }
            catch (Exception err)
            {
                throw err;
            }
            
        }
        public object EditUser(List<UserInfo> userinfo, int id)
        {
            try
            {
      
                var getUserId = userinfo.Find(x => x.Id == id);
                return getUserId;

            }
            catch (Exception err)
            {
                throw err;
            }

        }
        public void EditUserRecord(List<UserInfo> userinfo, UserInfo userinfos)
        {
            try 
            {

                var user = userinfo.Find(x => x.Id == userinfos.Id);
                user.FirstName = userinfos.FirstName;
                user.LastName = userinfos.LastName;
                user.Age = userinfos.Age;
                user.Salary = userinfos.Salary;

            } catch (Exception err)

            {
                throw err;
            }
        }

        public object DeleteUser(List<UserInfo> userinfo, int id)
        {
            try
            {
                var getUserId = userinfo.Find(x => x.Id == id);
                return userinfo.Remove(getUserId);

            } catch (Exception err)
            {
                throw err;
            }
        }
    }
}