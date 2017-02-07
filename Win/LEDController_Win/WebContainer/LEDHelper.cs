using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Win32;

namespace WebContainer
{
    public class LEDHelper
    {
        public static void ImportClientDataToServerSqliteDB(string clientFile,string serverDBFile)
        {

        }
    }

    public class RegSoftwareHelper
    {
        public static bool IsInstallToolbox()
        {
            RegistryKey key = Registry.LocalMachine;
            RegistryKey toolboxKey = null;
            try
            {
                toolboxKey = key.OpenSubKey("software\\Leyard\\Leadshow 3G System", true);
                string path = toolboxKey.GetValue("Path").ToString();

                return true;
            }
            catch
            {
                return false;
            }
            return false;
        }

        public static string GetToolboxConfigFile()
        {
            RegistryKey key = Registry.LocalMachine;
            RegistryKey toolboxKey = null;
            string path = "";
            try
            {
                toolboxKey = key.OpenSubKey("software\\Leyard\\Leadshow 3G System", true);
                path = toolboxKey.GetValue("Path").ToString();
            }
            catch
            {

            }
            return path;
        }

        public static bool IsInstallPLC()
        {
            RegistryKey key = Registry.LocalMachine;
            RegistryKey toolboxKey = null;
            try
            {
                toolboxKey = key.OpenSubKey("software\\Leyard\\PLC Monitor System", true);
                string path = toolboxKey.GetValue("Path").ToString();

                return true;
            }
            catch
            {
                return false;
            }
            return false;
        }

        public static string GetPLCIniFile()
        {
            return "";
        }
    }
}
