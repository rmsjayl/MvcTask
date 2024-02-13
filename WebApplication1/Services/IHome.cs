using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IHome
    {
        void TransferRecord(List<UserInfo> userinfo, UserInfo userinfos);
        object EditUser(List<UserInfo> userinfo, int id);
        void EditUserRecord(List<UserInfo> userinfo, UserInfo userinfos);
        object DeleteUser(List<UserInfo> userinfo, int id);

    }
}
